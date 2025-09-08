const style=`
background: white;
color: #09f;
padding: 10px 16px;
font-size: 15px;
border: 0 none;
font-weight: 400;
/* text-transform: uppercase; */
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

export default ({ props: { label, outlined, ...props }, children }) => (<label>
  {label && <span style="display: block; color: #09f; margin-bottom: 5px; font-size: 13px; font-weight: 300;">{label}</span>}
  <textarea {...props } style={`${style}; ${outlined ? outlinedInput : standardInput}`} form-input />
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
</label>)
