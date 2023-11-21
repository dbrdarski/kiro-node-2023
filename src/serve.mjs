import { h, frag, printHTML } from "./jsx.mjs"
import connect from "connect"
import serveStatic from "serve-static"
import http from "http"
import Router from 'url-router'
import HtmlPage from "./components/HtmlPage.mjs"
import Album from "./pages/Album.mjs"
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


const PhotoThumb = ({ props, props: { ratio = 1, align } }) => (
  <a href={props.href} style={`text-decoration: none; color: black; grid-row: span ${ratio === 1 ? "2" : ratio > 1 ? "3": "1"}`}>
    <div
      style={`position: relative; width: calc((100vw - 340px) / 3); height: calc((100vw - 340px) / 3.3 * ${ratio}); background: url(/media/cached/${props.image}); background-size:cover;${align ? `background-position: ${align};` : ""}`}
    >
      <div style="
        position: absolute; bottom: 0; background: #eb0e; padding: calc(1vw); color: #222; font-family: Merriweather; font-size: calc(4px + 1.2vw); font-weight: 700; padding-right: 5vw; max-width: 100%;"
      >
        {props.title}
      </div>
    </div>
  </a>
)
{ /* 'position: absolute; bottom: 0; background: #eb0; padding: calc(2px + .6vw); color: #222; font-family: Merriweather; font-size: calc(-1px + 1.8vw); font-weight: 700' */ }
const PhotoGallery = HtmlPage => (
  <HtmlPage>
    <div
      style="display: grid; flex-wrap: wrap; grid-gap: 20px; padding: 20px; grid-template-columns: auto auto auto; grid-auto-rows: auto;"
    >
      <PhotoThumb
        image="/planetarium/md/Kiro_Urdin-Planetarium-London.jpg"
        href="/photo-gallery/planetarium"
        title="Planetarium"
        ratio={6/5}
      />
      <PhotoThumb
        image="/people/md/Kiro_Urdin_with_Brothers_Kocho_and_Vasil.jpg"
        href="/photo-gallery/with-people"
        title="With People"
        ratio={4/5}
        align="center"
      />
      <PhotoThumb
        image="/planetarium-dance/md/UN-60th-Anniversary-Planetarium-Dance-Kiro-Urdin-and-Debbie-Wilson-4.jpg"
        href="/photo-gallery/planetarium-dance"
        title="Planetarium Dance"
      />
      <PhotoThumb
        image="/omo-valley/md/Tribes-of-Omo-Valley-Cover.jpg"
        href="/photo-gallery/tribes-of-omo-valley"
        title="Tribes of Omo Valley"
        ratio={6/5}
        align="33%"
      />
      <PhotoThumb
        image="/press-coverage/md/Kiro-Urdin-Le-Dessin-750x1024.jpg"
        href="/photo-gallery/press-coverage"
        title="Press Coverage"
      />
      <PhotoThumb
        image="/china-film-festival/md/China-Nature-Film-Festival-25.jpg"
        href="/photo-gallery/china-film-festival"
        title="China Film Festival"
        ratio={4/5}
      />
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
