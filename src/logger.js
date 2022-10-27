// @ts-check

export const logLevels = {
  ERROR: 1,
  INFO: 2,
}

export const isValidLogLevel = (value) => {
  return Object.values(logLevels).includes(value)
}

export default class Logger {
  #logLevel = logLevels.ERROR

  set logLevel(value) {
    this.#logLevel = value
    console.log(this.#logLevel, "logger")
  }

  error(message) {
    if (this.#logLevel >= logLevels.ERROR) {
      this.#log("error", message)
    }
  }

  info(message) {
    if (this.#logLevel >= logLevels.INFO) {
      this.#log("info", message)
    }
  }

  log(message) {
    this.#log("log", message)
  }

  #log(type, message) {
    if (globalThis.console) {
      console[type](`Clickstream: ${message}`)
    }
  }
}
