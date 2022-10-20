export const errorCode = {
  VALIDATION_ERROR: "validationError",
  DATABASE_ERROR: "databaseError",
  NETWORK_ERROR: "networkError",
  TRACKING_STOPPED: "trackingStopped",
}

export const errorName = {
  CLICKSTREAM_ERROR: "Clickstream Error",
  VALIDATION_ERROR: "Validation Error",
  DATABASE_ERROR: "Database Error",
  NETWORK_ERROR: "Network Error",
}

export class ClickstreamError extends Error {
  constructor(message, code, options) {
    super(message, options)
    this.name = errorName.CLICKSTREAM_ERROR
    this.code = errorCode.TRACKING_STOPPED
  }
}

export class ValidationError extends ClickstreamError {
  constructor(message, options) {
    super(message, options)
    this.name = errorName.VALIDATION_ERROR
    this.code = errorCode.VALIDATION_ERROR
  }
}

export class DatabaseError extends ClickstreamError {
  constructor(message, options) {
    super(message, options)
    this.name = errorName.DATABASE_ERROR
    this.code = errorCode.DATABASE_ERROR
  }
}

export class NetworkError extends ClickstreamError {
  constructor(message, options) {
    super(message, options)
    this.name = errorName.NETWORK_ERROR
    this.code = errorCode.NETWORK_ERROR
  }
}
