import { casinos } from "../entities.mjs"

export default () => HtmlPage => {
  const casinoEntities = casinos.all()
  // const logs = validateAlbums()
  // const errors = logs.grouped.ERR?.album ?? {}
  // const warnings = logs.grouped.WARN?.album ?? {}

  return (
    <HtmlPage title="Collections">
      <h3 style="margin-top: 0">Entities</h3>
      <p style="text-transform: uppercase; font-size: 12px; letter-spacing: .1em; color: #777; margin: -8px 0 32px;">Manage entities by type</p>
      <h4 style="margin-top: 0">Casinos</h4>
      <pre>{JSON.stringify(casinoEntities, null, 2)}</pre>
    </HtmlPage>
  )
}
