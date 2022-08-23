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

The [Mocks Server main distribution](https://github.com/mocks-server/main/tree/master/packages/main) includes the [openapi plugin](https://github.com/mocks-server/main/tree/master/packages/plugin-openapi) preinstalled. It provides a function to __automatically create routes from OpenAPI documents__, and also enables to define the OpenAPI documents to convert by creating files in the `/mocks/openapi` folder.

## Creating routes from OpenAPI documents

The plugin can be used to create routes in two different ways:

* It searches for files in the `/mocks/openapi` folder and it automatically converts the plugin's [OpenAPI definitions](#openapi-definitions) into [routes](../usage/routes.md) and loads them.
* It provides a JavaScript function to create routes from [OpenAPI definitions](#openapi-definitions). The returned routes should be loaded manually. The function could be used to export routes in a file in the `mocks/routes` folder, or to load routes programmatically, for example.

:::tip
OpenAPI conversion supports JSON refs, so, routes can be created from complete or partial OpenAPI documents hosted on remote servers, defined in separated JSON files, etc. Check out the _[Recipes section](#recipes)_ for examples.
:::

## OpenAPI definitions

Each OpenAPI document from which to generate routes has to be provided using an object with next properties:

* __`basePath`__ _(String)_: Path to add to the url of every route created from the OpenAPI document.
* __`document`__ _(Object)_: OpenAPI document. Read _[OpenAPI conversion and compatibility](#openapi-conversion-and-compatibility)_ for further details.
* __`refs`__ _(Object)_: Optional. Options for resolving possible `$refs` in the OpenAPI document. The [`json-refs` library](https://github.com/whitlockjc/json-refs) is used behind the scenes to resolve refs, so any of [its options](https://github.com/whitlockjc/json-refs/blob/master/docs/API.md#json-refsjsonrefsoptions--object) is supported here.
  * __`location`__ _(String)_: The location of the document being processed. It will be used to locate relative references found within the document being resolved. If this value is relative, it will be calculated from `process.cwd()`.
  * __`subDocPath`__ _(String)_: The JSON Pointer or array of path segments to the sub document location to search from.

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

## Programmatic usage

## OpenAPI conversion and compatibility

## Recipes
