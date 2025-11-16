export default ({ props: { options = [], name, outlined, label, oncreate, ...props }, children }) => (
  <filter-dropdown label={label}>
      {options.map(({ label, value, ...props }) => (
        <div data-filter-value={label}>
          <label style="display: inline-flex; align-items: center; gap: 0px; font-size: 14px; color: #09f;">
            <input type="checkbox" name={name} value={value} {...props} />
            {label}
          </label>
        </div>
      ))}
  </filter-dropdown>
)
