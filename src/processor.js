// @ts-check
import { EVENT_TYPE } from "./constants/index.js"

export default class Processor {
  #config
  constructor({ config }) {
    this.#config = config
  }

  #type(proto) {
    if (this.#config.classification.instant.includes(proto["event_name"])) {
      return EVENT_TYPE.INSTANT
    }

    return EVENT_TYPE.REALTIME
  }

  /**
   * Processes an event
   *
   * @param proto - event proto
   * @returns type and event
   */
  process(proto) {
    return {
      type: this.#type(proto),
      event: proto,
    }
  }
}
