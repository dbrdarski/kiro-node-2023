export default ({ props: { type, link, row: [row, rowspan], column: [column, colspan], title, thumb, bg, album, size = "md", ...props }, children }) => {
  const Tag = link ? "a" : "div"
  return (
    <Tag
      {...link && { href: link} }
      class={`gg-item ${props.class || ""}`}
      style={`--grid-x-start: ${column}; --grid-x-end: ${column + colspan}; --grid-y-start: ${row}; --grid-y-end: ${row + rowspan};`}
    >
      <div
        class="gg-item-inner"
        style={`${type === "video"
          ? "position: relative; overflow: hidden;"
          : `background: ${bg != null || '#11111066'} ${thumb ? `url(/media/images/${album}/${thumb}) center` : ""}; background-size: cover;`} filter: brightness(0.75);`}>
        {type === "video" && (
          <video autoplay loop muted plays-inline style="position: absolute; right: 0; top: -3px; width: 102%; height: 102%;">
            <source src={`/media/videos/${thumb}`} />
          </video>
        )}
      </div>
      {title && <div class={`gg-item-title ${size}`}>{title}</div>}
    </Tag >
  )
}
