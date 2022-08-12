/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal.js"

// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {})

export const EventService = ($root.EventService = (() => {
  /**
   * Constructs a new EventService service.
   * @exports EventService
   * @classdesc Represents an EventService
   * @extends $protobuf.rpc.Service
   * @constructor
   * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
   * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
   * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
   */
  function EventService(rpcImpl, requestDelimited, responseDelimited) {
    $protobuf.rpc.Service.call(
      this,
      rpcImpl,
      requestDelimited,
      responseDelimited
    )
  }

  ;(EventService.prototype = Object.create(
    $protobuf.rpc.Service.prototype
  )).constructor = EventService

  /**
   * Creates new EventService service using the specified rpc implementation.
   * @function create
   * @memberof EventService
   * @static
   * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
   * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
   * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
   * @returns {EventService} RPC service. Useful where requests and/or responses are streamed.
   */
  EventService.create = function create(
    rpcImpl,
    requestDelimited,
    responseDelimited
  ) {
    return new this(rpcImpl, requestDelimited, responseDelimited)
  }

  /**
   * Callback as used by {@link EventService#sendEvent}.
   * @memberof EventService
   * @typedef SendEventCallback
   * @type {function}
   * @param {Error|null} error Error, if any
   * @param {SendEventResponse} [response] SendEventResponse
   */

  /**
   * Calls SendEvent.
   * @function sendEvent
   * @memberof EventService
   * @instance
   * @param {ISendEventRequest} request SendEventRequest message or plain object
   * @param {EventService.SendEventCallback} callback Node-style callback called with the error, if any, and SendEventResponse
   * @returns {undefined}
   * @variation 1
   */
  Object.defineProperty(
    (EventService.prototype.sendEvent = function sendEvent(request, callback) {
      return this.rpcCall(
        sendEvent,
        $root.SendEventRequest,
        $root.SendEventResponse,
        request,
        callback
      )
    }),
    "name",
    { value: "SendEvent" }
  )

  /**
   * Calls SendEvent.
   * @function sendEvent
   * @memberof EventService
   * @instance
   * @param {ISendEventRequest} request SendEventRequest message or plain object
   * @returns {Promise<SendEventResponse>} Promise
   * @variation 2
   */

  return EventService
})())

