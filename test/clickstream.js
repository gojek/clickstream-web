import test from "ava"
import { gobiz } from "./protos/gobiz-ct.js"
import Clickstream from "../src/clickstream.js"
import EventBus from "../src/event.js"
import { CUSTOM_EVENT } from "../src/constants/index.js"

test("url and authorization header are required options", async (t) => {
  t.throws(() => {
    return new Promise((resolve, reject) => {
      reject(new Clickstream())
    })
  })
})
