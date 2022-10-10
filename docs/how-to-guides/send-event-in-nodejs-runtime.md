# Send event in Node JS runtimes

**Only QoS0 (instant) events** are supported in Node JS runtimes. All the events are treated as QoS0 events by default as browser dependent services/APIs are used for QoS1 events.

## Requirements

- Node v14 is the minimum compatible version.

## Steps

1. Provide web crypto module object in the constructor while initialising as it is an environment & version specific module.

```js
import crypto from "crypto"

// initialise
const clckstrm = new Clickstream({
  network: {
    url: new URL("https://example.org"),
    headers: new Headers({
      Authorization: "Basic <secret-key>",
    }),
  },
  // pass web crypto module.
  crypto: crypto.webcrypto,
})
```

**Note** - **For Node version <=14**, [web crypto](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) is not supported natively. You can use a web crypto polyfill something similar to [this](https://www.npmjs.com/package/@peculiar/webcrypto)

2. **Node versions < 18** doesn't have support for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers). You need to add polyfill for that to be available globally. A fetch polyfill like [node-fetch](https://github.com/node-fetch/node-fetch) can be initialized globally. Check this out for [reference on how to do it](https://github.com/node-fetch/node-fetch#providing-global-access).

**Note** - This step is not required for **Node versions >= 18**
