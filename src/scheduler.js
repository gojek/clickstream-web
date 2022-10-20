// @ts-check
import { CUSTOM_EVENT, TICK_TIME } from "./constants/index.js"
export default class Scheduler {
  /** @type { number | NodeJS.Timer | undefined } */
  #intervalId
  #waitTime
  #batching
  #config
  #eventBus
  #store
  #batch
  #lastBatch
  constructor({ config, eventBus, store }) {
    this.#config = config
    this.#eventBus = eventBus
    this.#store = store
    this.#intervalId = undefined
    this.#waitTime = 0
    this.#batching = false
    this.#batch = []
    this.#lastBatch = []
  }

  /**
   * Return if the sceduler is running or not
   */
  isRunning() {
    return this.#batching
  }

  /**
   * Start the scheduler
   */
  start() {
    this.#batching = true
    this.#run()
    this.#listeners()
  }

  /**
   * Stop the scheduler
   */
  stop() {
    this.#clearInterval()
    this.#waitTime = 0
    this.#batching = false
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

  async destroy() {
    try {
      this.stop()
      await this.#flush()
      this.#removeListeners()
    } catch (err) {
      return Promise.reject(err)
    }
  }

  /**
   * Flushes all the events in store
   */
  async #flush() {
    let events = await this.#store.read()

    // filter out existing events in batch and last batch
    events = events.filter((event) => {
      return ![...this.#batch, ...this.#lastBatch].some((data) => {
        return data.eventGuid === event.eventGuid
      })
    })

    this.#batch.push(...events)

    this.#emit()
  }

  #clearInterval() {
    if (this.#intervalId !== undefined) {
      clearInterval(this.#intervalId)
      this.#intervalId = undefined
    }
  }

  #emit() {
    if (this.#batch.length) {
      this.#eventBus.emit(CUSTOM_EVENT.BATCH_CREATED, { batch: this.#batch })
    }

    this.#waitTime = 0
    this.#lastBatch = this.#batch
    this.#batch = []
  }

  #listeners() {
    this.#eventBus?.on(CUSTOM_EVENT.BATCH_FAILED, async (e) => {
      const events = await this.#store.readByReqGuid(e.detail.reqGuid)
      this.#eventBus.emit(CUSTOM_EVENT.BATCH_CREATED, { batch: events })
    })
  }

  #removeListeners() {
    this.#eventBus?.remvove(CUSTOM_EVENT.BATCH_FAILED)
  }

  #batchSize(batch) {
    return batch.reduce((prev, curr) => {
      return prev + new Blob(curr?.data).size
    }, 0)
  }

  #splitBySize(events) {
    const unitSize = this.#batchSize([events[0]])
    const batchSize = this.#batchSize(this.#batch)
    const remSize = this.#config.maxBatchSize - batchSize

    return events.splice(0, Math.ceil(remSize / unitSize) + 1)
  }

  async #getRealTimeEvents() {
    if (!this.#store.isOpen()) {
      return []
    }
    try {
      let events = await this.#store.read()

      // filter out existing events in batch and last batch
      events = events.filter((event) => {
        return ![...this.#batch, ...this.#lastBatch].some((data) => {
          return data.eventGuid === event.eventGuid
        })
      })

      if (!events.length) {
        return []
      }

      const eventsBySize = this.#splitBySize(events)

      return eventsBySize
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async #fill() {
    const realTimeEvents = await this.#getRealTimeEvents()
    if (realTimeEvents.length) {
      this.#batch.push(...realTimeEvents)
    }
  }

  #run() {
    this.#clearInterval()
    this.#intervalId = setInterval(() => {
      if (!this.#batching) {
        return
      }

      this.#waitTime += 1
      this.#fill()

      if (this.#batchSize(this.#batch) >= this.#config.maxBatchSize) {
        this.#emit()
      } else if (this.#waitTime >= this.#config.maxTimeBetweenTwoBatches) {
        this.#emit()
      }
    }, TICK_TIME)
  }
}
