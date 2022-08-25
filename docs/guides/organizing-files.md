---
id: organizing-files
title: Organizing files
description: How to organize Mocks Server files
keywords:
  - mocks server
  - mock server
  - guides
  - guidelines
  - good practices
  - files
  - files structure
  - collections
  - routes
  - variants
  - json
  - JavaScript
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Scaffold

When the server is started for the first time, it will create a configuration file and a scaffold folder containing some examples of routes and collections.

```
project-root/
├── mocks/
│   ├── routes/ <- DEFINE YOUR ROUTES HERE
│   │   ├── common.js
│   │   └── users.js
│   └── collections.json <- DEFINE YOUR COLLECTIONS HERE
└── mocks.config.js <- DEFINE YOUR CONFIGURATION HERE
```

* The server loads all files in the `mocks/routes` folder, which must contain the [route definitions](../usage/routes.md).
* The `mocks/collections.*` file is used to define [collections](../usage/collections.md) of [route variants](../usage/variants.md).
* The server watches for changes in all files in the `mocks` folder, so changing a file will immediately update the mocked API.

:::info
Collections and routes can also be defined programmatically. Read the [Javascript integration chapter](../integrations/javascript.md) for further info.
:::


## Defining routes

The server searches for all files in the `mocks/routes` folder, __including subfolders__, and load their content as [routes](../usage/routes.md). So, __every file in that folder must export an array of [routes](../usage/routes.md)__, or a function returning an array of routes.

In the folder, you can organize the files in the way you want. As a suggestion, you could create a different file for each API entity, and a different folder for each API domain. This would help to maintain your routes organized. For example:

```
routes/
├── customers/
│   ├── addresses.js
│   └── users.js
└── sales/
    ├── orders.js
    └── products.js
```

