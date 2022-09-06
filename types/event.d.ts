export default class EventBus {
  eventTarget: Document
  /**
   * Event emitter
   *
   * emit the event on EventTarget
   *
   * @param type name of the event
   * @param payload data to attach in event
   */
  emit(type: any, payload: any): void
  /**
   * Event listener
   *
   * Subscribes to the given event on the same EventTarget
   *
   * @param type name of the event
   * @param callback callback function
   */
  on(type: any, callback: any): void
}
//# sourceMappingURL=event.d.ts.map
