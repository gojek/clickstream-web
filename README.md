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

Two types of events can be sent using Clickstream Web

- QoS0 events - These events are `instant and fire & forget` in nature.
- QoS1 events - These are `real time` and sent `at least once`.

Every event is treated as a QoS1 event by default and one can classify the QoS0 events using `classification` config.

#### Steps

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

Include the event name in the `instant` array inside `classification` property of `event` configuration while initialising clickstream.

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

clckstrm.track()
```

### Usage in Node JS Runtimes

**Only QoS0 (instant) events** are supported in Node JS runtimes. All the events are treated as QoS0 events by default as browser dependent services/APIs are used for QoS1 events.

#### Requirements

- Node v14 is the minimum compatible version.

#### Steps

1. You need to provide crypto module object in the constructor while initialising as it is an environment & version specific module.

```js
// initialise
const clckstrm = new Clickstream({
  network: {
    url: new URL("https://example.org"),
    headers: new Headers({
      Authorization: "Basic <secret-key>",
    }),
  },
  // pass crypto module.
  crypto: crypto.webcrypto,
})

clckstrm.track(payload)
```

**Note** - For Node version 14, [web crypto](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) is not supported natively, you can use a web crypto polyfill something similar to [this](https://www.npmjs.com/package/@peculiar/webcrypto)

2. Node versions < 18 doesn't have support for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers). You need to add polyfill for that to be available globally. A fetch polyfill like [node-fetch](https://github.com/node-fetch/node-fetch) can be initialized globally. Check this out for [reference on how to do it](https://github.com/node-fetch/node-fetch#providing-global-access).

**Note** - This step is not required for Node version >= 18

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

Resumes the tracking, have no effect when called with tracking is not stopped.

```
clckstrm.start();
```

### destroy

Releases all the resources used by the Clickstream instance.

```
await clckstrm.destroy();
```

## Options

The constrsuctor takes an options object as parameter which has `event`, `batch`, `network` & `crypto` options as property.

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
    // name of the database, must be unique per domain
    dbName: 'clickstream_db',
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
  // web crypto module instance
  crypto: null
}

```
