# Flush QoS1 events

QoS1 events are batched and sent to optimize the number of network calls made by the SDK. Batching comes with a risk of event loss if the app is closed during the wait time for the batch creation. Last set of events will not be sent in that session or even can be lost if the database is not persistent.

You can flush all the events at once on the app close to avoid event loss.

Lets look into some of the ways to avoid event loss -

## Flushing the events on page visibility state change

Clickstream Web SDK provide the [.free()](https://github.com/gojek/clickstream-web/blob/main/docs/reference/methods.md#free) which is used for cleanup purpose but it also flushes all the events present in the system instantly.

We can utilize `.free()` with [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) to detect when the page goes in the `hidden` state and call the `.free()` method to flush all the events.

If you are using React, you can attach the event listener inside the useEffect and remove it inside return function of the useEffect -

```js
import React from "react"

const App = () => {
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
