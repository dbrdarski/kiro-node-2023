import { action } from "../api-create.mjs"
import { casinos } from "../entities.mjs"

export const getCasino = action(casinos.get)
export const getCasinos = action(casinos.all)
export const createCasino = action(casinos.create)
export const updateCasino = action(casinos.update)
export const deleteCasino = action(casinos.delete)
export const initCasinos = action(casinos.init)
