export default ({ props: { album, mode = "artwork" } }) => (
  <div class={`gallery ${mode}`}>
    <div class="gallery-inner">
      {album.info && (
        <div class="text-card">
          <h1 class="text-card-title">{album.info.title}</h1>
          <span>{album.info.description}</span>
        </div>
      )}
      {album.images.map(
        image => (
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
        )
      )}
    </div>
  </div>
)
