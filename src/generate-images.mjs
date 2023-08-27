import sharp from "sharp"
import fs from "fs"

const isObject = x =>
  typeof x === "object"
  && x != null
  && !Array.isArray(x)

const mergeObjects = ({ ...x }, y) => {
  for (const [key, value] of Object.entries(y)) {
    const targetProp = x[key]
    x[key] = (isObject(value) && isObject(targetProp))
      ? mergeObjects(targetProp, value)
      : value
  }
  return x
}

export default (albums, sizes) => {
  async function generateImages(albums, sizes) {
    for await (const album of Object.values(albums)) {
      for await (const image of album.images) {
        console.log(`Processing: ${image.filename}`)
        const file = sharp(`public/media/images/${album.path}/${image.filename}`)
        const allSizes = image.sizes ? mergeObjects(sizes, image.sizes) : sizes
        for await (const [size, options] of Object.entries(allSizes)) {
          const targetPath = `public/media/cached/${album.path}/${size}`
          fs.existsSync(targetPath) || fs.mkdirSync(targetPath, { recursive: true })
          const filename = `${targetPath}/${image.filename}`
          await file.resize(options).toFile(filename)
        }
      }
    }
  }
  generateImages(albums, sizes)
}
