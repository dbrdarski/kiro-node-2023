export const once = fn => {
  let cache, resolved = false
  return () => {
    if (!resolved) {
      cache = fn()
      resolved = true
    }
    return cache
  }
}
