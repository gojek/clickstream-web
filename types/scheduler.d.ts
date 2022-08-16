export default class Scheduler {
  constructor({ config, eventBus }: { config: any; eventBus: any })
  /**
   * Ingest an event
   * @param event event
   */
  ingest(event: any): void
  /**
   * Start the scheduler
   */
  start(): void
  /**
   * Stop the scheduler
   */
  stop(): void
  /**
   * Pause the scheduler
   */
  pause(): void
  /**
   * Resume the scheduler
   */
  resume(): void
  #private
}
//# sourceMappingURL=scheduler.d.ts.map