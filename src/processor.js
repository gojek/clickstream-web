import { EVENT_TYPE } from "./constants/index.js"

export default class Processor {
  constructor({ config }) {
    this.config = config
  }

  type() {
    return EVENT_TYPE.INSTANT
  }

  process(proto) {
    return {
      type: this.type(),
      event: proto,
    }
  }
}
