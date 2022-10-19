# Methods

Clickstream Web SDK exposes following public methods.

## **track**

Dispatches a new event.

#### **Arguments**

payload (Object): event payload protobuf js object

#### **Returns**

(Promise) - Return promise to get status of the call, helps with error handling

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

Gracefully pauses the tracking, any new calls to `.track()` are ignored, previously tracked events will still be processed. Tracking can be resumed again by calling `.start()`

#### **Arguments**

undefined

#### **Returns**

undefined

#### **Example**

```
clckstrm.pause();
```

## **resume**

Resumes the tracking, have no effect when tracking is on.

#### **Arguments**

undefined

#### **Returns**

undefined

#### **Example**

```
clckstrm.start();
```

### **free**

Releases all the resources used by the Clickstream instance. All the existing events are sent to Raccoon before closing resources. There are no side effects, events can be dispatched after destroy call and no additional step is required for that.

#### **Arguments**

undefined

#### **Returns**

(Promise)

#### **Example**

```
try {
    await clckstrm.destroy()
} catch(err) {
    console.log(err)
}

```
