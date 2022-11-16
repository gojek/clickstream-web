/* eslint-env jest */
import Clickstream from "../src/clickstream.js"

describe("clickstream", () => {
  test("initialization", () => {
    const clckstrm = new Clickstream({
      network: {
        url: new URL("https://raccoon-integration.gojekapi.com/api/v1/events"),
        headers: new Headers({
          Authorization: "Basic <secret-key>",
        }),
      },
    })

    expect(clckstrm).toBeInstanceOf(Clickstream)
    expect(clckstrm.track).toBeDefined()
    expect(clckstrm.pause).toBeDefined()
    expect(clckstrm.resume).toBeDefined()
    expect(clckstrm.free).toBeDefined()
  })
})
