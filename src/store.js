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
      const request = window.indexedDB.open(this.#name, this.#version)

      request.onblocked = (event) => {
        // If some other tab is loaded with the database, then it needs to be closed
        // before we can proceed.
        console.log(
          "Clickstream: Please close all other tabs with this site open!"
        )
        // @ts-ignore
        reject(event.target.error)
      }

      request.onerror = (event) => {
        // @ts-ignore
        reject(event.target.error)
      }

      request.onsuccess = (event) => {
        // @ts-ignore
        this.#db = event.target.result
        this.isOpen = true
        resolve("success")
      }

      request.onupgradeneeded = (event) => {
        // @ts-ignore
        this.#db = event.target.result

        const objectStore = this.#db.createObjectStore(STORE, {
          keyPath: "eventGuid",
        })

        objectStore.createIndex("reqGuid", "reqGuid", { unique: false })

        objectStore.createIndex("eventGuid", "eventGuid", { unique: true })

        this.#db.onversionchange = (event) => {
          this.#db.close()
          this.isOpen = false
          console.log(
            "Clickstream: A new version of this page is ready. Please reload or close this tab!"
          )
          reject(event.target.error)
        }
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
        reject(event.target.error)
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
        reject(event.target.error)
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
        reject(event.target.error)
      }

      events.forEach((event) => {
        objectStore.delete(event.eventGuid)
      })
    })
  }

  delete() {
    new Promise((resolve, reject) => {
      let request = window.indexedDB.deleteDatabase(this.#name)

      request.onerror = (event) => {
        // @ts-ignore
        reject(event.target.error)
      }

      request.onsuccess = (event) => {
        this.#db = null
        this.isOpen = false
        // @ts-ignore
        resolve(event.target.result)
      }
    })
  }
}
