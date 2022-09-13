export const defaultConfig = {
  /**
   * @typedef {Object} Event - Event configuration
   * @property {{instant: string[]}} classification - event classification
   * @property {string} group - product group name
   */
  event: {
    /** @type {{instant: string[]}}  */
    classification: {
      instant: [],
    },
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
    // max number of retries before pausing
    maxRetries: 5,
    // gap between two retries (mSec)
    timeBetweenTwoRetries: 1000,
    // time after which retry will resume after hitting max retry count threshold (mSec)
    timeToResumeRetries: 20000,
  },
}
