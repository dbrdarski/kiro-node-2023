const PhotoThumb = ({ props, props: { ratio = 1, align } }) => (
  <a
    href={props.href}
    style={`text-decoration: none; color: black; grid-row: span ${ratio * 5}`}
  >
    <div
      class="film-thumb"
      style={`--ratio: ${ratio}; background-image: url(/media/cached/${props.image}); ${align ? `background-position: ${align};` : ""}`}
    >
      <div class="film-thumb-title">{props.title}</div>
    </div>
  </a>
);

export default (HtmlPage) => (
  <HtmlPage title="Photo Gallery">
    {/* <h2>Photo Gallery</h2> */}
    <div class="photo-gallery-wrapper">
      <PhotoThumb
        image="/planetarium/md/Kiro_Urdin-Planetarium-London.jpg"
        href="/photo-gallery/planetarium"
        title="Planetarium"
        ratio={6 / 5}
      />
      <PhotoThumb
        image="/people/md/Kiro_Urdin_with_Brothers_Kocho_and_Vasil.jpg"
        href="/photo-gallery/with-people"
        title="With People"
        ratio={4 / 5}
        align="center"
      />
      <PhotoThumb
        image="/planetarium-dance/md/UN-60th-Anniversary-Planetarium-Dance-Kiro-Urdin-and-Debbie-Wilson-4.jpg"
        href="/photo-gallery/planetarium-dance"
        title="Planetarium Dance"
      />
      <PhotoThumb
        image="/omo-valley/md/Tribes-of-Omo-Valley-Cover.jpg"
        href="/photo-gallery/tribes-of-omo-valley"
        title="Tribes of Omo Valley"
        ratio={6 / 5}
        align="33%"
      />
      <PhotoThumb
        image="/press-coverage/md/Kiro-Urdin-Le-Dessin-750x1024.jpg"
        href="/photo-gallery/press-coverage"
        title="Press Coverage"
      />
      <PhotoThumb
        image="/china-film-festival/md/China-Nature-Film-Festival-25.jpg"
        href="/photo-gallery/china-film-festival"
        title="China Film Festival"
        ratio={4 / 5}
      />
    </div>
  </HtmlPage>
);
