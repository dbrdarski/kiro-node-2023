import WebSocketWrapper from "ws-wrapper"

import { api } from "../api/index.mjs";
import { setActionsHandler } from "../api-create.mjs";

const log = txt => value => (console.log(txt, value), value)

const ws = new WebSocketWrapper(
  new WebSocket("ws://localhost:4000")
)

import Sortable from "sortablejs";

setActionsHandler(
  (_, i, ...args) => ws.request("api", [i, args]).then(
    log("SOCKET RETURN: ")
  )
)

// api.generateImages()
api.echo(33)
const actionRegex = /(@(?<event>[^:]+)[:])?(?:\s)?(?<action>[^:]+)$/

const updateButtonsDisabledState = container => {
  const saveBtn = container.querySelector("[on=add-to-collection--save]")
  const selectAllBtn = container.querySelector("[on=select-all-images]")
  const removeAllBtn = container.querySelector("[on=unselect-all-images]")
  const { length: selectedLength } = container.querySelectorAll("img[selected]")
  const { length: selectableLength } = container.querySelectorAll("img[selectable]")
  selectedLength
    ? saveBtn.removeAttribute("disabled")
    : saveBtn.setAttribute("disabled", "disabled")

  selectedLength
    ? removeAllBtn.removeAttribute("disabled")
    : removeAllBtn.setAttribute("disabled", "disabled")

  selectedLength === selectableLength
    ? selectAllBtn.setAttribute("disabled", "disabled")
    : selectAllBtn.removeAttribute("disabled")
}

const execAction = (matchedAttr, element, initiator = null) => (event) => {
  event.preventDefault()
  console.log("DISPATCH: ", { element, matchedAttr, event })

  switch (matchedAttr) {
    // case "create-collection": {
    //   const data = new FormData(event.target)
    //   const name = data.get("collection-name")
    //   api.createCollection(name)
    //   window.location.reload()
    //   break
    // }
    case "create-collection": {
      const data = new FormData(event.target)
      const name = data.get("collection-name")
      const title = data.get("collection-title")
      const description = data.get("collection-description")
      console.log({ name, title, description })
      api.createCollection(name, { title, description })
      window.location.reload()
      break
    }
    case"update-collection": {
      event.target.querySelector("[name=collection-name]").removeAttribute("disabled")
      const data = new FormData(event.target)
      const name = data.get("collection-name")
      const title = data.get("collection-title")
      const description = data.get("collection-description")
      api.updateCollectionMetadata(name, { title, description })
      window.location.reload()
      break
    }
    case"delete-collection": {
      api.deleteCollection(event.target.dataset.name)
      window.location.reload()
      break
    }
    case "collection-action": {
      element.dispatchEvent(new Event(event.target.value, { bubbles: true }))
      break
    }
    case "update-collection-items": {
      const parent = event.target.parentElement.parentElement.parentElement
      const container = parent.querySelector("[sortable-container]")
      const items = [...container?.children].map(el => ({ ... el.dataset }))
      const name = parent.dataset.name
      api.updateCollectionItems(name, items)
      window.location.reload()
      break
    }
    case "cancel-action": {
      window.location.reload()
      break
    }
    case "init-modal-update-collection": {
      const element = event.target
      const { name, title, description } = initiator.dataset
      const nameInput = element.querySelector("[name=collection-name]")
      const titleInput = element.querySelector("[name=collection-title]")
      const descriptionInput = element.querySelector("[name=collection-description]")
      nameInput.setAttribute("value", name)
      nameInput.setAttribute("disabled", "disabled")
      titleInput.setAttribute("value", title)
      descriptionInput.setAttribute("value", description)
      break
    }
    case "init-modal-delete-collection": {
      const element = event.target
      element.dataset.name = initiator.dataset.name
      break
    }
    case "edit-collection-items": {
      const element = event.target
      element.parentElement.parentElement.parentElement.setAttribute("mode", "edit")
      break
    }
    case "add-to-collection--save": {
      const container = event.target.parentElement.parentElement
      const select = container.querySelector("select")
      const selected = [...container.querySelectorAll("img[selected]")]
        .map(image => ({ ...image.dataset }))
      api.addCollectionItems(select.value, selected)
      window.location.reload()
      break
    }
    case "add-to-collection--cancel": {
      window.location.reload()
      break
    }
    case "select-all-images": {
      const { target }  = event
      const container = target.parentElement.parentElement
      container.querySelectorAll("img[selectable]").forEach(img => {
        img.setAttribute("selected", "")
      })
      updateButtonsDisabledState(container)
      break
    }
    case "unselect-all-images": {
      const { target }  = event
      const container = target.parentElement.parentElement
      container.querySelectorAll("img[selectable]").forEach(img => {
        img.removeAttribute("selected")
      })
      updateButtonsDisabledState(container)
      break
    }
    case "select-images": {
      const { target, target: { value } }  = event
      const container = target.parentElement.parentElement
      container.setAttribute("mode", value ? "edit" : "preview")
      container.querySelectorAll("img[selectable]").forEach(img => {
        img.addEventListener("click", event => {
          const { target } = event
          target.hasAttribute("selected") ? target.removeAttribute("selected") : target.setAttribute("selected", "")
          updateButtonsDisabledState(container)
        })
      })
      break
    }
    case "remove-image-from-collection": {
      const container = event.currentTarget.parentElement
      container.remove()
      break
    }
    case "fix-image-data": {
      const target = event.currentTarget
      const container = target.parentElement
      Object.assign(container.dataset, target.dataset)
      container.removeAttribute("data-status")
      break
    }
    // case "open-modal:createCollection": {
    // }
    default: {
      element.dispatchEvent(new Event(matchedAttr, { bubbles: true }))
    }
  }
}

const initTriggers = parent => {
  initActionTriggers(parent)
  initModalTriggers(parent)
  initSortable(parent)
}

const initActionTrigger = element => {
  const match = element.getAttribute("on").match(actionRegex);
  if (!match) return
  const { event, action } = match.groups
  element.addEventListener(event ?? "click", execAction(action, element))
}

const initActionTriggers = parent => {
  if (parent !== document) {
    initActionTrigger(parent)
  }
  parent.querySelectorAll("[on]").forEach(initActionTrigger)
}

const initModalTriggers = parent => {
  const templates = parent.querySelectorAll("template[modal]")
  templates.forEach(template => {
    const name = template.getAttribute("modal")
    parent.addEventListener(`open-modal-${name}`, (event) => {
      const modal = document.importNode(template.content, true).childNodes[0]
      const init = modal.getAttribute("init")
      initTriggers(modal)
      document.getElementById("modal-section").appendChild(modal)
      init && modal.addEventListener(`init-modal-${init}`, execAction(`init-modal-${init}`, modal, event.target))
      init && modal.dispatchEvent(new Event(`init-modal-${init}`, { bubbles: true }))
      modal.addEventListener(`close-modal-${name}`, () => {
        document.getElementById("modal-section").removeChild(modal)
        window.location.reload()
      })
    })
  })
}

const initSortable = parent => {
  parent.querySelectorAll("[sortable-container]").forEach(el => Sortable.create(el, { animation: 150 }))
}

window.onload = () => {
  initTriggers(document)
};
