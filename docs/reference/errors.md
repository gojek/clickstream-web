# Errors

SDk throws different type of errors with `message`, `code` & `cause`. You can see full list of errors [here](https://github.com/gojekfarm/clickstream-web/blob/main/src/error.js)

## Constituents

- `err.message` - human readable error message
- `err.code` - unique for different types of error, use the codes to handle error differently.
- `err.cause` - cause of the error.

## Example

```js
try {
  await clckstrm.track(payload)
} catch (err) {
  // handle error
  if (err.code === "trackingError") {
    clckstrm.resume()
  } else {
    console.log(err.message, err.cause)
  }
  console.log(err)
}
```
