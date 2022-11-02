export const errorCodes = {
  CLICKSTREAM_ERROR: "clickstreamError",
  VALIDATION_ERROR: "validationError",
  DATABASE_ERROR: "databaseError",
  NETWORK_ERROR: "networkError",
  TRACKING_ERROR: "trackingError",
  CLEANUP_ERROR: "cleanupError",
}

export const errorNames = {
  CLICKSTREAM_ERROR: "Clickstream Error",
  VALIDATION_ERROR: "Validation Error",
  DATABASE_ERROR: "Database Error",
  NETWORK_ERROR: "Network Error",
  TRACKING_ERROR: "Tracking Error",
  CLEANUP_ERROR: "Cleanup Error",
}

export class ClickstreamError extends Error {
  constructor(message, options) {
    super(message, options)
    this.name = options.name || errorNames.CLICKSTREAM_ERROR
    this.code = options.code || errorCodes.CLICKSTREAM_ERROR
  }
}

export class ValidationError extends ClickstreamError {
  constructor(message, options) {
    super(message, options)
    this.name = errorNames.VALIDATION_ERROR
    this.code = errorCodes.VALIDATION_ERROR
  }
}

export class DatabaseError extends ClickstreamError {
  constructor(message, options) {
    super(message, options)
    this.name = errorNames.DATABASE_ERROR
    this.code = errorCodes.DATABASE_ERROR
  }
}

export class NetworkError extends ClickstreamError {
  constructor(message, options) {
    super(message, options)
    this.name = errorNames.NETWORK_ERROR
    this.code = errorCodes.NETWORK_ERROR
  }
}
