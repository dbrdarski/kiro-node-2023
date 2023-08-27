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
