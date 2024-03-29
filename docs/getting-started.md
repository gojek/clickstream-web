# Getting Started

In this getting started guide, you'll learn how to integrate Clickstream Web in your project and send your very first event.

## Basic Concepts

Two types of events can be sent using Clickstream Web

- QoS0 events - These events are `instant and fire & forget` in nature.

- QoS1 events - These are `real-time` and sent `at least once`.

Every event is treated as a QoS1 event by default.

## Installation

```sh
# npm
npm install @gojek/clickstream-web

# yarn
yarn add @gojek/clickstream-web
```

## Usage

1. **Import SDK and proto package.**

```js
import { Clickstream } from "@gojek/clickstream-web"

// import the proto from a package that contains your protos.
import { proto } from "protobufjs-package"
```

2. **Initialize Clickstream**

Clickstream accepts options to override the default behavior. It supports `event`, `batch`, `network` & `crypto` configurations.

```js
import { Clickstream } from "@gojek/clickstream-web"

import { proto } from "protobufjs-package"

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

- `url` - [Raccoon](https://odpf.github.io/raccoon/) host url, must be either a string or instance of [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL).
- `headers` - Request headers, must be instance of [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers).

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
