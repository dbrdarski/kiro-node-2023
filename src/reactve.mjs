const reactiveSymbol = Symbol.for("next::is-reactive-handler-property-symbol")

class ReactiveContainer {
  [reactiveSymbol] = true

  constructor (getter) {
    this.get = getter
    Object.freeze(this)
  }
}

const observable = (observers = new Set) => ({
  subscribe: (fn) => observers.add(fn),
  notify: () => {
    const current = Array.from(observers)
    observers.clear()
    for (const observer of current) { observer() }
  }
})

const state = (state) => {
  const { subscribe, notify } = observable()
  return [
    new ReactiveContainer(caller => (caller && subscribe(caller), state)),
    value => value !== state && (state = value, notify())
  ]
}

const bindDependencies = (deps, cleanup) =>
  deps.map(dep => dep[reactiveSymbol] ? dep.get.bind(null, cleanup) : () => dep)

const computed = (fn, deps) => {
  const { subscribe, notify } = observable()
  let cache, cached = false
  deps = bindDependencies(deps, () => (cached = false, notify()))

  return new ReactiveContainer(function computed (caller) {
    caller && subscribe(caller)
    if (!cached) {
      cache = fn(...deps)
      cached = true
    }
    return cache
  })
}

const effect = (fn, deps) => {
  const effect = schedule.bind(null, () => fn(...deps))
  deps = bindDependencies(deps, effect)
  effect()
}

const log = (x) => (console.log(x), x)

const effect2 = (fn, deps) => {
  const effect = () => fn(...deps)
  deps = bindDependencies(deps, schedule.bind(null, effect))
  effect()
}

const queue = []

const schedule = (effect) => {
  queue.length || queueMicrotask(executeQueue)
  queue.push(effect)
}

const executeQueue = () => {
  for (const effect of queue) { effect() }
  queue.length = 0
}

const x = (fn, deps) => (parent) => {
  let cache
  effect2(
    (fn) => {
      cache = render(fn())(parent, cache)
      // cache = render(consumeNode(fn, notify => cache && notify())())(parent, cache)
    },
    [computed(fn, deps)]
  )
}

const f = (...children) => (parent, oldNodeCleanup) => {
  const node = new DocumentFragment
  node.appendChild(document.createComment("<"))
  for (child of children) {
    render(child)(node)
  }
  node.appendChild(document.createComment(">"))
  oldNodeCleanup ? oldNodeCleanup(parent, node) : parent.appendChild(node)

  return (parent, newElement) => {
    parent.replaceChild(newElement, node)
  }
}

const e = (tag, attrs, ...children) => (parent, oldNodeCleanup) => {
  const node = document.createElement(tag)
  attrs?.[reactiveSymbol]
    ? effect2((attrs) => attrs = patchAttributes(node, attrs()), [attrs])
    : patchAttributes(node, attrs)

  for (const child of children) {
    render(child)(node)
  }
  oldNodeCleanup ? oldNodeCleanup(parent, node) : parent.appendChild(node)

  return (parent, newElement) => {
    parent.replaceChild(newElement, node)
  }
}

const c = (component, props, ...children) => (parent, oldNodeCleanup) => {
  console.log("INIT COMPONENT!!!!!!!!!")
  const initializers = []
  const laundry = []
  const onMount = initializers.push.bind(initializers)
  const onCleanup = laundry.push.bind(laundry)
  let initialized = false

  const expressionOrVdom = component.call({ onMount, onCleanup }, { props, children })
  const node = render(expressionOrVdom)(parent, oldNodeCleanup)

  for (const initializer of initializers) {
    initializer()
  }
  initialized = true

  return (parent, newElement) => {
    for (const cleanup of laundry) {
      cleanup()
    }
    node(parent, newElement)
  }
}

const render = vdom => {
  switch (vdom) {
    case true:
    case false:
    case null:
    case undefined:
      return createNullElement()
  }

  switch (typeof vdom) {
    case "string":
    case "number":
      return createTextElement(vdom)
    case "function":
      return vdom
  }
}

const createNullElement = () => (parent, oldNodeCleanup) => {
  const node = document.createComment("|")
  oldNodeCleanup ? oldNodeCleanup(parent, node) : parent.appendChild(node)

  return (parent, newElement) => {
    parent.replaceChild(newElement, node)
  }
}

const createTextElement = (text) => (parent, oldNodeCleanup) => {
  const node = document.createTextNode(text)
  oldNodeCleanup ? oldNodeCleanup(parent, node) : parent.appendChild(node)

  return (parent, newElement) => {
    parent.replaceChild(newElement, node)
  }
}


