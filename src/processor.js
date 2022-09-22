// @ts-check
import { EVENT_TYPE } from "./constants/index.js"
import Id from "./id.js"
export default class Processor {
  #config
  #store
  #id
  constructor({ config, store }) {
    this.#config = config
    this.#store = store
    this.#id = new Id()
  }

  #type(proto) {
    if (this.#config?.classification?.instant?.includes(proto.eventName)) {
      return EVENT_TYPE.INSTANT
    }

    // if the storage is not available, event is treated as instant event
    if (!this.#store.isOpen) {
      return EVENT_TYPE.INSTANT
    }

    return EVENT_TYPE.REALTIME
  }

  #createEvent(payload, eventType) {
    const PayloadConstructor = payload.constructor
    const encodedEvent = PayloadConstructor.encode(payload).finish()

    const typeUrlSplit = PayloadConstructor.getTypeUrl("").split(".")
    const typeUrl = typeUrlSplit[typeUrlSplit.length - 1].toLowerCase()
    const type = this.#config.group
      ? `${this.#config.group}-${typeUrl}`
      : typeUrl

    /** @type {import("./store.js").Event} */
    const event = {
      data: encodedEvent,
      eventType,
      type,
    }

    if (eventType === EVENT_TYPE.REALTIME) {
      event.eventGuid = this.#id.uuidv4()
      event.reqGuid = ""
    }

    return event
  }

  /**
   * Processes an event
   *
   * @param proto - event proto
   * @returns type and event
   */
  process(/** @type {object} */ proto) {
    const type = this.#type(proto)
    const event = this.#createEvent(proto, type)
    return {
      type,
      event,
    }
  }
}
