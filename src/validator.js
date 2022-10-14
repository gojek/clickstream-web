// @ts-check

const isPositiveInteger = (value) => {
  return Number.isInteger(value) && value > 0
}

const isString = (value) => {
  return typeof value === "string"
}

const isDefined = (value) => {
  return value !== undefined
}

export default class Validator {
  validate(
    /** @type {import("./constants/config.js").EventConfig} */
    event,
    /** @type {import("./constants/config.js").BatchConfig} */
    batch,
    /** @type {import("./constants/config.js").NetworkConfig} */
    network,
    /** @type {object} */
    crypto
  ) {
    // network validation
    if (!network?.url) {
      throw new Error("Clickstream: Provide url in network config")
    }

    if (
      isDefined(network.url) &&
      !isString(network.url) &&
      !(network.url instanceof URL)
    ) {
      throw new Error(
        "Clickstream: network url must be of type string or instance of URL"
      )
    }

    if (!network?.headers) {
      throw new Error(
        "Clickstream: Provide Authorization header in network config"
      )
    }

    if (isDefined(network.headers) && !(network.headers instanceof Headers)) {
      throw new Error(
        "Clickstream: network headers must be instance of Headers"
      )
    }

    if (!network.headers.get("Authorization")) {
      throw new Error(
        "Clickstream: Provide Authorization header in network config"
      )
    }

    if (isDefined(network.timeBetweenTwoRetries)) {
      if (!isPositiveInteger(network.timeBetweenTwoRetries)) {
        throw new Error(
          "Clickstream: timeBetweenTwoRetries must be a positive integer"
        )
      }
    }

    if (isDefined(network.timeToResumeRetries)) {
      if (!isPositiveInteger(network.timeToResumeRetries)) {
        throw new Error(
          "Clickstream: timeToResumeRetries must be a positive integer"
        )
      }
    }

    // event validation
    if (isDefined(event?.classification?.instant)) {
      const isNonString = event.classification.instant.some((eventName) => {
        return !isString(eventName)
      })

      if (isNonString) {
        throw new Error(
          "Clickstream: Instant event names must be of type string"
        )
      }
    }

    if (isDefined(event?.group) && !isString(event.group)) {
      throw new Error("Clickstream: group name must be of type string")
    }

    // batch validation
    if (
      isDefined(batch?.maxTimeBetweenTwoBatches) &&
      !isPositiveInteger(batch.maxTimeBetweenTwoBatches)
    ) {
      throw new Error(
        "Clickstream: maxTimeBetweenTwoBatches must be a positive integer"
      )
    }

    if (
      isDefined(batch?.maxBatchSize) &&
      !isPositiveInteger(batch.maxBatchSize)
    ) {
      throw new Error("Clickstream: maxBatchSize must be a positive integer")
    }

    if (isDefined(batch?.dbName) && !isString(batch.dbName)) {
      throw new Error("Clickstream: group name must be of type string")
    }

    // crypto validation
    if (isDefined(crypto) && typeof crypto !== "object") {
      throw new Error("Clickstream: crypto must be of type object")
    }
  }
}