export const SendEventRequest = ($root.SendEventRequest = (() => {
  /**
   * Properties of a SendEventRequest.
   * @exports ISendEventRequest
   * @interface ISendEventRequest
   * @property {string|null} [reqGuid] SendEventRequest reqGuid
   * @property {ITimestamp|null} [sentTime] SendEventRequest sentTime
   * @property {Array.<IEvent>|null} [events] SendEventRequest events
   */

  /**
   * Constructs a new SendEventRequest.
   * @exports SendEventRequest
   * @classdesc Represents a SendEventRequest.
   * @implements ISendEventRequest
   * @constructor
   * @param {ISendEventRequest=} [properties] Properties to set
   */
  function SendEventRequest(properties) {
    this.events = []
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
  }

  /**
   * SendEventRequest reqGuid.
   * @member {string} reqGuid
   * @memberof SendEventRequest
   * @instance
   */
  SendEventRequest.prototype.reqGuid = ""

  /**
   * SendEventRequest sentTime.
   * @member {ITimestamp|null|undefined} sentTime
   * @memberof SendEventRequest
   * @instance
   */
  SendEventRequest.prototype.sentTime = null

  /**
   * SendEventRequest events.
   * @member {Array.<IEvent>} events
   * @memberof SendEventRequest
   * @instance
   */
  SendEventRequest.prototype.events = $util.emptyArray

  /**
   * Creates a new SendEventRequest instance using the specified properties.
   * @function create
   * @memberof SendEventRequest
   * @static
   * @param {ISendEventRequest=} [properties] Properties to set
   * @returns {SendEventRequest} SendEventRequest instance
   */
  SendEventRequest.create = function create(properties) {
    return new SendEventRequest(properties)
  }

  /**
   * Encodes the specified SendEventRequest message. Does not implicitly {@link SendEventRequest.verify|verify} messages.
   * @function encode
   * @memberof SendEventRequest
   * @static
   * @param {ISendEventRequest} message SendEventRequest message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  SendEventRequest.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create()
    if (
      message.reqGuid != null &&
      Object.hasOwnProperty.call(message, "reqGuid")
    )
      writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.reqGuid)
    if (
      message.sentTime != null &&
      Object.hasOwnProperty.call(message, "sentTime")
    )
      $root.Timestamp.encode(
        message.sentTime,
        writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
      ).ldelim()
    if (message.events != null && message.events.length)
      for (let i = 0; i < message.events.length; ++i)
        $root.Event.encode(
          message.events[i],
          writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
        ).ldelim()
    return writer
  }

  /**
   * Decodes a SendEventRequest message from the specified reader or buffer.
   * @function decode
   * @memberof SendEventRequest
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {SendEventRequest} SendEventRequest
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  SendEventRequest.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.SendEventRequest()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1: {
          message.reqGuid = reader.string()
          break
        }
        case 2: {
          message.sentTime = $root.Timestamp.decode(reader, reader.uint32())
          break
        }
        case 3: {
          if (!(message.events && message.events.length)) message.events = []
          message.events.push($root.Event.decode(reader, reader.uint32()))
          break
        }
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  }

  /**
   * Verifies a SendEventRequest message.
   * @function verify
   * @memberof SendEventRequest
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  SendEventRequest.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected"
    if (message.reqGuid != null && message.hasOwnProperty("reqGuid"))
      if (!$util.isString(message.reqGuid)) return "reqGuid: string expected"
    if (message.sentTime != null && message.hasOwnProperty("sentTime")) {
      let error = $root.Timestamp.verify(message.sentTime)
      if (error) return "sentTime." + error
    }
    if (message.events != null && message.hasOwnProperty("events")) {
      if (!Array.isArray(message.events)) return "events: array expected"
      for (let i = 0; i < message.events.length; ++i) {
        let error = $root.Event.verify(message.events[i])
        if (error) return "events." + error
      }
    }
    return null
  }

  /**
   * Gets the default type url for SendEventRequest
   * @function getTypeUrl
   * @memberof SendEventRequest
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  SendEventRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = "type.googleapis.com"
    }
    return typeUrlPrefix + "/SendEventRequest"
  }

  return SendEventRequest
})())

export const Timestamp = ($root.Timestamp = (() => {
  /**
   * Properties of a Timestamp.
   * @exports ITimestamp
   * @interface ITimestamp
   * @property {number|Long|null} [seconds] Timestamp seconds
   * @property {number|null} [nanos] Timestamp nanos
   */

  /**
   * Constructs a new Timestamp.
   * @exports Timestamp
   * @classdesc Represents a Timestamp.
   * @implements ITimestamp
   * @constructor
   * @param {ITimestamp=} [properties] Properties to set
   */
  function Timestamp(properties) {
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
  }

  /**
   * Timestamp seconds.
   * @member {number|Long} seconds
   * @memberof Timestamp
   * @instance
   */
  Timestamp.prototype.seconds = $util.Long
    ? $util.Long.fromBits(0, 0, false)
    : 0

  /**
   * Timestamp nanos.
   * @member {number} nanos
   * @memberof Timestamp
   * @instance
   */
  Timestamp.prototype.nanos = 0

  /**
   * Creates a new Timestamp instance using the specified properties.
   * @function create
   * @memberof Timestamp
   * @static
   * @param {ITimestamp=} [properties] Properties to set
   * @returns {Timestamp} Timestamp instance
   */
  Timestamp.create = function create(properties) {
    return new Timestamp(properties)
  }

  /**
   * Encodes the specified Timestamp message. Does not implicitly {@link Timestamp.verify|verify} messages.
   * @function encode
   * @memberof Timestamp
   * @static
   * @param {ITimestamp} message Timestamp message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Timestamp.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create()
    if (
      message.seconds != null &&
      Object.hasOwnProperty.call(message, "seconds")
    )
      writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.seconds)
    if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
      writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.nanos)
    return writer
  }

  /**
   * Decodes a Timestamp message from the specified reader or buffer.
   * @function decode
   * @memberof Timestamp
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Timestamp} Timestamp
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Timestamp.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Timestamp()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1: {
          message.seconds = reader.int64()
          break
        }
        case 2: {
          message.nanos = reader.int32()
          break
        }
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  }

  /**
   * Verifies a Timestamp message.
   * @function verify
   * @memberof Timestamp
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Timestamp.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected"
    if (message.seconds != null && message.hasOwnProperty("seconds"))
      if (
        !$util.isInteger(message.seconds) &&
        !(
          message.seconds &&
          $util.isInteger(message.seconds.low) &&
          $util.isInteger(message.seconds.high)
        )
      )
        return "seconds: integer|Long expected"
    if (message.nanos != null && message.hasOwnProperty("nanos"))
      if (!$util.isInteger(message.nanos)) return "nanos: integer expected"
    return null
  }

  /**
   * Gets the default type url for Timestamp
   * @function getTypeUrl
   * @memberof Timestamp
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  Timestamp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = "type.googleapis.com"
    }
    return typeUrlPrefix + "/Timestamp"
  }

  return Timestamp
})())

export const Event = ($root.Event = (() => {
  /**
   * Properties of an Event.
   * @exports IEvent
   * @interface IEvent
   * @property {Uint8Array|null} [eventBytes] Event eventBytes
   * @property {string|null} [type] Event type
   */

  /**
   * Constructs a new Event.
   * @exports Event
   * @classdesc Represents an Event.
   * @implements IEvent
   * @constructor
   * @param {IEvent=} [properties] Properties to set
   */
  function Event(properties) {
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
  }

  /**
   * Event eventBytes.
   * @member {Uint8Array} eventBytes
   * @memberof Event
   * @instance
   */
  Event.prototype.eventBytes = $util.newBuffer([])

  /**
   * Event type.
   * @member {string} type
   * @memberof Event
   * @instance
   */
  Event.prototype.type = ""

  /**
   * Creates a new Event instance using the specified properties.
   * @function create
   * @memberof Event
   * @static
   * @param {IEvent=} [properties] Properties to set
   * @returns {Event} Event instance
   */
  Event.create = function create(properties) {
    return new Event(properties)
  }

  /**
   * Encodes the specified Event message. Does not implicitly {@link Event.verify|verify} messages.
   * @function encode
   * @memberof Event
   * @static
   * @param {IEvent} message Event message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  Event.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create()
    if (
      message.eventBytes != null &&
      Object.hasOwnProperty.call(message, "eventBytes")
    )
      writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.eventBytes)
    if (message.type != null && Object.hasOwnProperty.call(message, "type"))
      writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.type)
    return writer
  }

  /**
   * Decodes an Event message from the specified reader or buffer.
   * @function decode
   * @memberof Event
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {Event} Event
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  Event.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.Event()
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1: {
          message.eventBytes = reader.bytes()
          break
        }
        case 2: {
          message.type = reader.string()
          break
        }
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  }

  /**
   * Verifies an Event message.
   * @function verify
   * @memberof Event
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  Event.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected"
    if (message.eventBytes != null && message.hasOwnProperty("eventBytes"))
      if (
        !(
          (message.eventBytes &&
            typeof message.eventBytes.length === "number") ||
          $util.isString(message.eventBytes)
        )
      )
        return "eventBytes: buffer expected"
    if (message.type != null && message.hasOwnProperty("type"))
      if (!$util.isString(message.type)) return "type: string expected"
    return null
  }

  /**
   * Gets the default type url for Event
   * @function getTypeUrl
   * @memberof Event
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  Event.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = "type.googleapis.com"
    }
    return typeUrlPrefix + "/Event"
  }

  return Event
})())

export const SendEventResponse = ($root.SendEventResponse = (() => {
  /**
   * Properties of a SendEventResponse.
   * @exports ISendEventResponse
   * @interface ISendEventResponse
   * @property {Status|null} [status] SendEventResponse status
   * @property {Code|null} [code] SendEventResponse code
   * @property {number|Long|null} [sentTime] SendEventResponse sentTime
   * @property {string|null} [reason] SendEventResponse reason
   * @property {Object.<string,string>|null} [data] SendEventResponse data
   */

  /**
   * Constructs a new SendEventResponse.
   * @exports SendEventResponse
   * @classdesc Represents a SendEventResponse.
   * @implements ISendEventResponse
   * @constructor
   * @param {ISendEventResponse=} [properties] Properties to set
   */
  function SendEventResponse(properties) {
    this.data = {}
    if (properties)
      for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
  }

  /**
   * SendEventResponse status.
   * @member {Status} status
   * @memberof SendEventResponse
   * @instance
   */
  SendEventResponse.prototype.status = 0

  /**
   * SendEventResponse code.
   * @member {Code} code
   * @memberof SendEventResponse
   * @instance
   */
  SendEventResponse.prototype.code = 0

  /**
   * SendEventResponse sentTime.
   * @member {number|Long} sentTime
   * @memberof SendEventResponse
   * @instance
   */
  SendEventResponse.prototype.sentTime = $util.Long
    ? $util.Long.fromBits(0, 0, false)
    : 0

  /**
   * SendEventResponse reason.
   * @member {string} reason
   * @memberof SendEventResponse
   * @instance
   */
  SendEventResponse.prototype.reason = ""

  /**
   * SendEventResponse data.
   * @member {Object.<string,string>} data
   * @memberof SendEventResponse
   * @instance
   */
  SendEventResponse.prototype.data = $util.emptyObject

  /**
   * Creates a new SendEventResponse instance using the specified properties.
   * @function create
   * @memberof SendEventResponse
   * @static
   * @param {ISendEventResponse=} [properties] Properties to set
   * @returns {SendEventResponse} SendEventResponse instance
   */
  SendEventResponse.create = function create(properties) {
    return new SendEventResponse(properties)
  }

  /**
   * Encodes the specified SendEventResponse message. Does not implicitly {@link SendEventResponse.verify|verify} messages.
   * @function encode
   * @memberof SendEventResponse
   * @static
   * @param {ISendEventResponse} message SendEventResponse message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  SendEventResponse.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create()
    if (message.status != null && Object.hasOwnProperty.call(message, "status"))
      writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.status)
    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
      writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.code)
    if (
      message.sentTime != null &&
      Object.hasOwnProperty.call(message, "sentTime")
    )
      writer.uint32(/* id 3, wireType 0 =*/ 24).int64(message.sentTime)
    if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
      writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.reason)
    if (message.data != null && Object.hasOwnProperty.call(message, "data"))
      for (let keys = Object.keys(message.data), i = 0; i < keys.length; ++i)
        writer
          .uint32(/* id 5, wireType 2 =*/ 42)
          .fork()
          .uint32(/* id 1, wireType 2 =*/ 10)
          .string(keys[i])
          .uint32(/* id 2, wireType 2 =*/ 18)
          .string(message.data[keys[i]])
          .ldelim()
    return writer
  }

  /**
   * Decodes a SendEventResponse message from the specified reader or buffer.
   * @function decode
   * @memberof SendEventResponse
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {SendEventResponse} SendEventResponse
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  SendEventResponse.decode = function decode(reader, length) {
    if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
    let end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.SendEventResponse(),
      key,
      value
    while (reader.pos < end) {
      let tag = reader.uint32()
      switch (tag >>> 3) {
        case 1: {
          message.status = reader.int32()
          break
        }
        case 2: {
          message.code = reader.int32()
          break
        }
        case 3: {
          message.sentTime = reader.int64()
          break
        }
        case 4: {
          message.reason = reader.string()
          break
        }
        case 5: {
          if (message.data === $util.emptyObject) message.data = {}
          let end2 = reader.uint32() + reader.pos
          key = ""
          value = ""
          while (reader.pos < end2) {
            let tag2 = reader.uint32()
            switch (tag2 >>> 3) {
              case 1:
                key = reader.string()
                break
              case 2:
                value = reader.string()
                break
              default:
                reader.skipType(tag2 & 7)
                break
            }
          }
          message.data[key] = value
          break
        }
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  }

  /**
   * Verifies a SendEventResponse message.
   * @function verify
   * @memberof SendEventResponse
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  SendEventResponse.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected"
    if (message.status != null && message.hasOwnProperty("status"))
      switch (message.status) {
        default:
          return "status: enum value expected"
        case 0:
        case 1:
        case 2:
          break
      }
    if (message.code != null && message.hasOwnProperty("code"))
      switch (message.code) {
        default:
          return "code: enum value expected"
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break
      }
    if (message.sentTime != null && message.hasOwnProperty("sentTime"))
      if (
        !$util.isInteger(message.sentTime) &&
        !(
          message.sentTime &&
          $util.isInteger(message.sentTime.low) &&
          $util.isInteger(message.sentTime.high)
        )
      )
        return "sentTime: integer|Long expected"
    if (message.reason != null && message.hasOwnProperty("reason"))
      if (!$util.isString(message.reason)) return "reason: string expected"
    if (message.data != null && message.hasOwnProperty("data")) {
      if (!$util.isObject(message.data)) return "data: object expected"
      let key = Object.keys(message.data)
      for (let i = 0; i < key.length; ++i)
        if (!$util.isString(message.data[key[i]]))
          return "data: string{k:string} expected"
    }
    return null
  }

  /**
   * Gets the default type url for SendEventResponse
   * @function getTypeUrl
   * @memberof SendEventResponse
   * @static
   * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns {string} The default type url
   */
  SendEventResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
    if (typeUrlPrefix === undefined) {
      typeUrlPrefix = "type.googleapis.com"
    }
    return typeUrlPrefix + "/SendEventResponse"
  }

  return SendEventResponse
})())

