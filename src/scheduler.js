// @ts-check
import { CUSTOM_EVENT, TICK_TIME } from "./constants/index.js"
export default class Scheduler {
  /** @type { number | undefined } */
  #intervalId
  #waitTime
  #batching
  #config
  #eventBus
  #store
  #batch
  #lastBatch
  #instantEvents
  constructor({ config, eventBus, store }) {
    this.#config = config
    this.#eventBus = eventBus
    this.#store = store
    this.#intervalId = undefined
    this.#waitTime = 0
    this.#batching = false
    this.#batch = []
    this.#lastBatch = []
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

  #emit() {
    if (this.#batch.length) {
      this.#eventBus.emit(CUSTOM_EVENT.BATCH_CREATED, { batch: this.#batch })
    }

    this.#waitTime = 0
    this.#lastBatch = this.#batch
    this.#batch = []
  }

  #listeners() {
    this.#eventBus.on(CUSTOM_EVENT.BATCH_FAILED, async (e) => {
      const events = await this.#store.readByReqGuid(e.detail.reqGuid)
      this.#eventBus.emit(CUSTOM_EVENT.BATCH_CREATED, { batch: events })
    })
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

    console.log("measures", unitSize, batchSize, remSize)

    const data = events.splice(0, Math.ceil(remSize / unitSize) + 1)
    // console.log(data)
    return data
  }

  async getRealTimeEvents() {
    if (!this.#store.isOpen) {
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
      console.log("finalsize", eventsBySize, "rem", events)

      return eventsBySize
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async #fill() {
    if (this.#instantEvents.length) {
      const eventsBySize = this.#splitBySize(this.#instantEvents)
      console.log(
        "instant - finalsize",
        eventsBySize,
        "rem",
        this.#instantEvents
      )
      this.#batch.push(...eventsBySize)
    } else {
      const realTimeEvents = await this.getRealTimeEvents()
      this.#batch.push(...realTimeEvents)
    }
  }

  #run() {
    this.#clearInterval()
    this.#intervalId = window.setInterval(() => {
      if (!this.#batching) {
        return
      }

      this.#waitTime += 1
      this.#fill()
      console.log(
        this.#waitTime,
        this.#batch,
        "batch size - ",
        this.#batchSize(this.#batch)
      )
      if (this.#batchSize(this.#batch) >= this.#config.maxBatchSize) {
        this.#emit()
      } else if (this.#waitTime >= this.#config.maxTimeBetweenTwoBatches) {
        this.#emit()
      }
    }, TICK_TIME)
  }
}
