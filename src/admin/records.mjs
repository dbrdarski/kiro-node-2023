import { once } from "../framework/utils.mjs"
import { idGenerator } from "../framework/utils.mjs"

export const record = (name, path) => {
  const generateId = idGenerator()

  const initSettings = once(async () => {
    const { useSettings } = await import("../framework/helpers.mjs")
    return useSettings(path, {})
  })

  const loadRecords = async () => (await initSettings()).read()
  const saveRecords = async (records) => (await initSettings()).write({...records})

  const initRecords = async () => {
    const loadedRecords = await loadRecords()
    for (const record of Object.values(loadedRecords)) {
      records[record.id] = record
    }
  }

  const records = Object.create(null)

  const getRecords = () => Object.values(records)
  const getRecord = id => records[id]

  const createRecord = (data) => {
    const id = generateId()

    records[id] = { id, data }
    saveRecords(records)
    return id
  }

  const deleteRecord = (id) => {
    if (!(id in records)) {
      throw Error(`Invalid '${name}' record ${id}`)
    }
    delete records[id]
    saveRecords(records)
    return id
  }

  const updateRecord = (id, data) => {
    if (!(id in records)) {
      throw Error(`Invalid '${name}' record ${id}`)
    }
    console.log("UPDATE", { id, data })
    records[id].data = data
    saveRecords(records)
    return getRecord(id)
  }

  return {
    init: initRecords,
    all: getRecords,
    get: getRecord,
    create: createRecord,
    delete: deleteRecord,
    update: updateRecord,
  }
}
