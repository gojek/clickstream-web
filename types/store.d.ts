export default class Store {
  constructor({ name, version }: { name?: string; version?: number })
  isOpen: boolean
  open(): Promise<any>
  read(): Promise<any>
  readByReqGuid(reqGuid: any): Promise<any>
  write(events: any): Promise<any>
  update(events: any, key: any, val: any): void
  remove(events: any): Promise<any>
  #private
}
//# sourceMappingURL=store.d.ts.map
