# Options

## **event**

### classification

Contains classification config

#### instant

Contains names of all the instant events, used to differentiate QoS0 and QoS1 events.

**Default** - []

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

### group

Group name, used as prefix for event type

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

### maxTimeBetweenTwoBatches

Max interval time between two batches(in seconds).

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

### maxBatchSize

Max size of batch(in bytes).

**Type -** Number

**Default value -** 50000

**Example -**

```js
{
  batch: {
    maxBatchSize: 20000
  }
}
```

### dbName

Name of the database, must be unique per domain.

**Type -** String

**Default value -** "clickstream_db"

**Example -**

```js
{
  batch: {
    dbName: "custom_db"
  }
}
```

## **network**

### url

Raccoon host URL

**Type -** String | URL

**Default value -** ""

**Example -**

```js
{
  network: {
    url: "https://raccoon.com"
  }
}
```

### headers

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

### maxRetries

Max number of retries before pausing.

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

### timeBetweenTwoRetries

Gap between two retries (in milliseconds)

**Type -** Number

**Default value -** 1000

**Example -**

```js
{
  network: {
    timeBetweenTwoRetries: 500
  }
}
```

### timeToResumeRetries

Time after which retry will resume after hitting max retry count threshold (in milliseconds)

**Type -** Number

**Default value -** 20000

**Example -**

```js
{
  network: {
    timeToResumeRetries: 10000
  }
}
```

## **crypto**

Web crypto module instance, used to provide different module that default or platform specific one.

# Full list of options with default value

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
    // max interval time between two batches(sec).
    maxTimeBetweenTwoBatches: 10,
    // max size of batch(bytes).
    maxBatchSize: 50000,
    // name of the database, must be unique per domain
    dbName: 'clickstream_db',
  },
  network: {
    // Raccoon host URL
    url: "",
    // Request headers
    headers: {},
    // max number of retries before pausing
    maxRetries: 5,
    // gap between two retries (mSec)
    timeBetweenTwoRetries: 1000,
    // time after which retry will resume after hitting max retry count threshold (mSec)
    timeToResumeRetries: 20000,
  },
  // web crypto module instance
  crypto: null
}
```
