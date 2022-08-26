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
  }
}
//# sourceMappingURL=config.d.ts.map
