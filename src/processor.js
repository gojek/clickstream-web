// @ts-check
import { EVENT_TYPE } from "./constants/index.js"

export default class Processor {
  #config
  #store
  #logger
  #id
  #isRealTimeEventsSupported
  constructor({ config, store, logger, id, isRealTimeEventsSupported }) {
    this.#config = config
    this.#store = store
    this.#logger = logger
    this.#id = id
    this.#isRealTimeEventsSupported = isRealTimeEventsSupported
  }

  #type(proto) {
    if (!this.#isRealTimeEventsSupported) {
      this.#logger.info(
        "Treating event as QoS0 as QoS1 events are not supported"
      )
      return EVENT_TYPE.INSTANT
    }

    // if the storage is not available, event is treated as instant event
    if (!this.#store.isOpen()) {
      this.#logger.info("Treating event as QoS0 as indexedDB is not supported")
      return EVENT_TYPE.INSTANT
    }

    if (this.#config?.classification?.instant?.includes(proto.eventName)) {
      this.#logger.info("Event is classified as QoS0 as per configuration")
      return EVENT_TYPE.INSTANT
    }

    this.#logger.info("Event is considered as QoS1 by default configuration")
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

    this.#logger.info(`Event type is set as ${type}`)

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
