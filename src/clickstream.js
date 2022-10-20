// @ts-check
import Transport from "./transport.js"
import Processor from "./processor.js"
import Scheduler from "./scheduler.js"
import EventBus from "./event.js"
import Store from "./store.js"
import Id from "./id.js"
import { CUSTOM_EVENT, EVENT_TYPE, defaultConfig } from "./constants/index.js"
import Validator from "./validator.js"
import { ClickstreamError, DatabaseError, errorCode } from "./error.js"

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

    this.#isRealTimeEventsSupported = isRealTimeEventsSupported()

    this.#eventConfig = Object.assign(defaultConfig.event, event)
    this.#batchConfig = Object.assign(defaultConfig.batch, batch)
    this.#networkConfig = Object.assign(defaultConfig.network, network)

    this.#tracking = true

    this.#store = new Store({ name: this.#batchConfig.dbName })

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

  #init() {
    this.#listeners()
    this.#scheduler.start()
  }

  #listeners() {
    this.#eventBus?.on(CUSTOM_EVENT.BATCH_CREATED, (e) => {
      this.#transport.send(e.detail.batch, { retry: true })
    })
  }

  /**
   * Dipatches a new event.
   *
   * Used to dispatch an event, return a promise with status of the track call.
   *
   * @param payload - JavaScript proto instance
   * @returns Promise to get the status of the event track call
   */
  async track(/** @type {object} */ payload) {
    if (!this.#tracking) {
      return Promise.reject(
        new ClickstreamError("Tracking is stopped", errorCode.TRACKING_STOPPED)
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

    try {
      if (type === EVENT_TYPE.REALTIME) {
        await this.#store.write(event)
      } else if (type === EVENT_TYPE.INSTANT) {
        this.#transport.send([event])
      }
    } catch (error) {
      return Promise.reject(
        new ClickstreamError(error.message, { cause: error })
      )
    }
  }

  /**
   * Stops the tracking.
   *
   * Track function call is ignored, existing events are processed.
   */
  stop() {
    this.#tracking = false
  }

  /**
   * Resumes the tracking.
   */
  start() {
    this.#tracking = true
  }

  /**
   * Releases all the resources used.
   */
  async destroy() {
    try {
      await this.#scheduler.destroy()
      await this.#store.delete()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
