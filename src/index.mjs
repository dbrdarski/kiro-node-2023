import serve from "./serve.mjs"
import generateImages from "./generate-images.mjs"

import { imageSizes, paintings, watercolours, drawings, sculptures, planetarium, ballet, people, portraits, omoValley, chinaFilmFestival, press } from "./data.mjs"

// async function processImages(albums, sizes) {
//   for (const album of Object.values(albums)) {
//     album.thumbs = {}
//     for (const image of album.images) {
//       const file = sharp(`public/media/images/${album.path}/${image.filename}`)
//       const { height, width } = await file.metadata()
//       image.height = height
//       image.width = width
//       setTimeout(async () => {
//         const resized = album.thumbs[image.filename] = {}
//         const allSizes = image.sizes ? mergeObjects(sizes, image.sizes) : sizes
//         for (const [size, options] of Object.entries(allSizes)) {
//           queueMicrotask(async () => {
//             resized[size] = await file.resize(options).toBuffer()
//           })
//         }
//         console.log(image.filename)
//       }, 500)
//     }
//   }
// }
const [_, __, ...params] = process.argv

const albums = {
  films: {
      path: "films",
      images: [
        { filename: "Kiro_Urdin_-_Steps.jpg" },
        { filename: "Kiro_Urdin_-_Two_Times.jpg" },
        { filename: "Kiro_Urdin_-_Pishta.jpg" },
        { filename: "Kiro_Urdin_-_Tabula_Rasa.jpg" },
        { filename: "Kiro_Urdin_-_Water_and_Fire.jpg" },
      ],
  },
  paintings,
  watercolours,
  drawings,
  sculptures,
  people,
  planetarium,
  portraits,
  "omo-vallery": omoValley,
  "planetarium-dance": ballet,
  "china-film-festival": chinaFilmFestival,
  "press-coverage": press
}

console.log("PARAMS", params)

if (params.length) {
  const [command] = params
  switch (command) {
    case "generate:images": {
      console.log("GENERATE SCRIPT")
      console.log("===============")
      generateImages(albums, imageSizes)
      break
    }
  }
} else {
  serve(albums)
}
