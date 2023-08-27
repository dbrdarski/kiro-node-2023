export default ({ props, children }) => (
  <div class="golden-grid-wrapper">
    <div class="golden-grid"> {
      Array.from({ length: 13 * 5 }, i => (
        <div class="gg-item" style="opacity: .6">
          <div class="gg-item-inner" />
        </div>
      ))}
      {children}
    </div>
  </div>
)
