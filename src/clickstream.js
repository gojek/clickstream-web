// @ts-check
import Transport from "./transport.js"
import Processor from "./processor.js"
import Scheduler from "./scheduler.js"
import EventBus from "./event.js"
import { CUSTOM_EVENT, EVENT_TYPE, defaultConfig } from "./constants/index.js"
import Store from "./store.js"

export default class Clickstream {
  #tracking
  #processor
  #scheduler
  #transport
  #store
  #eventBus
  #eventConfig
  #batchConfig
  #networkConfig
  /**
   * @constructor
   * @param options Configuration options
   */
  constructor(
    /** @type {import("./constants/config.js").Config} */ {
      event,
      batch,
      network,
    } = defaultConfig
  ) {
    if (!network.url) {
      throw new Error("Provide url in network config")
    }

    if (!network.headers?.get("Authorization")) {
      throw new Error("Provide Authorization header in network config")
    }

    this.#eventConfig = Object.assign(defaultConfig.event, event)
    this.#batchConfig = Object.assign(defaultConfig.batch, batch)
    this.#networkConfig = Object.assign(defaultConfig.network, network)

    this.#tracking = true
    this.#eventBus = new EventBus()
    this.#store = new Store({})

    this.#processor = new Processor({
      config: this.#eventConfig,
      store: this.#store,
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
    })

    this.#init()
  }

  #init() {
    this.#listeners()
    this.#scheduler.start()
  }

  #listeners() {
    this.#eventBus.on(CUSTOM_EVENT.BATCH_CREATED, (e) => {
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
      return Promise.reject("Tracking is stopped")
    }

    if (!this.#store.isOpen) {
      try {
        await this.#store.open()
      } catch (error) {
        Promise.reject(error)
      }
    }

    return new Promise((resolve, reject) => {
      try {
        const { type, event } = this.#processor.process(payload)

        if (type === EVENT_TYPE.REALTIME) {
          this.#store.write(event)
        } else if (type === EVENT_TYPE.INSTANT) {
          this.#transport.send([event])
        }

        resolve("success")
      } catch (error) {
        reject(error)
      }
    })
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
      await this.#store.delete()
      return Promise.resolve("success")
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
