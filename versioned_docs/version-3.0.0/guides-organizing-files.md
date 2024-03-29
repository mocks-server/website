---
id: guides-organizing-files
title: Organizing files
description: How to organize Mocks Server files
keywords:
  - mocks server
  - guides
  - guidelines
  - good practices
  - files
  - files structure
  - mocks
  - routes
---

## Files structure

When started for the first time, Mocks Server will create a config file and a scaffold folder named `mocks` in your project, containing next files and folders:

```
project-root/
├── mocks/
│   ├── routes/
│   │   └── users.js
│   └── mocks.json
└── mocks.config.js
```

This scaffold contains some examples from this documentation that may help you to better understand how `routes` and `mocks` should be defined, how to use `Express` middlewares, etc.

:::note
The name of the mocks folder can be changed using the `files.path` option. Read [options](configuration-options.md) for further info.
:::

## /routes

All files inside the `/routes` folder will be loaded, __including subfolders__, so you can organize the files in the way you want. As a suggestion, you can create a different file for each API entity, and a different folder for each API domain. This will help to maintain your routes organized. For example:

```
routes/
├── customers/
│   ├── addresses.js
│   └── users.js
└── sales/
    ├── orders.js
    └── products.js
```

:::warning
Remember that every file inside the `/routes` folder must export an array containing [Mocks Server routes](get-started-routes.md).
:::

## /mocks.json

This file contains the [definitions of `mocks`](get-started-mocks.md), and its name can't be changed _(you can also use a `.js` extension if you want, or even any other extension if you are [using Babel](guides-using-babel.md))_. It must export an array of [Mocks Server `mocks`](get-started-mocks.md).

## Other files and folders

You can create other files and folders inside the `mocks` folder, Mocks Server will simply ignore them. So, for example, if you want to maintain the data you use in your `routes` separated from the definition of the `routes`, you could create a `data` folder, and import it from the route files.

```
project-root/
├── mocks/
│   ├── data/
│   │   └── users.js
│   ├── routes/
│   │   └── users.js
│   └── mocks.json
└── mocks.config.js
```

```js
// mocks/data/users.js
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

```js
// mocks/routes/users.js
const users = require("../data/users");

module.exports = [
  {
    id: "get-users",
    url: "/api/users"
    method: "GET",
    variants: [
      {
        id: "all",
        response: {
          status: 200,
          body: users
        }
      },
      {
        id: "one",
        response: {
          status: 200,
          body: [users[0]]
        }
      }
    ]
  },
];
```

## Hot reloading

Every time a file in the `mocks` folder is changed _(including custom files and folders outside the `routes` folder)_, Mocks Server will reload everything automatically.

If any file contains an error, Mocks Server will add an alert, and you will see the error in the interactive CLI:

![Interactive CLI alerts](assets/inquirer-cli-alerts.png)

The alert will be removed automatically when the file containing the error is fixed and saved again:

![Interactive CLI](assets/inquirer-cli.gif)

## Good practices

### Use descriptive ids

We strongly recommend to assign very descriptive ids to the "routes", "variants" and "mocks", as they will be used afterwards in the CLI, the REST API, and all other possible Mocks Server interaction tools.

A good pattern for assigning an id to a `route` can be `[method]-[entity]`, as in `get-users`, `get-user`, etc.

For assigning an id to mocks, we recommend to maintain a base `mock` named as `standard`, `base`, or `default`. The rest of mocks should extend from it _(at least indirectly)_, and their ids should be a short description of the mock itself, for example:

```json
[
  {
    "id": "base",
    "routesVariants": ["get-users:all", "get-user:success", "create-user:success"]
  },
  {
    "id": "users-errors",
    "from": "base",
    "routesVariants": ["create-user:error", "get-users:error"]
  },
  {
    "id": "users-with-long-name",
    "from": "base",
    "routesVariants": ["get-users:long-names", "get-user:long-name"]
  }
]
```

### Tip: Don't create unnecessary mocks

Sometimes you'll need to change the response of only one specific route. Instead of creating a new mock for that, remember that it is also possible to change the current variant of one route using the `useRouteVariant` method, and to restore the original mock routes variants using the `restoreRoutesVariants` method _([read API for further info](api-mocks-server-api.md))_.
These methods are also available through the [`plugin-inquirer-cli`](plugins-inquirer-cli.md), [`plugin-admin-api`](plugins-admin-api.md) and [`@mocks-server/cypress-commands`](integrations-cypress.md) plugins.


