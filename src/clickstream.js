// @ts-check
import NetworkManager from "./network.js"
import Processor from "./processor.js"
import Scheduler from "./scheduler.js"
import EventBus from "./event.js"
import { CUSTOM_EVENT, EVENT_TYPE, defaultConfig } from "./constants/index.js"

export default class Clickstream {
  #tracking
  #processor
  #scheduler
  #network
  #eventBus
  /**
   * @constructor
   * @param options Configuration options
   */
  constructor({ event, batch, network } = defaultConfig) {
    if (!network.url) {
      throw new Error("Clickstream: Provide url in network config")
    }

    if (!network.headers.get("Authorization")) {
      throw new Error(
        "Clickstream: Provide Authorization header in network config"
      )
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

    this.#network = new NetworkManager({
      config: Object.assign(defaultConfig.network, network),
    })

    this.#init()
  }

  #init() {
    this.#listeners()
    this.#scheduler.start()
  }

  #listeners() {
    this.#eventBus.on(CUSTOM_EVENT.NEW_BATCH, (e) => {
      this.#network.send(e.detail.batch)
    })
  }

  /**
   * Dipatches a new event.
   * @param payload - JavaScript proto instance
   * @returns Promise to get the status of the event track call
   */
  track(/** @type {object} */ payload) {
    if (!this.#tracking) {
      return
    }

    return new Promise((resolve) => {
      const { type, event } = this.#processor.process(payload)

      if (type === EVENT_TYPE.INSTANT) {
        this.#scheduler.ingest(event)
      }

      resolve("success")
    })
  }

  /**
   * Stops the tracking.
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
