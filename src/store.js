const STORE = "events"
import { logger } from "./logger.js"

const logPrefix = "Store:"

/**
 * @typedef {object} Event - Event type used in database
 * @property {Uint8Array} data - encoded event data
 * @property {string=} eventGuid - eventGuid
 * @property {string=} reqGuid - reqGuid
 * @property {string} eventType - event type
 * @property {string} type - type
 */
export default class Store {
  #name
  #version
  #db
  #isOpen
  constructor({ name = "clickstream_db", version = 1 }) {
    this.#name = name
    this.#version = version
    this.#isOpen = false
  }

  isOpen() {
    return this.#isOpen
  }

  /**
   * Open a new database connection
   * @returns Returns status
   */
  open() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.#name, this.#version)

      request.onblocked = (event) => {
        // If some other tab is loaded with the database, then it needs to be closed
        // before we can proceed.
        logger.info(
          logPrefix,
          "please close all other tabs with this site open"
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
        this.#isOpen = true
        resolve("success")
        logger.info(logPrefix, "store is open with name", this.#name)

        this.#db.addEventListener("close", () => {
          logger.info(logPrefix, "database connection is closed")
        })
      }

      request.onupgradeneeded = (event) => {
        // @ts-ignore
        this.#db = event.target.result

        switch (event.oldVersion) {
          case 0: {
            const objectStore = this.#db.createObjectStore(STORE, {
              keyPath: "eventGuid",
            })

            objectStore.createIndex("reqGuid", "reqGuid", { unique: false })

            objectStore.createIndex("eventGuid", "eventGuid", { unique: true })
          }
        }

        this.#db.onversionchange = (event) => {
          this.#db.close()
          this.#isOpen = false
          logger.info(
            logPrefix,
            "a new version of this page is ready, please reload or close this tab"
          )
          reject(event.target.error)
        }
      }
    })
  }

  /**
   * Reads all the data in the store
   * @returns all the data present in the store
   */
  read() {
    return new Promise((resolve, reject) => {
      try {
        const objectStore = this.#db.transaction(STORE).objectStore(STORE)

        objectStore.getAll().onsuccess = (event) => {
          resolve(event.target.result)
        }

        objectStore.getAll().onerror = (event) => {
          reject(event.target.error)
        }
      } catch (err) {
        this.#isOpen = false
        logger.error(logPrefix, err)
      }
    })
  }

  /**
   *
   * @param reqGuid
   * @returns Events with same reqGuid
   */
  readByReqGuid(reqGuid) {
    return new Promise((resolve) => {
      const events = []
      try {
        const objectStore = this.#db
          .transaction([STORE], "readwrite")
          .objectStore(STORE)

        const index = objectStore.index("reqGuid")

        index.openCursor().onsuccess = (event) => {
          try {
            const cursor = event.target.result
            if (cursor) {
              if (cursor.value.reqGuid === reqGuid) {
                events.push(cursor.value)
              }
              cursor.continue()
            } else {
              resolve(events)
            }
          } catch (err) {
            logger.error(logPrefix, err)
          }
        }
      } catch (err) {
        this.#isOpen = false
        logger.error(logPrefix, err)
      }
    })
  }

  /**
   * Writes events to db store
   * @param events Events to write in the db store
   * @returns Status of the transaction
   */
  write(/** @type {Event | Event[]} */ events) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(events)) {
        events = [events]
      }

      try {
        const transaction = this.#db.transaction([STORE], "readwrite")
        const objectStore = transaction.objectStore(STORE)

        transaction.oncomplete = () => {
          resolve("success")
        }

        transaction.onerror = (event) => {
          reject(event.target.error)
        }

        try {
          events.forEach((event) => {
            objectStore.add(event)
          })
        } catch (err) {
          logger.error(logPrefix, err)
        }
      } catch (err) {
        this.#isOpen = false
        logger.error(logPrefix, err)
      }
    })
  }

  /**
   * Update events within db store
   * @param events Events
   * @param key key
   * @param val value
   */
  update(
    /** @type {Event[]} */ events,
    /** @type {string} */ key,
    /** @type {string} */ val
  ) {
    try {
      const objectStore = this.#db
        .transaction([STORE], "readwrite")
        .objectStore(STORE)

      try {
        events.forEach((event) => {
          event[key] = val
          objectStore.put(event)
        })
      } catch (err) {
        logger.error(logPrefix, err)
      }
    } catch (err) {
      this.#isOpen = false
    }
  }

  /**
   * Remove events from store
   * @param events events to remove
   * @returns status of the call
   */
  remove(/** @type {Event[]} */ events) {
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.#db.transaction([STORE], "readwrite")
        const objectStore = transaction.objectStore(STORE)

        transaction.oncomplete = () => {
          resolve("success")
        }

        transaction.onerror = (event) => {
          reject(event.target.error)
        }

        try {
          events.forEach((event) => {
            objectStore.delete(event.eventGuid)
          })
        } catch (err) {
          logger.error(logPrefix, err)
        }
      } catch (err) {
        this.#isOpen = false
        logger.error(logPrefix, err)
      }
    })
  }

  /**
   * Deletes the database
   */
  delete() {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.deleteDatabase(this.#name)

      request.onerror = (event) => {
        // @ts-ignore
        reject(event.target.error)
      }

      request.onsuccess = (event) => {
        this.#db = null
        this.#isOpen = false
        // @ts-ignore
        resolve(event.target.result)
      }
    })
  }
}
