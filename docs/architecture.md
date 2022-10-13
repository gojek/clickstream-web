# Architecture

## Mile-high Architecture

The whole journey of event tracking can be modeled as Input - Process - Output Model or the [IPO Model](https://en.wikipedia.org/wiki/IPO_model).

![IPO Model](https://user-images.githubusercontent.com/14230239/195529096-d1bd458a-1310-4c69-8cf5-06bb8706a2bc.png)

**Input** relates to sending the data to the SDK, in this case the event name & payload. **Processing** is done on the input such as addition of meta data, event classification, batch creation, caching and so on. **Output** is concerned with networking for sending the events to Raccoon (Clickstream backend) to make it available for downstream consumption.

This architecture allows us to perform iterations where we can modify the Process’s internal implementation without affecting the Input and Output interface.

![Clickstream Web SDK](https://user-images.githubusercontent.com/14230239/195529355-e2afd6af-96ca-43b2-9220-9a28fbaca897.png)
