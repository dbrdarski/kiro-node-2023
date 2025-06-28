const contextHandler = (initiator, ctx) => [
  fn => {
    return initiator((...args) => ctx(fn, ...args))
  },
  setHandler => {
    if (ctx) {
      throw Error ("Handler is already defined!")
    }
    ctx = setHandler
  }
]

const apiEndpoints = []

const counter = (i = 0) => fn => {
  const x = i++;
  apiEndpoints[x] = fn
  return (...args) => fn(x, ...args)
}

export const runApiAtIndex = (i, args) => apiEndpoints[i](...args)

export const createCtxHandler = initiator => contextHandler(initiator)

export const [action, setActionsHandler] = createCtxHandler(counter())
