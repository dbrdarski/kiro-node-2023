import { isClass } from "./utils.mjs"

export const ERR = "ERR"
export const WARN = "WARN"

const validators = new Map
export const addValidator = (validatorClass, validatorFn = validatorClass) => {
  validators.set(validatorClass, validatorFn)
  return validatorFn
}

const withGlobalValidator = validator => validators.get(validator) ?? validator

export const countIssues = (acc, log) => acc + (log.count ?? 0)

const createLogger = () => {
  let count
  const log = {
    [ERR]: [],
    [WARN]: [],
    get count () {
      if (count == null) {
        count = {
          [ERR]: log[ERR].reduce(countIssues, 0),
          [WARN]: log[WARN].reduce(countIssues, 0)
        }
      }
      return count
    }
  }
  Object.seal(log)

  return [log, (code, message, data, count) => {
    log[code].push({ code, message, data, count }) }
  ]
}

export const Optional = Validator => (logger, x) => x == null || Validator(logger, x)
export const Collection = Validator => (logger, xs) => {
  const [log, childLogger] = createLogger()
  const validator = withGlobalValidator(Validator)
  xs.forEach(validator.bind(null, childLogger))
  log[ERR].length && logger(ERR, "Errors in collection", log[ERR], log.count[ERR])
  log[WARN].length && logger(WARN, "Warnings in collection", log[WARN], log.count[WARN])
}

addValidator(String, (logger, x) => typeof x === "string" || logger(ERR, "Expecting a string", x, 1))
addValidator(Boolean, (logger, x) => typeof x === "boolean" || logger(ERR, "Expecting a boolean", x, 1))
addValidator(Number, (logger, x) => typeof x === "number" || logger(ERR, "Expecting a number", x, 1))
// addValidator(BigInt, (logger, x) => typeof x === "bigint" || logger(ERR, "Expecting a bigint", x, 1))
// addValidator(Symbol, (logger, x) => typeof x === "symbol" || logger(ERR, "Expecting a symbol", x, 1))
addValidator(Object, (logger, x) => x && typeof x === "object" || logger(ERR, "Expecting an object", x, 1))
addValidator(Array, (logger, x) => Array.isArray(x) || logger(ERR, "Expecting an array", x, 1))

const validator = Schema => {
  const schema = new Schema
  const schemaKeys = Object.keys(schema)
  return (logger, data) => {
    const keys = Object.keys(data)
    for (const key of keys) {
      key in schema || logger(WARN, `Unknown key: ${key}`, data)
    }
      for (const key of schemaKeys) {
      const [log, childLogger] = createLogger()
      const propValidator = withGlobalValidator(schema[key])
      const prop = data[key]
        console.log("VALIDATOR", { key, prop, propValidator, $: schema[key], type: typeof propValidator })
      isClass(propValidator)
        ? validator(propValidator)(childLogger, prop)
        : propValidator(childLogger, prop)
        log[ERR].length && logger(ERR, `Errors in schema property: ${key}`, log[ERR], log.count[ERR])
        log[WARN].length && logger(WARN, `Warnings in schema property: ${key}`, log[WARN], log.count[WARN])
    }
  }
}

export const validate = schema => data => {
  const [log, logger] = createLogger()
  validator(schema)(logger, data)
  return log
}

// class Entity {

// }

// class Collection {

// }

// class Casino {
//   name = String
//   description = String
// }

// class ParentHolding {
//   hotels = Collection(Casino)
// }
