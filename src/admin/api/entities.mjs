import { action } from "../api-create.mjs"
import { casinos, paymentProcessors } from "../entities.mjs"

export const getCasino = action(casinos.get)
export const getCasinos = action(casinos.all)
export const createCasino = action(casinos.create)
export const updateCasino = action(casinos.update)
export const deleteCasino = action(casinos.delete)
export const initCasinos = action(casinos.init)

export const getPaymentProcessor = action(paymentProcessors.get)
export const getPaymentProcessors = action(paymentProcessors.all)
export const createPaymentProcessor = action(paymentProcessors.create)
export const updatePaymentProcessor = action(paymentProcessors.update)
export const deletePaymentProcessor = action(paymentProcessors.delete)
export const initPaymentProcessors = action(paymentProcessors.init)
