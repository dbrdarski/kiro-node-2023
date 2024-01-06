export default ({ props, children }) => (
  <div class="golden-grid-wrapper">
      {props.content(({children}) => (
        <div class="golden-grid">
          {children}
        </div>
      ))}
  </div>
)
