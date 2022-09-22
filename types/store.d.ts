/**
 * @typedef {object} Event - Event type used in database
 * @property {Uint8Array} data - encoded event data
 * @property {string} eventGuid - eventGuid
 * @property {string} reqGuid - reqGuid
 * @property {string} eventType - event type
 * @property {string} type - type
 */
export default class Store {
  constructor({ name, version }: { name?: string; version?: number })
  isOpen: boolean
  /**
   * Open a new database connection
   * @returns Returns status
   */
  open(): Promise<any>
  /**
   * Reads all the data in the store
   * @returns all the data present in the store
   */
  read(): Promise<any>
  /**
   *
   * @param reqGuid
   * @returns Events with same reqGuid
   */
  readByReqGuid(reqGuid: any): Promise<any>
  /**
   * Writes events to db store
   * @param events Events to write in the db store
   * @returns Status of the transaction
   */
  write(events: Event | Event[]): Promise<any>
  /**
   * Update events within db store
   * @param events Events
   * @param key key
   * @param val value
   */
  update(events: Event[], key: string, val: string): void
  /**
   * Remove events from store
   * @param events events to remove
   * @returns status of the call
   */
  remove(events: Event[]): Promise<any>
  /**
   * Deletes the database
   */
  delete(): void
  #private
}
/**
 * - Event type used in database
 */
export type Event = {
  /**
   * - encoded event data
   */
  data: Uint8Array
  /**
   * - eventGuid
   */
  eventGuid: string
  /**
   * - reqGuid
   */
  reqGuid: string
  /**
   * - event type
   */
  eventType: string
  /**
   * - type
   */
  type: string
}
//# sourceMappingURL=store.d.ts.map
