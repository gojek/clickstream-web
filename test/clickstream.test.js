/* eslint-env jest */
import Clickstream from "../src/clickstream.js"

describe("clickstream", () => {
  test("initializes clickstream with all the public method", () => {
    const clckstrm = new Clickstream({
      network: {
        url: new URL("https://example.com"),
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
    expect(clckstrm.forceFree).toBeDefined()
  })
})
