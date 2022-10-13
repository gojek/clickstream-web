export default class Clickstream {
    /**
     * @constructor
     * @param options Configuration options
     */
    constructor({ event, batch, network, crypto, }: import("./constants/config.js").Config);
    /**
     * Dipatches a new event.
     *
     * Used to dispatch an event, return a promise with status of the track call.
     *
     * @param payload - JavaScript proto instance
     * @returns Promise to get the status of the event track call
     */
    track(payload: object): Promise<never>;
    /**
     * Stops the tracking.
     *
     * Track function call is ignored, existing events are processed.
     */
    stop(): void;
    /**
     * Resumes the tracking.
     */
    start(): void;
    /**
     * Releases all the resources used.
     */
    destroy(): Promise<string>;
    #private;
}
//# sourceMappingURL=clickstream.d.ts.map