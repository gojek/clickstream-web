export default class Clickstream {
    /**
     * @constructor
     * @param options Configuration options
     */
    constructor({ event, batch, network, crypto, debug, }: import("./constants/config.js").Config);
    /**
     * Dispatches a new event asynchronously.
     *
     * It processes the event and registers them in the system.
     * It doesn't take network request into account, success of the .track() doesn't mean that event is sent and stored at backend.
     *
     * In case of failure it rejects the promise with error, and in that case event is not registered in the system.
     *
     * @param payload - JavaScript proto instance
     * @returns Promise
     */
    track(payload: object): Promise<never>;
    /**
     * Pauses the tracking.
     *
     * New .track() method calls are ignored, existing events in the system are still processed.
     * Tracking can be resumed by calling .resume() method.
     */
    pause(): void;
    /**
     * Resumes the tracking if it is paused by calling .pause() method, have no effect otherwise.
     */
    resume(): void;
    /**
     * frees up all the resource used by the Clickstream instance asynchronously.
     *
     * clears the timeouts and intervals used.
     * removes all the event listeners.
     * flushes all the existing events in the system.
     * deletes the indexedDB database in use.
     *
     * It has no side effect on the working oh the SDK.
     * calling .track() method again will re-create all the timeouts, interval and database for event tracking.
     */
    free(): Promise<never>;
    #private;
}
//# sourceMappingURL=clickstream.d.ts.map