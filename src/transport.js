// @ts-check
import { CUSTOM_EVENT, EVENT_TYPE } from "./constants/index.js"
import Id from "./id.js"
import { SendEventRequest, SendEventResponse, Event } from "./protos/raccoon.js"

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
  constructor({ config, eventBus, store }) {
    this.#config = config
    this.#eventBus = eventBus
    this.#store = store
    this.#id = new Id()
  }

  #createRequest(batch) {
    const reqGuid = this.#id.uuidv4()
    const { seconds, nanos } = getTimestamp()

    // update QoS1 events in store
    const realTimeBatch = batch.filter((event) => {
      return event.eventType === EVENT_TYPE.REALTIME
    })

    if (realTimeBatch.length && this.#store.isOpen) {
      this.#store.update(realTimeBatch, "reqGuid", reqGuid)
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
    return {
      reqGuid,
      body: SendEventRequest.encode(request).finish(),
    }
  }

  async #makeRequest(request) {
    const headers = new Headers(this.#config.headers)
    headers.append("Content-Type", "application/proto")

    try {
      const data = await fetch(this.#config.url, {
        method: "POST",
        headers,
        body: request.body,
      })

      const blob = await data.blob()
      const resBuffer = await blob.arrayBuffer()
      const uInt = new Uint8Array(resBuffer)
      const res = SendEventResponse.decode(uInt)

      if (this.#store.isOpen) {
        const events = await this.#store.readByReqGuid(res.data["req_guid"])
        this.#store.remove(events)
      }
    } catch (error) {
      console.log("retyry")
      this.#eventBus.emit(CUSTOM_EVENT.BATCH_FAILED, {
        reqGuid: request.reqGuid,
      })

      console.error(error)
    }
  }

  send(batch) {
    const request = this.#createRequest(batch)
    this.#makeRequest(request)
  }
}
