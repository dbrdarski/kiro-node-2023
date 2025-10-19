import Btn from "../components/Btn.mjs"
import Expand from "../components/Expand.mjs"
import Table from "../components/Table.mjs"
import { casinos, paymentProcessors, points } from "../entities.mjs"
import Edit from "../icons/Edit.mjs"
import Delete from "../icons/Delete.mjs"
import EditPaymentProcessors from "../modals/EditPaymentProcessors.mjs"
import EditPoint from "../modals/EditPoint.mjs"
import DeleteEntity from "../modals/DeleteEntity.mjs"

const casinoFields = [{
  field: "name",
  label: "Name",
  value: field => field.data.name,
}, {
  field: "status",
  label: "Status",
  value: field => field.data.status ?? "N/A",
}, {
  field: "description",
  label: "Description",
  value: field => field.data.description,
}, {
  field: "actions",
  label: "Actions",
  value: field => (
    <Edit fill="#09f" style="height: 24px; margin: -6px 0;"
      data-key={field.id ?? ""}
      on="@click:edit-casino"
    />
  ),
  align: "right"
}]

const paymentProcessorFields = [{
  field: "name",
  label: "Name",
  value: field => field.data.name,
}, {
  field: "icon",
  label: "Icon",
  value: field => field.data.icon ?? "N/A",
}, {
  field: "description",
  label: "Description",
  value: field => field.data.description,
}, {
  field: "paymentEnabled",
  label: "Payments",
  value: field => field.data.paymentEnabled ? "✓ Enabled" : "✕ Disabled",
}, {
  field: "withdrawalEnabled",
  label: "Withdrawals",
  value: field => field.data.withdrawalEnabled ? "✓ Enabled" : "✕ Disabled",
}, {
  field: "actions",
  label: "Actions",
  value: field => (<>
    <Edit
      fill="#09f"
      style="height: 24px; margin: -6px 0; vertical-align: middle;"
      data-key={field.id ?? ""}
      data-name={field.data.name ?? ""}
      data-icon={field.data.icon ?? ""}
      data-description={field.data.description ?? ""}
      data-payment-enabled={field.data.paymentEnabled ?? ""}
      data-withdrawal-enabled={field.data.withdrawalEnabled ?? ""}
      on="@click:open-modal-update-payment-processor"
    />
    <Delete
      edit-control
      edit-icon
      style="vertical-align: middle;"
      data-key={field.id ?? ""}
      data-name={field.data.name ?? ""}
      on="@click:open-modal-delete-payment-processor"
    />
  </>),
  align: "right"
}]

const pointFields = [{
  field: "name",
  label: "Name",
  value: field => field.data.name,
}, {
  field: "type",
  label: "Type",
  value: field => field.data.icon ?? "N/A",
}, {
  field: "shortDescription",
  label: "Short Description",
  value: field => field.data.shortDescription,
}, {
  field: "fullDescription",
  label: "Full Description",
  value: field => field.data.fullDescription,
}, {
  field: "actions",
  label: "Actions",
  value: field => (<>
    <Edit
      fill="#09f"
      style="height: 24px; margin: -6px 0; vertical-align: middle;"
      data-key={field.id ?? ""}
      data-name={field.data.name ?? ""}
      data-type={field.data.type ?? ""}
      data-short-description={field.data.shortDescription ?? ""}
      data-full-description={field.data.fullDescription ?? ""}
      on="@click:open-modal-update-point"
    />
    <Delete
      edit-control
      edit-icon
      style="vertical-align: middle;"
      data-key={field.id ?? ""}
      data-name={field.data.name ?? ""}
      on="@click:open-modal-delete-point"
    />
  </>),
  align: "right"
}]

export default () => HtmlPage => {
  const casinoEntities = casinos.all()
  const processorEntities = paymentProcessors.all()
  const pointEntites = points.all()
  // const logs = validateAlbums()
  // const errors = logs.grouped.ERR?.album ?? {}
  // const warnings = logs.grouped.WARN?.album ?? {}

  return (
    <HtmlPage title="Collections">
      <h3 style="margin-top: 0">Entities</h3>
      <p style="text-transform: uppercase; font-size: 12px; letter-spacing: .1em; color: #777; margin: -8px 0 32px;">Manage entities by type</p>
      {/* <pre>{JSON.stringify(processorEntities, null, 2)}</pre>*/}

      <Table
        title="Casinos"
        columns={casinoFields}
        data={casinoEntities}
        minWidth="800px"
        maxHeight="146px"
        footer={(
          <div style="display: flex; align-items: center; font-size: 13px;">
            {String(Object.keys(casinoEntities).length)} casinos
            <Expand />
            <Btn type="link" href="/entities/casinos/new">Create new</Btn>
          </div>
        )}
      />
      <br />
      <Table
        title="Payment processors"
        columns={paymentProcessorFields}
        data={processorEntities}
        minWidth="800px"
        footer={(
          <Btn on="@click:open-modal-create-payment-processor">Create new</Btn>
        )}
      />
      <br />
      <Table
        title="Points"
        columns={pointFields}
        data={pointEntites}
        minWidth="800px"
        footer={(
          <Btn on="@click:open-modal-create-point">Create new</Btn>
        )}
      />

      {/* <pre>{JSON.stringify(paymentEnabledProcessors)}</pre>
      <pre>{JSON.stringify(withdrawalEnabledProcessors)}</pre>*/}
      <DeleteEntity

      />
      <EditPaymentProcessors
        action="update"
        actionLabel="Update"
        init="update-payment-processor"
      />
      <EditPaymentProcessors
        action="create"
        actionLabel="Create"
      />
      <DeleteEntity
        action="payment-processor"
        type="payment processor"
        init="delete-payment-processor"
      />
      <EditPoint
        action="create"
        actionLabel="Create"
      />
      <EditPoint
        action="update"
        actionLabel="Update"
        init="update-point"
      />
      <DeleteEntity
        action="point"
        type="point"
        init="delete-point"
      />

      <div id="modal-section" />
      {/* <h4 style="margin-top: 0">Casinos</h4>
      <pre>{JSON.stringify(casinoEntities, null, 2)}</pre>
      <Btn type="link" href="/entities/casinos/new">Create new</Btn>*/}
    </HtmlPage>
  )
}
