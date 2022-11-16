/**
 * @typedef {object} EventConfig - Event configuration
 * @property {{instant: string[]}} classification - event classification
 * @property {string=} group - product group name
 */

/**
 * @typedef {object} BatchConfig - Batch configuration
 * @property {number=} maxTimeBetweenTwoBatches - Maximum wait time betweeen two batches
 * @property {number=} maxBatchSize - Maximum size of a batch
 * @property {string=} dbName - name for indexedDB
 */

/**
 * @typedef {object} NetworkConfig - Network configuration
 * @property {string | URL} url - base url
 * @property {Headers} headers - request headers
 * @property {number=} maxRetries - max retries
 * @property {number=} timeBetweenTwoRetries - time in seconds between two retries
 * @property {number=} timeToResumeRetries - time in seconds to resume retries
 */

/**
 * @typedef {object} Config - Configuration
 * @property {EventConfig=} event - event configurations
 * @property {BatchConfig=} batch - batch configurations
 * @property {NetworkConfig} network - network configurations
 * @property {object=} crypto - crypto module instance
 * @property {Boolean=} debug - debug option
 */

/** @type {Config} } */
export const defaultConfig = {
  event: {
    classification: {
      instant: [],
    },
    group: "",
  },
  batch: {
    // max interval time between two batches, in seconds
    maxTimeBetweenTwoBatches: 10,
    // max size of batch, in bytes
    maxBatchSize: 50000,
    // name for indexedDB, must be unique per domain
    dbName: "clickstream_db",
  },
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
  crypto: null,
}
