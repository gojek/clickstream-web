export const ErrorCodes = {
  CLICKSTREAM_ERROR: "clickstreamError",
  VALIDATION_ERROR: "validationError",
  DATABASE_ERROR: "databaseError",
  NETWORK_ERROR: "networkError",
  TRACKING_ERROR: "trackingError",
  CLEANUP_ERROR: "cleanupError",
}

export const ErrorNames = {
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
    this.name = options.name || ErrorNames.CLICKSTREAM_ERROR
    this.code = options.code || ErrorCodes.CLICKSTREAM_ERROR
  }
}

export class ValidationError extends ClickstreamError {
  constructor(message, options) {
    super(message, options)
    this.name = ErrorNames.VALIDATION_ERROR
    this.code = ErrorCodes.VALIDATION_ERROR
  }
}

export class DatabaseError extends ClickstreamError {
  constructor(message, options) {
    super(message, options)
    this.name = ErrorNames.DATABASE_ERROR
    this.code = ErrorCodes.DATABASE_ERROR
  }
}

export class NetworkError extends ClickstreamError {
  constructor(message, options) {
    super(message, options)
    this.name = ErrorNames.NETWORK_ERROR
    this.code = ErrorCodes.NETWORK_ERROR
  }
}
