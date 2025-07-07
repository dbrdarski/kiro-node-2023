import { isClass } from "./utils.mjs"

export const ERR = "ERR"
export const WARN = "WARN"

const validators = new Map
export const addValidator = (validatorClass, validatorFn = validatorClass) => {
  validators.set(validatorClass, validatorFn)
  return validatorFn
}

const withGlobalValidator = validatorFn => validators.get(validatorFn) ?? (isClass(validatorFn)
  ? validator(validatorFn) : validatorFn)

export const countIssues = (acc, log) => acc + (log.count ?? 0)

const createLogger = () => {
  let count
  const grouped = {
    [ERR]: {},
    [WARN]: {},
  }
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

  return {
    log,
    grouped,
    logger: (code, message, { primaryKey, key, data, children, nodes }, count) => {
      const type = grouped[code]
      const item = { key, primaryKey, code, message, nodes, children, ...!children && { data }, count }
      type[primaryKey ?? key] = item
      log[code].push(item)
    }
  }
}

export const Optional = Validator => (logger, x) => x == null || Validator(logger, x)
export const Collection = Validator => (logger, xs) => {
  // const { log, logger: childLogger, grouped } = createLogger()
  const validator = withGlobalValidator(Validator)
  xs.forEach(validator.bind(null, logger))
  // log[ERR].length && logger(ERR, "Errors in collection", { data: null, children: log[ERR], nodes: grouped[ERR] }, log.count[ERR])
  // log[WARN].length && logger(WARN, "Warnings in collection", { data: null, children: log[WARN], nodes: grouped[WARN] }, log.count[WARN])
}

addValidator(String, (logger, x) => typeof x === "string" || logger(ERR, "Expecting a string", { data: x }, 1))
addValidator(Boolean, (logger, x) => typeof x === "boolean" || logger(ERR, "Expecting a boolean", { data: x },  1))
addValidator(Number, (logger, x) => typeof x === "number" || logger(ERR, "Expecting a number", { data: x },  1))
// addValidator(BigInt, (logger, x) => typeof x === "bigint" || logger(ERR, "Expecting a bigint", { data: x },  1))
// addValidator(Symbol, (logger, x) => typeof x === "symbol" || logger(ERR, "Expecting a symbol", { data: x },  1))
addValidator(Object, (logger, x) => x && typeof x === "object" || logger(ERR, "Expecting an object", { data: x },  1))
addValidator(Array, (logger, x) => Array.isArray(x) || logger(ERR, "Expecting an array", { data: x },  1))

const validator = Schema => {
  const schema = new Schema
  const schemaKeys = Object.keys(schema)
  return (logger, data) => {
    const keys = Object.keys(data)
    const primaryKey = data[Schema.primaryKey]
    for (const key of keys) {
      key in schema || logger(WARN, `Unknown key: ${key}`, { data }, 1)
    }
    for (const key of schemaKeys) {
      const { log, logger: childLogger, grouped } = createLogger()
      const propValidator = withGlobalValidator(schema[key])
      const prop = data[key]
      propValidator(childLogger, prop)
      log[ERR].length && logger(ERR, `Errors in schema property: ${key}`, { primaryKey, key, data, children: log[ERR], nodes: grouped[ERR] }, log.count[ERR])
      log[WARN].length && logger(WARN, `Warnings in schema property: ${key}`, { primaryKey, key, data, children: log[WARN], nodes: grouped[WARN] }, log.count[WARN])
    }
  }
}

export const validate = Schema => data => {
  const { log, logger, grouped } = createLogger()
  validator(Schema)(logger, data)
  return { log, grouped }
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
