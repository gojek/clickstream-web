import Network from "./network.js"
import Processor from "./processor.js"
import Scheduler from "./scheduler.js"
import { CUSTOM_EVENT, EVENT_TYPE } from "./constants/index.js"
import EventBus from "./event.js"
import { defaultConfig } from "./constants/config.js"

export default class Clickstream {
  #tracking
  #processor
  #scheduler
  #network
  #eventBus
  constructor({ event, batch, network } = {}) {
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

    this.#network = new Network({
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

  track(proto) {
    if (!this.#tracking) {
      return
    }

    return new Promise((resolve) => {
      const { type, event } = this.#processor.process(proto)

      if (type === EVENT_TYPE.INSTANT) {
        this.#scheduler.ingest(event)
      }

      resolve("success")
    })
  }

  stop() {
    this.#tracking = false
  }

  start() {
    this.#tracking = true
  }

  destroy() {}
}
