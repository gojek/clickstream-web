/* eslint-disable */
// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const raccoon = ($root.raccoon = (() => {
  /**
   * Namespace raccoon.
   * @exports raccoon
   * @namespace
   */
  const raccoon = {};

  raccoon.EventService = (function () {
    /**
     * Constructs a new EventService service.
     * @memberof raccoon
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
      );
    }

    (EventService.prototype = Object.create(
      $protobuf.rpc.Service.prototype
    )).constructor = EventService;

    /**
     * Creates new EventService service using the specified rpc implementation.
     * @function create
     * @memberof raccoon.EventService
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
      return new this(rpcImpl, requestDelimited, responseDelimited);
    };

    /**
     * Callback as used by {@link raccoon.EventService#sendEvent}.
     * @memberof raccoon.EventService
     * @typedef SendEventCallback
     * @type {function}
     * @param {Error|null} error Error, if any
     * @param {raccoon.SendEventResponse} [response] SendEventResponse
     */

    /**
     * Calls SendEvent.
     * @function sendEvent
     * @memberof raccoon.EventService
     * @instance
     * @param {raccoon.ISendEventRequest} request SendEventRequest message or plain object
     * @param {raccoon.EventService.SendEventCallback} callback Node-style callback called with the error, if any, and SendEventResponse
     * @returns {undefined}
     * @variation 1
     */
    Object.defineProperty(
      (EventService.prototype.sendEvent = function sendEvent(
        request,
        callback
      ) {
        return this.rpcCall(
          sendEvent,
          $root.raccoon.SendEventRequest,
          $root.raccoon.SendEventResponse,
          request,
          callback
        );
      }),
      "name",
      { value: "SendEvent" }
    );

    /**
     * Calls SendEvent.
     * @function sendEvent
     * @memberof raccoon.EventService
     * @instance
     * @param {raccoon.ISendEventRequest} request SendEventRequest message or plain object
     * @returns {Promise<raccoon.SendEventResponse>} Promise
     * @variation 2
     */

    return EventService;
  })();

  raccoon.SendEventRequest = (function () {
    /**
     * Properties of a SendEventRequest.
     * @memberof raccoon
     * @interface ISendEventRequest
     * @property {string|null} [reqGuid] SendEventRequest reqGuid
     * @property {google.protobuf.ITimestamp|null} [sentTime] SendEventRequest sentTime
     * @property {Array.<raccoon.IEvent>|null} [events] SendEventRequest events
     */

    /**
     * Constructs a new SendEventRequest.
     * @memberof raccoon
     * @classdesc Represents a SendEventRequest.
     * @implements ISendEventRequest
     * @constructor
     * @param {raccoon.ISendEventRequest=} [properties] Properties to set
     */
    function SendEventRequest(properties) {
      this.events = [];
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * SendEventRequest reqGuid.
     * @member {string} reqGuid
     * @memberof raccoon.SendEventRequest
     * @instance
     */
    SendEventRequest.prototype.reqGuid = "";

    /**
     * SendEventRequest sentTime.
     * @member {google.protobuf.ITimestamp|null|undefined} sentTime
     * @memberof raccoon.SendEventRequest
     * @instance
     */
    SendEventRequest.prototype.sentTime = null;

    /**
     * SendEventRequest events.
     * @member {Array.<raccoon.IEvent>} events
     * @memberof raccoon.SendEventRequest
     * @instance
     */
    SendEventRequest.prototype.events = $util.emptyArray;

    /**
     * Creates a new SendEventRequest instance using the specified properties.
     * @function create
     * @memberof raccoon.SendEventRequest
     * @static
     * @param {raccoon.ISendEventRequest=} [properties] Properties to set
     * @returns {raccoon.SendEventRequest} SendEventRequest instance
     */
    SendEventRequest.create = function create(properties) {
      return new SendEventRequest(properties);
    };

    /**
     * Encodes the specified SendEventRequest message. Does not implicitly {@link raccoon.SendEventRequest.verify|verify} messages.
     * @function encode
     * @memberof raccoon.SendEventRequest
     * @static
     * @param {raccoon.ISendEventRequest} message SendEventRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SendEventRequest.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.reqGuid != null &&
        Object.hasOwnProperty.call(message, "reqGuid")
      )
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.reqGuid);
      if (
        message.sentTime != null &&
        Object.hasOwnProperty.call(message, "sentTime")
      )
        $root.google.protobuf.Timestamp.encode(
          message.sentTime,
          writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
        ).ldelim();
      if (message.events != null && message.events.length)
        for (let i = 0; i < message.events.length; ++i)
          $root.raccoon.Event.encode(
            message.events[i],
            writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
          ).ldelim();
      return writer;
    };

    /**
     * Encodes the specified SendEventRequest message, length delimited. Does not implicitly {@link raccoon.SendEventRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof raccoon.SendEventRequest
     * @static
     * @param {raccoon.ISendEventRequest} message SendEventRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SendEventRequest.encodeDelimited = function encodeDelimited(
      message,
      writer
    ) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SendEventRequest message from the specified reader or buffer.
     * @function decode
     * @memberof raccoon.SendEventRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {raccoon.SendEventRequest} SendEventRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SendEventRequest.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.raccoon.SendEventRequest();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.reqGuid = reader.string();
            break;
          }
          case 2: {
            message.sentTime = $root.google.protobuf.Timestamp.decode(
              reader,
              reader.uint32()
            );
            break;
          }
          case 3: {
            if (!(message.events && message.events.length)) message.events = [];
            message.events.push(
              $root.raccoon.Event.decode(reader, reader.uint32())
            );
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a SendEventRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof raccoon.SendEventRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {raccoon.SendEventRequest} SendEventRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SendEventRequest.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SendEventRequest message.
     * @function verify
     * @memberof raccoon.SendEventRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SendEventRequest.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.reqGuid != null && message.hasOwnProperty("reqGuid"))
        if (!$util.isString(message.reqGuid)) return "reqGuid: string expected";
      if (message.sentTime != null && message.hasOwnProperty("sentTime")) {
        let error = $root.google.protobuf.Timestamp.verify(message.sentTime);
        if (error) return "sentTime." + error;
      }
      if (message.events != null && message.hasOwnProperty("events")) {
        if (!Array.isArray(message.events)) return "events: array expected";
        for (let i = 0; i < message.events.length; ++i) {
          let error = $root.raccoon.Event.verify(message.events[i]);
          if (error) return "events." + error;
        }
      }
      return null;
    };

    /**
     * Creates a SendEventRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof raccoon.SendEventRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {raccoon.SendEventRequest} SendEventRequest
     */
    SendEventRequest.fromObject = function fromObject(object) {
      if (object instanceof $root.raccoon.SendEventRequest) return object;
      let message = new $root.raccoon.SendEventRequest();
      if (object.reqGuid != null) message.reqGuid = String(object.reqGuid);
      if (object.sentTime != null) {
        if (typeof object.sentTime !== "object")
          throw TypeError(
            ".raccoon.SendEventRequest.sentTime: object expected"
          );
        message.sentTime = $root.google.protobuf.Timestamp.fromObject(
          object.sentTime
        );
      }
      if (object.events) {
        if (!Array.isArray(object.events))
          throw TypeError(".raccoon.SendEventRequest.events: array expected");
        message.events = [];
        for (let i = 0; i < object.events.length; ++i) {
          if (typeof object.events[i] !== "object")
            throw TypeError(
              ".raccoon.SendEventRequest.events: object expected"
            );
          message.events[i] = $root.raccoon.Event.fromObject(object.events[i]);
        }
      }
      return message;
    };

    /**
     * Creates a plain object from a SendEventRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof raccoon.SendEventRequest
     * @static
     * @param {raccoon.SendEventRequest} message SendEventRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SendEventRequest.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.arrays || options.defaults) object.events = [];
      if (options.defaults) {
        object.reqGuid = "";
        object.sentTime = null;
      }
      if (message.reqGuid != null && message.hasOwnProperty("reqGuid"))
        object.reqGuid = message.reqGuid;
      if (message.sentTime != null && message.hasOwnProperty("sentTime"))
        object.sentTime = $root.google.protobuf.Timestamp.toObject(
          message.sentTime,
          options
        );
      if (message.events && message.events.length) {
        object.events = [];
        for (let j = 0; j < message.events.length; ++j)
          object.events[j] = $root.raccoon.Event.toObject(
            message.events[j],
            options
          );
      }
      return object;
    };

    /**
     * Converts this SendEventRequest to JSON.
     * @function toJSON
     * @memberof raccoon.SendEventRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SendEventRequest.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for SendEventRequest
     * @function getTypeUrl
     * @memberof raccoon.SendEventRequest
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    SendEventRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/raccoon.SendEventRequest";
    };

    return SendEventRequest;
  })();

  raccoon.Event = (function () {
    /**
     * Properties of an Event.
     * @memberof raccoon
     * @interface IEvent
     * @property {Uint8Array|null} [eventBytes] Event eventBytes
     * @property {string|null} [type] Event type
     */

    /**
     * Constructs a new Event.
     * @memberof raccoon
     * @classdesc Represents an Event.
     * @implements IEvent
     * @constructor
     * @param {raccoon.IEvent=} [properties] Properties to set
     */
    function Event(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * Event eventBytes.
     * @member {Uint8Array} eventBytes
     * @memberof raccoon.Event
     * @instance
     */
    Event.prototype.eventBytes = $util.newBuffer([]);

    /**
     * Event type.
     * @member {string} type
     * @memberof raccoon.Event
     * @instance
     */
    Event.prototype.type = "";

    /**
     * Creates a new Event instance using the specified properties.
     * @function create
     * @memberof raccoon.Event
     * @static
     * @param {raccoon.IEvent=} [properties] Properties to set
     * @returns {raccoon.Event} Event instance
     */
    Event.create = function create(properties) {
      return new Event(properties);
    };

    /**
     * Encodes the specified Event message. Does not implicitly {@link raccoon.Event.verify|verify} messages.
     * @function encode
     * @memberof raccoon.Event
     * @static
     * @param {raccoon.IEvent} message Event message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Event.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.eventBytes != null &&
        Object.hasOwnProperty.call(message, "eventBytes")
      )
        writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.eventBytes);
      if (message.type != null && Object.hasOwnProperty.call(message, "type"))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.type);
      return writer;
    };

    /**
     * Encodes the specified Event message, length delimited. Does not implicitly {@link raccoon.Event.verify|verify} messages.
     * @function encodeDelimited
     * @memberof raccoon.Event
     * @static
     * @param {raccoon.IEvent} message Event message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Event.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Event message from the specified reader or buffer.
     * @function decode
     * @memberof raccoon.Event
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {raccoon.Event} Event
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Event.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.raccoon.Event();
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.eventBytes = reader.bytes();
            break;
          }
          case 2: {
            message.type = reader.string();
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes an Event message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof raccoon.Event
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {raccoon.Event} Event
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Event.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Event message.
     * @function verify
     * @memberof raccoon.Event
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Event.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.eventBytes != null && message.hasOwnProperty("eventBytes"))
        if (
          !(
            (message.eventBytes &&
              typeof message.eventBytes.length === "number") ||
            $util.isString(message.eventBytes)
          )
        )
          return "eventBytes: buffer expected";
      if (message.type != null && message.hasOwnProperty("type"))
        if (!$util.isString(message.type)) return "type: string expected";
      return null;
    };

    /**
     * Creates an Event message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof raccoon.Event
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {raccoon.Event} Event
     */
    Event.fromObject = function fromObject(object) {
      if (object instanceof $root.raccoon.Event) return object;
      let message = new $root.raccoon.Event();
      if (object.eventBytes != null)
        if (typeof object.eventBytes === "string")
          $util.base64.decode(
            object.eventBytes,
            (message.eventBytes = $util.newBuffer(
              $util.base64.length(object.eventBytes)
            )),
            0
          );
        else if (object.eventBytes.length >= 0)
          message.eventBytes = object.eventBytes;
      if (object.type != null) message.type = String(object.type);
      return message;
    };

    /**
     * Creates a plain object from an Event message. Also converts values to other types if specified.
     * @function toObject
     * @memberof raccoon.Event
     * @static
     * @param {raccoon.Event} message Event
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Event.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.defaults) {
        if (options.bytes === String) object.eventBytes = "";
        else {
          object.eventBytes = [];
          if (options.bytes !== Array)
            object.eventBytes = $util.newBuffer(object.eventBytes);
        }
        object.type = "";
      }
      if (message.eventBytes != null && message.hasOwnProperty("eventBytes"))
        object.eventBytes =
          options.bytes === String
            ? $util.base64.encode(
                message.eventBytes,
                0,
                message.eventBytes.length
              )
            : options.bytes === Array
            ? Array.prototype.slice.call(message.eventBytes)
            : message.eventBytes;
      if (message.type != null && message.hasOwnProperty("type"))
        object.type = message.type;
      return object;
    };

    /**
     * Converts this Event to JSON.
     * @function toJSON
     * @memberof raccoon.Event
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Event.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Event
     * @function getTypeUrl
     * @memberof raccoon.Event
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Event.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/raccoon.Event";
    };

    return Event;
  })();

  raccoon.SendEventResponse = (function () {
    /**
     * Properties of a SendEventResponse.
     * @memberof raccoon
     * @interface ISendEventResponse
     * @property {raccoon.Status|null} [status] SendEventResponse status
     * @property {raccoon.Code|null} [code] SendEventResponse code
     * @property {number|Long|null} [sentTime] SendEventResponse sentTime
     * @property {string|null} [reason] SendEventResponse reason
     * @property {Object.<string,string>|null} [data] SendEventResponse data
     */

    /**
     * Constructs a new SendEventResponse.
     * @memberof raccoon
     * @classdesc Represents a SendEventResponse.
     * @implements ISendEventResponse
     * @constructor
     * @param {raccoon.ISendEventResponse=} [properties] Properties to set
     */
    function SendEventResponse(properties) {
      this.data = {};
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
    }

    /**
     * SendEventResponse status.
     * @member {raccoon.Status} status
     * @memberof raccoon.SendEventResponse
     * @instance
     */
    SendEventResponse.prototype.status = 0;

    /**
     * SendEventResponse code.
     * @member {raccoon.Code} code
     * @memberof raccoon.SendEventResponse
     * @instance
     */
    SendEventResponse.prototype.code = 0;

    /**
     * SendEventResponse sentTime.
     * @member {number|Long} sentTime
     * @memberof raccoon.SendEventResponse
     * @instance
     */
    SendEventResponse.prototype.sentTime = $util.Long
      ? $util.Long.fromBits(0, 0, false)
      : 0;

    /**
     * SendEventResponse reason.
     * @member {string} reason
     * @memberof raccoon.SendEventResponse
     * @instance
     */
    SendEventResponse.prototype.reason = "";

    /**
     * SendEventResponse data.
     * @member {Object.<string,string>} data
     * @memberof raccoon.SendEventResponse
     * @instance
     */
    SendEventResponse.prototype.data = $util.emptyObject;

    /**
     * Creates a new SendEventResponse instance using the specified properties.
     * @function create
     * @memberof raccoon.SendEventResponse
     * @static
     * @param {raccoon.ISendEventResponse=} [properties] Properties to set
     * @returns {raccoon.SendEventResponse} SendEventResponse instance
     */
    SendEventResponse.create = function create(properties) {
      return new SendEventResponse(properties);
    };

    /**
     * Encodes the specified SendEventResponse message. Does not implicitly {@link raccoon.SendEventResponse.verify|verify} messages.
     * @function encode
     * @memberof raccoon.SendEventResponse
     * @static
     * @param {raccoon.ISendEventResponse} message SendEventResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SendEventResponse.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create();
      if (
        message.status != null &&
        Object.hasOwnProperty.call(message, "status")
      )
        writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.status);
      if (message.code != null && Object.hasOwnProperty.call(message, "code"))
        writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.code);
      if (
        message.sentTime != null &&
        Object.hasOwnProperty.call(message, "sentTime")
      )
        writer.uint32(/* id 3, wireType 0 =*/ 24).int64(message.sentTime);
      if (
        message.reason != null &&
        Object.hasOwnProperty.call(message, "reason")
      )
        writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.reason);
      if (message.data != null && Object.hasOwnProperty.call(message, "data"))
        for (let keys = Object.keys(message.data), i = 0; i < keys.length; ++i)
          writer
            .uint32(/* id 5, wireType 2 =*/ 42)
            .fork()
            .uint32(/* id 1, wireType 2 =*/ 10)
            .string(keys[i])
            .uint32(/* id 2, wireType 2 =*/ 18)
            .string(message.data[keys[i]])
            .ldelim();
      return writer;
    };

    /**
     * Encodes the specified SendEventResponse message, length delimited. Does not implicitly {@link raccoon.SendEventResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof raccoon.SendEventResponse
     * @static
     * @param {raccoon.ISendEventResponse} message SendEventResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SendEventResponse.encodeDelimited = function encodeDelimited(
      message,
      writer
    ) {
      return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SendEventResponse message from the specified reader or buffer.
     * @function decode
     * @memberof raccoon.SendEventResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {raccoon.SendEventResponse} SendEventResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SendEventResponse.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.raccoon.SendEventResponse(),
        key,
        value;
      while (reader.pos < end) {
        let tag = reader.uint32();
        switch (tag >>> 3) {
          case 1: {
            message.status = reader.int32();
            break;
          }
          case 2: {
            message.code = reader.int32();
            break;
          }
          case 3: {
            message.sentTime = reader.int64();
            break;
          }
          case 4: {
            message.reason = reader.string();
            break;
          }
          case 5: {
            if (message.data === $util.emptyObject) message.data = {};
            let end2 = reader.uint32() + reader.pos;
            key = "";
            value = "";
            while (reader.pos < end2) {
              let tag2 = reader.uint32();
              switch (tag2 >>> 3) {
                case 1:
                  key = reader.string();
                  break;
                case 2:
                  value = reader.string();
                  break;
                default:
                  reader.skipType(tag2 & 7);
                  break;
              }
            }
            message.data[key] = value;
            break;
          }
          default:
            reader.skipType(tag & 7);
            break;
        }
      }
      return message;
    };

    /**
     * Decodes a SendEventResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof raccoon.SendEventResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {raccoon.SendEventResponse} SendEventResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SendEventResponse.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader);
      return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SendEventResponse message.
     * @function verify
     * @memberof raccoon.SendEventResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SendEventResponse.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected";
      if (message.status != null && message.hasOwnProperty("status"))
        switch (message.status) {
          default:
            return "status: enum value expected";
          case 0:
          case 1:
          case 2:
            break;
        }
      if (message.code != null && message.hasOwnProperty("code"))
        switch (message.code) {
          default:
            return "code: enum value expected";
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
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
          return "sentTime: integer|Long expected";
      if (message.reason != null && message.hasOwnProperty("reason"))
        if (!$util.isString(message.reason)) return "reason: string expected";
      if (message.data != null && message.hasOwnProperty("data")) {
        if (!$util.isObject(message.data)) return "data: object expected";
        let key = Object.keys(message.data);
        for (let i = 0; i < key.length; ++i)
          if (!$util.isString(message.data[key[i]]))
            return "data: string{k:string} expected";
      }
      return null;
    };

    /**
     * Creates a SendEventResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof raccoon.SendEventResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {raccoon.SendEventResponse} SendEventResponse
     */
    SendEventResponse.fromObject = function fromObject(object) {
      if (object instanceof $root.raccoon.SendEventResponse) return object;
      let message = new $root.raccoon.SendEventResponse();
      switch (object.status) {
        case "STATUS_UNSPECIFIED":
        case 0:
          message.status = 0;
          break;
        case "STATUS_SUCCESS":
        case 1:
          message.status = 1;
          break;
        case "STATUS_ERROR":
        case 2:
          message.status = 2;
          break;
      }
      switch (object.code) {
        case "CODE_UNSPECIFIED":
        case 0:
          message.code = 0;
          break;
        case "CODE_OK":
        case 1:
          message.code = 1;
          break;
        case "CODE_BAD_REQUEST":
        case 2:
          message.code = 2;
          break;
        case "CODE_INTERNAL_ERROR":
        case 3:
          message.code = 3;
          break;
        case "CODE_MAX_CONNECTION_LIMIT_REACHED":
        case 4:
          message.code = 4;
          break;
        case "CODE_MAX_USER_LIMIT_REACHED":
        case 5:
          message.code = 5;
          break;
      }
      if (object.sentTime != null)
        if ($util.Long)
          (message.sentTime = $util.Long.fromValue(
            object.sentTime
          )).unsigned = false;
        else if (typeof object.sentTime === "string")
          message.sentTime = parseInt(object.sentTime, 10);
        else if (typeof object.sentTime === "number")
          message.sentTime = object.sentTime;
        else if (typeof object.sentTime === "object")
          message.sentTime = new $util.LongBits(
            object.sentTime.low >>> 0,
            object.sentTime.high >>> 0
          ).toNumber();
      if (object.reason != null) message.reason = String(object.reason);
      if (object.data) {
        if (typeof object.data !== "object")
          throw TypeError(".raccoon.SendEventResponse.data: object expected");
        message.data = {};
        for (let keys = Object.keys(object.data), i = 0; i < keys.length; ++i)
          message.data[keys[i]] = String(object.data[keys[i]]);
      }
      return message;
    };

    /**
     * Creates a plain object from a SendEventResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof raccoon.SendEventResponse
     * @static
     * @param {raccoon.SendEventResponse} message SendEventResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SendEventResponse.toObject = function toObject(message, options) {
      if (!options) options = {};
      let object = {};
      if (options.objects || options.defaults) object.data = {};
      if (options.defaults) {
        object.status = options.enums === String ? "STATUS_UNSPECIFIED" : 0;
        object.code = options.enums === String ? "CODE_UNSPECIFIED" : 0;
        if ($util.Long) {
          let long = new $util.Long(0, 0, false);
          object.sentTime =
            options.longs === String
              ? long.toString()
              : options.longs === Number
              ? long.toNumber()
              : long;
        } else object.sentTime = options.longs === String ? "0" : 0;
        object.reason = "";
      }
      if (message.status != null && message.hasOwnProperty("status"))
        object.status =
          options.enums === String
            ? $root.raccoon.Status[message.status]
            : message.status;
      if (message.code != null && message.hasOwnProperty("code"))
        object.code =
          options.enums === String
            ? $root.raccoon.Code[message.code]
            : message.code;
      if (message.sentTime != null && message.hasOwnProperty("sentTime"))
        if (typeof message.sentTime === "number")
          object.sentTime =
            options.longs === String
              ? String(message.sentTime)
              : message.sentTime;
        else
          object.sentTime =
            options.longs === String
              ? $util.Long.prototype.toString.call(message.sentTime)
              : options.longs === Number
              ? new $util.LongBits(
                  message.sentTime.low >>> 0,
                  message.sentTime.high >>> 0
                ).toNumber()
              : message.sentTime;
      if (message.reason != null && message.hasOwnProperty("reason"))
        object.reason = message.reason;
      let keys2;
      if (message.data && (keys2 = Object.keys(message.data)).length) {
        object.data = {};
        for (let j = 0; j < keys2.length; ++j)
          object.data[keys2[j]] = message.data[keys2[j]];
      }
      return object;
    };

    /**
     * Converts this SendEventResponse to JSON.
     * @function toJSON
     * @memberof raccoon.SendEventResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SendEventResponse.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for SendEventResponse
     * @function getTypeUrl
     * @memberof raccoon.SendEventResponse
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    SendEventResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com";
      }
      return typeUrlPrefix + "/raccoon.SendEventResponse";
    };

    return SendEventResponse;
  })();

  /**
   * Status enum.
   * @name raccoon.Status
   * @enum {number}
   * @property {number} STATUS_UNSPECIFIED=0 STATUS_UNSPECIFIED value
   * @property {number} STATUS_SUCCESS=1 STATUS_SUCCESS value
   * @property {number} STATUS_ERROR=2 STATUS_ERROR value
   */
  raccoon.Status = (function () {
    const valuesById = {},
      values = Object.create(valuesById);
    values[(valuesById[0] = "STATUS_UNSPECIFIED")] = 0;
    values[(valuesById[1] = "STATUS_SUCCESS")] = 1;
    values[(valuesById[2] = "STATUS_ERROR")] = 2;
    return values;
  })();

  /**
   * Code enum.
   * @name raccoon.Code
   * @enum {number}
   * @property {number} CODE_UNSPECIFIED=0 CODE_UNSPECIFIED value
   * @property {number} CODE_OK=1 CODE_OK value
   * @property {number} CODE_BAD_REQUEST=2 CODE_BAD_REQUEST value
   * @property {number} CODE_INTERNAL_ERROR=3 CODE_INTERNAL_ERROR value
   * @property {number} CODE_MAX_CONNECTION_LIMIT_REACHED=4 CODE_MAX_CONNECTION_LIMIT_REACHED value
   * @property {number} CODE_MAX_USER_LIMIT_REACHED=5 CODE_MAX_USER_LIMIT_REACHED value
   */
  raccoon.Code = (function () {
    const valuesById = {},
      values = Object.create(valuesById);
    values[(valuesById[0] = "CODE_UNSPECIFIED")] = 0;
    values[(valuesById[1] = "CODE_OK")] = 1;
    values[(valuesById[2] = "CODE_BAD_REQUEST")] = 2;
    values[(valuesById[3] = "CODE_INTERNAL_ERROR")] = 3;
    values[(valuesById[4] = "CODE_MAX_CONNECTION_LIMIT_REACHED")] = 4;
    values[(valuesById[5] = "CODE_MAX_USER_LIMIT_REACHED")] = 5;
    return values;
  })();

  return raccoon;
})());

