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
    #private;
}
//# sourceMappingURL=processor.d.ts.map