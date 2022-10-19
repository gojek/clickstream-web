export default class EventBus {
    eventTarget: EventTarget;
    /**
     * Event emitter
     *
     * emit the event on EventTarget
     *
     * @param type name of the event
     * @param payload data to attach in event
     */
    emit(type: string, payload: object): void;
    /**
     * Event listener
     *
     * Subscribes to the given event on the same EventTarget
     *
     * @param type name of the event
     * @param callback callback function
     */
    on(type: string, callback: any): void;
    /**
     * Event remover
     *
     * Removes to the given event on the same EventTarget
     *
     * @param type name of the event
     * @param callback callback function
     */
    remove(type: string, callback: any): void;
}
//# sourceMappingURL=event.d.ts.map