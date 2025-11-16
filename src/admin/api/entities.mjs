import { action } from "../api-create.mjs"
import { printHTMLPartial } from "../../jsx.mjs"
import { casinos, paymentProcessors, points } from "../entities.mjs"
import PaymentMethods from "../pages/renderers/PaymentMethods.mjs"
import ProsAndCons from "../pages/renderers/ProsAndCons.mjs"

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
export const renderPaymentProcessors = action(({ depositMethods, withdrawalMethods }) => {
  return printHTMLPartial(
    <PaymentMethods
      depositMethods={depositMethods}
      withdrawalMethods={withdrawalMethods}
      paymentProcessorsApi={paymentProcessors}
    />
  )
})

export const getPoint = action(points.get)
export const getPoints = action(points.all)
export const renderProsAndCons = action(({ positivePoints, negativePoints }) => {
  return printHTMLPartial(
    <ProsAndCons
      positivePoints={positivePoints}
      negativePoints={negativePoints}
      pointsApi={points}
    />
  )
})

export const createPoint = action(points.create)
export const updatePoint = action(points.update)
export const deletePoint = action(points.delete)
export const initPoints = action(points.init)
