// @ts-check
import Id from "./id.js"
import { SendEventRequest, Event } from "./protos/raccoon.js"

export default class Transport {
  #config
  #id
  constructor({ config }) {
    this.#config = config
    this.#id = new Id()
  }

  #createRequest(batch) {
    const reqGuid = this.#id.uuidv4()

    const date = new Date()
    const seconds = Math.floor(date.getTime() / 1000)
    const fraction = date.toISOString().split(".")[1]
    const nanos = fraction.slice(0, fraction.length - 1)

    const encodedBatch = batch.map((payload) => {
      const PayloadConstructor = payload.constructor
      const encodedEvent = PayloadConstructor.encode(payload).finish()
      const typeUrl = PayloadConstructor.getTypeUrl("").split(".")
      const type = typeUrl[typeUrl.length - 1].toLowerCase()

      return Event.encode({ eventBytes: encodedEvent, type })
    })

    const request = SendEventRequest.create({
      reqGuid,
      sentTime: {
        seconds,
        nanos,
      },
      events: [...encodedBatch],
    })

    return SendEventRequest.encode(request).finish()
  }

  #makeRequest(request) {
    const headers = new Headers(this.#config.headers)
    headers.append("Content-Type", "application/proto")

    fetch(this.#config.url, {
      method: "POST",
      headers: headers,
      body: request,
    })
      .then((data) => {
        return data.blob()
      })
      .then(async () => {
        // const resBuffer = await blob.arrayBuffer()
        // const uInt = new Uint8Array(resBuffer)
        // const res = SendEventResponse.decode(uInt)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  send(batch) {
    const request = this.#createRequest(batch)
    this.#makeRequest(request)
  }
}
