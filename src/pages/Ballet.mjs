import { ballet } from "../data.mjs";

const images = [
  ballet.images[1],
  ballet.images[3],
  ballet.images[5],
  ballet.images[6],
  ballet.images[9],
  ballet.images[12],
  ballet.images[13],
  ballet.images[14],
  ballet.images[18],
  ballet.images[22],
  ballet.images[25],
  ballet.images[26],
];

export default (HtmlPage) => (
  <HtmlPage title="Planterium Dance with Debbie Wilson">
    <section class="content-area">
      <div class="col-content content col-wide">
        <h1>Planetarium Dance (with Debbie Wilson)</h1>
        <p style="font-size: 23px; line-height: 1.7em; opacity: .74; margin: 0;">
          “Kiro had been inspired by other cultures, which led me to envision a
          dance piece inspired by the themes of multiculturalism and harmony. I
          don’t want to define cultures, but rather to show that our different
          styles of dance can merge together into one homogenous group.”
        </p>
        <p style="font-size: 23px; line-height: 1.7em; opacity: .74; margin: 0; text-align: right; font-style: oblique;">
          Debbie Wilson “The Globe and Mail, Torronto, February 2003”
        </p>
      </div>
    </section>
    {/* <section class="content-area">
      <div>
      </div>
    </section> */}
    <section class="content-area">
      <aside class="col-aside">
        <img
          style="object-position: top; margin-bottom: 5em;"
          src="/media/cached/planetarium-dance/lg/debbie_wilson.jpg"
          alt=""
        />
        <div class="image-grid">
          {images.map((image) => (
            <a
              data-pswp-height={image.height}
              data-pswp-width={image.width}
              data-cropped="true"
              href={`media/images/${ballet.path}/${image.filename}`}
              width="300"
              height="300"
            >
              <img src={`media/cached/${ballet.path}/sm/${image.filename}`} />
            </a>
          ))}
        </div>
        <div
          class="info-card-link"
          style="padding: 20px 0; font-size: 23px; width: 100%;"
        >
          <a
            href="/photo-gallery/planetarium-dance"
            style="color: grey; border-color: grey; border-radius: 0; display: block; text-align: center;"
          >
            View full album
          </a>
        </div>
      </aside>
      <div class="col-content content">
        <p>
          Kiro Urdin’s Planetarium inspired Debbie Wilson to choreograph a
          ballet dance. Kiro Urdin designed the set, and his friends Venko
          Serafimov and Vasko Serafimov composed the music. Debbie Wilson has
          been creating works as an independent producer in both Ontario and
          Quebec since 1990. In 1994, she embarked on a new path as founder and
          Artistic Director of the OMO Dance Co., for which she has created a
          growing repertoire of critically acclaimed works.
        </p>
        <p>
          Omo Dance Company is a dynamic, multiracial company that engages and
          excites its audiences through Debbie Wilson’s critically acclaimed
          choreography, and through collaborations with outstanding composers,
          artists and designers. OMO’s wide appeal to both dance-related and
          popular audiences has garnered Debbie Wilson the “Best Local
          Choreographer” award in the Toronto- based NOW Magazine’s readers’
          poll for 2000, 2001 and 2003. OMO has shown an impressive annual
          increase in audience attendance, and is one of Toronto’s most prolific
          companies.
        </p>
        <p>
          The performance Planetarium Multimedia Project was presented to
          Toronto, Skopje, Heraclea, Ohrid, Ankara, Chicago, Geneva, and during
          the commemoration of the 60th anniversary of the United Nations.
        </p>
      </div>
    </section>
  </HtmlPage>
);
