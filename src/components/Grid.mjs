export default ({ props }) => (
  <div class="golden-grid-wrapper">
      {props.content(({children}) => (
        <div class="golden-grid">
          {children}
        </div>
      ))}
  </div>
)
