# Use multiple Clickstream instance in single application

Using multiple instance can have some unintended behavior such as “duplicate events being fired”.

**Few aspects to know before using multiple instances -**

1. Each clickstream instance runs an interval for batching which keeps running periodically.

2. Clickstream uses indexedDB as storage on client side, each instance is initialized with a default storage name which is same for all the instances.

**Suggested ways to use multiple instances -**

1. If the objective is to initialize multiple non concurrent instances, make sure to call [free](https://github.com/gojek/clickstream-web/blob/main/docs/reference/methods.md#free) method on the first instance before making a new instance.

```js
// Sample code
import React from "react"
import { Clickstream } from "@gojek/clickstream-web"

export default App() {
    const clckstrm = new Clickstream({...})

    React.useEffect(() => {
        // free the resource on unmount
        clckstrm.free()
    }, [])

    return (
        ...
    )
}
```

2. If the objective is to run multiple concurrent instances make sure to give unique [dbName](https://github.com/gojek/clickstream-web/blob/main/docs/reference/options.md#batch) in batch config while initializing Clickstream.

```js
// Sample code
import React from "react"
import { Clickstream } from "@gojek/clickstream-web"

export default init = ({dbName}) => {
    const clckstrm = new Clickstream({
        event: {
            ...
        },
        batch: {
            dbName: dbName,
        }
    })
}
```
