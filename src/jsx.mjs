export const h = (tag, props, ...children) => ({
  tag,
  props: props || {},
  children
})

export const frag = ({ props, children }) => ({
  tag: null,
  props,
  children
})

const printAttrs = props => props
  ? Object.entries(props)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join("")
  : ""

const printJSX = ({ tag, props, children }) => {
  switch (typeof tag) {
    case "string":
      return `<${tag}${printAttrs(props)}>${children.map(print).join("")}</${tag}>`
    case "function":
      console.log("NodeTree", tag({ props, children })?.children)
      return print(tag({ props, children }))
    case "object":
      if (tag == null) {
        return print(children)
      }
    default: console.log({ tag, props, children })
  }
}

export const print = vdom => {
  if (Array.isArray(vdom))
    return vdom.map(print).join("")
  switch (vdom) {
    case true:
    case false:
    case null:
    case undefined:
      return ""
  }
  return typeof vdom === "string" ? vdom : printJSX(vdom)
}

export const printHTML = vdom => `<!DOCTYPE html>${print(vdom)}`

// const createVariant = (namespace, key, index, value) => [index, key, Symbol(`${namespace}.${key}`)]

// Status = Enum($ => $(
//   "Status",
//   $("Ok"),
//   $("Error", String)
// ))

// Variety = Enum($ => $(
//   "Variety",
//   $("Calzone"),
//   $("Pizza")
// ))

// Salad = Enum($ => $(
//   "Salad",
//   $("Greek"),
//   $("Macedonian")
// ))

// Topping = Enum($ => $(
//   "Topping",
//   $("Pepperonni"),
//   $("Mozzarella"),
//   $("Basil")
// ))

// MenuItem = Enum($ => $(
//   "MenuItem",
//   $("Pizza", Variety, Topping),
//   $("Salad", $("Greek"), $("Macedonian")),
//   $("Drinks", $("Beer"), $("Wine"), $("Spirits"))
// ))

// Order = Enum($ => $(
//   "Order", MenuItem, Number
// ))

// Variant = (namespace, ...variants) => {
//   const $ = (item, value, ...args) => {

//   }

//   const list = enums.map(createVariant.bind(null, namespace))

// }

// const createEnum = (namespace, key, index) => [index, key, Symbol(`${namespace}.${key}`)]
// const Enum = (namespace, ...enums) => {
//   const $ = (item, toType = Enum) => {
//     const type = ToTypes.indexOf(toType)
//     if (type < 0) {
//       throw Error("Invalid cast type! Must be one of Number, String, Enum")
//     }
//     switch (typeof item) {
//       case "number":
//         return list[item][type]
//       case "string":
//       case "symbol":
//         return map.get(item)[type]
//       default:
//         throw Error(`Invalid enum value: ${item}`)
//     }
//   }

//   const list = enums.map(createEnum.bind(null, namespace))
//   const map = new Map()

//   for (const item of list) {
//     const [index, key, value] = item
//     map.set(key, item)
//     map.set(value, item)
//     $[key] = value
//   }

//   return Object.freeze($)
// }
// const ToTypes = [Number, String, Enum]
