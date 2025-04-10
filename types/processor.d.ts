export default class Processor {
    constructor({ config, store, id, isRealTimeEventsSupported }: {
        config: any;
        store: any;
        id: any;
        isRealTimeEventsSupported: any;
    });
    /**
     * Processes an event
     *
     * @param proto - event proto
     * @returns type and event
     */
    process(proto: object): {
        type: string;
        event: import("./store.js").Event;
    };
    processBinary(data: Uint8Array, type: string): {
        data: Uint8Array;
        eventType: string;
        type: string;
        eventGuid: any;
        reqGuid: string;
    };
    #private;
}
//# sourceMappingURL=processor.d.ts.map