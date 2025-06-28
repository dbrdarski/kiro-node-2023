const style = ({ }) => `
  position: fixed;
  flex-direction: column;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% + 130px), -50%);
  background: white;
  box-shadow: 0 0 0 1px #39f8 inset, 4px 4px 0px #09f3;
  padding: 18px 22px;
  border-radius: 5px;
  min-height: 20vh;
  min-width: 30vw;
`
// fullWidth = `
// width: calc(100vw - 300px);
// height: calc(100vh - 40px);
// `

export default ({ props: { name, title, actions, ...props }, children }) => (
  <template modal={name}>
    <form
      {...props }
      on={`@submit:${name}`}
      style={style({})
    }>
      <div style="text-transform: uppercase; color: #09f; font-size: 16px;">{title}</div>
      <div style="display: flex; flex-direction: column; flex-grow: 1; padding: 30px 0; gap: 10px; color: #555; font-size: 16px;">{children}</div>
      <div style="display: flex; gap: 10px">
        <span style="flex-grow: 1"></span>
        {actions()}
      </div>
    </form>
  </template>
)
