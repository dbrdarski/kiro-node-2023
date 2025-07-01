import Btn from "../components/Btn.mjs"
import Modal from "../components/Modal.mjs"
import Input from "../components/Input.mjs"
import Select from "../components/Select.mjs"
import Image from "../icons/Image.mjs"
import { getCollections, validateCollection } from "../../collections.mjs"
import Delete from "../icons/Delete.mjs"
// import ArrowDown from "../icons/ArrowDown.mjs"

const renderCollections = (collections) => (
  <div style="">
    {/* <pre style="font-size: 12px">{ JSON.stringify(collections, null, 2) }</pre> */}
    { collections.map(collection => (
      <div
        style="border: 1px solid #09f5; border-radius: 4px; margin-bottom: 8px;"
        mode="preview"
        data-name={collection.name}
        on='@edit-collection-items-init:edit-collection-items'
      >
        <div style="display: grid; grid-template-columns: auto 8fr auto auto auto; align-items: center;  box-shadow: 0 1px #09f5; padding: 5px; gap: 5px;">
          <div style="font-size: 16px; padding: 10px;"><strong>{collection.name}</strong></div>
          <div style="font-size: 16px; padding: 10px;">{String(collection.items.length)} photos</div>
          <div style="font-size: 16px;" edit-control on="update-collection-items"><Btn>Commit changes</Btn></div>
          <div style="font-size: 16px;" edit-control on="cancel-action"><Btn>Cancel</Btn></div>
          <div style="font-size: 16px;">
            <Select
              data-name={collection.name}
              data-title={collection.metadata?.title ?? ""}
              data-description={collection.metadata?.description ?? ""}
              on="@change:collection-action"
            >
              <option disabled selected>Select action</option>
              <option value="open-modal-update-collection">Update metadata</option>
              <option value="edit-collection-items-init" {...collection.items.length ? {} : { disabled: "disabled" }}>Edit items</option>
              <option value="open-modal-delete-collection">Delete collection</option>
            </Select>
          </div>
          {/* <div style="font-size: 16px; padding: 10px;"><ArrowDown /></div> */}
        </div>
        <div style="padding: 10px; font-size: 14px; color: #555">
          <div style="padding: 5px"><strong style="color: black;">Title:</strong> {collection.metadata?.title ?? "N/A"}</div>
          <div style="padding: 5px"><strong style="color: black;">Description:</strong> {collection.metadata?.description ?? "N/A"}</div>
        </div>
        { collection.items.length && (
          <div style="border-top: 1px solid #09f5;" sortable-container edit-control>
            {collection.items.map((img, i) => (
              <div
                style={`font-family: monospace; font-size: 14px; padding: 10px; color: #555;
                  background: white; cursor: pointer; border-top: 1px dashed rgba(0, 153, 255, 0.533);
                  display: flex; align-items: center; gap: 5px;
                `}
                data-hash={img.hash}
                data-path={img.path}
              >
                <Image /><span>{img.path}</span><Delete on="remove-image-from-collection" />
              </div>
            ))}
          </div>
        )}
      </div>
    )) }
  </div>
)

const DeleteCollectionModal = () => (
  <Modal
    name="delete-collection"
    title="Delete Collection"
    init="delete-collection"
    actions={() => (
      <>
        <Btn flat on="close-modal-delete-collection">Cancel</Btn>
        <Btn type="submit">Delete</Btn>
      </>
    )}
  >
    Are you sure you want to delete this collection?
  </Modal>
)

const CollectionModal = ({ props: { name, title, action, ...props }}) => (
  <Modal
    {...props}
    name={name}
    title={title}
    actions={() => (
      <>
        <Btn flat on={`close-modal-${name}`}>Cancel</Btn>
        <Btn type="submit">{ action }</Btn>
      </>
    )}
  >
    <Input type="text" placeholder="Collection name" name="collection-name" />
    <hr />
    <Input type="text" placeholder="Title" name="collection-title" />
    <Input type="textarea" placeholder="Description" name="collection-description" />
  </Modal>
)

const MessageLog = ({ props: { items } }) => (
  <div>
    { items.map(item => (
      <>
        {item.message},&nbsp;
        <div style="padding-left: 10px;">{Array.isArray(item.data) ? <MessageLog items={item.data} /> : JSON.stringify(item.data, null, 2)}</div>
      </>
    ))}
  </div>
)

export default () => HtmlPage => (
  <HtmlPage title="Collections">
    <h3 style="margin-top: 0">Collections</h3>

    { renderCollections(getCollections()) }
    <div><Btn on="@click:open-modal-create-collection">Create new collection</Btn></div>


    { getCollections().map(c => (
      <>
      <h4 style="font-size: 14px; font-weight: bold;">Error Messages in {c.name}:</h4>
      <pre style="font-size: 12px; padding: 10px; border: 1px solid #eab; border-radius: 4px; background: #f6d0d6;">
        {/* {JSON.stringify(validateCollection(c).ERR, null, 2)} */}
        <MessageLog items={validateCollection(c).ERR} />
      </pre>
      </>
    ))}

    { getCollections().map(c => (
      <>
      <h4 style="font-size: 14px; font-weight: bold;">Warning Messages in {c.name}:</h4>
      <pre style="font-size: 12px; padding: 10px; border: 1px solid #ec3; border-radius: 4px; background: #f6e0b6;">
        <MessageLog items={validateCollection(c).WARN} />
      </pre>
      </>
    ))}

    <CollectionModal
      name="create-collection"
      title="Create collection"
      action="Create"
    />
    <CollectionModal
      name="update-collection"
      title="Update collection"
      init="update-collection"
      action="Update"
    />
    <DeleteCollectionModal />
    <div id="modal-section" />
    <style>{`
      [on=remove-image-from-collection] {
        opacity: .7
      }
      [on=remove-image-from-collection]:hover {
        opacity: 1
      }
      [sortable-container] > div:first-child {
        border: 0 none !important;
      }
      [sortable-container] > div:nth-child(2n):not(.sortable-ghost) {
        background: #0099ff09 !important;
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
  </HtmlPage>
)