export const google = ($root.google = (() => {
  /**
   * Namespace google.
   * @exports google
   * @namespace
   */
  const google = {};

  google.protobuf = (function () {
    /**
     * Namespace protobuf.
     * @memberof google
     * @namespace
     */
    const protobuf = {};

    protobuf.Timestamp = (function () {
      /**
       * Properties of a Timestamp.
       * @memberof google.protobuf
       * @interface ITimestamp
       * @property {number|Long|null} [seconds] Timestamp seconds
       * @property {number|null} [nanos] Timestamp nanos
       */

      /**
       * Constructs a new Timestamp.
       * @memberof google.protobuf
       * @classdesc Represents a Timestamp.
       * @implements ITimestamp
       * @constructor
       * @param {google.protobuf.ITimestamp=} [properties] Properties to set
       */
      function Timestamp(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
      }

      /**
       * Timestamp seconds.
       * @member {number|Long} seconds
       * @memberof google.protobuf.Timestamp
       * @instance
       */
      Timestamp.prototype.seconds = $util.Long
        ? $util.Long.fromBits(0, 0, false)
        : 0;

      /**
       * Timestamp nanos.
       * @member {number} nanos
       * @memberof google.protobuf.Timestamp
       * @instance
       */
      Timestamp.prototype.nanos = 0;

      /**
       * Creates a new Timestamp instance using the specified properties.
       * @function create
       * @memberof google.protobuf.Timestamp
       * @static
       * @param {google.protobuf.ITimestamp=} [properties] Properties to set
       * @returns {google.protobuf.Timestamp} Timestamp instance
       */
      Timestamp.create = function create(properties) {
        return new Timestamp(properties);
      };

      /**
       * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
       * @function encode
       * @memberof google.protobuf.Timestamp
       * @static
       * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      Timestamp.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (
          message.seconds != null &&
          Object.hasOwnProperty.call(message, "seconds")
        )
          writer.uint32(/* id 1, wireType 0 =*/ 8).int64(message.seconds);
        if (
          message.nanos != null &&
          Object.hasOwnProperty.call(message, "nanos")
        )
          writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.nanos);
        return writer;
      };

      /**
       * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
       * @function encodeDelimited
       * @memberof google.protobuf.Timestamp
       * @static
       * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
      };

      /**
       * Decodes a Timestamp message from the specified reader or buffer.
       * @function decode
       * @memberof google.protobuf.Timestamp
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {google.protobuf.Timestamp} Timestamp
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      Timestamp.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.google.protobuf.Timestamp();
        while (reader.pos < end) {
          let tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              message.seconds = reader.int64();
              break;
            }
            case 2: {
              message.nanos = reader.int32();
              break;
            }
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };

      /**
       * Decodes a Timestamp message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof google.protobuf.Timestamp
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {google.protobuf.Timestamp} Timestamp
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      Timestamp.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };

      /**
       * Verifies a Timestamp message.
       * @function verify
       * @memberof google.protobuf.Timestamp
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */
      Timestamp.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (message.seconds != null && message.hasOwnProperty("seconds"))
          if (
            !$util.isInteger(message.seconds) &&
            !(
              message.seconds &&
              $util.isInteger(message.seconds.low) &&
              $util.isInteger(message.seconds.high)
            )
          )
            return "seconds: integer|Long expected";
        if (message.nanos != null && message.hasOwnProperty("nanos"))
          if (!$util.isInteger(message.nanos)) return "nanos: integer expected";
        return null;
      };

      /**
       * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof google.protobuf.Timestamp
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {google.protobuf.Timestamp} Timestamp
       */
      Timestamp.fromObject = function fromObject(object) {
        if (object instanceof $root.google.protobuf.Timestamp) return object;
        let message = new $root.google.protobuf.Timestamp();
        if (object.seconds != null)
          if ($util.Long)
            (message.seconds = $util.Long.fromValue(
              object.seconds
            )).unsigned = false;
          else if (typeof object.seconds === "string")
            message.seconds = parseInt(object.seconds, 10);
          else if (typeof object.seconds === "number")
            message.seconds = object.seconds;
          else if (typeof object.seconds === "object")
            message.seconds = new $util.LongBits(
              object.seconds.low >>> 0,
              object.seconds.high >>> 0
            ).toNumber();
        if (object.nanos != null) message.nanos = object.nanos | 0;
        return message;
      };

      /**
       * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
       * @function toObject
       * @memberof google.protobuf.Timestamp
       * @static
       * @param {google.protobuf.Timestamp} message Timestamp
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */
      Timestamp.toObject = function toObject(message, options) {
        if (!options) options = {};
        let object = {};
        if (options.defaults) {
          if ($util.Long) {
            let long = new $util.Long(0, 0, false);
            object.seconds =
              options.longs === String
                ? long.toString()
                : options.longs === Number
                ? long.toNumber()
                : long;
          } else object.seconds = options.longs === String ? "0" : 0;
          object.nanos = 0;
        }
        if (message.seconds != null && message.hasOwnProperty("seconds"))
          if (typeof message.seconds === "number")
            object.seconds =
              options.longs === String
                ? String(message.seconds)
                : message.seconds;
          else
            object.seconds =
              options.longs === String
                ? $util.Long.prototype.toString.call(message.seconds)
                : options.longs === Number
                ? new $util.LongBits(
                    message.seconds.low >>> 0,
                    message.seconds.high >>> 0
                  ).toNumber()
                : message.seconds;
        if (message.nanos != null && message.hasOwnProperty("nanos"))
          object.nanos = message.nanos;
        return object;
      };

      /**
       * Converts this Timestamp to JSON.
       * @function toJSON
       * @memberof google.protobuf.Timestamp
       * @instance
       * @returns {Object.<string,*>} JSON object
       */
      Timestamp.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      /**
       * Gets the default type url for Timestamp
       * @function getTypeUrl
       * @memberof google.protobuf.Timestamp
       * @static
       * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
       * @returns {string} The default type url
       */
      Timestamp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
          typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/google.protobuf.Timestamp";
      };

      return Timestamp;
    })();

    return protobuf;
  })();

  return google;
})());
