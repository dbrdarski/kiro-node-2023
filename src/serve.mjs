import { h, frag, printHTML } from "./jsx.mjs"
import connect from "connect"
import serveStatic from "serve-static"
import http from "http"
import Router from 'url-router'
import HtmlPage from "./components/HtmlPage.mjs"
import Album from "./pages/Album.mjs"
import PhotoGallery from "./pages/PhotoGallery.mjs"
import Filmography from "./pages/Filmography.mjs"
import sharp from "sharp"
// import PhotoAlbum from "./components/Album3.mjs"

import { imageSizes, paintings, watercolours, drawings, sculptures, planetarium, ballet, people, omoValley, chinaFilmFestival, press } from "./data.mjs"

import Biography from "./pages/Biography.mjs"
import Artwork from "./pages/Artwork.mjs"
// import Artwork2 from "./pages/Artwork2.mjs"

globalThis.h = h
globalThis.frag = frag

async function processImages(albums) {
  for await (const album of Object.values(albums)) {
    album.thumbs = {}
    for await (const image of album.images) {
      const file = sharp(`public/media/images/${album.path}/${image.filename}`)
      const { height, width } = await file.metadata()
      image.height = height
      image.width = width
    }
  }
}

const Homepage = printHTML(
  <HtmlPage>
    <div someAttr="1">
      <p>
        Hello darkness 2.
      </p>
    </div>
  </HtmlPage>
)

const renderPage = (Page) => {
  const output = printHTML(Page(HtmlPage))
  return () => output
}

export default async (albums) => {
  await processImages(albums, imageSizes)

  const app = connect()

  const router = new Router({
    '/': () => Homepage,
    '/foo': () => "1",
    '/biography': renderPage(Biography),
    // '/projects': renderPage(Artwork2(albums)),
    '/artwork': renderPage(Artwork(albums)),
    '/artwork/paintings': renderPage(Album(paintings)),
    '/artwork/drawings': renderPage(Album(drawings)),
    '/artwork/watercolours': renderPage(Album(watercolours)),
    '/artwork/sculptures': renderPage(Album(sculptures)),
    '/artwork/films': renderPage(Filmography),
    '/photo-gallery': renderPage(PhotoGallery),
    '/photo-gallery/planetarium': renderPage(Album(planetarium, { mode: "photo", background: "white" })),
    '/photo-gallery/planetarium-dance': renderPage(Album(ballet, { mode: "photo", background: "white" })),
    '/photo-gallery/with-people': renderPage(Album(people, { mode: "photo", background: "white" })),
    '/photo-gallery/tribes-of-omo-valley': renderPage(Album(omoValley, { mode: "photo", background: "white" })),
    '/photo-gallery/china-film-festival': renderPage(Album(chinaFilmFestival, { mode: "photo", background: "white" })),
    '/photo-gallery/press-coverage': renderPage(Album(press, { background: "#ccccc3" })),
    '/user/:id': params => `User id: ${params.id}`,
    '/user/:id/:page': () => "4",
    '/people/:name': params => `Hello, ${params.name}`,

    // '/gallery/:album/:size/:filename(.*)': $ => albums[$.album].thumbs[$.filename][$.size],
    '(.*)': () => (
      printHTML(
        <HtmlPage>
          <div style="height: 100vh; line-height: 100vh;text-align: center; font-size: 5vmax; font-family: 'Merriweather'; background: #cccccb; color: #555554">
            Not found.
          </div>
        </HtmlPage>
      )
    ),
  })

  app.use(serveStatic("public"))
  app.use("/favicon", (req, res, next) => {
    res.end("ok")
  })
  app.use("/", (req, res, next) => {
    const r = router.find(req.originalUrl)
    console.log(r)
    res.end(r.handler(r.params))
  })

  http.createServer(app).listen(3000);

  // const [styles, {
  //   App,
  //   Container,
  //   Body
  // }] = $

  // styles[App] = `
  // font-size: 12px;
  // font-family: Verdana;
  // `

  // styles[Container] = ``
  // styles[$`${Container} > ${Body}:first-child`] = ``
}
