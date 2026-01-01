import Modal from "../components/Modal.mjs"
import Btn from "../components/Btn.mjs"
import Input from "../components/Input.mjs"
import Select from "../components/Select.mjs"

export default ({ props: { actionLabel = "Update", action = "update", refresh, ...props } } = {}) => (
  <Modal
    name={`${action}-payment-processor`}
    title={`${actionLabel} Payment Processor`}
    actions={() => (
      <>
        <Btn flat on={`close-modal-${action}-payment-processor`}>Cancel</Btn>
        <Btn type="submit" {...refresh && { on: "@click:reload" }}>{actionLabel}</Btn>
      </>
    )}
    {...props}
  >
    <input type="hidden" name="primary-key" />
    <Input type="text" name="name" label="Name" />
    <Input type="text" name="icon" label="Icon" />
    <Input type="text" name="alt-text" label="Alt Text" />
    <Input type="text" name="description" label="Description" />
    <Select name="payments" label="Payments" options={[
      // { selected: true, disabled: true, label: "Select" },
      { value: "enabled", label: "Enabled" },
      { value: "disabled", label: "Disabled" },
    ]} />
    <Select name="withdrawals" label="Withdrawals" options={[
      // { selected: true, disabled: true, label: "Select" },
      { value: "enabled", label: "Enabled" },
      { value: "disabled", label: "Disabled" },
    ]} />
  </Modal>
)
