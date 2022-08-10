import Network from "./network"
import Processor from "./processor"
import Scheduler from "./scheduler"

export default class Clickstream {
  #tracking = true
  constructor({ event, batch, network }) {
    this.processor = new Processor({
      config: event,
    })

    this.scheduler = new Scheduler({
      config: batch,
    })

    this.processor = new Network({
      config: network,
    })
  }

  track() {
    return new Promise(() => {})
  }

  stop() {
    this.status.tracking = false
  }

  start() {
    this.status.tracking = false
  }

  destroy() {}
}
