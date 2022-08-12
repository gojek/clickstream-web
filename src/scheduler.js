import { CUSTOM_EVENT, TICK_TIME } from "./constants/index.js"

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

  #batchSize(batch) {
    return new Blob([JSON.stringify(batch)]).size
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
      console.log("Batch:", this.#batch, "Periodic Time:", this.#waitTime)
      if (this.#batchSize(this.#batch) >= this.#config.maxBatchSize) {
        this.#emit()
      } else if (this.#waitTime >= this.#config.maxTimeBetweenTwoBatches) {
        this.#emit()
      }
    }, TICK_TIME)
  }
}
