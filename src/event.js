export default class EventBus {
  emit(type, payload) {
    const event = new CustomEvent(type, { detail: payload })
    document.dispatchEvent(event)
  }

  on(type, callback) {
    document.addEventListener(type, callback)
  }
}
