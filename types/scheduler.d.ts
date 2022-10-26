export default class Scheduler {
    constructor({ config, eventBus, store }: {
        config: any;
        eventBus: any;
        store: any;
    });
    /**
     * Return if the sceduler is running or not
     */
    isRunning(): boolean;
    /**
     * Start the scheduler
     */
    start(): void;
    /**
     * Stop the scheduler
     */
    stop(): void;
    /**
     * Pause the scheduler
     */
    pause(): void;
    /**
     * Resume the scheduler
     */
    resume(): void;
    free(): Promise<never>;
    #private;
}
//# sourceMappingURL=scheduler.d.ts.map