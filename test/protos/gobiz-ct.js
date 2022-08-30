/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal.js"

// Common aliases
const $Writer = $protobuf.default.Writer,
  $util = $protobuf.default.util

// Exported root namespace
const $root =
  $protobuf.default.roots["default"] ||
  ($protobuf.default.roots["default"] = {})

export const gobiz = ($root.gobiz = (() => {
  /**
   * Namespace gobiz.
   * @exports gobiz
   * @namespace
   */
  const gobiz = {}

  gobiz.clickstream = (function () {
    /**
     * Namespace clickstream.
     * @memberof gobiz
     * @namespace
     */
    const clickstream = {}

    clickstream.web = (function () {
      /**
       * Namespace web.
       * @memberof gobiz.clickstream
       * @namespace
       */
      const web = {}

      web.CT = (function () {
        /**
         * Properties of a CT.
         * @memberof gobiz.clickstream.web
         * @interface ICT
         * @property {string|null} [label] CT label
         * @property {Object.<string,google.protobuf.IAny>|null} [properties] CT properties
         */

        /**
         * Constructs a new CT.
         * @memberof gobiz.clickstream.web
         * @classdesc Represents a CT.
         * @implements ICT
         * @constructor
         * @param {gobiz.clickstream.web.ICT=} [properties] Properties to set
         */
        function CT(properties) {
          this.properties = {}
          if (properties)
            for (
              let keys = Object.keys(properties), i = 0;
              i < keys.length;
              ++i
            )
              if (properties[keys[i]] != null)
                this[keys[i]] = properties[keys[i]]
        }

        /**
         * CT label.
         * @member {string} label
         * @memberof gobiz.clickstream.web.CT
         * @instance
         */
        CT.prototype.label = ""

        /**
         * CT properties.
         * @member {Object.<string,google.protobuf.IAny>} properties
         * @memberof gobiz.clickstream.web.CT
         * @instance
         */
        CT.prototype.properties = $util.emptyObject

        /**
         * Creates a new CT instance using the specified properties.
         * @function create
         * @memberof gobiz.clickstream.web.CT
         * @static
         * @param {gobiz.clickstream.web.ICT=} [properties] Properties to set
         * @returns {gobiz.clickstream.web.CT} CT instance
         */
        CT.create = function create(properties) {
          return new CT(properties)
        }

        /**
         * Encodes the specified CT message. Does not implicitly {@link gobiz.clickstream.web.CT.verify|verify} messages.
         * @function encode
         * @memberof gobiz.clickstream.web.CT
         * @static
         * @param {gobiz.clickstream.web.ICT} message CT message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CT.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create()
          if (
            message.label != null &&
            Object.hasOwnProperty.call(message, "label")
          )
            writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.label)
          if (
            message.properties != null &&
            Object.hasOwnProperty.call(message, "properties")
          )
            for (
              let keys = Object.keys(message.properties), i = 0;
              i < keys.length;
              ++i
            ) {
              writer
                .uint32(/* id 2, wireType 2 =*/ 18)
                .fork()
                .uint32(/* id 1, wireType 2 =*/ 10)
                .string(keys[i])
              $root.google.protobuf.Any.encode(
                message.properties[keys[i]],
                writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
              )
                .ldelim()
                .ldelim()
            }
          return writer
        }

        /**
         * Verifies a CT message.
         * @function verify
         * @memberof gobiz.clickstream.web.CT
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CT.verify = function verify(message) {
          if (typeof message !== "object" || message === null)
            return "object expected"
          if (message.label != null && message.hasOwnProperty("label"))
            if (!$util.isString(message.label)) return "label: string expected"
          if (
            message.properties != null &&
            message.hasOwnProperty("properties")
          ) {
            if (!$util.isObject(message.properties))
              return "properties: object expected"
            let key = Object.keys(message.properties)
            for (let i = 0; i < key.length; ++i) {
              let error = $root.google.protobuf.Any.verify(
                message.properties[key[i]]
              )
              if (error) return "properties." + error
            }
          }
          return null
        }

        /**
         * Gets the default type url for CT
         * @function getTypeUrl
         * @memberof gobiz.clickstream.web.CT
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CT.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com"
          }
          return typeUrlPrefix + "/gobiz.clickstream.web.CT"
        }

        return CT
      })()

      return web
    })()

    return clickstream
  })()

  return gobiz
})())

export const google = ($root.google = (() => {
  /**
   * Namespace google.
   * @exports google
   * @namespace
   */
  const google = {}

  google.protobuf = (function () {
    /**
     * Namespace protobuf.
     * @memberof google
     * @namespace
     */
    const protobuf = {}

    protobuf.Any = (function () {
      /**
       * Properties of an Any.
       * @memberof google.protobuf
       * @interface IAny
       * @property {string|null} [type_url] Any type_url
       * @property {Uint8Array|null} [value] Any value
       */

      /**
       * Constructs a new Any.
       * @memberof google.protobuf
       * @classdesc Represents an Any.
       * @implements IAny
       * @constructor
       * @param {google.protobuf.IAny=} [properties] Properties to set
       */
      function Any(properties) {
        if (properties)
          for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
      }

      /**
       * Any type_url.
       * @member {string} type_url
       * @memberof google.protobuf.Any
       * @instance
       */
      Any.prototype.type_url = ""

      /**
       * Any value.
       * @member {Uint8Array} value
       * @memberof google.protobuf.Any
       * @instance
       */
      Any.prototype.value = $util.newBuffer([])

      /**
       * Creates a new Any instance using the specified properties.
       * @function create
       * @memberof google.protobuf.Any
       * @static
       * @param {google.protobuf.IAny=} [properties] Properties to set
       * @returns {google.protobuf.Any} Any instance
       */
      Any.create = function create(properties) {
        return new Any(properties)
      }

      /**
       * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
       * @function encode
       * @memberof google.protobuf.Any
       * @static
       * @param {google.protobuf.IAny} message Any message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      Any.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create()
        if (
          message.type_url != null &&
          Object.hasOwnProperty.call(message, "type_url")
        )
          writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.type_url)
        if (
          message.value != null &&
          Object.hasOwnProperty.call(message, "value")
        )
          writer.uint32(/* id 2, wireType 2 =*/ 18).bytes(message.value)
        return writer
      }

      /**
       * Verifies an Any message.
       * @function verify
       * @memberof google.protobuf.Any
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */
      Any.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected"
        if (message.type_url != null && message.hasOwnProperty("type_url"))
          if (!$util.isString(message.type_url))
            return "type_url: string expected"
        if (message.value != null && message.hasOwnProperty("value"))
          if (
            !(
              (message.value && typeof message.value.length === "number") ||
              $util.isString(message.value)
            )
          )
            return "value: buffer expected"
        return null
      }

      /**
       * Gets the default type url for Any
       * @function getTypeUrl
       * @memberof google.protobuf.Any
       * @static
       * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
       * @returns {string} The default type url
       */
      Any.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
          typeUrlPrefix = "type.googleapis.com"
        }
        return typeUrlPrefix + "/google.protobuf.Any"
      }

      return Any
    })()

    return protobuf
  })()

  return google
})())

export { $root as default }
