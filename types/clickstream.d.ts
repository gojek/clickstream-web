export default class Clickstream {
  constructor({
    event,
    batch,
    network,
  }?: {
    event: {
      classification: {
        instant: any[]
      }
      priorities: {
        identifier: string
        priority: number
      }[]
    }
    batch: {
      maxTimeBetweenTwoBatches: number
      maxBatchSize: number
    }
    network: {
      url: string
      headers: {}
    }
  })
  /**
   * Dipatch the event
   * @param payload - payload object
   * @returns Promise
   */
  track(payload: any): Promise<any>
  /**
   * Gracefully stops the tracking
   */
  stop(): void
  /**
   * Resumes the tracking
   */
  start(): void
  /**
   * Release all the resources used
   */
  destroy(): void
  #private
}
//# sourceMappingURL=clickstream.d.ts.map
