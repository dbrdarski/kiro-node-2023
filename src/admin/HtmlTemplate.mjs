import { albums, validateAlbum } from "./albums.mjs"
import { casinos } from "./entities.mjs"
import { renderErrorLogCounts } from "./renderers.mjs"

const menuItems = [{
  url: "/pages",
  text: "Pages"
}, {
  url: "/entities",
  text: "Entities"
}, {
  url: "/collections",
  text: "Collections",
  extra: log => renderErrorLogCounts(log.ERR, log.WARN)
}, {
  url: "/",
  text: "Media Library",
}]

const htmlPage = ({
  children,
  props: { background = "#fff", title = "", header, scripts },
}) => {
  const collections = albums.all()
  const errorLog = collections
    .map(x => validateAlbum(x).log.count)
    .reduce(
      (acc, log) => {
        acc.ERR += log.ERR
        acc.WARN += log.WARN
        return acc
      },
      {ERR: 0, WARN: 0}
    )

  console.log({ errorLog })
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"
        />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> */}
        {/* <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous"
        */}
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/photoswipe.css" />
        { header }
        <title>
          {title} | CMS Admin Panel
        </title>
        <style>
  {`
          .sortable-ghost {
            padding: 10px 15px !important;
            background: #09f3 !important;
            z-index: 10 !important;
            position: relative;
          }
  `}
        </style>
      </head>
      <body style={`background: ${background || "#ccccc3"}; font-size: 18px; font-family: sans-serif; @color: #bfe5ff;`}>
        <header id="header" style="background: #09f; padding: 30px 0; font-family: sans-serif;">
          <section style="font-size: 48px">
            <div>CMS</div>
          </section>
          <section id="menu" style="text-align: left;">
            {menuItems.map(item => (
              <div style="padding: 8px 32px;"><a href={item.url} style="text-decoration: none; color: white;">{item.text}</a>
                { item.extra?.(errorLog) }
              </div>
            ))}
          </section>
        </header>
        <main id="main-content" style="padding: 30px;">{children}</main>
        <script src="/bundle.js" />
        { scripts }
      </body>
    </html>
  )
}

export default htmlPage
