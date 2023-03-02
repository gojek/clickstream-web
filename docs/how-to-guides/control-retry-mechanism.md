# Control retry mechanism

Clickstream Web SDK retries sending the QoS1 events if it fails to send them to Raccoon over network.

It send the network request for maximum retry count (`maxRetries`) in defined time interval (`timeBetweenTwoRetries`), then it waits for cool off time (`timeToResumeRetries`) to start retrying again.

These options have defaults values, but you can override them while initializing SDK. Retry options are part of `network` [options](https://github.com/gojek/clickstream-web/blob/main/docs/reference/options.md).

Just use any custom value as per type for the options as shown below -

```js
// Override the default values while initializing
const clckstrm = new Clickstream({
  network: {
    ...,
    maxRetries: 10,
    timeBetweenTwoRetries: 3000,
    timeToResumeRetries: 30000
  },
})
```
