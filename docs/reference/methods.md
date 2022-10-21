# Methods

Clickstream Web SDK exposes following public methods.

## **track**

Dispatches a new event asynchronously. Processes the event and registers them in the system.
It doesn't take network request into account, success of the .track() doesn't mean that event is sent and stored at backend.
In case of failure it rejects the promise with error, and in that case event is not registered in the system.
Errors can be of different type, represented by the [error codes](https://github.com/gojekfarm/clickstream-web/blob/main/src/error.js).

#### **Arguments**

payload (Object): event payload protobuf js object

#### **Returns**

(Promise) - undefined

#### **Example**

```
try {
    await clckstrm.track(payload)
} catch(err) {
    // handle the error
    console.log(err)
}

```

## **pause**

Gracefully pauses the tracking. New `.track()` method calls are ignored, existing events in the system are still processed.
Tracking can be resumed by calling `.resume()` method.

#### **Arguments**

undefined

#### **Returns**

undefined

#### **Example**

```
clckstrm.pause();
```

## **resume**

Resumes the tracking if it is paused by calling `.pause()` method, has no effect otherwise.

#### **Arguments**

undefined

#### **Returns**

undefined

#### **Example**

```
clckstrm.resume();
```

### **free**

Frees up all the resource used by the Clickstream instance asynchronously.
Clears the timeouts and intervals used & removes all the event listeners.
Flushes all the existing events in the system before deleting the indexedDB database in use.

It has no side effect on the working oh the SDK, calling .track() method again will recreate all the timeouts, interval and database for event tracking.

Returns errors with proper message and code on failure.

**Use case** - Taking a use case of e-commerce website, you might want to not track user event when user is logged out. In that case you can call `.free()` method to free up all the resources used by the Clickstream Web SDK. On user login again, just call `.track()` to track the events.

#### **Arguments**

undefined

#### **Returns**

(Promise) - undefined

#### **Example**

```
try {
    await clckstrm.free()
} catch(err) {
    // handle error
    console.log(err)
}

```
