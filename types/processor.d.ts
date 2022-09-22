export default class Processor {
  constructor({ config, store }: { config: any; store: any })
  /**
   * Processes an event
   *
   * @param proto - event proto
   * @returns type and event
   */
  process(proto: object): {
    type: string
    event: import("./store.js").Event
  }
  #private
}
//# sourceMappingURL=processor.d.ts.map
