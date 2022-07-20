---
id: routes
title: Routes
description: Mocks Server Routes
keywords:
  - mocks server
  - mock server
  - nodejs
  - routes
  - route
  - usage
  - concept
  - feature
  - get started
  - first steps
  - introduction
  - description
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocsImage from '@site/src/components/DocsImage';
import RoutesVariants from '../assets/routes-variants.png';
```

## Description

* A __route__ defines the different responses that can be sent for an specific __request__ _(url and method)_.
* Routes can contain many __variants__, which usually define a different response to be sent when the route is requested.

```mdx-code-block
<DocsImage src={RoutesVariants} alt="Routes and variants" />
```

## Load

* Usually, routes must be defined in the `mocks/routes` folder of your project. You can [organize files inside that folder at your convenience](guides/organizing-files.md), even creating subfolders, the only rule is that __every file must export an array of routes__.
* Files in the `mocks/routes` folder can be of type `.json`, `.js` or even `.ts`. Read the [using Babel guide for further info](guides/using-babel.md).
* Routes can also be loaded programmatically using the [JavaScript API](integrations/javascript.md).

```mdx-code-block
<Tabs>
<TabItem value="JS files">
```

```
project-root/
├── mocks/
│   ├── routes/ <- DEFINE YOUR ROUTES HERE
│   │   ├── common.js
│   │   ├── books.js
│   │   └── users.js
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
│   ├── routes/ <- DEFINE YOUR ROUTES HERE
│   │   ├── common.json
│   │   ├── books.json
│   │   └── users.json
│   └── collections.json
└── mocks.config.js
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript files">
```

```
project-root/
├── mocks/
│   ├── routes/ <- DEFINE YOUR ROUTES HERE
│   │   ├── common.ts
│   │   ├── books.ts
│   │   └── users.ts
│   └── collections.ts
└── mocks.config.js
```

:::info
Read the [using Babel guide](guides/using-babel.md) for further info about how to use TypeScript.
:::

```mdx-code-block
</TabItem>
<TabItem value="JavaScript API">
```

```js
const Core = require("@mocks-server/main");
const { routes, collections } = require("./fixtures");

const core = new Core();

core.start().then(() => {
  // highlight-start
  const { loadRoutes, loadCollections } = core.mock.createLoaders();
  loadRoutes(routes);
  loadCollections(collections);
  // highlight-end
});
```

```mdx-code-block
</TabItem>
</Tabs>
```


## Format

Routes must be defined as objects containing:

* __`id`__ _(String)_: Used as a reference for grouping routes into different [collections](usage/collections.md), etc.
* __`url`__ _(String|Regexp)_: Path of the route. [Read Routing for further info](#routing).
* __`method`__ _(String|Array)_: Method of the request. Defines the HTTP method to which the route will response. It can be also defined as an array of methods, then the route will response to all of them. Valid values are next HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `TRACE` or `OPTIONS`. Read [method](#method) and [multiple methods](#multiple-methods) for further info.
* __`delay`__ _(Number)_: Milliseconds of delay for all variants of this route. This option will override the value of the `mock.routes.delay` global setting. It can be overridden by the `delay` defined in a variant.
* __`variants`__ _(Array)_: Array of variants. Each variant usually defines a different response to be sent when the route is requested.

:::info
__Depending on the variant type, the format of the variants may differ__. In the next examples we'll see ho to define a variant of type `json`, which sends a JSON response. For further info about how to define variants [read the next chapter](usage/variants.md).
:::

```mdx-code-block
<Tabs>
<TabItem value="Json">
```

```json
[
  {
    "id": "get-users", // id of the route
    "url": "/api/users", // url in path-to-regexp format
    "method": "GET", // HTTP method
    "variants": [
      {
        "id": "success", // id of the variant
        "type": "json", // variant type
        "options": {
          "status": 200,
          "body": [
            {
              "id": 1,
              "name": "John Doe"
            },
            {
              "id": 2,
              "name": "Jane Doe"
            }
          ]
        }
      },
    ]
  }
]
```

```mdx-code-block
</TabItem>
<TabItem value="JavaScript">
```

```js
const { allUsers } = require("../fixtures/users");

module.exports = [
  {
    id: "get-users", // id of the route
    url: "/api/users", // url in path-to-regexp format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        type: "json", // variant type
        options: {
          status: 200,
          body: allUsers
        }
      },
    ]
  }
];
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Routing

Mocks Server uses `express` under the hood to create routes, so [you can read its docs](https://expressjs.com/en/guide/routing.html) or the [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) documentation for further info about how to use routing.

Some basics:

* A single route can match many API urls using parameters: `/users/:id`
* Unnamed parameters can be used also: `/*/users`

:::tip
Read the [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) documentation for further info about how to use routing.
:::

### Method

* Requests with a method different to the one defined in the route won't be handled by it. So, you can define two different routes for handling two different methods of the same URL.
* Valid values are next HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `TRACE` or `OPTIONS` _([usage of the `OPTIONS` method requires some additional configuration](guides/using-the-options-method.md))_.

```js
const { allUsers } = require("../fixtures/users");

module.exports = [
  {
    id: "get-users", // id of the route
    url: "/api/users", // url in path-to-regexp format
    // highlight-next-line
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        type: "json", // variant type
        options: {
          status: 200,
          body: allUsers
        }
      },
    ]
  },
  {
    id: "create-user", // id of the route
    url: "/api/users", // url in path-to-regexp format
    // highlight-next-line
    method: "POST", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        type: "json", // variant type
        options: {
          status: 201,
        }
      },
    ]
  }
];
```

### Multiple methods

The route method can be also defined as an array of methods, then the route will handle requests with any of them.

```js
const { allUsers } = require("../fixtures/users");

module.exports = [
  {
    id: "modify-user", // id of the route
    url: "/api/users/:id", // url in path-to-regexp format
    // highlight-next-line
    method: ["PATCH", "PUT"] // HTTP methods
    variants: [
      {
        id: "success", // id of the variant
        type: "json", // variant type
        options: {
          status: 200,
        }
      },
    ]
  },
];
```
