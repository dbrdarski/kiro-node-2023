export default new Proxy({}, {
  get(target, prop) {
    return (props, children) => ({
      type: prop,
      ...props,
      children,
      type: prop
    })
  }
})
