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

const FilmFeature = ({ props: { thumb, title, description } }) => (
  <div style="display: flex; flex-direction: column;">
    <img src={`/media/cached/${thumb}`} />
    <div class="content" style="background: #dfdfdd;  font-size: calc((100vw - 220px) / 84); padding: 1.2em; font-weight: 500;">
      <h3 style="color: #222; font-weight: 700; margin-bottom: .3em">{title}</h3>
      <span style="font-size: .8em">{ description }</span>
      {/* written and directed by: Kiro Urdin, music composed and performed by: Venko Serafimov, camera: Jacque Roulet, narrator: Graham W. Reid, after effects: Keti Petrovska, edited by: Vladimir Petrovski Karter. Running time: 13 min */}
    </div>
  </div>
)

const Films = HtmlPage => (
  <HtmlPage>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; grid-gap: 15px; padding: 40px 50px;">
      <FilmFeature
        thumb="films/md/Kiro_Urdin_-_Two_Times.jpg"
        title="Two Times"
      />
      <FilmFeature
        thumb="films/md/Kiro_Urdin_-_Steps.jpg"
        title="Steps"
      />
      <FilmFeature
        thumb="films/md/Kiro_Urdin_-_Tabula_Rasa.jpg"
        title="Tabula Rasa"
      />
      <FilmFeature
        title="Pishta"
        thumb="films/md/Kiro_Urdin_-_Pishta.jpg"
        description="Running time: 13min"
      />
      <FilmFeature
        title="Water and Fire"
        thumb="films/md/Kiro_Urdin_-_Water_and_Fire.jpg"
        description="Running time: 13min"
      />
    </div>
  </HtmlPage>
)

const PhotoThumb = ({ props, props: { ratio = 1, align } }) => (
  <a href={props.href} style={`text-decoration: none; color: black; grid-row: span ${ratio * 5}`}>
    <div
      class="film-thumb"
      style={`--ratio: ${ratio}; background-image: url(/media/cached/${props.image}); ${align ? `background-position: ${align};` : ""}`}
    >
      <div class="film-thumb-title">
        {props.title}
      </div>
    </div>
  </a>
)

{ /* 'position: absolute; bottom: 0; background: #eb0; padding: calc(2px + .6vw); color: #222; font-family: Merriweather; font-size: calc(-1px + 1.8vw); font-weight: 700' */ }
const PhotoGallery = HtmlPage => (
  <HtmlPage>
    {/* <h2>Photo Gallery</h2> */}
    <div
      class="photo-gallery-wrapper"
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
    '/artwork/films': renderPage(Films),
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