const patchAttributes = (el, newAttrs, oldAttrs = {}) => {
  for (const key in oldAttrs) {
    if (!(key in newAttrs)) {
      removeAttribute(el, key)
    }
  }

  for (const key in newAttrs) {
    const oldValue = oldAttrs[key]
    const newValue = newAttrs[key]

    if (oldValue !== newValue) {
      newValue?.[reactiveSymbol]
        ? effect2((newValue) => setAttribute(el, key, newValue(), oldValue), [newValue])
        : setAttribute(el, key, newValue, oldValue)
    }
  }
}

const setAttribute = (element, key, value, oldValue) => {
  switch (key) {
    case "style":
      return typeof value === "string"
        ? element.style = value
        : patchStyle(element, oldValue, value)
    case "value":
      return element.value = value ?? ""
    case "checked":
      return element.checked = !!value
    case "selected":
      return element.selected = !!value
    default:
      if (value == null || value === false) {
        element.removeAttribute(key)
      } else if (key.startsWith("on")) {
        element[key] = value
      } else if (value == true) {
        element.setAttribute(key, "")
      } else {
        element.setAttribute(key, value)
      }
  }
}

const removeAttribute = (element, key) => {
  switch (key) {
    case 'value':
      return element.value = null
    case 'checked':
    case 'selected':
      return element[key] = false
    default:
      return key.startsWith('on')
        ? element[key] = null
        : element.removeAttribute(key)
  }
}

patchStyle = (element, oldStyle = {}, newStyle = {}) => {
  for (const prop in oldStyle) {
    if (!(prop in newStyle)) {
      element.style[prop] = null;
    }
  }
  for (const prop in newStyle) {
    if (oldStyle[prop] !== newStyle[prop]) {
      element.style[prop] = newStyle[prop];
    }
  }
}

const mount = (root, jsx) => {
  render(jsx)(root)
}

const [num, setNum] = state(3)
const [visible, show] = state(false)
const [color, setColor] = state({ color: "red" })
const [style, setStyle] = state({ style: { color: "red" } })
const numIncremented = computed(x => x() + 1, [num])
const strong = function ({ props, children }) {
  this.onCleanup(() => console.log("COMPONENT DIEEEEES!!!!!!!!"))
  return e("strong", {}, ...children)
}

const jsx = f(
  1, 2, 3, e(
    "div", { style: { background: "yellow" } }, x(
      (visible, numIncremented) => visible() ? e(
        "label", style, c(
          strong, {}, `SEXY NUMBER IS: ${numIncremented()}`
        )
      ) : null, [visible, numIncremented]
    )
  )
)

effect(x => console.log("EFFECT ", x()), [numIncremented])
effect(v => console.log("EFFECT ", v()), [visible])
mount(document.body, jsx)


// const h = (tag, attrs, ...children) => ({ tag, attrs, children })
// const frag = (...children) => children


// const createHtmlElement = (tag, attrs, children) => (parent, oldNodeCleanup) => {
//   const node = document.createElement(tag)
//   createAttrs(node, attrs)
//   for (const child of children) {
//     render(child)(node)
//   }
//   oldNodeCleanup ? oldNodeCleanup(parent, node) : parent.appendChild(node)

//   return (parent, newElement) => {
//     parent.replaceChild(newElement, node)
//   }
// }

// const createComponent = () => {}

// const render = vdom => {
//   // if (Array.isArray(vdom))
//   //   return vdom.map(print).join("")
//   switch (vdom) {
//     case true:
//     case false:
//     case null:
//     case undefined:
//       return createNullElement()
//   }

//   switch (typeof vdom) {
//     case "string":
//     case "number":
//       return createTextElement(vdom)
//   }

//   const { tag, attrs, children } = vdom
//   switch (typeof tag) {
//     case "string": return createHtmlElement(tag, attrs, children)
//     case "function": return createComponent(tag, attrs, children)
//   }
// }

// const effect = (fn, deps) => {
//   let cleanup

//   const effect = () => {
//     cleanup?.()
//     cleanup = fn(...deps)
//   }

//   deps = bindDependencies(deps, schedule.bind(null, effect))
//   schedule(effect)
// }

// NEXT -> JSX -> vdom or $elements


// <For data={data}>
//   <@Where { item, key, collection }>
//     <Item title={item.title} />
//   </@Where>
// </For>
