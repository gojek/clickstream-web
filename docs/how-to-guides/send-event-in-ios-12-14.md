# Send event in iOS 12 - 14

iOS < 14 does not support the [EventTarget][] constructor. To send an event, you need to add a polyfill for the `EventTarget` constructor. Follow the steps below:

1. Install [@mattkrick/event-target-polyfill][polyfill] package.

   ```sh
   $ npm install @mattkrick/event-target-polyfill
   ```

2. Modify the `window.EventTarget` before initializing Clickstream.

   ```js
   import { Clickstream } from "@gojek/clickstream-web"
   import EventTargetPolyfill from "@mattkrick/event-target-polyfill"

   // Add the polyfill
   window.EventTarget = EventTargetPolyfill

   // initialize Clickstream
   const clickstream = new Clickstream({})
   ```

Following these steps Clickstream will work as usual in iOS < 14.

<!-- reference URLs -->

[eventtarget]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/EventTarget#browser_compatibility
[polyfill]: https://github.com/mattkrick/event-target-polyfill
