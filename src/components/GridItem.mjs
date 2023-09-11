export default ({ props: { link, row, column, title, thumb, bg, album }, children }) => {
  const Tag = link ? "a" : "div"
  return (
    <Tag
      href={link}
      class="gg-item"
      style={`grid-column: ${column}; grid-row: ${row}`}
    >
      <div
        class="gg-item-inner"
        style={`background: ${bg != null || '#11111066'} ${thumb ? `url(/media/images/${album}/${thumb}) center` : ""}; background-size: cover; filter: brightness(0.75);`}>
      </div>
      {title && <div style="position: absolute; font-size: 32px; color: white; font-weight: 700; padding: calc(0.16em + 14px) calc(0.52em + 12px); font-family: 'Merriweather'; font-size: calc(.012em + 12px);">{title}</div>}
    </Tag >
  )
}
