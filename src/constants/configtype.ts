export type Config = {
  event?: {
    classification?: {
      instant?: string[]
    }
    group?: string
  }
  batch?: {
    maxTimeBetweenTwoBatches?: number
    maxBatchSize?: number
  }
  network: {
    url: string | URL
    headers: Headers
    maxRetries?: number
    timeBetweenTwoRetries?: number
    timeToResumeRetries?: number
  }
}
