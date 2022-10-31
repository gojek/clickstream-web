# Handling Errors

SDk throws different type of errors with `message`, `code` & `cause`. You can see full list of errors [here](https://github.com/gojekfarm/clickstream-web/blob/main/src/error.js). The SDK exports all the error codes as `errorCodes` named export.

## Constituents

- `err.message` - human readable error message
- `err.code` - unique code for different types of error, use the codes to handle error differently.
- `err.cause` - cause of the error.

## Error Codes

Here is the list of all types of error with error codes that occurs through lifecycle of the SDK.

- **CLICKSTREAM_ERROR** - Generic error type used by the SDK.
- **VALIDATION_ERROR** - Indicates error in validation process, happens during initialization.
- **DATABASE_ERROR** - Indicated error in database operation, might happen during `.track()` call.
- **NETWORK_ERROR** - Indicated error at network layer.
- **TRACKING_ERROR** - This error indicates failure in the `.track()` call, `error.message` & `error.cause` can give more detail about the error.
- **CLEANUP_ERROR** - Occurs if there is any failure in the process of cleaning up the resources during `.free()` call.

## Example

Import the `errorCodes` variable from the SDK. Here we wrap `.track()` call in a `try...catch` block in order to catch the error.
We check if `err.code` is `errorCodes.TRACKING_ERROR` and resume the tracking if it was stopped earlier otherwise we just log the `err.message` and `err.cause` to get more details.

```js
import { errorCodes } from "@gojek/clickstream-web"

try {
  await clckstrm.track(payload)
} catch (err) {
  // handle error
  if (err.code === "trackingError") {
    clckstrm.resume()
  } else {
    console.log(err.message, err.cause)
  }
}
```
