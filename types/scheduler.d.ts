export default class Scheduler {
    constructor({ config, logger, eventBus, store }: {
        config: any;
        logger: any;
        eventBus: any;
        store: any;
    });
    /**
     * Return if the scheduler is running or not
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