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
  #instantEvents
  constructor({ config, eventBus, store }) {
    this.#config = config
    this.#eventBus = eventBus
    this.#store = store
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
      this.#eventBus.emit(CUSTOM_EVENT.BATCH_CREATED, { batch: this.#batch })
    }

    this.#waitTime = 0
    this.#batch = []
  }

  #listeners() {
    this.#eventBus.on(CUSTOM_EVENT.BATCH_FAILED, async (e) => {
      const events = await this.#store.readByReqGuid(e.detail.reqGuid)
      this.#emit(events)
    })
  }

  #splitBySize(events) {
    const unitSize = this.#batchSize([events[0]])
    const batchSize = this.#batchSize(this.#batch)
    const remSize = this.#config.maxBatchSize - batchSize

    return events.splice(0, Math.floor(remSize / unitSize))
  }

  async getRealTimeEvents() {
    if (!this.#store.isOpen) {
      return []
    }
    try {
      let events = await this.#store.read()

      // filter out existing events in batch
      events = events.filter((event) => {
        return !this.#batch.some((data) => {
          return data.eventGuid === event.eventGuid
        })
      })

      const eventsBySize = this.#splitBySize(events)

      try {
        await this.#store.write(events)
        return eventsBySize
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async #fill() {
    if (this.#instantEvents.length) {
      this.#batch.push(...this.#instantEvents.splice(0))
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
      console.log(this.#waitTime, this.#batch)
      if (this.#batchSize(this.#batch) >= this.#config.maxBatchSize) {
        this.#emit()
      } else if (this.#waitTime >= this.#config.maxTimeBetweenTwoBatches) {
        this.#emit()
      }
    }, TICK_TIME)
  }
}
