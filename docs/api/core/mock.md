---
id: mock
title: core.mock
description: Methods of the core.mock JavaScript API
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
  - mock
---

```mdx-code-block
import ExampleDetails from '@site/src/components/ExampleDetails';
```

## Preface

The `core.mock` object provides methods related to the API mock served, so it contains methods related to [`routes`](usage/routes.md), [`variants`](usage/variants.md) and [`collections`](usage/collections.md).

:::caution
Use only the API methods described in this docs. Use other methods under your own risk, and take into account that they may change in minor versions without considering it as a breaking change.
:::

## API

### onChange()

__`core.mock.onChange(callback)`__: Add a callback to be executed when anything related to the API mock changes. So, it is triggered whenever collections or routes change, and also whenever mock settings change, such as `mock.collections.selected` or `mock.routes.delay`. It returns a function for removing the added callback.
* `callback()` (Function): Function to be executed on change collections.

```mdx-code-block
<ExampleDetails>
```

```js
// Add event listener and store the method allowing to remove it
// highlight-next-line
const removeListener = core.mock.onChange(() => {
  console.log("API mock has changed!");
});

// Remove event listener
// highlight-next-line
removeListener();
```

```mdx-code-block
</ExampleDetails>
```

### createLoaders()

__`core.mock.createLoaders()`__: Return methods allowing to load routes and collections. Each method reloads only the collections or routes added by it, so, it allows to have many different sources for loading routes or collections without having conflicts between them.

It returns an object containing next methods:

* `loadRoutes(routes)`: `<Array of routes>` Load [`routes`](usage/routes.md) definitions with the same format that they are defined when using files. Each time this method is called, __all previously loaded routes will be replaced by the new ones, but only those added using this method__. Routes loaded by the files loader or other plugins will remain.
* `loadCollections(collections)`: `<Array of collections>` Load [`collections`](usage/collections.md) definitions with the same format that they are defined when using files. Each time this method is called, __all previously loaded collections will be replaced by the new ones, but only those added using this method__. Collections loaded by the files loader or other plugins will remain.

```mdx-code-block
<ExampleDetails>
```

```js
const { routes, collections } = require("./fixtures");

// highlight-next-line
const { loadRoutes, loadCollections } = core.mock.createLoaders();

loadRoutes(routes);
loadCollections(collections);
```

:::caution
Note that, if you want your routes and collections to replace other defined previously, you should not call to `createLoaders` each different time you are going to use the methods. Instead of that, you should keep a reference to the `loadRoutes` and `loadCollections` methods and use always those references.
:::

```mdx-code-block
</ExampleDetails>
```

### useRouteVariant()

__`core.mock.useRouteVariant(routeVariantId)`__: Define a [route variant](usage/variants.md) to be used instead of the one defined in the current collection. The change is stored in memory only, so the original collection route variants are restored whenever the selected collection changes or routes or collections are reloaded.
* `routeVariantId` _(String)_: Route and variant id, with the format `"[routeId]:[variantId]"`.

### restoreRouteVariants()

__`core.mock.restoreRouteVariants()`__: Restore current collection route variants. It removes all variants defined with the `useRouteVariant` method.

### customRouteVariants

__`core.mock.customRouteVariants`__: Getter returning an array of current custom route variants ids defined with the `useRouteVariant` method.

## Routes API

:::info
The `core.mock.routes` object provides methods related to [`routes`](usage/routes.md) and [`variants`](usage/variants.md).
:::


### plain

__`core.mock.routes.plain`__: Returns an array with all defined routes in plain format.

### plainVariants

__`core.mock.routes.plainVariants`__: Returns an array with all defined variants in plain format.

## Collections API

:::info
The `core.mock.collections` object provides access to methods related to [`collections`](usage/collections.md).
:::

### select()

__`core.mock.collections.select(collectionId)`__: Changes the current collection. The API mock will use the routes and variants defined in the selected collection.
* `collectionId` _(String)_: Collection id.

### selected

__`core.mock.collections.selected`__: Getter returning a `collection` instance correspondent to the currently selected collection.

### plain

__`core.mock.collections.plain`__: Returns an array with current collections in plain format.

### ids

__`core.mock.collections.ids`__: Getter returning an array with all collections ids.
