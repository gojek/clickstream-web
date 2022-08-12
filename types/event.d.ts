export default class EventBus {
  /**
   *
   * @param type name of the event
   * @param payload data to attach in event
   */
  emit(type: any, payload: any): void
  /**
   *
   * @param type name of the event
   * @param callback callback function
   */
  on(type: any, callback: any): void
}
//# sourceMappingURL=event.d.ts.map
