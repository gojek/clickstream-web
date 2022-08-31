/* eslint-env jest */
import { gobiz } from "./protos/gobiz-ct.js"
import Clickstream from "../src/clickstream.js"

describe("clickstream", () => {
  test("url is required during initialisation", () => {
    try {
      new Clickstream()
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe("Provide url in network config")
    }
  })

  test("header is required during initialisation", () => {
    try {
      new Clickstream({
        network: {
          url: new URL(
            "https://raccoon-integration.gojekapi.com/api/v1/events"
          ),
        },
      })
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe(
        "Provide Authorization header in network config"
      )
    }
  })

  test("track return the status of the call", async () => {
    try {
      const clckstrm = new Clickstream({
        network: {
          url: new URL(
            "https://raccoon-integration.gojekapi.com/api/v1/events"
          ),
          headers: new Headers({
            Authorization:
              "Basic Z29qZWtfY29uc3VtZXJfYXBwX2ludGVncmF0aW9uX2NsaWVudDo0MDE5MDViNi04MjdlLTRjN2UtYWIyMi0xMTE4NzJmZDdjMGU=",
          }),
        },
      })

      const payload = gobiz.clickstream.web.CT.create({
        label: "test",
        properties: {
          test: 1,
        },
      })

      const result = await clckstrm.track(payload)
      expect(result).toBe("success")
    } catch (error) {
      console.log(error)
    }
  })

  test("stop & start tracking", async () => {
    try {
      const clckstrm = new Clickstream({
        network: {
          url: new URL(
            "https://raccoon-integration.gojekapi.com/api/v1/events"
          ),
          headers: new Headers({
            Authorization:
              "Basic Z29qZWtfY29uc3VtZXJfYXBwX2ludGVncmF0aW9uX2NsaWVudDo0MDE5MDViNi04MjdlLTRjN2UtYWIyMi0xMTE4NzJmZDdjMGU=",
          }),
        },
      })

      const payload = gobiz.clickstream.web.CT.create({
        label: "test",
        properties: {
          test: 1,
        },
      })

      clckstrm.stop()

      await clckstrm.track(payload)

      clckstrm.start()
      const resultSucc = await clckstrm.track(payload)
      expect(resultSucc).toBe("Sucess")
    } catch (error) {
      console.log(error)
      expect(error).toBe("Tracking is stopped")
    }
  })
})
