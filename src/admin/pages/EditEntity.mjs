import Btn from "../components/Btn.mjs"
import Input from "../components/Input.mjs"
import Select from "../components/Select.mjs"
import Textarea from "../components/Textarea.mjs"
import MultipleOptions from "../components/MultipleOptions.mjs"
import Expand from "../components/Expand.mjs"
import EditPaymentProcessors from "../modals/EditPaymentProcessors.mjs"
import { paymentProcessors } from "../entities.mjs"

// const MultiSelect = () => <div>MultiSelect</div>
const MultiInput = () => <div>MultiInput</div>
const RatingInput = () => <Select
  label="Rating"
  name="casino-rating"
  options={[
  { selected: true, disabled: true, label: "Select rating" },
  { value: "1", label: "1 star" },
  { value: "2", label: "2 star" },
  { value: "3", label: "3 star" },
  { value: "4", label: "4 star" },
  { value: "5", label: "5 star" },
]} />

const pageStyle = `
  .casino-form-section {
    display: grid;
    gap: 20px;
  }

  @media screen and (min-width: 600px) {
    .casino-form-section {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (min-width: 800px) {
    .casino-form-section {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
    }
  }

  @media screen and (min-width: 1200px) {
    .casino-form-section {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 20px;
    }
  }
`

// ({ props: { name, title, action, ...props } }) =>
export default ({ submitText, action = () => { } } = {}) => HtmlPage => (
  <HtmlPage>
    <style>{pageStyle}</style>
    <h3 style="margin-top: 0">Create new entity</h3>
    <form name="new-page">
      <div className="form-columns">
        <div className="form-section">
          <h4 style="">Basic Info</h4>
          <div class="casino-form-section">
            <Input type="text" label="Casino Name" name="casino-name" required />
            <Select
              name="casino-status"
              label="Casino Status"
              options={[
                { selected: true, disabled: true, label: "Select status" },
                { value: "open", label: "Open" },
                { value: "closed", label: "Closed" },
                { value: "blacklisted", label: "Blacklisted" },
                { value: "coming-soon", label: "Coming Soon" }
              ]}
            >
            </Select>

            <Input type="input" label="Casino Logo" name="casino-logo" accept="image/*" cask/>
            <Input type="text" label="Bonus Text" name="bonus-text" />

            <RatingInput
              name="rating"
              max={5}
              defaultValue={3}
            />

            <Input type="textarea" label="Terms and Conditions Text" name="terms-text" />
            <Input type="url" label="Terms and Conditions Link" name="terms-link" />

            {/* <Select
              name="button-text"
              label="Casino status"
              options={[
                { selected: true, disabled: true, label: "Select status" },
                { value: "play", label: "Play" },
                { value: "closed", label: "Closed" },
                { value: "blacklisted", label: "Blacklisted" }
              ]}
            />*/}

            <Input type="url" label="Affiliate Tracking Link" name="affiliate-link" />
            <Input type="text" label="Review Button Text" name="review-button-text" />
            <Input type="text" label="Company Button Text" name="company-button-text" />
            <Input type="text" label="License" name="license" />
            <Input type="text" label="Company Owner" name="owner" />
          </div>
        </div>
        <div className="form-section">
          <h4 style="">Casino Details</h4>
          <div class="casino-form-section">
            <Input type="text" label="Bonus Code" name="bonus-code" />
            <Input type="text" label="Wagering Requirements" name="wagering-requirements" />
            <Input type="text" label="Payout Time" name="payout-time" />
            <Input type="number" label="Game Count" name="game-count" min="0" />
            <Input type="number" label="Game Providers" name="game-providers" min="0" />
            <Input type="number" label="Jackpot Slots" name="jackpot-slots" min="0" />
            <Input type="textarea" label="Casino Offers Text" name="offers-text" />
          </div>
        </div>

        <div className="form-section">
          <h4 style="display: flex">
            <span>Payment Methods</span>
            <Expand />
            <Btn size="xs" on="@click:open-modal-create-payment-processor">Add payment method</Btn>

          </h4>
          <div class="casino-form-section" style="grid-template-columns: 1fr;">
            <MultipleOptions
              label="Deposit Methods"
              name="deposit-methods"
              options={paymentProcessors.all().filter(x => x.data.paymentEnabled).map(({ data: { name }}) => ({ label: name, value: name })) }
            />

            <MultipleOptions
              label="Withdrawal Methods"
              name="withdrawal-methods"
              options={paymentProcessors.all().filter(x => x.data.withdrawalEnabled).map(({ data: { name }}) => ({ label: name, value: name }))}
            />
          </div>

          <h4 style="">Pros and Cons</h4>
          <div class="casino-form-section">
            <Textarea
              name="pros"
              label="Add positive point"
              addButtonText="Add another positive"
            />

            <Textarea
              name="cons"
              label="Add negative point"
              addButtonText="Add another negative"
            />
          </div>
        </div>
      </div>

      <div className="form-actions">
        <h4 style=""></h4>
        <Btn>{submitText || "Save Changes"}</Btn>
      </div>
    </form>
    <EditPaymentProcessors
      action="create"
      actionLabel="Create"
    />
    <div id="modal-section" />
  </HtmlPage>
)
