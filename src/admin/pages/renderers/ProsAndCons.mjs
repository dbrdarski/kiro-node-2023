import Expand from "../../components/Expand.mjs"
import Btn from "../../components/Btn.mjs"
import FilteredMultipleOptions from "../../components/FilteredMultipleOptions.mjs"
import { multiSelectOptions } from "../../utils.mjs"

export default ({ props: { positivePoints, negativePoints, pointsApi } }) => (
  <div className="form-section" id="pros-and-cons">
    <h4 style="display: flex">
      <span>Pros and Cons</span>
      <Expand />
      <Btn size="xs" on="@click:open-modal-create-point">Add point</Btn>
    </h4>
    <div class="casino-form-section">
      <FilteredMultipleOptions
        label="Positive Points"
        name="positive-points"
        options={multiSelectOptions(
          positivePoints,
          pointsApi.all().filter(x => x.data.type === "positive").map(({ data: { name }}) => ({ label: name, value: name }))
        )}
      />
      <FilteredMultipleOptions
        label="Negative Points"
        name="negative-points"
        options={multiSelectOptions(
          negativePoints,
          pointsApi.all().filter(x => x.data.type === "negative").map(({ data: { name }}) => ({ label: name, value: name }))
        )}
      />
    </div>
  </div>
)
