

export default ({ props: { type, link, row: [row, rowspan], column: [column, colspan], title, thumb, bg, album, ...props }, children }) => {
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
      {title && <div style="position: absolute; font-size: 32px; color: white; font-weight: 700; padding: calc(0.16em + 14px) calc(0.52em + 12px); font-family: 'Merriweather'; font-size: calc(.012em + 12px);">{title}</div>}
    </Tag >
  )
}
