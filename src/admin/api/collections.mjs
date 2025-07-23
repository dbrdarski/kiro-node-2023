import { action } from "../api-create.mjs"
import { albums } from "../albums.mjs"
// import * as collections from "../../collections.mjs"

export const getCollection = action(albums.get)
export const getCollections = action(albums.all)
export const createCollection = action(albums.create)
export const renameCollection = action(albums.rename)
export const deleteCollection = action(albums.delete)
export const addCollectionItems = action(albums.addItems)
export const removeCollectionItems = action(albums.removeItems)
export const updateCollectionItems = action(albums.updateItems)
export const updateCollectionMetadata = action(albums.updateMetadata)
export const initCollections = action(albums.init)
