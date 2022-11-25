import { EVENT_TYPE } from "./constants/index.js"
import { logger } from "./logger.js"

const logPrefix = "Processor:"

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
      logger.info(
        logPrefix,
        `treating "${proto.eventName}" event as QoS0 as QoS1 events are not supported`
      )
      return EVENT_TYPE.INSTANT
    }

    // if the storage is not available, event is treated as instant event
    if (!this.#store.isOpen()) {
      logger.info(
        logPrefix,
        `treating "${proto.eventName}" event as QoS0 as indexedDB is not supported`
      )
      return EVENT_TYPE.INSTANT
    }

    if (this.#config?.classification?.instant?.includes(proto.eventName)) {
      logger.info(
        logPrefix,
        `"${proto.eventName}" event is classified as QoS0 as per configuration`
      )
      return EVENT_TYPE.INSTANT
    }

    logger.info(
      logPrefix,
      `"${proto.eventName}" event is considered as QoS1 by default configuration`
    )
    return EVENT_TYPE.REALTIME
  }

  #createEvent(payload, eventType) {
    const PayloadConstructor = payload.constructor
    const encodedEvent = PayloadConstructor.encode(payload).finish()

    try {
      if (PayloadConstructor.decode) {
        const decodedEvent = PayloadConstructor.decode(encodedEvent)
        logger.debug(logPrefix, "decoded event payload", decodedEvent)
      }
    } catch (err) {
      logger.debug(logPrefix, "event decoding failed", err)
    }

    const typeUrlSplit = PayloadConstructor.getTypeUrl("").split(".")
    const typeUrl = typeUrlSplit[typeUrlSplit.length - 1].toLowerCase()
    const type = this.#config.group
      ? `${this.#config.group}-${typeUrl}`
      : typeUrl

    logger.info(logPrefix, "topic name is set to", type)

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

    logger.info(logPrefix, "created a new event")
    logger.debug(logPrefix, "new event data", event)
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
