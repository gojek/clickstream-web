export const defaultConfig = {
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
  network: {
    // url for clickstream backend service, URL instance
    url: null,
    // headers for the request, Headers instance
    headers: null,
    maxConnectionRetries: 30,
    maxConnectionRetryInterval: 30,
  },
}
