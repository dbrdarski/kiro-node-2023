
export default (HtmlPage) => (
  <HtmlPage
    title="Publications"
    header={(
      <>
        <link href="/lib/css/main.css" rel="stylesheet" type="text/css" />
        <link href="/lib/css/themify-icons.min.css" rel="stylesheet" type="text/css" />
      </>
    )}
    scripts={(
      <>
        <script src="/lib/js/libs/jquery.min.js" type="text/javascript"></script>
        <script src="/lib/js/flip.js" type="text/javascript"></script>
      </>
    )}
  >
    <section class="content-area">
      <div class="col-content content col-wide">
        <h1>Tabula Rasa</h1>
        <p style="font-size: 23px; line-height: 1.7em; opacity: .74; margin: 0;">
          Planetarism is an artistic movement founded by the Macedonian artist Kiro Urdin. This movement, which is both a philosophy and a practice, stems from Urdin’s deep-seated belief in the interconnectedness of all forms of art and the unity of human experience.
        </p>
        <div
          class="_df_button"
          source="/pdf/Kiro_Urdin_-_Tabula_Rasa2.pdf"
          id="df_manual_button"
        >
          Button
        </div>
        {/* <div id="flipbookContainer">
          <div class="_df_book" source="/pdf/Kiro_Urdin_-_Tabula_Rasa2.pdf"/>
        </div> */}
      </div>
    </section>
  </HtmlPage>
)
