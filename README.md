# Clickstream Web

Clickstream Web is a Modern, Fast, and Lightweight Event Ingestion library, adhering to the philosophy and workings of Clickstream. Clickstream is event agnostic and real-time in nature. Web applications can maintain a long-running connection to send data in real-time using Clickstream.

## Installation

```sh
# npm
npm install @gojek/clickstream-web

# yarn
yarn add @gojek/clickstream-web
```

## Usage

1. **Import `Clickstream` from the package.**

```js
import { Clickstream } from "@gojek/clickstream-web"
```

2. **Initialise Clickstream**

Clickstream accepts options to override the default behaviour. It supports `event`, `batch` & `network` configurations.

```js
import { Clickstream } from "@gojek/clickstream-web"

const clckstrm = new Clickstream({
  network: {
    url: new URL("https://example.org"),
    headers: new Headers({
      Authorization: "Basic <secret-key>",
    }),
  },
})
```

Following network options are mandatory to pass while initialising -

- `url` - [Raccoon](https://odpf.github.io/raccoon/) host url, instance of [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL).
- `headers` - Request headers, instance of [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

3. **Dispatch an event**

```js
import { Clickstream } from "@gojek/clickstream-web"

// import the proto from a package that contains your protos.
import { proto } from "protobufjs-package"

// fill in the data as per proto definition
const payload = proto.create({
  label: "test-event",
  properties: {
    test: 1,
  },
})

// initialise
const clckstrm = new Clickstream({
  network: {
    url: new URL("https://example.org"),
    headers: new Headers({
      Authorization: "Basic <secret-key>",
    }),
  },
})

// call on some event like user click.
document.querySelector("#some-button").addEventListener("click", () => {
  clckstrm.track(payload)
})
```

### Methods

#### track

Dispatches a new event. Returns a promise, which can be used to get the status of the track call, use for error handling.

```
clckstrm.track(payload);
```

#### stop

Gracefully stops the tracking, new track function calls are ignored, previously tracked events will be processed.

```
clckstrm.stop();
```

#### start

Resumes the tracking, have no effect when called with tracking on.

```
clckstrm.start();
```

### Options

The constrsuctor takes an options object as parameter which has `event`, `batch` & `network` options as property.

```
{
  event: {
    // contains names of all the instant events, used to differentiate QoS0 and QoS1 events.
    classification: {
      instant: [],
    },
    // group name, prefix for event type
    group: ""
  },
  batch: {
    // max interval time between two batches, in seconds.
    maxTimeBetweenTwoBatches: 10,
    // max size of batch, in bytes.
    maxBatchSize: 50000,
  },
  network: {
    // Raccoon host URL
    url: "",
    // Request headers
    headers: {},
    // max number of retries before pausing
    maxRetries: 5,
    // gap between two retries
    timeBetweenTwoRetries: 1000,
    // time after which retry will resume after hitting max retry count threshold
    timeToResumeRetries: 20000,
  },
}

```