:::caution
Remember that every file inside the `/routes` folder must export an array containing [Mocks Server routes](../usage/routes.md), or a function returning an array of routes. Read _[Supported file contents](#supported-file-contents)_ for further info.
:::

## Defining collections

The server reads the `mocks/collections.*` file and loads its content as [`collections`](../usage/collections.md). The file extension can be `.js`, `.json`, `.yaml` or `.yml` (and even `.ts`, read the [using Babel guide for further info](./using-babel.md)).

:::caution
The `mocks/collections.*` file must export an array of [Mocks Server `collections`](../usage/collections.md), or a function returning an array of collections. Read _[Supported file contents](#supported-file-contents)_ for further info.
:::

## Supported file formats

All route files and collections file by default can be defined in JSON, YAML or JavaScript, using any of the next extensions:

* `.js`
* `.json`
* `.yaml` or `.yml`

:::tip
`.ts` files are also supported when [Babel is enabled and configured properly](./using-babel.md)
:::

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```
└─ mocks/
    ├── routes/ <- DEFINE YOUR ROUTES HERE
    │   ├── common.js
    │   └── users.js
    └── collections.json <- DEFINE YOUR COLLECTIONS HERE
```

```mdx-code-block
</TabItem>
<TabItem value="JSON">
```

```
└─ mocks/
    ├── routes/ <- DEFINE YOUR ROUTES HERE
    │   ├── common.json
    │   └── users.json
    └── collections.json <- DEFINE YOUR COLLECTIONS HERE
```

```mdx-code-block
</TabItem>
<TabItem value="YAML">
```

```
└─ mocks/
    ├── routes/ <- DEFINE YOUR ROUTES HERE
    │   ├── common.yml
    │   └── users.yml
    └── collections.yml <- DEFINE YOUR COLLECTIONS HERE
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript">
```

```
└─ mocks/
    ├── routes/ <- DEFINE YOUR ROUTES HERE
    │   ├── common.ts
    │   └── users.ts
    └── collections.ts <- DEFINE YOUR COLLECTIONS HERE
```

```mdx-code-block
</TabItem>
<TabItem value="Mixed">
```

You don't have to limit to a file format. Depending on the file content, you may prefer one type or another, so combining them is also possible:

```
└─ mocks/
    ├── routes/ <- DEFINE YOUR ROUTES HERE
    │   ├── common.js
    │   └── users.json
    └── collections.yml <- DEFINE YOUR COLLECTIONS HERE
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Supported file contents

Both routes and collections files at the end must export an array of valid routes or collections. But __they can also export a function returning a valid array, or a promise resolved with a valid array__. So, async stuff can be used for defining routes or collections in files:

```mdx-code-block
<Tabs>
<TabItem value="Json">
```

```json
[
  {
    "id": "base", // collection id
    "routes": ["get-users:all", "get-user:id-1"] // collection routes
  },
  {
    "id": "user-2", // collection id
    "from": "base", // extends "base" collection
    "routes": ["get-user:id-2"] // "get-user" route uses "id-2" variant instead of "id-1"
  }
]
```

```mdx-code-block
</TabItem>
<TabItem value="Yaml">
```

```yml
- id: "base" # collection id
  routes: # collection routes
    - "get-users:all"
    - "get-user:id-1"
- id: "user-2" # collection id
  from: "base" # extends "base" collection
  routes:
    - "get-user:id-2" # "get-user" route uses "id-2" variant instead of "id-1"
```

```mdx-code-block
</TabItem>
<TabItem value="JavaScript">
```

```js
module.exports = [
  {
    id: "base", // collection id
    routes: ["get-users:all", "get-user:id-1"] // collection routes
  },
  {
    id: "user-2", // collection id
    from: "base", // extends "base" collection
    routes: ["get-user:id-2"] // "get-user" route uses "id-2" variant instead of "id-1"
  }
];
```

```mdx-code-block
</TabItem>
<TabItem value="Async JS">
```

```js
const { getBaseRoutes } = require("./helpers");

module.exports = async function() {
  const baseRoutes = await getBaseRoutes();

  return [
    {
      id: "base", // collection id
      routes: baseRoutes // collection routes
    },
    {
      id: "user-2", // collection id
      from: "base", // extends "base" collection
      routes: ["get-user:id-2"] // "get-user" route uses "id-2" variant instead of "id-1"
    }
  ];
}
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript">
```

```ts
const collections = [
  {
    id: "base", // collection id
    routes: baseRoutes // collection routes
  },
  {
    id: "user-2", // collection id
    from: "base", // extends "base" collection
    routes: ["get-user:id-2"] // "get-user" route uses "id-2" variant instead of "id-1"
  }
];

export default collections;
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Other files and folders

You can create other files and folders in the `mocks` folder, Mocks Server will simply ignore them. So, for example, if you want to maintain the data you use in your `routes` separated from the definition of the `routes` theirself, you could create a `fixtures` folder, and import it from the route files.

```
project-root/
├── mocks/
│   ├── fixtures/
│   │   └── users.js
│   ├── routes/
│   │   └── users.js
│   └── collections.json
└── mocks.config.js
```

```mdx-code-block
<Tabs>
<TabItem value="fixtures/users.js">
```

```js
module.exports = [
  {
    id: 1,
    name: "John Doe"
  },
  {
    id: 2,
    name: "Jane Doe"
  }
];
```

```mdx-code-block
</TabItem>
<TabItem value="routes/users.js">
```

```js
// highlight-next-line
const users = require("../fixtures/users");

module.exports = [
  {
    id: "get-users",
    url: "/api/users"
    method: "GET",
    variants: [
      {
        id: "all",
        type: "json",
        options: {
          status: 200,
          // highlight-next-line
          body: users
        }
      },
      {
        id: "one",
        type: "json",
        options: {
          status: 200,
          // highlight-next-line
          body: [users[0]]
        }
      }
    ]
  },
];
```

```mdx-code-block
</TabItem>
</Tabs>
```

:::tip
By keeping your fixtures in a separated folder, but also inside the `/mocks` folder, you'll take advantage of the files watcher. So, any change in the fixture files will be automatically refreshed in the API mock.
:::

## Hot reloading

Every time a file in the `mocks` folder is changed _(including custom files and folders outside the `routes` folder)_, Mocks Server will reload everything automatically.

If any file contains an error, the server will add an alert, and you will be able to see the error in the interactive CLI or using any of the other integration tools.

![Interactive CLI alerts](../assets/inquirer-cli-alerts.png)

The alert will be removed automatically when the file containing the error is fixed and saved again

![Interactive CLI](../assets/inquirer-cli.gif)

## Good practices

### Use descriptive ids

We strongly recommend to assign very descriptive ids to the [`routes`](../usage/routes.md), [`variants`](../usage/variants.md) and [`collections`](../usage/collections.md), because they will be used afterwards in the CLI, the REST API, and all other available integration tools.

A good pattern for assigning an id to a `route` can be `[method]-[entity]`, as in `get-users`, `get-user`, etc.

For assigning an id to the collections, we recommend to maintain a base `collection` named as `standard`, `base`, or `default`. The rest of collections should extend from it _(at least indirectly)_, and their ids should be a short description of the collection behavior, for example:

```json
[
  {
    // highlight-next-line
    "id": "base",
    "routes": ["get-users:all", "get-user:success", "create-user:success"]
  },
  {
    // highlight-next-line
    "id": "users-errors",
    "from": "base",
    "routes": ["create-user:error", "get-users:error"]
  },
  {
    // highlight-next-line
    "id": "users-with-long-name",
    "from": "base",
    "routes": ["get-users:long-names", "get-user:long-name"]
  }
]
```

