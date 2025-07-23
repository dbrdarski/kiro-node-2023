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

export const idGenerator = () => {
    const existingIds = new Set
    return () => {
        const id = Math.random().toString(36).substring(2, 15)
        if (existingIds.has(id)) {
            return idGenerator()
        }
        existingIds.add(id)
        return id
    }
}
