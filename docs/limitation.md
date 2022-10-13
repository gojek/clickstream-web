# Limitations

## SDK works only with HTTPS

This is due to the [reason](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications#security_considerations) that WebSockets should not be used in a mixed content environment; that is, you shouldn't open a non-secure WebSocket connection from a page loaded using HTTPS or vice-versa. Most browsers now only allow secure WebSocket connections, and no longer support using them in insecure contexts.

## REST API for Racoon Integration

WebSocket API doesn’t provide option for sending headers while establishing connection. Clickstream backend(Raccoon) needs Authorisation header to be passed for identification along with the url while making connection request.

As a fallback we are using Raccoon’s REST APIs for communication as of now, we will use this till we have a proper solution for enabling WebSocket connection.

## IndexedDB storage limitation

Storage limited by IndexedDB storage limits. Each browser [defines their storage quota limit](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria#storage_limits). If it starts exceeded the limit, then some data may have to be partially dropped.

## IndexedDB private browsing limitation

IndexedDB is not available in Firefox & Safari private browsers, due to this limitation all the QoS1 events are treated as QoS0 events in these browsers.
