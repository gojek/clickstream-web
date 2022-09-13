export default class Processor {
  constructor({ config, store }: { config: any; store: any })
  /**
   * Processes an event
   *
   * @param proto - event proto
   * @returns type and event
   */
  process(proto: any): {
    type: string
    event: {
      data: any
      eventType: any
      type: any
    }
  }
  #private
}
//# sourceMappingURL=processor.d.ts.map
