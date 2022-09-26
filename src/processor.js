// @ts-check
import { EVENT_TYPE } from "./constants/index.js"

export default class Processor {
  #config
  #store
  #id
  #isRealTimeEventsSupported
  constructor({ config, store, id, isRealTimeEventsSupported }) {
    this.#config = config
    this.#store = store
    this.#id = id
    this.#isRealTimeEventsSupported = isRealTimeEventsSupported
  }

  #type(proto) {
    if (!this.#isRealTimeEventsSupported) {
      console.log(
        "Clickstream: Treating event as QoS0 as QoS1 events are not supported"
      )
      return EVENT_TYPE.INSTANT
    }

    // if the storage is not available, event is treated as instant event
    if (!this.#store.isOpen) {
      console.log(
        "Clickstream: Treating event as QoS0 as indexedDB is not supported in your browser"
      )
      return EVENT_TYPE.INSTANT
    }

    if (this.#config?.classification?.instant?.includes(proto.eventName)) {
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
