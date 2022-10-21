# Options

Clickstream Web SDK provides following configuration options. This configuration can be passed while initializing the SDK.

## **event**

Provide options to configure event classification & group name.

### **classification**

Contains classification config, Clickstream Web SDK uses this configuration to classify the QoS0 & QoS1 events.

#### **instant**

Contains names of all the instant events, used to differentiate QoS0 and QoS1 events.

**Default value** - []

**Example** -

```js
{
    event: {
        classification: {
            instant: ['faq'],
        }
    }
}
```

### **group**

Group name gets prefixed with event type, backend server uses the group name value to better identify the events when processing them further.

**Type -** String

**Default value -** ""

**Example -**

```js
{
  event: {
    group: "gopay"
  }
}
```

## **batch**

Provide options to configure batching & database functionalities.

### **maxTimeBetweenTwoBatches**

Maximum time between two consecutive batches(in seconds).

**Type -** Number

**Default value -** 10

**Example -**

```js
{
  batch: {
    maxTimeBetweenTwoBatches: 20
  }
}
```

### **maxBatchSize**

Maximum event payload size of a single batch(in bytes).

**Type -** Number

**Default value -** 50_000

**Example -**

```js
{
  batch: {
    maxBatchSize: 20_000
  }
}
```

### **dbName**

Name of the database, must be unique per origin.

**Type -** String

**Default value -** "clickstream_db"

**Example -**

```js
{
  batch: {
    dbName: "your_custom_db"
  }
}
```

## **network**

Provide options to configure network layer functionalities.

### **url**

Raccoon host URL

**Type -** String | URL

**Default value -** ""

**Example -**

```js
{
  network: {
    url: "https://raccoon.example.com"
  }
}
```

### **headers**

Request headers

**Type -** Headers

**Default value -** {}

**Example -**

```js
{
  network: {
    headers: new Headers({
      Authorization: "Basic <secret-key>",
    })
  }
}
```

### **maxRetries**

Maximum number of retries before pausing.

**Type -** Number

**Default value -** 5

**Example -**

```js
{
  network: {
    maxRetries: 3
  }
}
```

### **timeBetweenTwoRetries**

Gap in time, between two retries (in milliseconds)

**Type -** Number

**Default value -** 1_000

**Example -**

```js
{
  network: {
    timeBetweenTwoRetries: 500
  }
}
```

### **timeToResumeRetries**

Time after which retry will resume after hitting maximum retry count threshold (in milliseconds)

**Type -** Number

**Default value -** 20_000

**Example -**

```js
{
  network: {
    timeToResumeRetries: 10_000
  }
}
```

## **crypto**

Web crypto module instance, which is different for browser and node runtimes, you would need to provide node’s web crypto module during initialization if you are using the SDK in node runtimes.

**Type -** Object

**Default value -** null

**Example -**

```js
{
  crypto: crypto.webcrypto
}
```

# Full list of options with default value

Comprehensive list of options with default value assigned to them

```js
{
  event: {
    // contains names of all the instant events, used to differentiate QoS0 and QoS1 events.
    classification: {
      instant: [],
    },
    // group name, prefix for event type
    group: ""
  },
  batch: {
    // maximum interval time between two batches(sec).
    maxTimeBetweenTwoBatches: 10,
    // maximum size of batch(bytes).
    maxBatchSize: 50_000,
    // name of the database, must be unique per origin
    dbName: 'clickstream_db',
  },
  network: {
    // Raccoon host URL
    url: "",
    // Request headers
    headers: {},
    // maximum number of retries before pausing
    maxRetries: 5,
    // gap between two retries (mSec)
    timeBetweenTwoRetries: 1_000,
    // time after which retry will resume after hitting maximum retry count threshold (mSec)
    timeToResumeRetries: 20_000,
  },
  // web crypto module instance
  crypto: null
}
```
