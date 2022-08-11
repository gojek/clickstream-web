import { uuidv4 } from "./helpers/index.js"
import { SendEventRequest, SendEventResponse, Event } from "./protos/raccoon.js"

export default class Network {
  constructor({ config }) {
    this.config = config
  }

  #createRequest(batch) {
    const reqGuid = uuidv4()
    const encodedBatch = batch.map((payload) => {
      console.log(payload, payload.constructor)
      const PayloadConstructor = payload.constructor
      const encodedEvent = PayloadConstructor.encode(payload).finish()

      return Event.encode({ eventBytes: encodedEvent, type: "web-test" })
    })

    const request = SendEventRequest.create({
      reqGuid: reqGuid,
      sentTime: {
        seconds: 1638154927,
        nanos: 376499000,
      },
      events: [...encodedBatch],
    })

    return SendEventRequest.encode(request).finish()
  }

  #makeRequest(request) {
    return fetch("https://raccoon-integration.gojekapi.com/api/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/proto",
        Authorization:
          "Basic Z29qZWtfY29uc3VtZXJfYXBwX2ludGVncmF0aW9uX2NsaWVudDo0MDE5MDViNi04MjdlLTRjN2UtYWIyMi0xMTE4NzJmZDdjMGU=",
      },
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
    this.#makeRequest(request)
  }

  recieve() {}
}
