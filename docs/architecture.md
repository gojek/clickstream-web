# Architecture

Here we dive into the high level architecture of the SDK, explaining the event flow and major parts of the system.

## Mile-high Architecture

The whole journey of event tracking can be modeled as Input - Process - Output Model or the [IPO Model](https://en.wikipedia.org/wiki/IPO_model).

![IPO Model](https://user-images.githubusercontent.com/14230239/195529096-d1bd458a-1310-4c69-8cf5-06bb8706a2bc.png)

**Input** relates to sending the data to the SDK, in this case the event name & payload. **Processing** is done on the input such as addition of meta data, event classification, batch creation, caching and so on. **Output** is concerned with networking for sending the events to Raccoon (Clickstream backend) to make it available for downstream consumption.

This architecture allows us to perform iterations where we can modify the Process’s internal implementation without affecting the Input and Output interface.

## Event Flow

Event flows through various parts of the clickstream system, when the event is generated from end user it is sent to Clickstream Web SDK which procesess the event and send that to Clickstream backend service [Raccoon](https://odpf.github.io/raccoon/). Raccoon stores the events in kafka topics, these events can be consumed using any downstream application as per the use case.

![Clickstream web SDK](https://user-images.githubusercontent.com/14230239/195533334-ed8a662d-8524-41af-9b67-57b2761d0748.png)

## High level design

The SDK uses [Protocol Buffers](https://developers.google.com/protocol-buffers)(a.k.a Protobuf) as serialised structured data. Clickstream Web SDK accepts event payload data as Protobufs.

![High Level Design](https://user-images.githubusercontent.com/14230239/195533837-d22572e9-4102-4565-92b7-7d8c64f9cdd3.png)

### EventProcessor

As part of the Input, once the data is received from the public API, the EventProcessor classifies an incoming event into QoS0 and QoS1 based on the configuration. After that it creates an Event object, adds unique identifiers etc. It forwards QoS0 events directly to event scheduler. QoS1 events hits the database for storage. EventProcessor caches the QoS1 events so that it can re-send the events in case of failures to meet Clickstream's at-least once guarantee. These events are stored inside the user agent’s IndexedDB database. This is the only cache layer the SDK uses to ensure least client side storage consumption.

### Event Scheduler

Primary job of Scheduler is to do batching of events and forward them to EgressController. It schedules events in a batch in a periodic manner based on the configurable batch timing.

A batch is created if either the `maxBatchSize` threshold is reached or the wait time crosses `maxTimeBetweenTwoBatches`, and this is done periodically. Scheduler is also aware about the SDK network’s reachability and it pauses the batch creation process when the network is unreachable. Batch creation resumes once reachability re-establishes.

### Egress Controller

The Egress Controller is the subsystem that handles networking.

The Egress creates the request with a new `req_guid` as per Raccoon’s protobuf contract and sets up rest of the request object. Egress will update the `req_guid` for the events data in the database so that it can later query based on the `req_guid` to delete those events whose acknowledge has been received.

On response it checks for following statuses -
Success - Acknowledge the event batch and remove all the events from database.

Failure - Acknowledge the event batch and notify the event scheduler about the batch failure.

Response handler notifies the event scheduler about the batch failure, on notification scheduler takes the batch events and dispatches another batch immediately to Egress Controller again.
