---
id: openapi
title: OpenAPI integration
description: How to create Mocks Server routes automatically from OpenAPI documents
keywords:
  - mocks server
  - mock server
  - REST API
  - api
  - http
  - integration
  - OpenAPI
  - tutorial
  - guide
  - how to
  - usage
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Preface

The [Mocks Server main distribution](https://github.com/mocks-server/main/tree/master/packages/main) includes the [openapi plugin](https://github.com/mocks-server/main/tree/master/packages/plugin-openapi) preinstalled. It enables to __automatically create Mocks Server [routes](../usage/routes.md) and [collections](../usage/collections.md) from [OpenAPI documents](https://www.openapis.org/)__.

```js
module.exports = [
  {
    basePath: "/api", // basePath to add to the url of every created route
    document: { // OpenAPI document
      $ref: "../fixtures/openapi.json"
    }
  }
];
```

### How does it work

OpenAPI versions 3.0 and 3.1 are supported.

__Routes and variants are created using the response examples found in the OpenAPI document's `paths` property__, or using status codes when the response has no content. Basically, it creates a different route variant from:

* Each different example found on each `paths[path][method].responses[code].content[media-type].examples[example-id]` property.
* Each different status code without content found on each `paths[path][method].responses[code]` property.

__Collections are created using the first variant found on each OpenAPI route__. They can also extend from other collections.
:::info
Read the __[OpenAPI conversion section](#openapi-conversion)__ for further info about the required OpenAPI structure for creating routes.
:::

### Usage

The plugin can be used to create routes in two different ways:

* It searches for files in the `/mocks/openapi` folder and it automatically converts the exported plugin's [OpenAPI definitions](#openapi-definitions) into [routes](../usage/routes.md) and loads them.
* It provides JavaScript functions to create routes and collections from [OpenAPI definitions](#openapi-definitions). The returned routes and collections should be loaded manually. The function could be used to export routes in a file in the `mocks/routes` folder, or to load routes programmatically, for example.

:::tip
OpenAPI conversion supports JSON refs, so, routes can be created from complete or partial OpenAPI documents hosted on remote servers, defined in separated JSON files, etc. Check out the _[Recipes section](#recipes)_ for examples.
:::
## OpenAPI definitions

Each OpenAPI document from which to generate routes has to be provided using an object with next properties:

* __`basePath`__ _(String)_: Path to be added to the url of every route created from the OpenAPI document.
* __`document`__ _(Object)_: OpenAPI document. Read __[OpenAPI conversion](#openapi-conversion)__ for further details.
* __`collection`__ _(Object)_: Optional. Allows to create a collection with the routes generated from the OpenAPI document. When not provided, no collection will be created for this particular document routes (but the routes will still be added to the plugin's default collection).
  * __`id`__ _(String)_: ID for the collection.
  * __`from`__ _(String)_: Collection ID from which the collection will extend.
* __`refs`__ _(Object)_: Optional. Options for resolving possible `$refs` in the OpenAPI document. The [`json-refs` library](https://github.com/whitlockjc/json-refs) is used behind the scenes to resolve refs, so any of [its options](https://github.com/whitlockjc/json-refs/blob/master/docs/API.md#json-refsjsonrefsoptions--object) is supported here.
  * __`location`__ _(String)_: The location of the document being processed. It will be used to locate relative references found within the document being resolved. If this value is relative, it will be calculated from `process.cwd()`.
  * __`subDocPath`__ _(String)_: The JSON Pointer or array of path segments to the sub document location to search from.
  * ...any other [`json-refs`](https://github.com/whitlockjc/json-refs) option.

## Usage through files

The plugin automatically searches for files in the `/mocks/openapi` folder. __Each file must export an array of [OpenAPI definitions](#openapi-definitions)__, or a function exporting an array of OpenAPI definitions.

:::info
The plugin can be used to create routes from multiple OpenAPI documents. So, it expects an array of OpenAPI definitions in every file. You can export multiple OpenAPI definitions in one or multiple files. Check out _[Recipes](#recipes)_ for examples.
:::

```mdx-code-block
<Tabs>
<TabItem value="JS files">
```

```
project-root/
├── mocks/
│   ├── openapi/ <- DEFINE OPENAPIS HERE
│   │   └── definitions.js
│   └── collections.js
└── mocks.config.js
```

```mdx-code-block
</TabItem>
<TabItem value="JSON files">
```

```
project-root/
├── mocks/
│   ├── openapi/ <- DEFINE OPENAPIS HERE
│   │   └── definitions.json
│   └── collections.json
└── mocks.config.js
```

```mdx-code-block
</TabItem>
<TabItem value="YAML files">
```

```
project-root/
├── mocks/
│   ├── openapi/ <- DEFINE OPENAPIS HERE
│   │   └── definitions.yml
│   └── collections.yaml
└── mocks.config.js
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript files">
```

```
project-root/
├── mocks/
│   ├── openapi/ <- DEFINE OPENAPIS HERE
│   │   └── definitions.ts
│   └── collections.ts
└── mocks.config.js
```

:::info
Read the [using Babel guide](../guides/using-babel.md) for further info about how to use TypeScript.
:::

```mdx-code-block
</TabItem>
</Tabs>
```

:::tip
The plugin takes advantage of the [files loaders API](../api/javascript/files.md#loaders) provided by Mocks Server. So, OpenAPI definitions files can also be defined using JSON, Yaml, JavaScript, TypeScript, etc. And any [custom Babel configuration](../guides/using-babel.md) will be also applied to these files. Read the [organizing files guide](../guides/organizing-files.md) for further info.
:::

### Examples

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```
```js
module.exports = [
  {
    basePath: "/testing-api", // basePath to add to the url of every created route
    collection: {
      id: "testing-api", // Id for the collection generated with all routes created from the OpenAPI document
      from: "base" // Id of the collection to extend from
    },
    document: { // OpenAPI document
      openapi: "3.1.0",
      info: {
        version: "1.0.0",
        title: "Testing API",
        description: "OpenAPI document to create routes",
      },
      paths: {
        //... OpenAPI document paths
      }
    }
  }
];
```

```mdx-code-block
</TabItem>
<TabItem value="JSON">
```

```json
[
  {
    "basePath": "/testing-api", // basePath to add to the url of every created route
    "collection": {
      "id": "testing-api", // Id for the collection generated with all routes created from the OpenAPI document
      "from": "base" // Id of the collection to extend from
    },
    "document": {
      "openapi": "3.1.0",
      "info": {
        "version": "1.0.0",
        "title": "Testing API",
        "description": "OpenAPI document to create routes"
      },
      "paths": {
        //... OpenAPI document paths
      }
    }
  }
]
```

```mdx-code-block
</TabItem>
<TabItem value="YAML">
```

```yaml
- basePath: "/testing-api"
  collection:
    id: "testing-api"
    from: "base"
  document:
    openapi: "3.1.0"
    info:
      version: "1.0.0"
      title: "Testing API"
      description: "OpenAPI document to create routes"
    paths:
      # ... OpenAPI document paths
```

```mdx-code-block
</TabItem>
</Tabs>
```

:::tip
OpenAPI conversion supports JSON refs, so, __routes can be created from complete or partial OpenAPI documents hosted on remote servers, defined in separated JSON files, etc__. Check out the _[Recipes section](#recipes)_ for examples.
:::

### Configuring refs

When OpenAPI definitions are exported from files in the `/mocks/openapi` folder, relative refs in the OpenAPI document by default will be resolved from the file path. This default value can be changed using the `refs.location` option.

```mdx-code-block
<Tabs>
<TabItem value="mocks/openapi/definitions.js">
```
```js
module.exports = [
  {
    basePath: "/testing-api",
    document: {
      $ref: "../documents/openapi.json"
    }
  }
];
```

```mdx-code-block
</TabItem>
<TabItem value="mocks/documents/openapi.json">
```

```json
{
  "openapi": "3.1.0",
  "info": {
    "version": "1.0.0",
    "title": "Testing API",
    "description": "OpenAPI document to create routes"
  },
  "paths": {
    //... OpenAPI document paths
  }
}
```

```mdx-code-block
</TabItem>
<TabItem value="File tree">
```

```
project-root/
├── mocks/
│   ├── documents/
│   │   └── openapi.json
│   ├── openapi/
│   │   └── definitions.js
│   └── collections.js
└── mocks.config.js
```

```mdx-code-block
</TabItem>
</Tabs>
```

## OpenAPI conversion

### Routes

__[Routes](../usage/routes.md) are created using the paths and methods found in the document `paths` property__. It creates a different route from:

* Each different path and method found on each `paths[path][method]` property.

#### Route ID

The route ID is assigned following the next criteria, from higher to lower priority:

* The value of the `x-mocks-server-route-id` property in the path method, when defined.
* The value of the `operationId` property in the path method, when defined.
* A combination of the method and path (`[method]-[path]`), applying next replacements:
  * Path separators (`/`) are replaced by `-`
  * Path templates characters are removed (`{` or `}`)

<details>
<summary>
Example
</summary>
<div>

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Foo API",
    //...
  },
  "paths": {
    "/users": {
      // ROUTE "getUsers"
      // highlight-next-line
      "get": {
        "x-mocks-server-route-id": "getUsers"
        //...
      },
      // ROUTE "createUser"
      // highlight-next-line
      "post": {
        "operationId": "createUser"
        //...
      }
    },
    "/users/{id}": {
      // ROUTE "get-users-id"
      // highlight-next-line
      "get": {
        //...
      }
    }
  }
}
```

</div>
</details>

### Variants

__[Variants](../usage/variants.md) of each route are created using the examples found on each different response code content media type__. It creates a different variant from:

* Each different example found on each `paths[path][method].responses[code].content[media-type].examples[example-id]` property.
* Each different status code without content found on each `paths[path][method].responses[code]` property.

#### Variant type

The created variants will have different types depending on the method responses properties:

* [`json`](../usage/variants/json.md) when the response code content media type contains `application/json`. The example value must be an object, otherwise the route won't pass the validation.
* [`text`](../usage/variants/text.md) when the response code content media type contains `text/`. The example value must be a string, otherwise the route won't pass the validation.
* [`status`](../usage/variants/status.md) when the the response code does not have a `content` property

#### Variant ID

The variant ID is assigned following the next criteria, from higher to lower priority:

* The value of the `x-mocks-server-variant-id` property in the example, when defined.
* A combination of the code, variant type and example id (`[code]-[variant type]-[example id]`) when the response code has content
* A combination of the code and variant type (`[code]-[variant type]`) when the response code has no content

<details>
<summary>
Example
</summary>
<div>

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Foo API",
    //...
  },
  "paths": {
    "/users": {
      // ROUTE "get-users"
      // highlight-next-line
      "get": { 
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "examples": {
                  // VARIANT "all-users-json"
                  // highlight-next-line
                  "all-users": {
                    "x-mocks-server-variant-id": "all-users-json",
                    "value": [ 
                      {
                        "name": "John Doe"
                      },
                      {
                        "name": "Jane Doe"
                      }
                    ]
                  },
                  // VARIANT "200-json-no-users"
                  // highlight-next-line
                  "no-users": {
                    "value": []
                  }
                }
              },
              "text/plain": {
                "examples": {
                  // VARIANT "200-text-all-users"
                  // highlight-next-line
                  "all-users": {
                    "value": "John Doe, Jane Doe"
                  },
                  // VARIANT "200-text-no-users"
                  // highlight-next-line
                  "no-users": {
                    "value": ""
                  }
                }
              }
            }
          }
        }
      },
      // ROUTE "post-users"
      // highlight-next-line
      "post": {
        "responses": {
          // VARIANT "200-status"
          // highlight-next-line
          "200": {
            //...
          }
        }
      }
    }
  }
}
```

</div>
</details>

#### Variant headers

All headers defined in the OpenAPI `headers` response code will be added to all of the variants created for that response status code.

<details>
<summary>
Example
</summary>
<div>

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Foo API",
    //...
  },
  "paths": {
    "/users": {
      // ROUTE "get-users"
      // highlight-next-line
      "get": { 
        "responses": {
          "200": {
            // highlight-start
            "headers": {
              "foo-header-1": "foo-value-1",
              "foo-header-2": "foo-value-2"
            },
            // highlight-end
            "content": {
              "application/json": {
                "examples": {
                  // VARIANT "200-json-all-users" will have headers "foo-header-1" and "foo-header-2"
                  // highlight-next-line
                  "all-users": {
                    //...
                  },
                  // VARIANT "200-json-no-users" will have headers "foo-header-1" and "foo-header-2"
                  // highlight-next-line
                  "no-users": {
                    //...
                  }
                }
              },
              "text/plain": {
                "examples": {
                  // VARIANT "200-text-all-users" will have headers "foo-header-1" and "foo-header-2"
                  // highlight-next-line
                  "all-users": {
                    //...
                  },
                  // VARIANT "200-text-no-users" will have headers "foo-header-1" and "foo-header-2"
                  // highlight-next-line
                  "no-users": {
                    //...
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

</div>
</details>

### Document collection

The plugin's [OpenAPI definitions](#openapi-definitions) `collection` options allows to automatically create a collection containing all routes generated from each OpenAPI document.

__The first variant found on each route will be the selected one when the collection is created__, but you can change it afterwards defining [custom route variants](../usage/collections.md#defining-custom-route-variants) through any of the available APIs or integration tools.

<details>
<summary>
Example
</summary>
<div>

Two collections will be created in the next example. Each one will contain only the routes in the base collection and the routes from each correspondent OpenAPI document:

```js
module.exports = [
  {
    basePath: "/api-1",
    collection: {
      id: "api-1",
      from: "base"
    },
    document: { // OpenAPI document
      $ref: "../fixtures/api-1.json"
    }
  },
  {
    basePath: "/api-1",
    collection: {
      id: "api-2",
      from: "base"
    },
    document: { // OpenAPI document
      $ref: "../fixtures/api-2.json"
    }
  }
];
```

</div>
</details>

### All documents collection

The plugin supports to create routes from multiple OpenAPI documents. A different collection can be created from each different document, but the plugin also __allows to create a collection containing all routes from all OpenAPI documents loaded__. So, all routes from all OpenAPI documents can be available at the same time in the API mock.

__By default, it creates a collection with "openapi" id, containing all routes from all documents__, but you can use the plugin options to change the collection name and the collection to extend from.

<details>
<summary>
Example
</summary>
<div>

Only one collection will be created in the next example. It will contain all routes in the "base" collection and in both OpenAPI documents:

```mdx-code-block
<Tabs>
<TabItem value="OpenAPI definitions">
```

```js
module.exports = [
  {
    basePath: "/api-1",
    document: { // OpenAPI document
      $ref: "../fixtures/api-1.json"
    }
  },
  {
    basePath: "/api-1",
    document: { // OpenAPI document
      $ref: "../fixtures/api-2.json"
    }
  }
];
```

```mdx-code-block
</TabItem>
<TabItem value="Plugin config">
```

```js
// mocks.config.js file
module.exports = {
  plugins: {
    openapi: {
      collection: {
        id: "openapi",
        from: "base"
      }
    }
  }
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

</div>
</details>

## Configuration

Here are described the plugin's options. Take into account that these options only have effect when it is the plugin who loads the OpenAPI definitions in the `/mocks/openapi` folder. When [used programmatically](#programmatic-usage), these options have no effect.

You can use the next [Mocks Server configuration](../configuration/how-to-change-settings.md) properties to change the plugin's options:

* __`plugins.openapi.collection.id`__ _(String)_: Id for the collection to be created with __all routes from all OpenAPI documents__. Default is "openapi"
* __`plugins.openapi.collection.from`__ _(String)_: When provided, the created collection will extend from this one.

## Programmatic usage

The plugin also exports a function allowing to create routes manually from OpenAPI definitions. Created routes should be loaded manually using any of the Mocks Server available methods.

:::caution
Note that you'll have to create the collections by your own when getting routes programmatically.
:::

### API

The plugin exports next methods:


* __`openApiRoutes(openAPIdefinition[, options])`__: _(Async Function)_: Resolves with an array of routes generated from the provided [OpenAPI definition](#openapi-definitions). Rejects with error if it is not possible to resolve OpenAPI document refs or there is any other error trying to convert it.
  * `openAPIdefinition` _(Object)_: [OpenAPI definition](#openapi-definitions)
  * `options` _(Object)_: Optional Object containing any of next properties:
    * `defaultLocation` _(String)_: Set this location as `refs.location` option in the OpenAPI definition. It is ignored if the OpenAPI definition contains a `refs.location` property.
    * `logger` _(Object)_: [Mocks Server Logger instance](../api/javascript/logger.md). If received, the function will log details during the conversion process using it.
    * `alerts` _(Object)_: [Mocks Server Alerts instance](../api/javascript/alerts.md). If received, the function will create alerts using this object when any error is produced while trying to convert the OpenAPI document instead of throwing an error.

:::caution
When the OpenAPI document contain relative refs, they will be resolved from the `process.cwd()` path by default. Use the `refs.location` option in the OpenAPI definitions, or the `defaultLocation` option in the methods in order to change it.
:::

### Examples

```mdx-code-block
<Tabs>
<TabItem value="JavaScript API">
```

```js
const path = require("path");

const { createServer } = require("@mocks-server/main");
const { openApiRoutes } = require("@mocks-server/plugin-openapi");

const openApiDocument = require("../openapi.json");

const core = createServer();

core.start().then(async () => {
  // highlight-start
  const routes = await openApiRoutes({
    basePath: "/foo-api",
    document: openApiDocument,
    refs: {
      // Define next option only if the document contains relative refs
      location: path.resolve(__dirname, "..", "openapi.json"),
    }
  });
  // highlight-end

  // Load routes
  const { loadRoutes } = core.mock.createLoaders();
  loadRoutes(routes);
});
```

```mdx-code-block
</TabItem>
<TabItem value="JS routes files">
```

```js
const { openApiRoutes } = require("@mocks-server/plugin-openapi");

const openApiDocument = require("../fixtures/openapi.json");

// Files in the mocks/routes folder can also export an async function

module.exports = function() {
  return openApiRoutes({
    basePath: "/foo-api",
    document: openApiDocument,
    refs: {
      // Define next option only if the document contains relative refs
      location: path.resolve(__dirname, "..", "fixtures", "openapi.json"),
    }
  });
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Recipes

### Remote OpenAPI document

Using JSON refs, an OpenAPI document hosted on a remote server can be used to create mock routes. Simply define the document as a ref to the url of the remote document:

```js
module.exports = [
  {
    basePath: "/openapi", // basePath to add to the url of every created route
    document: { // OpenAPI document
      $ref: "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/api-with-examples.json"
    }
  }
];
```

### OpenAPI JSON file document

Using JSON refs, a JSON OpenAPI document located in the file system can be used to create mock routes. Simply define the document as a ref to the path of the document:

```js
module.exports = [
  {
    basePath: "/openapi", // basePath to add to the url of every created route
    document: { // OpenAPI document
      $ref: "../fixtures/api-with-examples.json"
    }
  }
];
```

:::caution
When using relative refs, remember to [configure properly the location option](#configuring-refs).
:::
