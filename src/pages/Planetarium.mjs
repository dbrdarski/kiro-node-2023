import { planetarium } from "../data.mjs";

const images = [
  planetarium.images[1],
  planetarium.images[3],
  planetarium.images[9],
  planetarium.images[17],
  planetarium.images[20],
  planetarium.images[6],
  planetarium.images[29],
  planetarium.images[22],
  planetarium.images[23],
  planetarium.images[24],
  planetarium.images[14],
  planetarium.images[26],
];

const poster = planetarium.images[33];

export default (HtmlPage) => (
  <HtmlPage title="Planterium">
    <section class="content-area">
      <div class="col-content content col-wide">
        <h1>Kiro Urdin - Planetarium</h1>
        <p style="font-size: 23px; line-height: 1.7em; opacity: .74; margin: 0;">
          Planetarium is the first painting to be worked all over the world.
          Among the locations were historical sites like the Tomb of Jesus
          Christ and the Wailing Wall in Jerusalem, New York, the Berlin Wall,
          Nerezi, Ohrid, Brussels, Knokke-le-Zoute, Bruges, Paris, Rome,
          Pompeii, Pisa, the Suez Canal, London, Stonehenge, Athens, Cape
          Soúnion, the Nile, the Great Pyramids in Giza, Kenya (Masai Mara),
          Machu Picchu, Cuzco, Bangkok, Peking (the Forbidden City) and the
          Great Wall of China, Tokyo, Kamakura, Mont Saint-Michel, Nuenenn and
          Eindhoven.
        </p>
      </div>
    </section>
    <section class="content-area">
      <aside class="col-aside">
      {/* "/media/cached/planetarium/lg/Kiro_Urdin-Planetarium_Poster-V2.jpg" */}
        <div class="image-grid">
          <a
            class="big-photo"
            href={`/media/images/${planetarium.path}/${poster.filename}`}
            data-pswp-height={poster.height}
            data-pswp-width={poster.width}
            data-cropped="true"
            style="aspect-ratio: 1 / 1.75"
          >
            <img
              style="object-position: 62% 100%; margin-bottom: 5em;"
              src={`media/cached/${planetarium.path}/lg/${poster.filename}`}
              alt=""
            />
          </a>
          {images.map((image) => (
            <a
              data-pswp-height={image.height}
              data-pswp-width={image.width}
              data-cropped="true"
              href={`media/images/${planetarium.path}/${image.filename}`}
              width="300"
              height="300"
            >
              <img
                src={`media/cached/${planetarium.path}/sm/${image.filename}`}
              />
            </a>
          ))}
        </div>
        <div
          class="info-card-link"
          style="padding: 20px 0; font-size: 23px; width: 100%;"
        >
          <a
            href="/photo-gallery/planetarium"
            style="color: grey; border-color: grey; border-radius: 0; display: block; text-align: center;"
          >
            View full album
          </a>
        </div>
      </aside>
      <div class="col-content content">
        <p>
          Kiro Urdin’s insatiable curiosity and his appetite for exploring have
          taken him to five continents, so as to paint, in each country visited,
          the same immense canvas: 48 sq. m., eight meters by six, split into
          two parts of 24 m2. It was unrolled at each stop, sometimes placed on
          a stretcher. Overwhelmed by the impressive nature of his environment,
          the ancient cultures and the unequalled riches of the world heritage,
          Kiro has covered his canvas as a symbol of his taking possession.
          Drunk with centuries-old fragrances and companionship of people from
          every race, faced with temples, and landscapes from all four corners
          of the world, he translated his circumstantial emotions. For two and a
          half years, dealing with problems, which would have been
          insurmountable for most of us, he filled his fresco with the spoils of
          his remembered images in situ, and with the breath of his sensitive
          thoughts. From Skopje, the cradle of all births, to the cannibals of
          Mindoro, from Kheops to the Pre-Columbian sites of Machu Picchu, from
          the Masai in Kenya to the Forbidden City of Peking, from Jerusalem
          where, upon hearing of the birth of his daughter Donna, he kissed the
          tomb of Christ and immolated, in fire, a large piece of the canvas to
          New York and Tokyo, and through all great European capitals, he
          travellled his long mystical journey under the banner of love and in
          search of his own limits.
        </p>
        <p>
          This exhausting journey, with thousands of episodes and repeated
          perils, on a scale determined only by his lack of measure, was
          undertaken by Kiro obstinately, almost devotedly, his canvas on his
          back, in all weathers, frequently employing unusual means of
          transport, aiming only at infinity in his quest and at blossoming of
          his serenity. He has brought back a synthesis haloed by memory and
          affect, woven from unattained dreams and fulfilled hopes, whose
          recipient, in other words, the canvas, was endlessly reworked as a
          dream of knowledge and of freedom finally materialized.
        </p>
        <p>
          A hymn to happiness, an act of love, this work, bearing the title
          Planetarium – one point everywhere, everything in one point, and
          condensed in a remarkable short movie, nowadays belongs to the company
          Neways Electronics International in Holland, and decorates its
          entrance lobby with its blue background, an allusion to the cosmos,
          against which play the trances of his forms and signs like a promise
          of universal joy. It was a unique experience, a turning point in my
          life, an adventure out of the norm, says Kiro.
        </p>
        <p>
          At this stage, no matter how far back the analysis reaches, Kiro
          Urdin’s work is an affirmation of an authority without a decisive
          break. Consisting of flesh and blood, it describes man in painstaking
          details; his solitude, his melancholy, his nostalgia and
          incommunicability. But the man only aspires to light and to a peaceful
          world. And if Kiro’s work lingers in the unconscious of people and
          things, this has to do with the contradictory fluxes in his sumptuous
          vital energy, in service of one superior reality. After many
          turbulences, every exhibition adding a new height to his reputation,
          Kiro Urdin, like James Joyce, remains that tender and wild
          individualist, whose conquering of the artwork, resisting new fashions
          and labels, resonates deep inside us long afterwards.
        </p>
        <p style="text-align: right">Gerard Xuriguera</p>
      </div>
    </section>
  </HtmlPage>
);
