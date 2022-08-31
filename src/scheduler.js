// @ts-check
import { CUSTOM_EVENT, TICK_TIME } from "./constants/index.js"
export default class Scheduler {
  /** @type { number | undefined } */
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
    this.#intervalId = undefined
    this.#waitTime = 0
    this.#batching = false
    this.#batch = []
    this.#instantEvents = []
  }

  /**
   * Ingest an event
   * @param event event
   */
  ingest(event) {
    this.#instantEvents.push(event)
  }

  /**
   * Start the scheduler
   */
  start() {
    this.#batching = true
    this.#run()
  }

  /**
   * Stop the scheduler
   */
  stop() {
    this.#clearInterval()
  }

  /**
   * Pause the scheduler
   */
  pause() {
    this.#batching = false
  }

  /**
   * Resume the scheduler
   */
  resume() {
    this.#batching = true
  }

  #clearInterval() {
    if (this.#intervalId !== undefined) {
      clearInterval(this.#intervalId)
      this.#intervalId = undefined
    }
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
    this.#clearInterval()
    this.#intervalId = window.setInterval(() => {
      if (!this.#batching) {
        return
      }

      this.#waitTime += 1
      console.log(this.#waitTime)
      this.#fill()
      if (this.#batchSize(this.#batch) >= this.#config.maxBatchSize) {
        this.#emit()
      } else if (this.#waitTime >= this.#config.maxTimeBetweenTwoBatches) {
        this.#emit()
      }
    }, TICK_TIME)
  }
}
