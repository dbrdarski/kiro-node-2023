import { collection } from "./collections.mjs";
import { ERR, WARN, validate, Collection, addValidator } from "../framework/validators.mjs"
import { getMediaData } from "../media.mjs"

export const albums = collection("resources/data/albums.json")

class ImageLink {
  static primaryKey = "hash"
  hash = String
  path = String
}

class AlbumMeta {
  title = String
  description = String
}

class Album {
  static primaryKey = "name"
  name = String
  metadata = AlbumMeta
  items = Collection(ImageLink)
}

class AlbumCollection {
  static primaryKey = "type"
  type = String
  albums = Collection(Album)
}

addValidator(ImageLink, (logger, data) => {
  const media = getMediaData()
  const hashMatch = data.hash in media.hashes
  const pathMatch = data.path in media.paths
  const primaryKey = data.hash
  if (hashMatch === pathMatch) {
    return hashMatch || logger(ERR, "Missing file", { primaryKey, data }, 1)
  }
  return logger(WARN, "File updated", { primaryKey, data: { target: data, current: media.hashes[data.hash] ?? media.paths[data.path],  } }, 1)
})


export const validateAlbum = validate(Album)
export const validateAlbums = (albums) => validate(AlbumCollection)({ type: "album", albums })
