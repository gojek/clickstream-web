import test from "ava"
import { defaultConfig } from "../src/constants/config.js"
import { gobiz } from "./protos/gobiz-ct.js"
import Processer from "../src/processor.js"

test("processor construction", (t) => {
  const processor = new Processer({
    config: defaultConfig.event,
  })

  t.is(processor instanceof Processer, true)
})

test("process method returns type and event", (t) => {
  const payload = gobiz.clickstream.web.CT.create({
    label: "test",
    properties: {
      test: 1,
    },
  })

  const processor = new Processer({
    config: defaultConfig.event,
  })

  t.is(processor.process(payload).event, payload)
  t.is(processor.process(payload).type, "instant")
})
