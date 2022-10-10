# Send a QoS0 Event

To send an event as a QoS0 event, include the event name in the `instant` array inside `classification` property of `event` configuration option while initialising clickstream.

```js
// initialise
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
```
