import Expand from "../../components/Expand.mjs"
import Btn from "../../components/Btn.mjs"
import MultipleOptions from "../../components/MultipleOptions.mjs"
import { multiSelectOptions } from "../../utils.mjs"

export default ({ props: { depositMethods, withdrawalMethods, paymentProcessorsApi }}) => (
  <div className="form-section" id="payment-methods">
    <h4 style="display: flex">
      <span>Payment Methods</span>
      <Expand />
      <Btn size="xs" on="@click:open-modal-create-payment-processor">Add payment method</Btn>

    </h4>
    <div class="casino-form-section" style="grid-template-columns: 1fr;">
      <MultipleOptions
        label="Deposit Methods"
        name="deposit-methods"
        options={multiSelectOptions(
          depositMethods,
          paymentProcessorsApi.all().filter(x => x.data.paymentEnabled).map(({ data: { name } }) => ({ label: name, value: name }))
        )}
      />

      <MultipleOptions
        label="Withdrawal Methods"
        name="withdrawal-methods"
        options={multiSelectOptions(
          withdrawalMethods,
          paymentProcessorsApi.all().filter(x => x.data.withdrawalEnabled).map(({ data: { name }}) => ({ label: name, value: name }))
        )}
      />
    </div>
  </div>
)
