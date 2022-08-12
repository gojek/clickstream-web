export namespace defaultConfig {
  namespace event {
    namespace classification {
      const instant: any[]
    }
    const priorities: {
      identifier: string
      priority: number
    }[]
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