/**
 * Status enum.
 * @exports Status
 * @enum {number}
 * @property {number} STATUS_UNSPECIFIED=0 STATUS_UNSPECIFIED value
 * @property {number} STATUS_SUCCESS=1 STATUS_SUCCESS value
 * @property {number} STATUS_ERROR=2 STATUS_ERROR value
 */
export const Status = ($root.Status = (() => {
  const valuesById = {},
    values = Object.create(valuesById)
  values[(valuesById[0] = "STATUS_UNSPECIFIED")] = 0
  values[(valuesById[1] = "STATUS_SUCCESS")] = 1
  values[(valuesById[2] = "STATUS_ERROR")] = 2
  return values
})())

/**
 * Code enum.
 * @exports Code
 * @enum {number}
 * @property {number} CODE_UNSPECIFIED=0 CODE_UNSPECIFIED value
 * @property {number} CODE_OK=1 CODE_OK value
 * @property {number} CODE_BAD_REQUEST=2 CODE_BAD_REQUEST value
 * @property {number} CODE_INTERNAL_ERROR=3 CODE_INTERNAL_ERROR value
 * @property {number} CODE_MAX_CONNECTION_LIMIT_REACHED=4 CODE_MAX_CONNECTION_LIMIT_REACHED value
 * @property {number} CODE_MAX_USER_LIMIT_REACHED=5 CODE_MAX_USER_LIMIT_REACHED value
 */
export const Code = ($root.Code = (() => {
  const valuesById = {},
    values = Object.create(valuesById)
  values[(valuesById[0] = "CODE_UNSPECIFIED")] = 0
  values[(valuesById[1] = "CODE_OK")] = 1
  values[(valuesById[2] = "CODE_BAD_REQUEST")] = 2
  values[(valuesById[3] = "CODE_INTERNAL_ERROR")] = 3
  values[(valuesById[4] = "CODE_MAX_CONNECTION_LIMIT_REACHED")] = 4
  values[(valuesById[5] = "CODE_MAX_USER_LIMIT_REACHED")] = 5
  return values
})())

export { $root as default }
