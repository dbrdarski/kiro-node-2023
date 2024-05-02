export default ({ props: { album, mode = "artwork" } }) => (
  <div class={`gallery ${mode}`}>
    <div class="gallery-inner">
      {album.info &&
        (mode === "artwork" ? (
          <div class="text-card">
            <h1 class="text-card-title">{album.info.title}</h1>
            <span>{album.info.description}</span>
          </div>
        ) : (
          <div class="gallery-info-card">
            <div
              class="info-card-inner"
              style={album.info.color && `background: ${album.info.color}`}
            >
              {album.info.title && (
                <h1 class="info-card-title">{album.info.title}</h1>
              )}
              <p class="info-card-description">{album.info.description}</p>
              {album.info.url && (
                <div class="info-card-link">
                  <a href={album.info.url}>Read more</a>
                </div>
              )}
            </div>
          </div>
        ))}
      {album.images.map(
        (image) =>
          image.hide || (
            <a
              class="scroll-gallery-item"
              data-pswp-width={image.width}
              data-pswp-height={image.height}
              data-cropped={mode === "artwork" ? "false" : "true"}
              href={`/media/images/${album.path}/${image.filename}`}
            >
              <img x-src={`/media/cached/${album.path}/lg/${image.filename}`} />
              {/* {album?.info?.title && <div class="gallery-heading">{album.info.title}</div>} */}
            </a>
          ),
      )}
    </div>
  </div>
);
