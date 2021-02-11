---
id: guides-migrating-from-v1
title: Migrating from v1 to v2
description: How to migrate from v1.x to v2.x
keywords:
  - mocks server
  - tutorial
  - migration
  - version
  - update
  - legacy
  - guide
  - deprecated
---

## Preface

Mocks Server v2.x introduced the concept of ["route variants"](get-started-intro.md), and made more restrictive the way for organizing mocks and routes files. It also introduced other improvements, as the possibility of [using express middlewares](guides-using-middlewares.md), made simpler the [mocksServer API](api-mocks-server-api.md), etc.

All of these changes made very difficult to handle old v1 `behaviors` and `fixtures` together with the new format of `routes`, so, in order to maintain backward compatibility, Mocks Server v2 can handle two folders at a time, one containing v1.x `fixtures` and `behaviors`, and another one containing v2.x [`mocks`](get-started-mocks.md) and [`routes`](get-started-routes.md).

This was made with the intention of allowing users to migrate progressively from v1.x format to v2.x format. You can convert old `fixtures` and `behaviors` into new `mocks` and `routes` and move them from one folder to other, until you have no more legacy code, and you can deactivate the legacy folder.

:::info
When the same route is defined in v2.x "routes" and v1.x "fixtures", the "fixture" will be ignored, and the "route" will handle the request.
:::

## Step by step

### Update and enable legacy mode

* First of all, rename your old `mocks` folder into `mocks-legacy`
* Install the v2.x version of Mocks Server. `npm i --save-dev @mocks-server/main@2.x`
* Start Mocks Server. `npm run mocks` _(we suppose you have already your `mocks` script configured in the `package.json`)_. Now you would have a folders structure like:

```
project-root/
├── mocks-legacy/
│   └── ...
├── mocks/
│   ├── routes/
│   │   └── users.js
│   └── mocks.json
├── mocks-server.config.json
└── mocks.config.json
```

