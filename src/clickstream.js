// @ts-check
import Transport from "./transport.js"
import Processor from "./processor.js"
import Scheduler from "./scheduler.js"
import EventBus from "./event.js"
import Store from "./store.js"
import Id from "./id.js"
import { CUSTOM_EVENT, EVENT_TYPE, defaultConfig } from "./constants/index.js"
import Validator from "./validator.js"
import { logger } from "./logger.js"
import {
  ClickstreamError,
  DatabaseError,
  errorCodes,
  errorNames,
} from "./error.js"

const logPrefix = "Cickstream:"

const isRealTimeEventsSupported = () => {
  if (globalThis.indexedDB === undefined) {
    return false
  }

  if (globalThis.EventTarget === undefined) {
    return false
  }

  return true
}

export default class Clickstream {
  #tracking
  #processor
  #scheduler
  #transport
  #store
  #id
  #eventBus
  #eventConfig
  #batchConfig
  #networkConfig
  #isRealTimeEventsSupported
  /**
   * @constructor
   * @param options Configuration options
   */
  constructor(
    /** @type {import("./constants/config.js").Config} */ {
      event,
      batch,
      network,
      crypto,
    }
  ) {
    new Validator().validate(event, batch, network, crypto)

    logger.info(logPrefix, "Configuration validation is successful")

    this.#isRealTimeEventsSupported = isRealTimeEventsSupported()

    logger.info(
      logPrefix,
      `QoS1 events are ${
        this.#isRealTimeEventsSupported ? "" : "not"
      } supported`
    )

    this.#eventConfig = Object.assign(defaultConfig.event, event)
    this.#batchConfig = Object.assign(defaultConfig.batch, batch)
    this.#networkConfig = Object.assign(defaultConfig.network, network)

    this.#tracking = true

    this.#store = new Store({
      name: this.#batchConfig.dbName,
    })

    if (this.#isRealTimeEventsSupported) {
      this.#eventBus = new EventBus()
    }

    this.#id = new Id({ crypto })

    this.#processor = new Processor({
      config: this.#eventConfig,
      store: this.#store,
      id: this.#id,
      isRealTimeEventsSupported,
    })

    this.#scheduler = new Scheduler({
      config: this.#batchConfig,
      eventBus: this.#eventBus,
      store: this.#store,
    })

    this.#transport = new Transport({
      config: this.#networkConfig,
      eventBus: this.#eventBus,
      store: this.#store,
      id: this.#id,
    })

    this.#init()
  }

  get logging() {
    return logger.logging
  }

  set logging(value) {
    logger.logging = value
    logger.info(logPrefix, "logging is set to", logger.logging)
  }

  #init() {
    if (this.#isRealTimeEventsSupported) {
      this.#listeners()
      this.#scheduler.start()
      logger.info(logPrefix, "scheduler is up and running")
    }
  }

  #listeners() {
    this.#eventBus?.on(CUSTOM_EVENT.BATCH_CREATED, (e) => {
      logger.debug(logPrefix, "new batch created", e.detail.batch)
      this.#transport.send(e.detail.batch, { retry: true })
    })
  }

  /**
   * Dispatches a new event asynchronously.
   *
   * It processes the event and registers them in the system.
   * It doesn't take network request into account, success of the .track() doesn't mean that event is sent and stored at backend.
   *
   * In case of failure it rejects the promise with error, and in that case event is not registered in the system.
   *
   * @param payload - JavaScript proto instance
   * @returns Promise
   */
  async track(/** @type {object} */ payload) {
    if (!this.#tracking) {
      return Promise.reject(
        new ClickstreamError(
          "Tracking is paused, call .resume() method to resume tracking",
          { code: errorCodes.TRACKING_ERROR }
        )
      )
    }

    if (this.#isRealTimeEventsSupported && !this.#scheduler.isRunning()) {
      this.#scheduler.start()
    }

    if (this.#isRealTimeEventsSupported && !this.#store?.isOpen()) {
      try {
        await this.#store.open()
      } catch (error) {
        return Promise.reject(
          new DatabaseError(error.message, { cause: error })
        )
      }
    }

    const { type, event } = this.#processor.process(payload)

    logger.debug(logPrefix, "event type is set to", type)

    try {
      if (type === EVENT_TYPE.REALTIME) {
        await this.#store.write(event)
        logger.debug(logPrefix, "event is stored in the store", event.eventGuid)
      } else if (type === EVENT_TYPE.INSTANT) {
        logger.debug(logPrefix, "event is sent to transport layer")
        this.#transport.send([event])
      }
    } catch (error) {
      return Promise.reject(
        new ClickstreamError(error.message, { cause: error })
      )
    }
  }

  /**
   * Pauses the tracking.
   *
   * New .track() method calls are ignored, existing events in the system are still processed.
   * Tracking can be resumed by calling .resume() method.
   */
  pause() {
    this.#tracking = false
    logger.debug(logPrefix, "tracking is set to", this.#tracking)
  }

  /**
   * Resumes the tracking if it is paused by calling .pause() method, have no effect otherwise.
   */
  resume() {
    this.#tracking = true
    logger.debug(logPrefix, "tracking is set to", this.#tracking)
  }

  /**
   * frees up all the resource used by the Clickstream instance asynchronously.
   *
   * clears the timeouts and intervals used.
   * removes all the event listeners.
   * flushes all the existing events in the system.
   * deletes the indexedDB database in use.
   *
   * It has no side effect on the working oh the SDK.
   * calling .track() method again will re-create all the timeouts, interval and database for event tracking.
   */
  async free() {
    try {
      await this.#scheduler.free()
      logger.debug(logPrefix, "scheduler resources are released")
      await this.#store.delete()
      logger.debug(logPrefix, "store is deleted")
    } catch (error) {
      return Promise.reject(
        new ClickstreamError(error.message, {
          name: errorNames.CLEANUP_ERROR,
          code: errorCodes.CLEANUP_ERROR,
        })
      )
    }
  }
}
