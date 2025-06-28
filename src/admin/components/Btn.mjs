const style = ({ flat }) => `
background: white;
border-radius: 3px;
border: 0 none;
color: #09f;
padding: 10px 16px;
font-size: 15px;
font-weight: 400;
/* text-transform: uppercase; */
box-shadow: 0 0 0 1px #09f8 inset, 0 0 0 4px #09f5 inset;
background: #39f3;
cursor: pointer;
box-shadow: 0 0 0 1px inset;
outline-color: #09f8;
${ flat ? "background: transparent; box-shadow: none;" : ""}
`

export default ({ props: { flat, ...props }, children }) => (
  <button {...props } style={style({flat})}>{children}</button>
)
