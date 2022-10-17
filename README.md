# Clickstream Web

Clickstream Web is a Modern, Fast, and Lightweight Event Ingestion library, adhering to the philosophy and workings of Clickstream. Clickstream is event agnostic and real-time in nature. Web applications can maintain a long-running connection to send data in real-time using Clickstream.

## Features

- Fast - Much faster than other third-party analytics solutions
- Reliable - At least once delivery, ensured
- Highly configurable - Mold the behavior based on your business goals
- Small & lightweight - Close to native web technologies, less dependencies
- Node JS support - Use in Node JS runtimes without any hassle

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

1. **Import SDK and proto package**

```js
import { Clickstream } from "@gojek/clickstream-web"

// import the proto from a package that contains your protos.
import { proto } from "protobufjs-package"
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
    // maximum interval time between two batches(sec).
    maxTimeBetweenTwoBatches: 10,
    // maximum size of batch(bytes).
    maxBatchSize: 50_000,
    // name of the database, must be unique per origin
    dbName: 'clickstream_db',
  },
  network: {
    // Raccoon host URL
    url: "",
    // Request headers
    headers: {},
    // maximum number of retries before pausing
    maxRetries: 5,
    // gap between two retries (mSec)
    timeBetweenTwoRetries: 1_000,
    // time after which retry will resume after hitting maximum retry count threshold (mSec)
    timeToResumeRetries: 20_000,
  },
  // web crypto module instance
  crypto: null
}

```

## [Documentation](https://github.com/gojekfarm/clickstream-web/blob/main/docs/index.md)

### [Getting Started](https://github.com/gojekfarm/clickstream-web/blob/main/docs/getting-started.md)

### [How To Guide](https://github.com/gojekfarm/clickstream-web/blob/main/docs/how-to-guides/index.md)

### [Reference](https://github.com/gojekfarm/clickstream-web/blob/main/docs/reference/index.md)

### [Browser Compatibility](https://github.com/gojekfarm/clickstream-web/blob/main/docs/browser-compatibility.md)

### [Limitation](https://github.com/gojekfarm/clickstream-web/blob/main/docs/limitation.md)

### [Architecture](https://github.com/gojekfarm/clickstream-web/blob/main/docs/architecture.md)

## License

```
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
