// @ts-check

export default class Logger {
  #logging = 1

  set logging(value) {
    this.#logging = value
  }

  info(message) {
    this.#log("info", message)
  }

  error(message) {
    this.#log("error", message)
  }

  log(message) {
    this.#log("log", message)
  }

  #log(type, message) {
    if (this.#logging && globalThis.console) {
      console[type](`Clickstream: ${message}`)
    }
  }
}
