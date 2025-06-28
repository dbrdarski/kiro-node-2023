import { getCollections } from "../../collections.mjs"
import Btn from "../components/Btn.mjs"
import Folder from "../icons/Folder.mjs"

const style = <style>{`
  img[selected] {
    position: relative;
    box-shadow: 0 0 0 2px #09f;
    filter: contrast(0.5);
    filter: contrast(0.4) brightness(1.4);
  }
  [mode="preview"] [edit-control] {
    display: none;
  }
  [mode="edit"] [edit-control] {
    display: block;
  }
  [mode="edit"] [disabled] {
    opacity: .5;
  }
  [mode="edit"] [selectable] {
    cursor: pointer;
  }
`}</style>

export default images => HtmlPage => (
  <HtmlPage title="Media Gallery">
    <h3 style="margin-top: 0">Media Library</h3>
    {Object.entries(images).map(
      ([key, value]) => (
        <div directory={key} mode="preview">
          <div style="display: flex; align-items: center; margin-bottom: 10px; gap: 10px;">
            <Folder />
            <pre style="font-size: 16px; flex-grow: 1; margin: 0">{key}</pre>
            <Btn edit-control on="select-all-images">Select all</Btn>
            <Btn edit-control on="unselect-all-images">Unselect all</Btn>
            <Btn edit-control on="add-to-collection--save" disabled>Save</Btn>
            <Btn edit-control on="add-to-collection--cancel" >Cancel</Btn>
            <select
              style="height: 37px; padding: 0 9px;color: #09f; border: 1px solid #09f;
              border-radius: 3px; font-size: 15px; background: #09f1;"
              on="@change:select-images"
            >
              <option disabled selected>Add to collection</option>
              {getCollections().map(collection => (
                <option value={collection.name}>{ collection.name }</option>
              ))}
            </select>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(135px, 1fr)); font: 13px monospace; line-height: 0; margin: -1px; gap: 2px">{value.map(
            img => (
              <img
                alt={img.path}
                src={img.generated[4].replace(/^resources/, "")}
                style="width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block;"
                data-hash={img.hash}
                data-path={img.path}
                selectable
              />
            )
          )}
          </div>
        </div>
        )
      )
    }
    {style}
  </HtmlPage>
)
