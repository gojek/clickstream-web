export default class Processor {
  constructor({ config }: { config: any })
  /**
   * Processes an event
   * @param proto - event proto
   * @returns type and event
   */
  process(proto: any): {
    type: string
    event: any
  }
  #private
}
//# sourceMappingURL=processor.d.ts.map
