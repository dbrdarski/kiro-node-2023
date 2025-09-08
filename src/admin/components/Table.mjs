const renderValue = (row, value) => typeof value === "function" ? value(row) : row[value]

export default ({ props: { columns, data, title, minWidth, maxHeight, footer, ...props }, children }) => (
  <div style="display: table; border: 1px solid #b8ddff; border-radius: 4px;">
    {title && <h4 style="padding: 10px; margin: 3px 0 8px;">{title}</h4>}
    <div style={`max-height: ${maxHeight}; overflow: scroll;`}>
      <table style={`border-collapse: collapse; font-size: 14px; min-width: ${minWidth ?? 0};  color: #555;`}>
        <thead style="position:sticky; top: 0; background: white; box-shadow: 0 -1px white inset, 0 1px #b8ddff; color: #000;">
          <tr>{columns.map(field => (<th style={`padding: 10px; text-align: ${field.align ?? "left"}`}>{field.label}</th>)) }</tr>
        </thead>
        <tbody>{data.map(row => <tr
          style="border-top: 1px solid #b8ddff;"
        >{columns.map(field => (<td style={`padding: 10px; text-align: ${field.align ?? "left"}`}>{renderValue(row, field.value)}</td>))}</tr>)}</tbody>
      </table>
    </div>
    {footer && <div style="padding: 10px; border-top: 1px solid #b8ddff;" colspan={columns.length}>{footer}</div>}
    {/* <style>{`
      ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 7px;
      }

      ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .5);
        box-shadow: 0 0 1px rgba(255, 255, 255, .5);
      }
      `}</style>*/}
  </div>
)
