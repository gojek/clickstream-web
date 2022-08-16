# Clickstream Web

Clickstream Web is a Modern, Fast, and Lightweight Event Ingestion library, adhering to the philosophy and workings of Clickstream. Clickstream is event agnostic and real-time in nature. Web applications can maintain a long-running connection to send data in real-time using Clickstream.

## Installation

Clickstream Web is available as a [npm package](https://www.npmjs.com/package/@gojek/clickstream-web) over npm public registry.

### npm

```
npm install @gojek/clickstream-web
```

### yarn

```
yarn add @gojek/clickstream-web
```

## Usage

1. Import `Clickstream` from the package.

```
import { Clickstream } from @gojek/clickstream-web
```

2. Initialise Clickstream

Clickstream accepts options to override the default behaviour of the system. It supports `event`, `batch` & `network` configurations.

```
import { Clickstream } from @gojek/clickstream-web

const clckstrm = new Clickstream({
  network: {
    url: new URL({HostUrl}),
    headers: new Headers({
      Authorization:
        "Basic {secretKey}",
    }),
  },
});
```

Following network options are mandatory to pass while initialising -

- `url` - [Raccoon](https://odpf.github.io/raccoon/) host url, instance of [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL).
- `headers` - Request headers, instance of [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

3. Dispatch an event

```
import { Clickstream } from @gojek/clickstream-web

// import the proto
import { gobiz } from "./proto/gobiz-ct.js";

// fill in the data as per proto definition
const payload = gobiz.clickstream.web.CT.create({
  label: "test",
  properties: {
    test: 1,
  },
});

// initialise
const clckstrm = new Clickstream({
  network: {
    url: new URL({HostUrl}),
    headers: new Headers({
      Authorization:
        "Basic {secretKey}",
    }),
  },
});

// call on some event like user click.
// return a promise, which can be used to get the status of the call, provides error handling.
clckstrm.track(payload);
```

### Methods

#### track

Dispatched a new event, returns a promise, which can be used to get the status of the call, provides error handling.

```
clckstrm.track(payload);
```

#### Stop

Gracefully stops the tracking, new track function calls are ignored, existing events are still processed.

```
clckstrm.stop();
```

#### Start

Resumes the tracking, use only when tracking is stopped currently.

```
clckstrm.strat();
```

#### Destroy

Releases all the resources used by the SDK, make sure to call before app close/demount.

```
clckstrm.destroy();
```

### Options

The contrsuctor takes a options object as parameter which has `event`, `batch` & `network` options as property.

```
{
  event: {
    classification: {
      instant: [],
    },
    priorities: [
      {
        identifier: "realTime",
        priority: 0,
      },
      {
        identifier: "instant",
        priority: 1,
      },
    ],
  },
  batch: {
    // max interval time between two batches, in seconds
    maxTimeBetweenTwoBatches: 10,
    // max size of batch, in bytes
    maxBatchSize: 50000,
  },
  network: {
    // base url
    url: "",
    // headers
    headers: {},
  },
}

```
