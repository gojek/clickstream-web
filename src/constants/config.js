export const defaultConfig = {
  /**
   * @typedef {Object} Event - Event configuration
   * @property {{instant: string[]}} classification - event classification
   * @property {{identifier: string, priority: number}[]} classification - event priorities
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
  },
}
