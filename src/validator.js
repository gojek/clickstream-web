import { ValidationError } from "./error.js"

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
      throw new ValidationError("provide url in network config")
    }

    if (
      isDefined(network.url) &&
      !isString(network.url) &&
      !(network.url instanceof URL)
    ) {
      throw new ValidationError(
        "network url must be of type string or instance of URL"
      )
    }

    if (!network?.headers) {
      throw new ValidationError(
        `provide "Authorization" header in network config`
      )
    }

    if (isDefined(network.headers) && !(network.headers instanceof Headers)) {
      throw new ValidationError("network headers must be instance of Headers")
    }

    if (!network.headers.get("Authorization")) {
      throw new ValidationError(
        `provide "Authorization" header in network config`
      )
    }

    if (isDefined(network.timeBetweenTwoRetries)) {
      if (!isPositiveInteger(network.timeBetweenTwoRetries)) {
        throw new ValidationError(
          `"timeBetweenTwoRetries" must be a positive integer`
        )
      }
    }

    if (isDefined(network.timeToResumeRetries)) {
      if (!isPositiveInteger(network.timeToResumeRetries)) {
        throw new ValidationError(
          `"timeToResumeRetries" must be a positive integer`
        )
      }
    }

    // event validation
    if (isDefined(event?.classification?.instant)) {
      const isNonString = event.classification.instant.some((eventName) => {
        return !isString(eventName)
      })

      if (isNonString) {
        throw new ValidationError(
          `"instant" event names must be of type string`
        )
      }
    }

    if (isDefined(event?.group) && !isString(event.group)) {
      throw new ValidationError(`"group" name must be of type string`)
    }

    // batch validation
    if (
      isDefined(batch?.maxTimeBetweenTwoBatches) &&
      !isPositiveInteger(batch.maxTimeBetweenTwoBatches)
    ) {
      throw new ValidationError(
        "maxTimeBetweenTwoBatches must be a positive integer"
      )
    }

    if (
      isDefined(batch?.maxBatchSize) &&
      !isPositiveInteger(batch.maxBatchSize)
    ) {
      throw new ValidationError(`"maxBatchSize" must be a positive integer`)
    }

    if (isDefined(batch?.dbName) && !isString(batch.dbName)) {
      throw new ValidationError(`"dbName" name must be of type string`)
    }

    // crypto validation
    if (isDefined(crypto) && typeof crypto !== "object") {
      throw new ValidationError(`"crypto" must be of type object`)
    }
  }
}
