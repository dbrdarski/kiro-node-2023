import Modal from "../components/Modal.mjs"
import Btn from "../components/Btn.mjs"

export default ({ props: { type, name, action, ...props } } = {}) => (
  <Modal
    name={`delete-${action}`}
    title={`Delete ${type}`}
    actions={() => (
      <>
        <Btn flat on={`close-modal-delete-${action}`}>Cancel</Btn>
        <Btn type="submit">Proceed</Btn>
      </>
    )}
    {...props}
  >
    <div>
      Delete {type} '<span entity-name></span>'?
      <input type="hidden" name="primary-key"/>
    </div>
  </Modal>
)
