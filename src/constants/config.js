export const defaultConfig = {
  /**
   * @typedef {Object} Event - Event configuration
   * @property {{instant: string[]}} classification - event classification
   * @property {{identifier: string, priority: number}[]} priorities - event priorities
   * @property {string} group - product group name
   */
  event: {
    /** @type {{instant: string[]}}  */
    classification: {
      instant: [],
    },
    priorities: [
      {
        identifier: "realTime",
        priority: 0,
      },
      {
        identifier: "instant",
        priority: 1,
      },
    ],
    group: "",
  },
  /**
   * @typedef {Object} Batch - Batch configuration
   * @property {number} maxTimeBetweenTwoBatches - Maximum wait time betweeen two batches
   * @property {number} maxBatchSize - Maximum size of a batch
   */
  batch: {
    // max interval time between two batches, in seconds
    maxTimeBetweenTwoBatches: 10,
    // max size of batch, in bytes
    maxBatchSize: 50000,
  },
  /**
   * @typedef {Object} Network - Network configuration
   * @property {string} url - base url
   * @property {object} headers - request headers
   */
  network: {
    url: "",
    headers: {},
    // max retry count
    maxRetryCount: "5",
    // gap between two reties
    timeBetweenTwoRetries: "20000",
    // time to reset retry count to zero
    timeToResetRetryCount: "5000",
  },
}
