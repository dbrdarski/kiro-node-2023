import Modal from "../components/Modal.mjs"
import Btn from "../components/Btn.mjs"
import Input from "../components/Input.mjs"
import Select from "../components/Select.mjs"

export default ({ props: { actionLabel = "Update", action = "update", ...props } } = {}) => (
  <Modal
    name={`${action}-point`}
    title={`${actionLabel} Point`}
    actions={() => (
      <>
        <Btn flat on={`close-modal-${action}-point`}>Cancel</Btn>
        <Btn type="submit">{actionLabel}</Btn>
      </>
    )}
    {...props}
  >
    <input type="hidden" name="primary-key" />
    <Input type="text" name="name" label="Name" />
    <Select name="type" label="Type" options={[
      { selected: true, disabled: true, label: "Select" },
      { value: "positive", label: "Positive" },
      { value: "negative", label: "Negative" },
    ]} />
    <Input type="text" name="shortDescription" label="Description" />
    <Input type="text" name="fullDescription" label="Description" />
  </Modal>
)
