// @ts-check
import { CUSTOM_EVENT, TICK_TIME } from "./constants/index.js"
import { logger } from "./logger.js"

const logPrefix = "Scheduler:"
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
   * Return if the scheduler is running or not
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

  async free() {
    try {
      this.stop()
      logger.info(logPrefix, "scheduler is stopped")
      logger.info(logPrefix, "flushing all events")
      if (this.#store.isOpen()) {
        await this.#flush()
      }
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

    logger.debug(logPrefix, "flushed events", events)
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
      logger.debug(logPrefix, "batch failed with reqGuid", e.detail.reqGuid)
      const events = await this.#store.readByReqGuid(e.detail.reqGuid)
      this.#eventBus.emit(CUSTOM_EVENT.BATCH_CREATED, { batch: events })
    })
    logger.info(logPrefix, 'added "BATCH_FAILED" listener')
  }

  #removeListeners() {
    this.#eventBus?.remove(CUSTOM_EVENT.BATCH_FAILED)
    logger.info(logPrefix, 'removed "BATCH_FAILED" listener')
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

    logger.debug(logPrefix, "current batch size", batchSize)
    logger.debug(logPrefix, "max batch size", this.#config.maxBatchSize)
    logger.debug(logPrefix, "remaining batch size", remSize)

    return events.splice(0, Math.ceil(remSize / unitSize) + 1)
  }

  async #getRealTimeEvents() {
    if (!this.#store.isOpen()) {
      logger.debug(logPrefix, "store is not open")
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
        logger.debug("no new QoS1 events are found")
        return []
      }

      const eventsBySize = this.#splitBySize(events)

      logger.debug(
        logPrefix,
        "events before splitting by size",
        events,
        events.length
      )

      logger.debug(
        logPrefix,
        "events after splitting by size",
        eventsBySize,
        eventsBySize.length
      )

      return eventsBySize
    } catch (error) {
      logger.error(logPrefix, error)
      return []
    }
  }

  async #fill() {
    const realTimeEvents = await this.#getRealTimeEvents()
    logger.debug(logPrefix, "QoS1 events", realTimeEvents)
    if (realTimeEvents.length) {
      this.#batch.push(...realTimeEvents)
      logger.debug(logPrefix, "QoS1 events pushed in batch", this.#batch)
    }
  }

  #run() {
    this.#clearInterval()
    this.#intervalId = setInterval(() => {
      if (!this.#batching) {
        logger.debug(logPrefix, "batching is not running")
        return
      }

      this.#waitTime += 1
      this.#fill()

      const batchSize = this.#batchSize(this.#batch)

      if (batchSize >= this.#config.maxBatchSize) {
        this.#emit()
        logger.info(
          logPrefix,
          "this batch of size",
          batchSize,
          "batch has reached max size threshold of",
          this.#config.maxBatchSize
        )
      } else if (this.#waitTime >= this.#config.maxTimeBetweenTwoBatches) {
        this.#emit()
        logger.info(
          logPrefix,
          "batch has waited max time of",
          this.#config.maxTimeBetweenTwoBatches
        )
      }
    }, TICK_TIME)
  }
}
