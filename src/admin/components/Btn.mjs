const sizeStyles = ((size = "md") => {
  switch (size) {
    case "xxs": return `
    padding: 3px 7px;
    font-size: 10px;
    `
    case "xs": return `
    padding: 4px 9px;
    font-size: 12px;
    `
    case "sm": return `
    padding: 6px 11px;
    font-size: 13px;
    `
    case "lg": return `
    padding: 13px 20px;
    font-size: 18px;
    `
    case "xl": return `
    padding: 15px 22px;
    font-size: 20px;
    `
    case "xxl": return `
    padding: 17px 24px;
    font-size: 24px;
    `
    case "md":
    default: return `
      padding: 10px 16px;
      font-size: 15px;
    `
  }
})

const style = ({ flat, size }) => `
  display: inline-block;
${sizeStyles(size)};
  background: white;
  border-radius: 3px;
  border: 0 none;
  color: #09f;
  font-weight: 400;
  /* text-transform: uppercase; */
  box-shadow: 0 0 0 1px #09f8 inset, 0 0 0 4px #09f5 inset;
  box-shadow: 0 0 0 1px #09f8 inset, 0 0 0 4px #b8ddff inset;
  background: #39f3;
  cursor: pointer;
  box-shadow: 0 0 0 1px inset;
  outline-color: #09f8;
  text-decoration: none;
${ flat ? "background: transparent; box-shadow: none;" : ""}
`

export default ({ props: { flat, size, type, ...props }, children }) => {
  const C = type === "link" ? "a" : "button"
  return (
    <C {...props } style={style({flat, size})}>{children}</C>
  )
}
