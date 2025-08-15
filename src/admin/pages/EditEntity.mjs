import Input from "../components/Input.mjs"
import Select from "../components/Select.mjs"

const MultiSelect = () => <div>MultiSelect</div>
const MultiInput = () => <div>MultiInput</div>
const RatingInput = () => <div>RatingInput</div>

// ({ props: { name, title, action, ...props } }) =>
export default ({ action = () => { } } = {}) => HtmlPage => (
  <HtmlPage>
    <h3>Hello</h3>
    <form name="new-page">
      <div className="form-columns">
        <div className="form-section">
          <h3>Basic Info</h3>
          <div class="casino-form-section">
            <Input type="text" placeholder="Casino Name" name="casino-name" required />
            <Select
              name="casino-status"
              options={[
                { selected: true, disabled: true, label: "Select status" },
                { value: "open", label: "Open" },
                { value: "closed", label: "Closed" },
                { value: "blacklisted", label: "Blacklisted" },
                { value: "coming-soon", label: "Coming Soon" }
              ]}
            >
            </Select>

            <Input type="input" name="casino-logo" accept="image/*" />
            <Input type="text" placeholder="Bonus Text" name="bonus-text" />

            <RatingInput
              name="rating"
              max={5}
              defaultValue={3}
            />

            <Input type="textarea" placeholder="Terms and Conditions Text" name="terms-text" />
            <Input type="url" placeholder="Terms and Conditions Link" name="terms-link" />

            <Select
              name="button-text"
              options={[
                { selected: true, disabled: true, label: "Select status" },
                { value: "play", label: "Play" },
                { value: "closed", label: "Closed" },
                { value: "blacklisted", label: "Blacklisted" }
              ]}
            />

            <Input type="url" placeholder="Affiliate Tracking Link" name="affiliate-link" />
            <Input type="text" placeholder="Review Button Text" name="review-button-text" />
            <Input type="text" placeholder="Company Button Text" name="company-button-text" />
            <Input type="text" placeholder="License" name="license" />
            <Input type="text" placeholder="Company Owner" name="owner" />
          </div>
        </div>
        <div className="form-section">
          <h3>Casino Details</h3>
          <Input type="text" placeholder="Bonus Code" name="bonus-code" />
          <Input type="text" placeholder="Wagering Requirements" name="wagering-requirements" />
          <Input type="text" placeholder="Payout Time" name="payout-time" />
          <Input type="number" placeholder="Game Count" name="game-count" min="0" />
          <Input type="number" placeholder="Game Providers" name="game-providers" min="0" />
          <Input type="number" placeholder="Jackpot Slots" name="jackpot-slots" min="0" />
          <Input type="textarea" placeholder="Casino Offers Text" name="offers-text" />
        </div>

        <div className="form-section">
          <h3>Payment Methods</h3>
          <MultiSelect
            name="deposit-methods"
            options={[
              { value: "visa", label: "Visa" },
              { value: "mastercard", label: "Mastercard" },
              { value: "skrill", label: "Skrill" },
              { value: "neteller", label: "Neteller" },
              { value: "paypal", label: "PayPal" },
              { value: "bank-transfer", label: "Bank Transfer" },
              { value: "crypto", label: "Cryptocurrency" }
            ]}
          />

          <MultiSelect
            name="withdrawal-methods"
            options={[]}
          />

          <h3>Pros and Cons</h3>
          <MultiInput
            name="pros"
            placeholder="Add positive point"
            addButtonText="Add another positive"
          />

          <MultiInput
            name="cons"
            placeholder="Add negative point"
            addButtonText="Add another negative"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit">{action || "Save Changes"}</button>
      </div>
    </form>
  </HtmlPage>
)
