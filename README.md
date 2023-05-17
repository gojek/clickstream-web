# Clickstream Web

Clickstream Web is a Modern, Fast, and Lightweight Event Ingestion library, adhering to the philosophy and workings of Clickstream. Clickstream is event agnostic and real-time in nature.

## Features

- **Fast** - Much faster than other third-party analytics solutions
- **Reliable** - At least once delivery, ensured
- **Highly configurable** - Mold the behavior based on your business goals
- **Lean** - Close to native web technologies, less dependencies
- **Runtime Agnostic** - Use in browser & Node JS runtimes seamlessly

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

### Steps

1. **Import SDK and proto package**

   ```js
   import { Clickstream } from "@gojek/clickstream-web"

   // import the proto from a package that contains your protos.
   import { proto } from "protobufjs-package"
   ```

2. **Initialize Clickstream**

   Clickstream accepts options to override the default behavior. It supports `event`, `batch`, `network` & `crypto` configurations.

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

Following network options are mandatory to pass while initializing -

- `url` - [Raccoon](https://odpf.github.io/raccoon/) host url, instance of [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL).
- `headers` - Request headers, instance of [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

> 🔺 **PITFALL:** Make sure to initialize the Clickstream Web SDK at top level/module level to avoid unintended multiple initializations. Placing initialization code inside a Component/Function can cause multiple initialization as they can be called or rendered multiple times.
> In React apps, even if the component is used only once, [Strict Mode](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects) can cause the component to be called twice and hence multiple Clickstream initializations.
> See this [guide](https://github.com/gojek/clickstream-web/blob/main/docs/how-to-guides/use-multiple-instance.md) if your intention is to use multiple Clickstream instance.

Safe and unsafe place for initialization -

```js
import { Clickstream } from "@gojek/clickstream-web"

// safe place to initialization
const clckstrm = new Clickstream({...})


export const App() {
  // UNSAFE place to initialization
  const clckstrm = new Clickstream({...})
  ...
}
```

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

   // initialize
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
     try {
       await clckstrm.track(payload)
     } catch(err) {
       // handle error
       console.log(err)
     }
   })
   ```

> 🔺 **PITFALL:** If you dispatch an event at component root level/page load, React [Strict Mode]() can cause the events to be fired twice in development mode, causing duplicate events to be sent to Clickstream backend. Although this won't be a problem in production mode.

## Methods

### track

Dispatches a new event asynchronously. Processes the event and returns a Promise. If the promise resolves, the SDK will eventually send the event(s) via network requests. If the promise rejects with an error, the event(s) are not registered in the system.

Errors can be of different type, represented by these [error codes](https://github.com/gojek/clickstream-web/blob/main/src/error.js).

```js
try {
  await clckstrm.track(payload)
} catch (err) {
  // handle error
  console.log(err)
}
```

### pause

Pauses the tracking. Subsequent `.track()` method calls are ignored, existing events in the system are still processed.
Tracking can be resumed by calling `.resume()` method.

```js
clckstrm.pause()
```

### resume

Resumes the tracking if it was paused by calling `.pause()` method previously, otherwise has no effect.

```js
clckstrm.resume()
```

### free

Frees up all the resource used by the Clickstream instance asynchronously.
Clears all resources like timers and event listeners.
Flushes all existing events in the system before deleting the IndexedDB database in use.

Calling `.track()` after `.free()` will reallocate all resources automatically.

Returns errors with message and code on failure.

```js
try {
  await clckstrm.free()
} catch (err) {
  // handle error
  console.log(err)
}
```

## Options

The constructor takes an options object as parameter which has `event`, `batch`, `network`, `crypto` & `debug` options as property.

```js
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
  crypto: null,
  // enable logging by setting this to true
  debug: false,
}
```

## Error Handling

SDK throws error with `message`, `code` & `cause` which can be used for better error handling as shown below -

```js
import { errorCodes } from "@gojek/clickstream-web"

try {
  await clckstrm.track(payload)
} catch (err) {
  if (err.code === errorCodes.TRACKING_ERROR) {
    clckstrm.resume()
  } else {
    console.log(err.message)
  }
}
```

## Documentation

- ### [Getting Started](https://github.com/gojek/clickstream-web/blob/main/docs/getting-started.md)

- ### [How To Guide](https://github.com/gojek/clickstream-web/blob/main/docs/how-to-guides/readme.md)

- ### [API Reference](https://github.com/gojek/clickstream-web/blob/main/docs/reference/readme.md)

- ### [Browser Compatibility](https://github.com/gojek/clickstream-web/blob/main/docs/browser-compatibility.md)

- ### [Limitation](https://github.com/gojek/clickstream-web/blob/main/docs/limitations.md)

- ### [Architecture](https://github.com/gojek/clickstream-web/blob/main/docs/architecture.md)

## Contribution Guidelines

See the [guidelines](https://github.com/gojek/clickstream-web/blob/main//CONTRIBUTION.md)

## Sibling SDKs

Clickstream have SDKs for **[iOS](https://source.golabs.io/mobile/clickstream-ios-sdk)** and **[Android](https://source.golabs.io/mobile/devx/android-framework/clickstream-android-sdk)** platforms for mobile projects.

## Issues

Submit your question and issues [here](https://github.com/gojek/clickstream-web/issues).

## License

```
Copyright 2022 GOJEK

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
