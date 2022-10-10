# Methods

### **track**

Dispatches a new event.

```
await clckstrm.track(payload);
```

#### **Aurguments**

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

### **stop**

Gracefully stops the tracking, new track function calls are ignored, previously tracked events will be processed.

```
clckstrm.stop();
```

#### **Aurguments**

undefined

#### **Returns**

undefined

### **start**

Resumes the tracking, have no effect when called with tracking is not stopped.

```
clckstrm.start();
```

#### **Aurguments**

undefined

#### **Returns**

undefined

### **destroy**

Releases all the resources used by the Clickstream instance.

```
await clckstrm.destroy();
```

#### **Aurguments**

undefined

#### **Returns**

(Promise) - Return promise to get status of the call

#### **Example**

```
try {
    const status =  await clckstrm.destroy()
} catch(err) {
    console.log(err)
}

```