* Migrate your old options from the `mocks-server.config.js` file to `mocks.config.js` (See [legacy options](#legacy-options) below to check the options correspondence). Once done, you can delete the `mocks-server.config.js` file.
* Enable legacy folder in the configuration to use both folders:

```javascript
// mocks.config.js

module.exports = {
  options: {
    path: "mocks",
    port: 3100,
    mock: "base",
    watch: true,
    cli: true,
    behavior: "foo-behavior", //migrated from mocks-server.config.js
    pathLegacy: "mocks-legacy", // enables the usage of v1 path
    watchLegacy: true // enables the watch in the v1 path
  }
};
```

Now, when the interactive CLI is started, settings and actions related with legacy mode will be displayed also:

![Interactive CLI legacy mode](assets/inquirer-cli-legacy-mode.png)

### Migrating fixtures

After reading the v2.x [`routes`](get-started-routes.md) and [`mocks`](get-started-mocks.md) documentation, you would have noticed that old fixtures having the same "path" can be easily migrated to a new `route`.

For example, old fixtures like:

```json
// mocks-legacy/fixtures/users.json
[
  {
    "id": "get-user",
    "url": "/api/users/:id",
    "method": "GET",
    "response": {
      "status": 200,
      "body": {
        "id": 1,
        "name": "John Doe"
      }
    }
  },
  {
    "id": "get-user-error",
    "url": "/api/users/:id",
    "method": "GET",
    "response": {
      "status": 400,
      "body": {
        "message": "Server error"
      }
    }
  }
]
```

Can be migrated to a route like:

```json
// mocks/routes/users.json
[
  {
    "id": "get-user",
    "url": "/api/users/:id",
    "method": "GET",
    "variants": [
      {
        "id": "success",
        "response": {
          "status": 200,
          "body": {
            "id": 1,
            "name": "John Doe"
          }
        }
      },
      {
        "id": "error",
        "response": {
          "status": 400,
          "body": {
            "message": "Server error"
          }
        }
      }
    ]
  }
]
```

### Migrating behaviors

Continuing with the previous example, once you have migrated your "fixture" to a "route", you can add it to a new "mock".

If your "behavior" was defined like:

```json
// mocks/behaviors.json
[
  {
    "id": "base",
    "fixtures": ["get-user"]
  },
  {
    "id": "user-error",
    "fixtures": ["get-user-error"]
  },
]
```

You can define a mock like:

```json
// mocks/mocks.json
[
  {
    "id": "base",
    "routeVariants": ["get-user:success"]
  },
  {
    "id": "user-error",
    "from": "base",
    "routeVariants": ["get-user:error"]
  }
]
```

:::info
You would normally have several fixtures in each "behavior". So don't delete the "behavior" until you have migrated all of the "fixtures" that it contains. Simply remove the migrated fixtures from it and let the rest. Mocks Server will use "routes" with priority, but when a request does not match any of them, it will fallback to "fixtures", so you can migrate them progressively.
:::

## Legacy options

Next options should be used only for backward compatibility with v1.x, and will be removed in next major version:

* __`pathLegacy`__ _(String)_: Path to the folder containing legacy v1.x behaviors and fixtures. Correspondent to `path` in v1.x.
* __`watchLegacy`__ _(Boolean)_: Disables files watch on legacy path. When used as command line argument, now it has to be negated as `no-watch`. Correspondent to `watch` in v1.x.
* __`behavior`__ _(String)_: Default selected behavior when server is started.

## Legacy API

Next [`mocksServer`](api-mocks-server-api.md) methods and getters are provided only for backward compatibility, and will be removed in next major version:

* __`onChangeLegacyMocks(callback)`__: Add a callback to be executed when mocks collections (fixtures or behaviors) changes. Returns a function for removing the added callback.
  * `callback()`: `<Function>`
* __`addFixturesHandler(FixturesHandler)`__: Add a custom fixtures handler. This allows to add new formats or methods of defining fixtures.
  * `FixturesHandler`: `<Class>` Custom fixtures handler. Read v1.x versions docs for further info.
* __`behaviors`__: Returns methods and getters related to currently available behaviors.
  * __`count`__: Getter returning total number of behaviors available.
  * __`collection`__: Collection of behaviors instances.
  * __`ids`__: Getter returning an array with all behaviors ids.
  * __`current`__: Getter returning current active behavior.
  * __`currentId`__: Getter returning the id of the current active behavior.
* __`fixtures`__: Returns methods and getters related to currently available fixtures.
  * __`count`__: Getter returning total number of fixtures available.
  * __`collection`__: Collection of fixtures instances.

## Legacy plugins methods

* __`loadLegacyMocks(definitions)`__: New method added for backward compatibility. `loadMocks` now can be used only to load v2.x mocks.

## Breaking changes

Some options and methods that were already deprecated in v1.x have been definitively removed in v2.x.

### Options

* __`features`__: Removed. Legacy `pathLegacy` option should be used instead.
* __`behaviors`__: Removed. Legacy `pathLegacy` option should be used instead.
* __`feature`__: Removed. Legacy `behavior` option should be used instead.

### API

* __`addSetting(customSetting)`__ The method is still valid, but `type` property in `customSetting` does not accept `booleanString` as value any more. Now `boolean` type should be used instead.
* __`onLoadMocks(callback)`__. Removed. `onChangeMocks` should be used instead (or `onChangeLegacyMocks` to listen for changes in legacy `behaviors` or `fixtures`).
* __`onLoadFiles`__. Removed.  There is no alternative, as it is an internal event of the files-loader plugin and it shouldn't be used by other external pieces.
* __`addCustomRouter`__. Removed. `addRouter` should be used instead.
* __`addCustomSetting`__. Removed. `addSetting` should be used instead.
* __`serverError`__. Removed. `alerts` should be used instead, because the server now adds an alert when there is an unexpected error.
* __`restart`__. Removed. `restartServer` should be used instead.
* __`server`__: This object is still available, but next the getter has been removed from it:
  * __`features`__: Removed. Legacy `behaviors` has to be used instead
