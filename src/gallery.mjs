import { h, frag, printHTML } from "./jsx.mjs"
import connect from "connect"
import serveStatic from "serve-static"
import Router from "url-router"
import HtmlPage from "./admin/HtmlTemplate.mjs"
import path, { dirname } from "path"
import { api } from "./admin/api/index.mjs"
import MediaLibrary from "./admin/pages/MediaLibrary.mjs"
import Collections from "./admin/pages/Collections.mjs"

console.log({ api })

const app = connect()

const renderPage = (Page) => () => printHTML(Page(HtmlPage))

const textPage = (text, options) => (
  <HtmlPage {...options}>
    <div style="height: 100vh; line-height: 100vh;text-align: center; font-size: 5vmax; font-family: sans-serif; background: white; color: #555554">
      {text}
    </div>
  </HtmlPage>
);

export default async (images, getCollections) => {
  const groupedImages = images.reduce((acc, img) => {
    const dir = dirname(img.path)
    if (!acc.hasOwnProperty(dir)) {
      acc[dir] = []
    }
    acc[dir].push(img)
    return acc
  }, {})

  const router = new Router({
    "/": renderPage(MediaLibrary(groupedImages)),
    "/collections": renderPage(Collections(getCollections)),
    "(.*)": () => printHTML(textPage("404 - Not found", { title: "404 - Page not found" })),
  })


  app.use(serveStatic("resources"))
  app.use(serveStatic("public"))
  app.use("/favicon", (req, res, next) => {
    res.end("ok")
  })
  app.use("/", (req, res, next) => {
    const r = router.find(req.originalUrl)
    // console.log(r)
    res.end(r.handler(r.params))
  })

  return app
}
