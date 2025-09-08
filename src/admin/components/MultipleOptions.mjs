const style = `
  display: flex;
  align-items: center;
  gap: 12px;
  height: 37px;
  padding: 0 9px;
  color: #09f;
  border: 0 none;
  font-size: 15px;
  background: #39f2;
  outline: 0 none;
  width: 100%;
`
const standardInput = `
  box-shadow: 0 -1px 0 #09f8 inset;
  border-radius: 3px 3px 0 0;
`
const outlinedInput = `
  border-radius: 3px;
  border: 1px solid #09f;
`


export default ({ props: { options = [], outlined, label, oncreate, ...props }, children }) => (
  <div>
    {label && <span style="display: block; color: #09f; margin-bottom: 5px; font-size: 13px; font-weight: 300;">{label}</span>}
    <div
      { ...props }
      style={`${style}; ${outlined ? outlinedInput : standardInput}`}
      form-input
    >
      {options.map(({ label, value, ...props }) => (
        <label
          style="display: inline-flex; align-items: center; gap: 0px; font-size: 14px;"
        >
          <input type="checkbox" {...props} />
          {label}
        </label>
      ))}
      { children }
    </div>
    <style>{`
      [form-input]:active,
      [form-input]:focus {
        background: #39f3 !important;
      }
      [form-input]::placeholder {
        color: #09f8;
      }
      [form-input][disabled] {
        filter: grayscale(1);
        pointer-events: none;
      }
    `}</style>
  </div>
)
