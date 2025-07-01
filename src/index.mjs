import http from "http"
import serve from "./serve.mjs"
import gallery from "./gallery.mjs"

import vhost from "vhost"
import connect from "connect"

import { initWebSocketConnection } from "./admin/server/index.mjs"
import { useSettings } from "./framework/helpers.mjs"
import generateImages, {
  checkMediaFiles,
  checkGeneratedFiles,
  generatedImagePaths,
  createImageMap,
  generateActions
} from "./generate-images.mjs"
import serveOld from "../scrap/index.mjs"

import { initCollections } from "./admin/api/collections.mjs"

import { port, oldSite, newSite } from "../env.mjs"

import {
  imageSizes,
  paintings,
  watercolours,
  drawings,
  sculptures,
  planetarium,
  ballet,
  people,
  portraits,
  omoValley,
  chinaFilmFestival,
  press,
} from "./data.mjs"

import { getCollections } from "./collections.mjs"
import { setMediaData } from "./media.mjs"

const updateImages = (oldState, currentState, actions) => {
  const snapshot = createImageMap(oldState)
  const updated = createImageMap(currentState)
  for (const image of currentState) {
    const hashesMatch = image.hash in snapshot.hashes
    const pathMatch = image.path in snapshot.paths
    if (!hashesMatch) {
      actions.create(image)
    } else if (!pathMatch) {
      actions.move(snapshot.hashes[image.hash].generated, image)
    }
  }

  for (const image of oldState) {
    image.hash in updated.hashes || image.path in updated.paths || actions.remove(image.generated)
  }

  setMediaData(updated)
  return currentState
}

const app = connect()

const [_, __, ...params] = process.argv

const albums = {
  films: {
    path: "films",
    images: [
      { filename: "Kiro_Urdin_-_Steps.jpg" },
      { filename: "Kiro_Urdin_-_Two_Times.jpg" },
      { filename: "Kiro_Urdin_-_Pishta.jpg" },
      { filename: "Kiro_Urdin_-_Planetarium.jpg" },
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
  "omo-valley": omoValley,
  "planetarium-dance": ballet,
  "china-film-festival": chinaFilmFestival,
  "press-coverage": press,
}

console.log("PARAMS", params)

if (params.length) {
  const [command] = params
  switch (command) {
    case "media": {
      console.log("MEDIA SCRIPT")
      console.log("===============")
      const settings = useSettings("resources/data/media.json", [])
      const persistedState = settings.read()
      const inputDir = "resources/media/images"
      const outputDir = "resources/media/generated"
      const actions = generateActions(inputDir, outputDir, imageSizes)

      const images = await checkMediaFiles(`${inputDir}/*/*`)
        .then(updatedState => updateImages(persistedState, updatedState, actions))
      const generated = await checkGeneratedFiles(`${outputDir}/*/*/*`)
      const sizes = Object.keys(imageSizes)
      for (const image of images) {
        image.generated = []
        for (const path of generatedImagePaths(image.path.replace(inputDir, outputDir), sizes)) {
          if (path in generated) {
            image.generated.push(path)
          }
        }
      }

      settings.write(images)
      await initCollections()
      app.use(await gallery(images, getCollections))
      http.createServer(app).listen(port)
      initWebSocketConnection()
      break
    }
    case "generate:images": {
      console.log("GENERATE SCRIPT")
      console.log("===============")
      generateImages(albums, imageSizes)
      break
    }
  }
} else {
  const kiro2 = await serve(albums)
  app.use(vhost(newSite.host, kiro2))
  app.use(vhost(oldSite.host, serveOld))
  http.createServer(app).listen(port)
}
