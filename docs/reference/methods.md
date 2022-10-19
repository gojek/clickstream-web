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
    const status =  await clckstrm.track(payload)
} catch(err) {
    console.log(err)
}

```

## **stop**

Gracefully stops the tracking, new track function calls are ignored, previously tracked events will be processed.

#### **Arguments**

undefined

#### **Returns**

undefined

#### **Example**

```
clckstrm.stop();
```

## **start**

Resumes the tracking, have no effect when tracking is on.

#### **Arguments**

undefined

#### **Returns**

undefined

#### **Example**

```
clckstrm.start();
```

### **destroy**

Releases all the resources used by the Clickstream instance. Destroy makes sure all the existing events are sent to Raccoon before closing resources. Destroy has no side effects i.e. events can be dispatched after destroy call and additional step is required for that.

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
