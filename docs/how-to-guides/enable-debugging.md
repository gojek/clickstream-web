# Enable debugging

Clickstream Web SDK comes with detailed logging to provide more details of the event data and flow, starting from event ingestion till event sent to Raccoon over network.

Three types of logs are used by the SDK -

[`error`](https://developer.mozilla.org/en-US/docs/Web/API/console/error) - used for all type of errors.

[`info`](https://developer.mozilla.org/en-US/docs/Web/API/console/info) - info related to operation performed.

[`debug`](https://developer.mozilla.org/en-US/docs/Web/API/console/debug) - details and data related to operations performed and other details.

By default the SDK logs all the `error` type logs, in order to enable `info` and `debug` logs, pass the `debug` configuration option as `true` to enable it while initializing the SDK as shown below

```js
new Clickstream({
  network: {
    url: new URL("https://example.org"),
    headers: new Headers({
      Authorization: "Basic <secret-key>",
    }),
  },
  // set the debug option to true.
  debug: true,
})
```

## Node

All the logs are visible in node runtime by default, you don't need any additional step to see logs.

## Browsers
Use console tab in browser's dev tool to see all the logs printed
By default some browsers do not show the `debug` type logs, in order to enable them select verbose/debug option in the filter as shown below

### Chrome
Select the `verbose` option from the list in order to see the `debug` logs.

<img width="575" alt="Screenshot 2022-11-14 at 8 36 41 PM" src="https://user-images.githubusercontent.com/14230239/201834747-f6e97872-7d64-45ae-b372-98cba20fe670.png">

### Firefox
Make sure the `debug` button is selected in order to see the `debug` logs.

<img width="701" alt="Screenshot 2022-11-14 at 8 39 54 PM" src="https://user-images.githubusercontent.com/14230239/201834840-48eb4a9f-fa4e-4590-81d5-f22a5294c922.png">

