
export default (HtmlPage) => (
  <HtmlPage
    title="Publications"
    header={(
      <>
        <link href="/lib/css/main.css" rel="stylesheet" type="text/css" />
        <link href="/lib/css/themify-icons.css" rel="stylesheet" type="text/css" />
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
        <h1>Publications</h1>
        <p style="font-size: 23px; line-height: 1.7em; opacity: .74; margin: 0;">
          Planetarism is an artistic movement founded by the Macedonian artist Kiro Urdin. This movement, which is both a philosophy and a practice, stems from Urdin’s deep-seated belief in the interconnectedness of all forms of art and the unity of human experience.
        </p>
        <div id="flipbookContainer" />
        <div
          class="_df_button"
          source="/pdf/Kiro_Urdin_-_1500_Aphorisms.pdf"
          id="df_manual_button"
        >
          Button
        </div>
        <div
          class="_df_button"
          source="/pdf/Kiro_Urdin_-_Planetarism_Movement.pdf"
          id="df_manual_button"
        >
          Button
        </div>
        <script>{`
             // jQuery(document).ready(function () {
             //   //uses source from online(make sure the file has CORS access enabled if used in cross-domain)
             //   var pdf = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';
             //   var options = {
             //     height:2000,
             //     duration: 700,
             //     backgroundColor: "#2F2D2F",
             //     soundEnable : false,
             //     // Enable touch support
             //     useTouch: true
             //   };
             //   var flipBook = $("#flipbookContainer").flipBook(pdf, options);
             // });
          `}</script>
      </div>
    </section>
  </HtmlPage>
)
