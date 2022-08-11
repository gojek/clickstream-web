import { CUSTOM_EVENT } from "./constants/index.js"
import { sizeOfArrayInBytes } from "./helpers/index.js"

const TICK = 1000

export default class Scheduler {
  #intervalId
  #waitTime
  #batching
  #config
  #eventBus
  #batch
  #instantEvents
  constructor({ config, eventBus }) {
    this.#config = config
    this.#eventBus = eventBus
    this.#intervalId = 0
    this.#waitTime = 0
    this.#batching = false
    this.#batch = []
    this.#instantEvents = []
  }

  ingest(event) {
    this.#instantEvents.push(event)
  }

  start() {
    this.#batching = true
    this.#run()
  }

  pause() {
    this.#batching = false
  }

  resume() {
    this.#batching = true
  }

  stop() {
    clearInterval(this.#intervalId)
    this.#intervalId = 0
  }

  #emit() {
    if (this.#batch.length) {
      this.#eventBus.emit(CUSTOM_EVENT.NEW_BATCH, { batch: this.#batch })
    }

    this.#waitTime = 0
    this.#batch = []
  }

  #fill() {
    if (this.#instantEvents.length) {
      this.#batch.push(...this.#instantEvents.splice(0))
    }
  }

  #run() {
    this.#intervalId = setInterval(() => {
      if (!this.#batching) {
        return
      }

      this.#waitTime += 1
      this.#fill()
      console.log(this.#batch, this.#waitTime)
      if (sizeOfArrayInBytes(this.#batch) >= 5000) {
        this.#emit()
      } else if (this.#waitTime >= 10) {
        this.#emit()
      }
    }, TICK)
  }
}
