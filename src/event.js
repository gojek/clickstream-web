// @ts-check
export default class EventBus {
  /**
   *
   * @param type name of the event
   * @param payload data to attach in event
   */
  emit(type, payload) {
    const event = new CustomEvent(type, { detail: payload })
    document.dispatchEvent(event)
  }

  /**
   *
   * @param type name of the event
   * @param callback callback function
   */
  on(type, callback) {
    document.addEventListener(type, callback)
  }
}
