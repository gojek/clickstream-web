export default class Transport {
  constructor({
    config,
    eventBus,
    store,
  }: {
    config: any
    eventBus: any
    store: any
  })
  /**
   * Send data over network to clickstream BE
   *
   * @param batch batch to send
   */
  send(batch: import("./store.js").Event[], retry?: boolean): void
  #private
}
//# sourceMappingURL=transport.d.ts.map
