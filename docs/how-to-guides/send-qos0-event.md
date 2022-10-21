# Send a QoS0 Event

To send an event as a QoS0 event, include the event name in the `instant` array inside `classification` property of `event` configuration option while initializing clickstream.

```js
import { Clickstream } from "@gojek/clickstream-web"

// import the proto from a package that contains your protos.
import { proto } from "protobufjs-package"

// fill in the data as per proto definition
const payload = proto.create({
  eventName: "test-event",
  properties: {
    test: 1,
  },
})

// initialize
const clckstrm = new Clickstream({
  // include the event name here
  event: {
    classification: {
      instant: ['test-event']
    }
  }
  network: {
    url: new URL("https://example.org"),
    headers: new Headers({
      Authorization: "Basic <secret-key>",
    }),
  },
})

// call on some event such as user click.
document.querySelector("#some-button").addEventListener("click", () => {
  clckstrm.track(payload)
})
```
