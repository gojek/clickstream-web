export namespace defaultConfig {
  namespace event {
    const classification: {
      instant: string[]
    }
    const priorities: {
      identifier: string
      priority: number
    }[]
    const group: string
  }
  namespace batch {
    const maxTimeBetweenTwoBatches: number
    const maxBatchSize: number
  }
  namespace network {
    const url: string
    const headers: {}
    const maxRetryCount: string
    const timeBetweenTwoRetries: string
    const timeToResetRetryCount: string
  }
}
//# sourceMappingURL=config.d.ts.map
