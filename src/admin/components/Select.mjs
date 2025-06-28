const style = `
  height: 37px;
  padding: 0 9px;
  color: #09f;
  border: 1px solid #09f;
  border-radius: 3px;
  font-size: 15px;
  background: #39f2;
  outline: 0 none;
`

export default ({ props, children }) => (
  <>
    <select
      { ...props }
      style={style}
      form-input
    >
      { children }
    </select>
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
  </>
)
