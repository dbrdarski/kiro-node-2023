import * as ws from "ws"
import WebSocketWrapper from "ws-wrapper"
import { setActionsHandler, runApiAtIndex } from "../api-create.mjs"

// const wss = new ws.WebSocketServer({ noServer: true })
let index = 0

setActionsHandler((fn, ...args) => fn(...args))

export const initWebSocketConnection = () => {
  const wss = new ws.WebSocketServer({ port: 4000 })

  wss.on("connection", (ws) => {
    const id = index++
    console.log(`Established: ${id}`)

    ws = new WebSocketWrapper(ws)
    ws.on("error", console.error)

    ws.on("api", data => {
      const [index, args] = data
      console.log({ index, args })
      try {
        const result = runApiAtIndex(index, args)
        console.log(`RESULT: (${id})`, result)
        return result
      } catch (e) {
        console.error(e)
      }
    })
  })
}
