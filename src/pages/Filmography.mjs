const FilmFeature = ({ props: { thumb, title, description, url } }) => (
  <div style="display: flex; flex-direction: column;">
    <a href={url} target="_blank" style="line-height: 0">
      <img src={`/media/cached/${thumb}`} />
    </a>
    <div class="content film-feature" style="background: #dfdfdd;">
      <h3 style="color: #222; font-weight: 700; margin-bottom: .1em">
        {title}
      </h3>
      <div style="font-size: .8em; margin-bottom: 1em;">{description}</div>
      <div style="text-align: right; line-height: 0">
        <a
          href={url}
          target="_blank"
          style="color: inherit; text-decoration: none;"
        >
          <span style="display: inline-flex; align-items: center;">
            <img
              src="/images/play_circle.svg"
              style="height: 1.3em; margin-right: .5em; line-height: 0; opacity: .4"
            />
            <span>Watch on Vimeo</span>
          </span>
        </a>
      </div>
    </div>
  </div>
);

export default (HtmlPage) => (
  <HtmlPage>
    <h2 style="font-family: 'Merriweather'; font-size: calc(.75em + 12px); background: #eb0e; margin: 0 6px 6px; padding: 1em;">
      <span>Artwork</span> &gt; <span>Films</span>
    </h2>
    <div class="even-grid">
      <FilmFeature
        title="Planetarium"
        thumb="films/md/Kiro_Urdin_-_Planetarium.jpg"
        description="Running time: 57min"
        url="https://vimeo.com/59073149"
      />
      <FilmFeature
        thumb="films/md/Kiro_Urdin_-_Two_Times.jpg"
        title="Two Times"
        description="Running time: 43min"
        url="https://vimeo.com/59058492"
      />
      <FilmFeature
        thumb="films/md/Kiro_Urdin_-_Steps.jpg"
        title="Steps"
        description="Running time: 15min"
        url="https://vimeo.com/57957124"
      />
      <FilmFeature
        thumb="films/md/Kiro_Urdin_-_Tabula_Rasa.jpg"
        title="Tabula Rasa"
        description="Running time: 45min"
        url="https://vimeo.com/742255149"
      />
      <FilmFeature
        title="Pishta"
        thumb="films/md/Kiro_Urdin_-_Pishta.jpg"
        description="Running time: 13min"
        url="https://vimeo.com/59055662"
      />
      <FilmFeature
        title="Water and Fire"
        thumb="films/md/Kiro_Urdin_-_Water_and_Fire.jpg"
        description="Running time: 54min"
        url="https://vimeo.com/59992004"
      />
    </div>
  </HtmlPage>
);
