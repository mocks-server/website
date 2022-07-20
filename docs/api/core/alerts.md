---
id: alerts
title: core.alerts
description: Methods of the core.alerts JavaScript API
keywords:
  - mocks server
  - programmatic
  - api
  - core
  - methods
  - properties
  - getters
  - advanced usage
  - JavaScript
  - js
  - node
  - nodejs
  - alerts
---

```mdx-code-block
import ExampleDetails from '@site/src/components/ExampleDetails';
```

## Preface

The `core.alerts` object provides access to methods related to Mocks Server alerts. Use alerts to inform the user about deprecated methods or other warning messages, or about current errors. For example, when an error happens loading files, the server adds automatically an alert in order to let the user know about the error.

:::info
Here are described only some methods of the `alerts` API, for further info please read the [`@mocks-server/nested-collections` docs](https://github.com/mocks-server/main/tree/master/packages/nested-collections/README.md), but take into account that in Mocks Server, the alerts `set` method is extended and supports passing a third `error` argument. 
:::

:::caution
Use only the API methods described in this docs. Use other methods under your own risk, and take into account that they may change in minor versions without considering it as a breaking change.
:::

:::warning
When the `core` is received in the plugin, you must use `core.alerts`, but when you are creating your own core instance programmatically, then you must use `core.alertsApi` instead. This was made in v3.2 due to backward compatibility reasons, and it will be fixed in next major version.
:::

## API

:::caution
When the core is passed to a plugin as a parameter, the `alerts` object is an `alerts` subcollection instead of the root `alerts` instance. The `alerts` subcollection is namespaced with the plugin id, so it is easy to trace where the alerts come from.
:::

### onChange()

__`core.alerts.onChange(callback)`__: Add a callback to be executed when alerts change. Returns a function for removing the added callback.
* `callback()` (Function): Function to be executed whenever alerts change.

```mdx-code-block
<ExampleDetails>
```

```js
// Add event listener and store the method allowing to remove it
// highlight-next-line
const removeListener = core.alerts.onChange(() => {
  console.log("Alerts have changed!");
});

// Remove event listener
// highlight-next-line
removeListener();
```

```mdx-code-block
</ExampleDetails>
```

### set()

__`core.alerts.set(id, message, error)`__: Adds an alert or modify it.
* __`id`__ _(String)_: The id for the alert to be added or modified in case it already exists.
* __`message`__ _(String)_: Message for the alert.
* __`error`__ _(Error)_: Optional. Error causing the alert.

### remove()

__`core.alerts.remove(id)`__: Removes an alert.
* __`id`__ _(String)_: Id of the alert to be removed.

### clean()

__`core.alerts.clean`__: Removes all alerts, including descendant collections.

### collection()

__`core.alerts.collection(id)`__: Allows to create a new subcollection of alerts or returns an already existent one. The returned collection will have all of the same methods described for `alerts`. It is useful to group alerts by its type. The `context` property of the alerts created in a child collection will include all parent collections ids joined with `:`, so the user can know the alert's "path".

### flat

__`core.alerts.flat`__: Returns all collection items and descendent collection items in a flat array. It adds a `collection` id to each item. For nested collections, the `id` is built with all parents ids and self id joined with `:`.

### root

__`core.alerts.root`__: Getter returning the root `alerts` object. It is useful when trying to access to the root Mocks Server alerts from a plugin, but use it with caution because you will be accessing to all of the elements alerts, not only to those owned by the plugin.
