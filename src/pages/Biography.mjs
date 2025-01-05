import { portraits } from "../data.mjs";
const {
  images: [poster, ...images],
} = portraits;
export default (HtmlPage) => (
  <HtmlPage title="Biography">
    <section class="content-area">
      <aside class="col-aside">
        <div class="image-grid">
          <a
            class="big-photo"
            href={`media/images/portraits/${poster.filename}`}
            data-pswp-height={poster.height}
            data-pswp-width={poster.width}
            data-cropped="true"
          >
            <img
              style="object-position: top;"
              src="media/cached/portraits/md/Kiro-Urdin-Portrait-1.jpg"
              alt=""
            />
          </a>
          {images.map((image) => (
            <a
              data-pswp-height={image.height}
              data-pswp-width={image.width}
              data-cropped="true"
              href={`media/images/${portraits.path}/${image.filename}`}
              width="300"
              height="300"
            >
              <img
                src={`media/cached/${portraits.path}/sm/${image.filename}`}
              />
            </a>
          ))}
        </div>
      </aside>
      <div class="col-content content">
        <h1>Kiro Urdin - Self Portrait</h1>

        <p>
          My earliest knowledge begins with my greatgrandfather, Constantine. I
          don’t know what my great-grandmother’s name was. They came from
          Salonica and had fourteen children, twelve of whom died one after the
          other. The thirteenth was my grandfather, Vasil, and the fourteenth
          his sister, Tina.
        </p>
        <p>
          My father was called Michael and my mother Makedonka, as is my
          daughter. But to begin with myself.
        </p>
        <p>
          I am average in all things: of average height, of average weight, of
          average years and the colour of my hair is average. My mother and
          father were average too. And of course my three brothers and my sister
          are average.
        </p>
        <p>
          I wasn’t present at the moment of my birth. Time moved fast then.
          During the First World War my father was still a child, but even then
          he had made up his mind that I would be his youngest son. His wish was
          fulfilled towards the end of the Second World War. It was the month of
          May and three fortune-tellers told me that the flowers were still
          smelling of gunpowder. After that moment a good many years passed and
          peace reigned everywhere. Countries were transformed into flower
          gardens. There were no more wars, no more dead, wounded, starving…
          There was no injustice, evil or force. When I completed my studies
          everybody started to judge me. In order to improve my rating, I
          started with legal norms, and fell headlong into the loopholes in the
          law. There they convinced me that life beyond the grave can easily be
          buried.
        </p>
        <p>
          Because I had little patience for documents I began to paint them and
          then to record them on film. This same fact had undesirable
          consequences that started to multiply. Their number increased so
          rapidly that there wasn’t room for them all any more. The only way out
          was to surrender my space to them. The consequences demanded that I
          should understand their causes. So on average I became a point, so
          that nobody noticed me any more. Now my destiny depends upon the place
          where they insert me in their written texts. But if anyone asks me
          what my wish is, my response is this: because I am a point I don’t
          want to remain in any one place but to be in perpetual motion.
        </p>
      </div>
    </section>
  </HtmlPage>
);
