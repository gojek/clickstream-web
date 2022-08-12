export const defaultConfig = {
  /**
   * @typedef {Object} Classification - Event classification
   * @property {string[]} instant - array of intant event names
   */
  /**
   * @typedef {Object} Priorities - Event priorities
   * @property {{identifier: string, priority: number}[]} instant - array of intant event names
   */
  /**
   * @typedef {Object} Event - Event config
   * @property {instant: string[]} classification - event classification
   * * @property {Priorities} classification - event priorities
   *
   */
  event: {
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
  batch: {
    // max interval time between two batches, in seconds
    maxTimeBetweenTwoBatches: 10,
    // max size of batch, in bytes
    maxBatchSize: 50000,
  },
  /**
   * @typedef {Object} Network - Network config
   * @property {string} url - base url
   * @property {Map} headers - request headers
   */
  network: {
    url: "",
    headers: {},
  },
}
