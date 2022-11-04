// @ts-check
import { CUSTOM_EVENT, EVENT_TYPE } from "./constants/index.js"
import { NetworkError } from "./error.js"
import { SendEventRequest, SendEventResponse, Event } from "./protos/raccoon.js"
import { logger } from "./logger.js"

const logPrefix = "Network:"

/**
 * Gives timestamp object as google timestamp format
 * @returns timestamp object containing seconds and nanos
 */
const getTimestamp = () => {
  const date = new Date()
  const seconds = Math.floor(date.getTime() / 1000)
  const fraction = date.toISOString().split(".")[1]
  const nanos = fraction.slice(0, fraction.length - 1)

  return { seconds, nanos }
}

export default class Transport {
  #config
  #store
  #eventBus
  #id
  #retryCount = 0
  #resetRetryTimeout
  constructor({ config, eventBus, store, id }) {
    this.#config = config
    this.#eventBus = eventBus
    this.#store = store
    this.#retryCount = 0
    this.#resetRetryTimeout = undefined
    this.#id = id
  }

  #createRequest(batch) {
    const reqGuid = this.#id.uuidv4()
    const { seconds, nanos } = getTimestamp()

    logger.info(logPrefix, "generated reqGuid", reqGuid)
    logger.info(logPrefix, "generated timestamp(seconds)", seconds)

    // update QoS1 events in store
    const realTimeBatch = batch.filter((event) => {
      return event.eventType === EVENT_TYPE.REALTIME
    })

    if (realTimeBatch.length && this.#store.isOpen) {
      this.#store.update(realTimeBatch, "reqGuid", reqGuid)
      logger.info(logPrefix, "updated reqGuid for all events in store")
    }

    const encodedBatch = batch.map((payload) => {
      const { data, type } = payload
      return Event.create({
        eventBytes: data,
        type,
      })
    })

    const request = SendEventRequest.create({
      reqGuid,
      sentTime: {
        seconds,
        nanos,
      },
      events: [...encodedBatch],
    })

    logger.debug(logPrefix, "network request", request)

    return {
      reqGuid,
      body: SendEventRequest.encode(request).finish(),
    }
  }

  #retry(request) {
    const { maxRetries, timeBetweenTwoRetries, timeToResumeRetries } =
      this.#config

    if (this.#retryCount < maxRetries) {
      if (this.#resetRetryTimeout) {
        window.clearTimeout(this.#resetRetryTimeout)
        this.#resetRetryTimeout = undefined
      }

      this.#retryCount += 1

      logger.debug(logPrefix, "retry", this.#retryCount)
      window.setTimeout(() => {
        this.#eventBus.emit(CUSTOM_EVENT.BATCH_FAILED, {
          reqGuid: request.reqGuid,
        })
      }, timeBetweenTwoRetries)
    } else if (this.#retryCount === maxRetries) {
      if (this.#resetRetryTimeout === undefined) {
        logger.debug(logPrefix, "waiting for", timeToResumeRetries)
        this.#resetRetryTimeout = window.setTimeout(() => {
          this.#retryCount = 0
        }, timeToResumeRetries)
      }
    }
  }

  async #makeRequest(request, { retry }) {
    const headers = new Headers(this.#config.headers)
    headers.append("Content-Type", "application/proto")

    try {
      const response = await fetch(this.#config.url, {
        method: "POST",
        headers,
        body: request.body,
      })

      if (!response.ok) {
        logger.error(
          logPrefix,
          new NetworkError(
            `Network request to Clickstream backend failed with status code ${response.status}`
          )
        )
        if (retry) this.#retry(request)
        return
      }

      logger.info(logPrefix, "received response from Clickstream backend ")
      if (this.#store.isOpen()) {
        const blob = await response.blob()
        const buffer = await blob.arrayBuffer()
        const uInt = new Uint8Array(buffer)
        const res = SendEventResponse.decode(uInt)

        logger.debug(
          logPrefix,
          "response data from Raccoon",
          res,
          JSON.stringify(res, undefined, 2)
        )

        const events = await this.#store.readByReqGuid(res.data["req_guid"])
        this.#store.remove(events)
        logger.debug(
          "remove events from store with reqGuid",
          res.data["req_guid"]
        )
      }
    } catch (err) {
      logger.error(logPrefix, new NetworkError(err.message, { cause: err }))
      if (retry) this.#retry(request)
    }
  }

  /**
   * Send data over network to clickstream BE
   *
   * @param batch batch to send
   */
  async send(
    /** @type {import("./store.js").Event[]} */ batch,
    { retry = false } = {}
  ) {
    const request = this.#createRequest(batch)
    this.#makeRequest(request, { retry })
  }
}
