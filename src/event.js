// @ts-check
export default class EventBus {
  constructor() {
    this.eventTarget = new EventTarget()
  }
  /**
   * Event emitter
   *
   * emit the event on EventTarget
   *
   * @param type name of the event
   * @param payload data to attach in event
   */
  emit(type, payload) {
    const event = new CustomEvent(type, { detail: payload })
    this.eventTarget.dispatchEvent(event)
  }

  /**
   * Event listener
   *
   * Subscribes to the given event on the same EventTarget
   *
   * @param type name of the event
   * @param callback callback function
   */
  on(type, callback) {
    this.eventTarget.addEventListener(type, callback)
  }
}
