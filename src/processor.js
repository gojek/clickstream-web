// @ts-check
import { EVENT_TYPE } from "./constants/index.js"

export default class Processor {
  #config
  constructor({ config }) {
    this.#config = config
  }

  #type() {
    return EVENT_TYPE.INSTANT
  }

  /**
   * Processes an event
   *
   * @param proto - event proto
   * @returns type and event
   */
  process(proto) {
    return {
      type: this.#type(),
      event: proto,
    }
  }
}
