/*******************************
 * 1. CORE PARSER COMBINATORS   *
 *******************************/


const initType = definition => {
  let node
  return (...args) => {
    if (!node) {
      node = definition()
    }
    return node(...args)
  }
}


class Container {}

class Ok extends Container {
  #value
  constructor (value) {
    super(value)
    if (value instanceof Container) return value
    this.#value = value
  }

  map(fn) {
    return new Ok(fn(this.#value))
  }

  else () {
    return this
  }

  catch () {
    return this
  }

  lift () {
    return this.#value
  }

  static of (x) {
    return new Ok(x)
  }
}

class Err extends Container {
  #error
  constructor (error) {
    super(error)
    if (value instanceof Container) return value
    this.#error = error
  }

  map(fn) {
    return this
  }

  else (fn) {
    return new Err(fn(this.#error))
  }

  catch (fn) {
    return runSafe(fn, this.#error)
  }

  lift () {
    return this.#error
  }

  static of (error) {
    return new Err(error)
  }
}

const runSafe = (fn, ...args) => {
  try {
    return Ok.of(fn(...args))
  } catch (e) {
    return Err.of(e)
  }
}

const safe = fn => runSafe.bind(null, fn)

const Token = token => {
  switch (typeof token) {
    case "string": return matchString(token)
    case "object": {
      if (token instanceof RegExp)
        return matchRegex(token)
    }
    default: return Err('Invalid token type: ' + token)
  }
}

const matchString = string => input =>
  input.startsWith(string)
    ? new Ok({
        value: string,
        rest: input.substring(string.length, input.length)
      })
    : new Err(`Expected '${string}'`)

const matchRegex = pattern => {
  const anchored = new RegExp(`^${pattern.source}`, pattern.flags)
  return input => {
    const match = input.match(anchored)
    return match
      ? new Ok({
          value: match[0],
          rest: input.substring(match[0].length, input.length)
        })
      : new Err(`Expected pattern ${pattern}`)
    }
  }

const reduce = (arr, fn, acc) => {
  for (const key of Object.keys(arr)) {
    acc = fn(acc, arr[key], key, arr)
    if (acc instanceof Err) break
  }
  return acc
}

const cycle = (iterator, resolver) => acc => {
  let result, error
  while (acc instanceof Ok) {
    acc = acc.map(iterator, resolver)
    if (acc instanceof Err) {
      error = acc
    } else {
      result = acc
    }
  }
  return resolver(result, error)
}

// Combinators

const map = (parser, fn) => input =>
  parser(input).map(result => ({
    ...result,
    value: fn(result.value)
  }))

const chain = (parser, fn) => input =>
  parser(input).map(result => fn(result.value)(result.rest))

const or = (parser, parser2) => input =>
  parser(input).catch(() => parser2(input))

const many = (parser) => input =>
  cycle(
    ({ values, input }) => parser(input)
      .map(({ value, rest }) => new Next({
        values: [...values, value],
        input: rest
      })),
    result => result
  )(new Next({
    values: [],
    input
  }))

const optional = (parser, defaultValue = null) => input =>
  parser(input).catch(() => ({
    value: defaultValue,
    rest: input
  }))

const sepBy = (parser, separator) =>
  chain(
    parser,
    first =>
      optional(
        map(
          many(chain(separator, () => this)),
          rest => [first, ...rest]
        ),
        [first]
      )
  )

const between = (parser, left, right) =>
  chain(left, () => chain(parser, value =>
    map(right, () => value)
  ))


const choice = (...parsers) =>
  parsers.reduce(
    (acc, parser) => or(acc, parser),
    () => new Err("No alternatives provided")
  )


class Parser {

  // static succeed(value) {
  //   return new Parser(input => ({
  //     success: true,
  //     value,
  //     rest: input
  //   }))
  // }

  // static fail(message) {
  //   return new Parser(() => ({
  //     success: false,
  //     error: message
  //   }));
  // }

  // Combinators

  // Position tracking
  get withPosition() {
    return new Parser(input => {
      const result = this.parse(input);
      if (!result.success) return result;
      return {
        ...result,
        value: {
          value: result.value,
          start: input.length - result.rest.length,
          end: input.length
        }
      };
    });
  }
}

/*******************************
 * 2. HELPER PARSERS           *
 *******************************/

const whitespace = optional(
  Token(/\s+/)
);

const token = parser => chain(parser, value =>
  map(whitespace, () => value)
);

/*******************************
 * 3. MATH EXPRESSION PARSER   *
 *******************************/

const number = token(map(Token(/\d+/), Number));
const addOp = token(map(Token('+'), () => (a, b) => a + b));
const subOp = token(map(Token('-'), () => (a, b) => a - b));
const mulOp = token(map(Token('*'), () => (a, b) => a * b));
const divOp = token(map(Token('/'), () => (a, b) => a / b));
const powOp = token(map(Token('^'), () => (a, b) => Math.pow(a, b)));
const lparen = token(Token('('));
const rparen = token(Token(')'));

const expr = initType(() => choice(
  additiveExpr,
  multiplicativeExpr,
  powerExpr,
  primaryExpr
));

const primaryExpr = choice(
  number,
  between(expr, lparen, rparen)
);

const powerExpr = chain(primaryExpr, left =>
  optional(chain(powOp, op =>
    map(expr, right => op(left, right))
  ), left)
);

const multiplicativeExpr = chain(powerExpr, left =>
  optional(chain(choice(mulOp, divOp), op =>
    map(powerExpr, right => op(left, right))
  ), left)
);

const additiveExpr = chain(multiplicativeExpr, left =>
  optional(chain(choice(addOp, subOp), op =>
    map(multiplicativeExpr, right => op(left, right))
  ), left)
);

const mathParser = chain(expr, result =>
  map(Token(/^$/), () => result)
);

/*******************************
 * 4. USAGE EXAMPLES           *
 *******************************/

function evaluateMath(input) {
  const result = mathParser(input);
  return result.else((result) => {
    throw new Error(`Parse error: ${result.error}`)
  }).lift().value
}

// Test cases
console.log("2 + 3 * 4 =", evaluateMath("2 + 3 * 4"));  // 14
console.log("(2 + 3) * 4 =", evaluateMath("(2 + 3) * 4"));  // 20
console.log("2 ^ 3 * 4 =", evaluateMath("2 ^ 3 * 4"));  // 32
console.log("10 / 2 - 3 =", evaluateMath("10 / 2 - 3"));  // 2
console.log("2 * (3 + 4) =", evaluateMath("2 * (3 + 4)"));  // 14
