import Network from "./network.js"
import Processor from "./processor.js"
import Scheduler from "./scheduler.js"
import { EVENT_TYPE } from "./constants/index.js"

export default class Clickstream {
  #tracking = true
  #processor = null
  #scheduler = null
  #network = null
  constructor({ event, batch, network } = {}) {
    this.#processor = new Processor({
      config: event,
    })

    this.#scheduler = new Scheduler({
      config: batch,
    })

    this.#network = new Network({
      config: network,
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
