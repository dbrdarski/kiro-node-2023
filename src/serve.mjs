import { h, frag, printHTML } from "./jsx.mjs";
import connect from "connect";
import serveStatic from "serve-static";
import Router from "url-router";
import HtmlPage from "./components/HtmlPage.mjs";
import Album from "./pages/Album.mjs";
import PhotoGallery from "./pages/PhotoGallery.mjs";
import Filmography from "./pages/Filmography.mjs";
import Planetarium from "./pages/Planetarium.mjs";
import Planetarism from "./pages/Planetarism.mjs";
import Ballet from "./pages/Ballet.mjs";

import sharp from "sharp";
// import PhotoAlbum from "./components/Album3.mjs"

import {
  imageSizes,
  paintings,
  watercolours,
  drawings,
  sculptures,
  planetarium,
  ballet,
  people,
  omoValley,
  chinaFilmFestival,
  press,
} from "./data.mjs";

import Biography from "./pages/Biography.mjs";
import Artwork from "./pages/Artwork.mjs";
import Publications from "./pages/Publications.mjs";
// import Artwork2 from "./pages/Artwork2.mjs"

globalThis.h = h;
globalThis.frag = frag;

async function processImages(albums) {
  for await (const album of Object.values(albums)) {
    album.thumbs = {};
    for await (const image of album.images) {
      const file = sharp(`public/media/images/${album.path}/${image.filename}`);
      const { height, width } = await file.metadata();
      image.height = height;
      image.width = width;
    }
  }
}

const textPage = (text, options) => (
  <HtmlPage {...options}>
    <div style="height: 100vh; line-height: 100vh;text-align: center; font-size: 5vmax; font-family: 'Merriweather'; background: #cccccb; color: #555554">
      {text}
    </div>
  </HtmlPage>
);

const ComingSoon = textPage("Coming Soon", { title: "Comming Soon" });

const renderPage = (Page) => {
  const output = printHTML(Page(HtmlPage));
  return () => output;
};

export default async (albums) => {
  await processImages(albums, imageSizes);

  const app = connect();

  const router = new Router({
    // '/': () => Homepage,
    // '/foo': () => "1",
    "/biography": renderPage(Biography),
    // '/projects': renderPage(Artwork2(albums)),
    "/": renderPage(Artwork(albums)),
    "/planetarium": renderPage(Planetarium),
    "/planetarism": renderPage(Planetarism),
    "/planetarium-dance": renderPage(Ballet),
    "/artwork/paintings": renderPage(
      Album(paintings, { title: "Paintings - Artwork" }),
    ),
    "/artwork/drawings": renderPage(
      Album(drawings, { title: "Drawings - Artwork" }),
    ),
    "/artwork/watercolours": renderPage(
      Album(watercolours, { title: "Watercolours - Artwork" }),
    ),
    "/artwork/sculptures": renderPage(
      Album(sculptures, { title: "Sculptures - Artwork" }),
    ),
    "/artwork/literature": renderPage(Publications),
    "/artwork/films": renderPage(Filmography),
    "/photo-gallery": renderPage(PhotoGallery),
    "/photo-gallery/planetarium": renderPage(
      Album(planetarium, {
        mode: "photo",
        background: "white",
        title: "Planetarium - Photo Gallery",
      }),
    ),
    "/photo-gallery/planetarium-dance": renderPage(
      Album(ballet, {
        mode: "photo",
        background: "white",
        title: "Planetarium Dance - Photo Gallery",
      }),
    ),
    "/photo-gallery/with-people": renderPage(
      Album(people, {
        mode: "photo",
        background: "white",
        title: "People - Photo Gallery",
      }),
    ),
    "/photo-gallery/tribes-of-omo-valley": renderPage(
      Album(omoValley, {
        mode: "photo",
        background: "white",
        title: "Tribes f Omo Valley - Photo Gallery",
      }),
    ),
    "/photo-gallery/china-film-festival": renderPage(
      Album(chinaFilmFestival, {
        mode: "photo",
        background: "white",
        title: "Ya'an Eco Film Festival - Photo Gallery",
      }),
    ),
    "/photo-gallery/press-coverage": renderPage(
      Album(press, {
        background: "#ccccc3",
        title: "Press Coverage - Photo Gallery",
      }),
    ),
    "/user/:id": (params) => `User id: ${params.id}`,
    "/user/:id/:page": () => "4",
    "/people/:name": (params) => `Hello, ${params.name}`,
    "/artwork/aphorisms": () => printHTML(ComingSoon),
    "/artwork/poetry": () => printHTML(ComingSoon),
    "/artwork/publications": () => printHTML(ComingSoon),
    "/awards": () => printHTML(ComingSoon),
    "/contact": () => printHTML(ComingSoon),

    // '/gallery/:album/:size/:filename(.*)': $ => albums[$.album].thumbs[$.filename][$.size],
    "(.*)": () =>
      printHTML(textPage("Not found.", { title: "404 - Page not found" })),
  });

  app.use(serveStatic("public"));
  app.use("/favicon", (req, res, next) => {
    res.end("ok");
  });
  app.use("/", (req, res, next) => {
    const r = router.find(req.originalUrl);
    // console.log(r);
    res.end(r.handler(r.params));
  });

  return app;

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
};
