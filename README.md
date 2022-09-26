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

Two types of events can be sent using clickstream

- QoS0 events - These events are `instant and fire & forget` in nature.
- QoS1 events - These are `real time` and sent `at least once`.

Every event is treated as QoS1 event by default and one can classify the QoS0 events using `classification` config.

1. **Import `Clickstream` from the package.**

```js
import { Clickstream } from "@gojek/clickstream-web"
```

2. **Initialise Clickstream**

Clickstream accepts options to override the default behaviour. It supports `event`, `batch`, `network` & `crypto` configurations.

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
  eventName: "test-event",
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

// call on some event such as user click.
document.querySelector("#some-button").addEventListener("click", () => {
  clckstrm.track(payload)
})
```

### Dispatching a QoS0 event

include the event name in the `instant` array inside `classification` property of `event` configuration while initialising clickstream.

```js
import { Clickstream } from "@gojek/clickstream-web"

// import the proto from a package that contains your protos.
import { proto } from "protobufjs-package"

// fill in the data as per proto definition
const payload = proto.create({
  eventName: 'test-event',
  properties: {
    test: 1,
  },
})

// initialise
const clckstrm = new Clickstream({
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

clckstrm.track()
```

### Usage in Node JS

**Only QoS0 (instant) events** are supported in Node JS runtime. All the events are treated as QoS0 events by default as browser dependent services/APIs are used for QoS1 events.

You need to provide crypto module object in the constructor while initialising as it is an environment specific module.

#### For node version < 18

2. A fetch polyfill like [node-fetch](https://github.com/node-fetch/node-fetch) has to be initialized globally. Check this out for [reference on how to do it](https://github.com/node-fetch/node-fetch#providing-global-access).

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
  // make sure to pass crypto module.
  crypto: crypto.webcrypto,
})

clckstrm.track(payload)
```

## Methods

### track

Dispatches a new event. Returns a promise, which can be used to get the status of the track call, cab be used for error handling.

```
await clckstrm.track(payload);
```

### stop

Gracefully stops the tracking, new track function calls are ignored, previously tracked events will be processed.

```
clckstrm.stop();
```

### start

Resumes the tracking, have no effect when called with tracking on.

```
clckstrm.start();
```

### destroy

Releases all the resources used by the Clickstream instance.

```
await clckstrm.destroy();
```

## Options

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
    // max interval time between two batches(sec).
    maxTimeBetweenTwoBatches: 10,
    // max size of batch(bytes).
    maxBatchSize: 50000,
  },
  network: {
    // Raccoon host URL
    url: "",
    // Request headers
    headers: {},
    // max number of retries before pausing
    maxRetries: 5,
    // gap between two retries (mSec)
    timeBetweenTwoRetries: 1000,
    // time after which retry will resume after hitting max retry count threshold (mSec)
    timeToResumeRetries: 20000,
  },
  // crypto module instance
  crypto: null
}

```
