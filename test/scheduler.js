import test from "ava"
import { defaultConfig } from "../src/constants/config.js"
import { gobiz } from "./protos/gobiz-ct.js"
import Scheduler from "../src/scheduler.js"
import EventBus from "../src/event.js"
import { CUSTOM_EVENT } from "../src/constants/index.js"

test("scheduler construction", (t) => {
  const processor = new Scheduler({
    config: defaultConfig.event,
  })

  t.is(processor instanceof Scheduler, true)
})

test("emits the ingested event", async (t) => {
  const payload = gobiz.clickstream.web.CT.create({
    label: "test",
    properties: {
      test: 1,
    },
  })

  const eventBus = new EventBus()

  const scheduler = new Scheduler({
    config: defaultConfig.batch,
    eventBus,
  })

  scheduler.ingest(payload)

  await new Promise((resolve) => {
    eventBus.on(CUSTOM_EVENT.BATCH_CREATED, (e) => {
      t.is(e.detail.batch, [payload])
      resolve()
    })
  })
})
