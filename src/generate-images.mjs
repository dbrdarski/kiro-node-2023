import sharp from "sharp"
import fs from "fs"
import { glob } from "glob"
import path, { parse, dirname } from "path"
import { doubleHashFile } from "./framework/helpers.mjs"

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

export const createImageMap = (list) => {
  const hashes = {}
  const paths = {}
  for (const image of list) {
    hashes[image.hash] = paths[image.path] = image
  }
  return { hashes, paths, list }
}

export const checkMediaFiles = async (pattern) => {
  const files = await glob(pattern)
  const list = []
  for (const path of files) {
    const hash = await doubleHashFile(path)
      list.push({ hash, path })
  }
  return list
}

export const checkGeneratedFiles = async pattern => {
  const files = await glob(pattern)
  return Object.fromEntries(files.map(path => [path, { path }]))
}

export const generatedImagePaths = (path, sizes) => {
  console.log({ sizes })
  const { dir: dirname, base: filename } = parse(path)
  return sizes.map(size => `${dirname}/${size}/${filename}`)
}

export const generateImagePath = path => {
  const { dir: dirname, base: filename } = parse(path)
  return size => [
    `${dirname}/${size}`,
    filename
  ]
}

export const createDirectory = dirname => {
  fs.existsSync(dirname) || fs.mkdirSync(dirname, { recursive: true })
}

const removeEmptyDirectory = (dirname) => {
  fs.readdirSync(dirname).length || fs.rmdirSync(dirname)
}

export const moveFile = (from, to) => {
  const oldDirname = path.dirname(from)
  const newDirname = path.dirname(to)
  createDirectory(newDirname)
  fs.renameSync(from, to)
  console.log(`Moved image: ${from} => ${to}`)
  removeEmptyDirectory(oldDirname)
}

export const removeFile = path => {
  fs.unlinkSync(path)
  console.log(`Removed image: ${path}`)
  removeEmptyDirectory(dirname(path))
}

export const generateActions = (inputDir, outputDir, sizes) => ({
  create (image) {
    return image.generated = generateImage(inputDir, outputDir, sizes, image.path)
  },
  move (oldImages, image) {
    this.remove(oldImages)
    this.create(image)
  },
  remove (oldImages) {
    if (!oldImages) return
    for (const image of oldImages) {
      removeFile(image)
    }
  }
})

export const generateImage = (matchInput, replaceWith, sizes, inputPath) => {
  const resizedImagePath = generateImagePath(inputPath.replace(matchInput, replaceWith))
  return Object.entries(sizes).map(([size, options]) => {
    const [pathname, filename] = resizedImagePath(size)
    createDirectory(pathname)
    const targetPath = `${pathname}/${filename}`
    sharp(inputPath).resize(options).toFile(targetPath)
    console.log(`Generated image: ${targetPath}`)
    return targetPath
  })
}

export default (albums, sizes) => {
  async function generateImages(albums, sizes) {
    for await (const album of Object.values(albums)) {
      for await (const image of album.images) {
        console.log(`Processing: ${image.filename}`)
        const file = sharp(`public/media/images/${album.path}/${image.filename}`)
        const allSizes = image.sizes ? mergeObjects(sizes, image.sizes) : sizes
        for (const [size, options] of Object.entries(allSizes)) {
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
