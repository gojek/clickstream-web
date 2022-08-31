// @ts-check
import Transport from "./transport.js"
import Processor from "./processor.js"
import Scheduler from "./scheduler.js"
import EventBus from "./event.js"
import { CUSTOM_EVENT, EVENT_TYPE, defaultConfig } from "./constants/index.js"

export default class Clickstream {
  #tracking
  #processor
  #scheduler
  #transport
  #eventBus
  /**
   * @constructor
   * @param options Configuration options
   */
  constructor({ event, batch, network } = defaultConfig) {
    if (!network.url) {
      throw new Error("Provide url in network config")
    }

    if (!network.headers?.get("Authorization")) {
      throw new Error("Provide Authorization header in network config")
    }

    this.#tracking = true
    this.#eventBus = new EventBus()
    this.#processor = new Processor({
      config: Object.assign(defaultConfig.event, event),
    })

    this.#scheduler = new Scheduler({
      config: Object.assign(defaultConfig.batch, batch),
      eventBus: this.#eventBus,
    })

    this.#transport = new Transport({
      config: Object.assign(defaultConfig.network, network, {
        group: event?.group,
      }),
    })

    this.#init()
  }

  #init() {
    this.#listeners()
    this.#scheduler.start()
  }

  #listeners() {
    this.#eventBus.on(CUSTOM_EVENT.NEW_BATCH, (e) => {
      this.#transport.send(e.detail.batch)
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
  track(/** @type {object} */ payload) {
    return new Promise((resolve, reject) => {
      if (!this.#tracking) {
        reject("Tracking is stopped")
      }

      const { type, event } = this.#processor.process(payload)

      if (type === EVENT_TYPE.INSTANT) {
        this.#scheduler.ingest(event)
      }

      resolve("success")
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
  destroy() {}
}
