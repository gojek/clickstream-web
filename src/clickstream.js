import Network from "./network.js"
import Processor from "./processor.js"
import Scheduler from "./scheduler.js"
import { CUSTOM_EVENT, EVENT_TYPE } from "./constants/index.js"
import EventBus from "./event.js"

export default class Clickstream {
  #tracking
  #processor
  #scheduler
  #network
  #eventBus
  constructor({ event, batch, network } = {}) {
    this.#tracking = true
    this.#eventBus = new EventBus()
    this.#processor = new Processor({
      config: event,
    })

    this.#scheduler = new Scheduler({
      config: batch,
      eventBus: this.#eventBus,
    })

    this.#network = new Network({
      config: network,
    })

    this.#start()
  }

  #start() {
    this.#listeners()
    this.#scheduler.start()
  }

  #listeners() {
    console.log("attached")
    this.#eventBus.on(CUSTOM_EVENT.NEW_BATCH, (e) => {
      const response = this.#network.send(e.detail.batch)
      console.log(response)
    })
  }

  track(proto) {
    if (!this.#tracking) {
      return
    }

    return new Promise((resolve) => {
      const { type, event } = this.#processor.process(proto)

      console.log(type, event)

      if (type === EVENT_TYPE.INSTANT) {
        this.#scheduler.ingest(event)
      } else {
        // noop
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
