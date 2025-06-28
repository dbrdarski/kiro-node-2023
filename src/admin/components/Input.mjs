const style=`
background: white;
border: 0 none;
color: #09f;
padding: 10px 16px;
font-size: 15px;
font-weight: 400;
/* text-transform: uppercase; */
box-shadow: 0 -1px 0 #09f8 inset;
background: #39f2;
outline: 0 none;
width: 100%
`

export default ({ props, children }) => (<>
  <input {...props } style={style} form-input />
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
</>)
