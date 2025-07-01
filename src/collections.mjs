import { once } from "./framework/utils.mjs"
import { ERR, WARN, validate, Collection, addValidator } from "./framework/validators.mjs"
import { getMediaData } from "./media.mjs"
// const collectionTypes = {
//   images: {},
//   videos: {},
// }

const initCollectionSettings = once(async () => {
  const { useSettings } = await import("./framework/helpers.mjs")
  return useSettings("resources/data/collections.json")
})

const loadCollection = async () => (await initCollectionSettings()).read()
const saveCollection = async (list) => (await initCollectionSettings()).write([...list])

export const initCollections = async () => {
  const data = await loadCollection()
  for (const item of data) {
    list.add(item)
    keys[item.name] = item
  }
}

const list = new Set()
const keys = Object.create(null)

export const getCollections = () => [...list]
export const getCollection = (name) => keys[name]

export const createCollection = (name, metadata = {}, items = []) => {
  console.log("!!!!!!!!", { name, metadata, items })
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

export const renameCollection  = (oldName, newName) => {
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

export const deleteCollection = (name) => {
  if (!(name in keys)) {
    throw Error(`Invalid collection ${name}`)
  }
  const item = keys[name]
  list.delete(item)
  delete keys[name]
  saveCollection(list)
}

export const updateCollectionMetadata = (name, metadata) => {
  if (!(name in keys)) {
    throw Error(`Invalid collection ${name}`)
  }
  const collection = keys[name]
  collection.metadata = metadata
  saveCollection(list)
}

export const updateCollectionItems = (name, items) => {
  if (!(name in keys)) {
    throw Error(`Invalid collection ${name}`)
  }
  const collection = keys[name]
  collection.items = items
  saveCollection(list)
}

export const addCollectionItems = (name, items) => {
  console.log("addCollectionItems", { name, items })
  if (!(name in keys)) {
    throw Error(`Invalid collection ${name}`)
  }
  const collection = keys[name]
  collection.items = [...new Set([...collection.items, ...items])]
  saveCollection(list)
}

export const removeCollectionItems = (name, items) => {
  if (!(name in keys)) {
    throw Error(`Invalid collection ${name}`)
  }
  const deleted = new Set(items)
  const collection = keys[name]
  collection.items = collection.items.filter(item => deleted.has(item))
  saveCollection(list)
}

class ImageLink {
  hash = String
  path = String
}

class AlbumMeta {
  title = String
  description = String
}

class Album {
  name = String
  metadata = AlbumMeta
  items = Collection(ImageLink)
}

addValidator(ImageLink, (logger, img) => {

  const media = getMediaData()
  console.log({ media })
  const hashMatch = img.hash in media.hashes
  const pathMatch = img.path in media.paths
  if (hashMatch === pathMatch) {
    return hashMatch || logger(ERR, "Missing file", img, 1)
  }
  return logger(WARN, "File updated", img, 1)
})


export const validateCollection = validate(Album)
