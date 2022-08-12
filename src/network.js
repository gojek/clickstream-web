import { uuidv4 } from "./helpers/index.js"
import {
  SendEventRequest,
  SendEventResponse,
  Event,
  google,
} from "./protos/raccoon.js"

export default class Network {
  #config
  constructor({ config }) {
    this.#config = config
  }

  #createRequest(batch) {
    const reqGuid = uuidv4()

    const date = new Date()
    const seconds = Math.floor(date.getTime() / 1000)
    const fraction = date.toISOString().split(".")[1]
    const nanos = fraction.slice(0, fraction.length - 1)

    const timestamp = google.protobuf.Timestamp.create({
      seconds,
      nanos,
    })

    const sentTime = google.protobuf.Timestamp.encode(timestamp).finish()

    const encodedBatch = batch.map((payload) => {
      const PayloadConstructor = payload.constructor
      const encodedEvent = PayloadConstructor.encode(payload).finish()

      return Event.encode({ eventBytes: encodedEvent, type: "web-test" })
    })

    const request = SendEventRequest.create({
      reqGuid,
      sentTime,
      events: [...encodedBatch],
    })

    return SendEventRequest.encode(request).finish()
  }

  #makeRequest(request) {
    this.#config.headers.append("Content-Type", "application/proto")
    const { url, headers } = this.#config
    fetch(url, {
      method: "POST",
      headers: headers,
      body: request,
    })
      .then((data) => {
        return data.blob()
      })
      .then(async (blob) => {
        const resBuffer = await blob.arrayBuffer()
        const uInt = new Uint8Array(resBuffer)
        const res = SendEventResponse.decode(uInt)
        console.log(res)
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  send(batch) {
    const request = this.#createRequest(batch)
    console.log(SendEventRequest.decode(request))
    this.#makeRequest(request)
  }
}
