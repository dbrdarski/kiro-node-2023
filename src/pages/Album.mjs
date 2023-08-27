import Album from "../components/Album.mjs"

export default (album, options = {}) => HtmlPage => (
  <HtmlPage {...options}>
    <Album {...options} album={album} />
  </HtmlPage>
)
