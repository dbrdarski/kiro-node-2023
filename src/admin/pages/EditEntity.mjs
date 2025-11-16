import Btn from "../components/Btn.mjs"
import Input from "../components/Input.mjs"
import Select from "../components/Select.mjs"
// import Textarea from "../components/Textarea.mjs"
import EditPaymentProcessors from "../modals/EditPaymentProcessors.mjs"
import EditPoint from "../modals/EditPoint.mjs"
import { casinos, paymentProcessors, points } from "../entities.mjs"
import PaymentMethods from "./renderers/PaymentMethods.mjs"
import { inputValue, selectOptions, multiSelectOptions } from "../utils.mjs"
import ProsAndCons from "./renderers/ProsAndCons.mjs"

const RatingInput = ({ props: { value } }) => <Select
  label="Rating"
  name="casino-rating"
  options={selectOptions(
    value,
    [
      { disabled: true, label: "Select rating" },
      { value: "1", label: "1 star" },
      { value: "2", label: "2 star" },
      { value: "3", label: "3 star" },
      { value: "4", label: "4 star" },
      { value: "5", label: "5 star" },
    ]
  )}
/>

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

// const multiSelectOptions = (value, options) => {
//   const checkedOptions = new Set

//   return [
//     ...options.map(option => (checkedOptions.add(option.value), {
//       ...value?.includes(option.value) && { checked: true },
//       ...option
//     })),
//     ...value
//       .filter(val => !checkedOptions.has(val))
//       .map(value => ({ label: value, value }))
//   ]
// }

// ({ props: { name, title, action, ...props } }) =>
export default ({ submitText } = {}) => (HtmlPage, { id } = { }) => {
  const casino = casinos.get(id)?.data ?? {};
  const action = id ? "update" : "create"
  const actionLabel = id ? "Update" : "Create"

  return (
    <HtmlPage>
      <style>{pageStyle} - {id}</style>
      <h3 style="margin-top: 0">{actionLabel} {casino.name ? `'${casino.name}'` : "new casino"}</h3>
      <form
        id="edit-casino"
        name={`${action}-casino`}
        on={`@submit:${action}-casino`}
      >
        <div className="form-columns">
          <div className="form-section">
            <h4 style="">Basic Info</h4>
            <div class="casino-form-section">
              { id && <input type="hidden" name="key" value={id} />}
              <Input type="text" label="Casino Name" name="casino-name" required value={inputValue(casino?.name)}/>
              <Select
                name="casino-status"
                label="Casino Status"
                options={selectOptions(casino.status, [
                  { selected: true, disabled: true, label: "Select status" },
                  { value: "open", label: "Open" },
                  { value: "closed", label: "Closed" },
                  { value: "blacklisted", label: "Blacklisted" },
                  { value: "coming-soon", label: "Coming Soon" }
                ])}
              >
              </Select>

              <Input type="input" label="Casino Logo" name="casino-logo" accept="image/*" value={inputValue(casino.logo)} />
              <Input type="text" label="Bonus Text" name="description"  value={inputValue(casino.description)} />

              <RatingInput
                name="rating"
                max={5}
                defaultValue={3}
                value={casino.rating}
              />

              <Input type="textarea" label="Terms and Conditions Text" name="terms-text" value={inputValue(casino.termsText)} />
              <Input type="url" label="Terms and Conditions Link" name="terms-link" value={inputValue(casino.termsUrl)} />

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

              <Input type="url" label="Affiliate Tracking Link" name="affiliate-link" value={inputValue(casino.affiliateLinkUrl)} />
              <Input type="text" label="Review Button Text" name="review-button-text" value={inputValue(casino.reviewButtonText)} />
              <Input type="text" label="Company Button Text" name="company-button-text" value={inputValue(casino.companyButtonText)} />
              <Input type="text" label="License" name="license" value={inputValue(casino.licence)} />
              <Input type="text" label="Company Owner" name="owner" value={inputValue(casino.owner)} />
            </div>
          </div>
          <div className="form-section">
            <h4 style="">Casino Details</h4>
            <div class="casino-form-section">
              <Input type="text" label="Bonus Code" name="bonus-code" value={inputValue(casino.bonusCode)} />
              <Input type="text" label="Wagering Requirements" name="wagering-requirements" value={inputValue(casino.wageringRequirements)} />
              <Input type="text" label="Payout Time" name="payout-time" value={inputValue(casino.payoutTime)} />
              <Input type="number" label="Game Count" name="game-count" min="0" value={inputValue(casino.gameCount)} />
              <Input type="number" label="Game Providers" name="game-providers" min="0" value={inputValue(casino.gameProviders)} />
              <Input type="number" label="Jackpot Slots" name="jackpot-slots" min="0" value={inputValue(casino.jackpotSlots)} />
              <Input type="textarea" label="Casino Offers Text" name="offers-text" value={inputValue(casino.offersText)} />
            </div>
          </div>

          <PaymentMethods
            depositMethods={casino.depositMethods}
            withdrawalMethods={casino.withdrawalMethods}
            paymentProcessorsApi={paymentProcessors}
          />

          <ProsAndCons
            positivePoints={casino.positivePoints}
            negativePoints={casino.negativePoints}
            pointsApi={points}
          />
        </div>

        <div className="form-actions">
          <h4 style=""></h4>
          <Btn>{actionLabel}</Btn>
        </div>
      </form>
      <EditPaymentProcessors
        action="create"
        actionLabel="Create"
        init
      />
      <EditPoint
        action="create"
        actionLabel="Create"
      />
      <div id="modal-section" />
    </HtmlPage>
  )
}
