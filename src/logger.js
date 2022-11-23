let logging = false

function format(prefix, args) {
  if (!prefix) return args
  return [prefix, ...args]
}

const info = function (prefix = "", ...args) {
  if (!logging) return
  console.log(...format(prefix, args))
}

const debug = function (prefix = "", ...args) {
  if (!logging) return
  console.debug(...format(prefix, args))
}

const warn = function (prefix = "", ...args) {
  if (!logging) return
  console.warn(...format(prefix, args))
}

const error = function (prefix = "", ...args) {
  console.error(...format(prefix, args))
}

export const logger = {
  info,
  debug,
  warn,
  error,
  get logging() {
    return logging
  },
  set logging(value) {
    logging = Boolean(value)
  },
}
