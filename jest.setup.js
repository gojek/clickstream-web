/**
 * @see https://github.com/jsdom/jsdom/issues/2524#issuecomment-1118254830
 */
Object.defineProperty(window, "setInteval", {
  writable: true,
  value: setInterval,
})

global.Headers = Headers
