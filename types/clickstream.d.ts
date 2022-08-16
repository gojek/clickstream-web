export default class Clickstream {
  /**
   * @constructor
   * @param options Configuration options
   */
  constructor({
    event,
    batch,
    network,
  }?: {
    event: {
      classification: {
        instant: string[]
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
   * Dipatches a new event.
   * @param payload - JavaScript proto instance
   * @returns Promise to get the status of the event track call
   */
  track(payload: object): Promise<any>
  /**
   * Stops the tracking.
   * Track function call is ignored, existing events are processed.
   */
  stop(): void
  /**
   * Resumes the tracking.
   */
  start(): void
  /**
   * Releases all the resources used.
   */
  destroy(): void
  #private
}
//# sourceMappingURL=clickstream.d.ts.map
