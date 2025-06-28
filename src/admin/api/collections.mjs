import { action } from "../api-create.mjs"
import * as collections from "../../collections.mjs"

export const getCollection = action(collections.getCollection)
export const getCollections = action(collections.getCollections)
export const createCollection = action(collections.createCollection)
export const renameCollection = action(collections.renameCollection)
export const deleteCollection = action(collections.deleteCollection)
export const addCollectionItems = action(collections.addCollectionItems)
export const removeCollectionItems = action(collections.removeCollectionItems)
export const updateCollectionItems = action(collections.updateCollectionItems)
export const updateCollectionMetadata = action(collections.updateCollectionMetadata)
export const initCollections = action(collections.initCollections)
