# Flush QoS1 events

QoS1 events are batched and sent as a single batch to optimize the number of network calls made by the SDK. Batching comes with a side effect of event loss if the app is closed during the wait time([maxTimeBetweenTwoBatches]()) for the batch creation.
SDK also stores all the QoS1 events in a IndexedDB database, so last set of events can even be lost if the database is not persisted in next app session.

Here are some ways to avoid the event loss -

## Flush events on page visibility state change

Clickstream Web SDK has a [.free()](https://github.com/gojek/clickstream-web/blob/main/docs/reference/methods.md#free) which is used for cleanup purpose but in the process it also flushes all the events present in the system instantly.

You can utilize `.free()` with [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) to detect when the page goes in the `hidden` state and call the `.free()` method to flush all the events.

If you are using React, you can attach the event listener inside the `useEffect` and remove it inside the return function of the `useEffect` -

```js
import React from "react"

const clckstrm = new Clickstream({...})

export default App() {
    useEffect(() => {
        document.addEventListener("visibilitychange", async () => {
          if (document.visibilityState === "hidden") {
            await clickstream.free();
          }
        });

        return () => {
          document.removeEventListener("visibilitychange", () => {});
        };
    }, []);

    return (...)
}
```

## Avoid long batching duration

Another way to reduce the event loss is by waiting for less time while creating batch and you can configure this by reducing the [maxBatchSize](https://github.com/gojek/clickstream-web/blob/main/docs/reference/options.md#maxbatchsize) threshold and setting it to very low value like 8.

```js
import React from "react"

const clckstrm = new Clickstream({
    batch: {
        maxBatchSize: 8
    }
})

export default App() {
    return (...)
}
```
