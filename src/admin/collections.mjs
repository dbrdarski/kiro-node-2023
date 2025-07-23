import { once } from "../framework/utils.mjs"

export const collection = (path) => {
  const initCollectionSettings = once(async () => {
    const { useSettings } = await import("../framework/helpers.mjs")
    return useSettings(path, [])
  })

  const loadCollection = async () => (await initCollectionSettings()).read()
  const saveCollection = async (list) => (await initCollectionSettings()).write([...list])

  const initCollections = async () => {
    const data = await loadCollection()
    for (const item of data) {
      list.add(item)
      keys[item.name] = item
    }
  }

  const list = new Set()
  const keys = Object.create(null)

  const getCollections = () => [...list]
  const getCollection = (name) => keys[name]

  const createCollection = (name, metadata = {}, items = []) => {
    if (name in keys) {
      throw Error(`Collection '${name}' already exists!`)
    }

    const item = {
      name,
      metadata,
      items
    }

    list.add(item)
    keys[name] = item
    saveCollection(list)
  }

  const renameCollection  = (oldName, newName) => {
    if (!(oldName in keys)) {
      throw Error(`Invalid collection ${oldName}`)
    }
    if (newName in keys) {
      throw Error(`Collection '${newName}' already exists!`)
    }
    const item = keys[newName] = keys[oldName]
    item.name = newName
    delete keys[oldName]
    saveCollection(list)
  }

  const deleteCollection = (name) => {
    if (!(name in keys)) {
      throw Error(`Invalid collection ${name}`)
    }
    const item = keys[name]
    list.delete(item)
    delete keys[name]
    saveCollection(list)
  }

  const updateCollectionMetadata = (name, metadata) => {
    if (!(name in keys)) {
      throw Error(`Invalid collection ${name}`)
    }
    const collection = keys[name]
    collection.metadata = metadata
    saveCollection(list)
  }

  const updateCollectionItems = (name, items) => {
    if (!(name in keys)) {
      throw Error(`Invalid collection ${name}`)
    }
    const collection = keys[name]
    collection.items = items
    saveCollection(list)
  }

  const addCollectionItems = (name, items) => {
    console.log("addCollectionItems", { name, items })
    if (!(name in keys)) {
      throw Error(`Invalid collection ${name}`)
    }
    const collection = keys[name]
    collection.items = [...new Set([...collection.items, ...items])]
    saveCollection(list)
  }

  const removeCollectionItems = (name, items) => {
    if (!(name in keys)) {
      throw Error(`Invalid collection ${name}`)
    }
    const deleted = new Set(items)
    const collection = keys[name]
    collection.items = collection.items.filter(item => deleted.has(item))
    saveCollection(list)
  }

  return {
    init: initCollections,
    all: getCollections,
    get: getCollection,
    create: createCollection,
    rename: renameCollection,
    delete: deleteCollection,
    updateMetadata: updateCollectionMetadata,
    updateItems: updateCollectionItems,
    addItems: addCollectionItems,
    removeItems: removeCollectionItems,
  }
}
