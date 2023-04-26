# Use multiple Clickstream instance

Using multiple Clickstream instance in a single application can have some unintended behavior such as “duplicate events being fired”.

## Background

Before using multiple instances, you should be aware of a few behavioral aspects.

1. Each clickstream instance runs an independent interval for batching which keeps running periodically.

2. Clickstream uses [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) as storage on client side, each instance is initialized with a default database name which is same for all the instances.

## Suggestions

Here are some suggested way to use multiple instances depending on the use-case.

1. If the objective is to initialize multiple non concurrent instances, make sure to call [free](https://github.com/gojek/clickstream-web/blob/main/docs/reference/methods.md#free) method on the first instance before creating a new instance.

```js
import React from "react"
import { Clickstream } from "@gojek/clickstream-web"

export default App() {
    const clckstrm = new Clickstream({...})

    React.useEffect(async () => {
        // free the resource on unmount
       await clckstrm.free()
    }, [])

    return (
        ...
    )
}
```

2. If the objective is to run multiple concurrent instances make sure to give unique [dbName](https://github.com/gojek/clickstream-web/blob/main/docs/reference/options.md#batch) in batch config while initializing Clickstream.

```js
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
