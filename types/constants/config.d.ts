export namespace defaultConfig {
  namespace event {
    const classification: {
      instant: string[];
    };
    const group: string;
  }
  namespace batch {
    const maxTimeBetweenTwoBatches: number;
    const maxBatchSize: number;
  }
  namespace network {
    const url: string;
    const headers: {};
    const maxRetries: number;
    const timeBetweenTwoRetries: number;
    const timeToResumeRetries: number;
  }
}
//# sourceMappingURL=config.d.ts.map
