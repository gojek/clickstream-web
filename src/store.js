// @ts-check

const STORE = "events"

export default class Store {
  #name
  #version
  #db
  constructor({ name = "clickstream_db", version = 1 }) {
    this.#name = name
    this.#version = version
    this.isOpen = false
  }

  open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.#name, this.#version)

      request.onerror = (event) => {
        reject(event.target.errorCode)
      }

      request.onsuccess = (event) => {
        this.#db = event.target.result
        this.isOpen = true
        resolve("success")
      }

      request.onupgradeneeded = (event) => {
        this.#db = event.target.result

        const objectStore = this.#db.createObjectStore(STORE, {
          keyPath: "eventGuid",
        })

        objectStore.createIndex("reqGuid", "reqGuid", { unique: false })

        objectStore.createIndex("eventGuid", "eventGuid", { unique: true })
      }
    })
  }

  read() {
    return new Promise((resolve, reject) => {
      const objectStore = this.#db.transaction(STORE).objectStore(STORE)

      objectStore.getAll().onsuccess = (event) => {
        resolve(event.target.result)
      }

      objectStore.getAll().onerror = (event) => {
        reject(event.target.errorCode)
      }
    })
  }

  readByReqGuid(reqGuid) {
    return new Promise((resolve) => {
      const events = []
      const objectStore = this.#db
        .transaction([STORE], "readwrite")
        .objectStore(STORE)

      const index = objectStore.index("reqGuid")

      index.openCursor().onsuccess = (event) => {
        const cursor = event.target.result
        if (cursor) {
          if (cursor.value.reqGuid === reqGuid) {
            events.push(cursor.value)
          }
          cursor.continue()
        } else {
          resolve(events)
        }
      }
    })
  }

  write(events) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(events)) {
        events = [events]
      }

      const transaction = this.#db.transaction([STORE], "readwrite")
      const objectStore = transaction.objectStore(STORE)

      transaction.oncomplete = () => {
        resolve("success")
      }

      transaction.onerror = (event) => {
        reject(event.target.errorCode)
      }

      events.forEach((event) => {
        objectStore.add(event)
      })
    })
  }

  update(events, key, val) {
    const objectStore = this.#db
      .transaction([STORE], "readwrite")
      .objectStore(STORE)

    events.forEach((event) => {
      event[key] = val
      objectStore.put(event)
    })
  }

  remove(events) {
    return new Promise((resolve, reject) => {
      const transaction = this.#db.transaction([STORE], "readwrite")
      const objectStore = transaction.objectStore(STORE)

      transaction.oncomplete = () => {
        resolve("success")
      }

      transaction.onerror = (event) => {
        reject(event.target.errorCode)
      }

      events.forEach((event) => {
        objectStore.delete(event.eventGuid)
      })
    })
  }
}
