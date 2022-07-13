---
id: routes
title: core.routes
description: Methods of the core.routes JavaScript API
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
  - routes
---

```mdx-code-block
import ExampleDetails from '@site/src/components/ExampleDetails';
```

## Preface

The `core.routes` object provides access to methods related to [`routes`](usage/routes.md), [`variants`](usage/variants.md) and [`collections`](usage/collections.md).

## API

### onChange()

__`core.routes.onChange(callback)`__: Add a callback to be executed when collections or routes change. Returns a function for removing the added callback.
* `callback()` (Function): Function to be executed on change collections.

```mdx-code-block
<ExampleDetails>
```

```js
// Add event listener and store the method allowing to remove it
// highlight-next-line
const removeListener = core.routes.onChange(() => {
  console.log("API mock routes have changed!");
});

// Remove event listener
// highlight-next-line
removeListener();
```

```mdx-code-block
</ExampleDetails>
```

### createLoaders()

__`core.routes.createLoaders()`__: Return methods allowing to load routes and collections. Each method reloads only the collections or routes added by it, so, it allows to have many different sources for loading routes or collections without having conflicts between them.

It returns an object containing next methods:

* `loadRoutes(routes)`: `<Array of routes>` Load [`routes`](usage/routes.md) definitions with the same format that they are defined when using files. Each time this method is called, __all previously loaded routes will be replaced by the new ones, but only those added using this method__. Routes loaded by the files loader or other plugins will remain.
* `loadCollections(collections)`: `<Array of collections>` Load [`collections`](usage/collections.md) definitions with the same format that they are defined when using files. Each time this method is called, __all previously loaded collections will be replaced by the new ones, but only those added using this method__. Collections loaded by the files loader or other plugins will remain.

```mdx-code-block
<ExampleDetails>
```

```js
const { routes, collections } = require("./fixtures");

// highlight-next-line
const { loadRoutes, loadCollections } = core.routes.createLoaders();

loadRoutes(routes);
loadCollections(collections);
```

:::caution
Note that, if you want your routes and collections to replace other defined previously, you should not call to `createLoaders` each different time you are going to use the methods. Instead of that, you should keep a reference to the `loadRoutes` and `loadCollections` methods and use always those references.
:::

```mdx-code-block
</ExampleDetails>
```


### plain

__`core.routes.plain`__: Returns an array with all defined routes in plain format.

### plainVariants

__`core.routes.plainVariants`__: Returns an array with all defined variants in plain format.

## variantHandlers API

:::info
The `core.routes.variantHandlers` object provides access to methods related to [`Variant Handlers`](variant-handlers/intro.md).
:::

### register()

__`core.routes.variantHandlers.register(VariantHandler)`__: Register a [Variant Handler](variant-handlers/intro.md).
* `VariantHandler`: `<Class>` Custom Variant handler. Read the [creating Variant Handlers chapter](variant-handlers/development.md) for further info.

```mdx-code-block
<ExampleDetails>
```

```js
import MyVariantHandler from "./MyVariantHandler";

// highlight-next-line
core.routes.variantHandlers.register(MyVariantHandler);
```

```mdx-code-block
</ExampleDetails>
```

## Collections API

:::info
The `core.routes.collections` object provides access to methods related to [`collections`](usage/collections.md).
:::

### select()

__`core.routes.collections.select(collectionId)`__: Changes the current collection. The API mock will use the routes and variants defined in the selected collection.
* `collectionId` _(String)_: Collection id.

### selected

__`core.routes.collections.selected`__: Getter returning a `collection` instance correspondent to the currently selected collection.

### ids

__`core.routes.collections.ids`__: Getter returning an array with all collection ids.

### plain

__`core.routes.collections.plain`__: Returns an array with current collections in plain format.

## Collection API

:::info
The `core.routes.collections.selected` object returns a `collection` instance, which has the next API:
:::

### useVariant()

__`core.routes.collections.selected.useVariant(variantId)`__: Define a [route variant](usage/variants.md) to be used by the current collection. The change is stored in memory only, so the original collection route variants are restored whenever the current collection changes or routes are reloaded.
* `variantId` _(String)_: Route variant id, with the format `"[routeId]:[variantId]"`.

### restoreVariants()

__`core.routes.collections.selected.restoreVariants()`__: Restore current collection route variants. It removes all variants defined with the `useVariant` method.

### customVariants

__`core.routes.collections.selected.customVariants`__: Getter returning array of current custom variant ids (those defined using the `useVariant` method)

### plainRoutes

__`core.routes.collections.selected.plainRoutes`__: Returns an array with all collection routes in plain format.

### plainVariants

__`core.routes.collections.selected.plainVariants`__: Returns an array with all collection variants in plain format.
