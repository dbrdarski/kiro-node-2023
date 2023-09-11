import { h, frag, printHTML } from "./jsx.mjs"
import connect from "connect"
import serveStatic from "serve-static"
import http from "http"
import Router from 'url-router'
import HtmlPage from "./components/HtmlPage.mjs"
import Album from "./pages/Album.mjs"
import sharp from "sharp"
// import PhotoAlbum from "./components/Album3.mjs"

import { imageSizes, paintings, watercolours, drawings, sculptures, ballet, people, omoValley, chinaFilmFestival, press } from "./data.mjs"

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

const PhotoGallery = HtmlPage => (
  <HtmlPage>
    <div><a href="/photo-gallery/with-people">With People</a></div>
    <div><a href="/photo-gallery/planetarium-dance">Planetarium Dance</a></div>
    <div><a href="/photo-gallery/tribes-of-omo-valley">Tribes of Omo Valley</a></div>
    <div><a href="/photo-gallery/china-film-festival">China Film Festival</a></div>
    <div><a href="/photo-gallery/press-coverage">Press Coverage</a></div>
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
    '/photo-gallery': renderPage(PhotoGallery),
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
      printHTML(<HtmlPage>Not found.</HtmlPage>)
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
