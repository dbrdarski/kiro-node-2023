export const isClass = v => typeof v === 'function' && /^\s*class\s+/.test(v.toString())

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
