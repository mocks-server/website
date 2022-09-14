---
id: preparing-for-v4
title: Preparing migration from v3 to v4
description: How to prepare Mocks Server migration from v3.x to v4.x
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

:::warning
If you are already using Mocks Server v2.x you should [migrate first from v2.x to v3.x](./migrating-from-v2.md), and then read this chapter to prepare migration to v4.x.
:::

## Preface

By the days of this doc was published, we were deprecating some things in v3 that were definitively removed in v4. Every change in v3.x was completely backward compatible, but __users upgrading to v3 minor versions would probably receive alerts about usage of deprecated methods, etc__.

So, every time you upgrade to a v3 minor version and receive a deprecation alert, __you can come to this page and see how to adapt your code for the v4 version__, so you'll be able to prepare to it progressively and finally update to v4 with very few breaking changes.

Note that this document is mainly written in future tense, because when it was written the version 4 was not released yet. Anyway, all changes and processes described here are still valid, and this doc can be used as a guide to update from v3.0 version to v3.12, and then modify your code progressively to be ready to [update to v4](./migrating-from-v3.md).

:::info
Alerts are logged and [displayed in the interactive CLI](../integrations/command-line.md), apart from being available using any of the Mocks Server APIs.
:::

:::tip
If you are already using v3.x, then __update to v3.12, which is compatible with v3.x and v4.x__. You will receive alerts for each thing you have to change before updating to v4.x. So, you can modify your code progressively until there are no more alerts, and then you'll be able to update to v4 reading the [migrating from v3 doc](./migrating-from-v3.md).
:::


## Changes summary

The main breaking changes in v4.x will be:

* __Main concepts will be renamed__. Read [main concepts](#main-concepts) below for further info.
* __Some JavaScript API methods will be removed__. Read [JavaScript API](#javascript-api) below for further info.
* __Some options will be changed__. Read [options](#options) below for further info.
* __The REST API will be server in a different port__. Read [REST API](#rest-api) below for further info.
* __Legacy alerts object will be removed__. Read [alerts](#alerts) for further info.
* __Arguments received by the plugins__. Read [plugins](#plugins) below for further info.
* __Remove support for defining plugins as objects or functions__. Read [plugins](#plugins) below for further info.
* __Default route variants handler will be removed__. Read [route variants handlers](#route-variants-handlers) below for further info.
* __The JavaScript API for developing variants handlers will change__. Read [route variants handlers API](#route-variants-handlers) below for further info.

### Changes in other packages

* __Cypress commands__. The `@mocks-server/cypress-commands` package release 5.0 and above can be used only with Mocks Server >=3.6. Command names have been renamed, so it is a breaking change. But any `@mocks-server/cypress-commands@4.x` version will continue working with Mocks Server 3.x. So, you can continue using Cypress Commands 4.x and update Mocks Server to the latest 3.x version in order to migrate progressively.
* __Admin API Client__. The `@mocks-server/admin-api-client` package release 6.0 and above can be used only with Mocks Server >=3.6. Methods have been renamed, so it is a breaking change. But any `@mocks-server/admin-api-client@5.x` version will continue working with Mocks Server 3.x. So, you can continue using `admin-api-client` 5.x and update Mocks Server to the latest 3.x version in order to migrate progressively.

## Main concepts

* __`mocks`__ - The "mocks" concept has been renamed to "collections". All docs, API, logs and file names now make reference to "collections" instead of "mocks". The main change needed to be prepared for the v4 release is to rename the `mocks/mocks.[js|json]` file into `mocks/collections.[js|json]`.
  * The `routesVariants` or `routesVariants` property in mock definitions has been renamed into `routes`.

## JavaScript API

* __`core.tracer`__: The `tracer` object will be completely removed and using it from v3.2 produces an alert. You must use `core.logger` instead, which is already namespaced when passed to plugins and route middlewares. [Read the logger API docs](../api/javascript/logger.md) for further info.
* __`core.restartServer`__: The `restartServer` method will be removed and using it from v3.6 produces an alert. You must use `core.server.restart` instead. [Read the server API docs](../api/javascript/server.md) for further info.
* __`core.addRouter`__: The `addRouter` method will be removed and using it from v3.6 produces an alert. `core.server.addRouter` must be used instead. [Read the server API docs](../api/javascript/server.md) for further info.
* __`core.removeRouter`__: The `removeRouter` method will be removed and using it from v3.6 produces an alert. `core.server.removeRouter` must be used instead. [Read the server API docs](../api/javascript/server.md) for further info.
* __`core.addRoutesHandler`__: The `addRoutesHandler` method will be removed and using it from v3.6 produces an alert. `core.variantHandlers.register` must be used instead. [Read the variantHandlers API docs](../api/javascript/variant-handlers.md) for further info.
* __`core.onChangeMocks`__: The `onChangeMocks` method will be removed and using it from v3.6 produces an alert. `core.mock.onChange` must be used instead. [Read the mock API docs](../api/javascript/mock.md) for further info.
* __`core.loadMocks`__: The `loadMocks` method will be removed and using it from v3.6 produces an alert. `core.mock.createLoaders` must be used instead. [Read the mock API docs](../api/javascript/mock.md) for further info.
* __`core.loadRoutes`__: The `loadRoutes` method will be removed and using it from v3.6 produces an alert. `core.mock.createLoaders` must be used instead. [Read the mock API docs](../api/javascript/mock.md) for further info.
* __`core.mocks.restoreRoutesVariants`__: The `mocks.restoreRoutesVariants` method will be removed and using it from v3.6 produces an alert. `core.mock.restoreRouteVariants` must be used instead. [Read the mock API docs](../api/javascript/mock.md) for further info.
* __`core.mocks.customRoutesVariants`__: The `mocks.customRoutesVariants` getter will be removed and using it from v3.6 produces an alert. `core.mock.customRouteVariants` must be used instead. [Read the mock API docs](../api/javascript/mock.md) for further info.
* __`core.mocks.plainRoutes`__: The `mocks.plainRoutes` getter will be removed and using it from v3.6 produces an alert. `core.mock.routes.plain` getter must be used instead. [Read the mock API docs](../api/javascript/mock.md) for further info.
* __`core.mocks.plainRoutesVariants`__: The `mocks.plainRoutesVariants` getter will be removed and using it from v3.6 produces an alert. `core.mock.routes.plainVariants` getter must be used instead, but take into account that the items properties have changed in the new getter. [Read the mock API docs](../api/javascript/mock.md) for further info.
* __`core.mocks.current`__: The `mocks.current` getter and setter will be removed and using it from v3.6 produces an alert. `core.mock.collections.selected` getter and `core.mocks.collections.select` method must be used instead. [Read the mock API docs](../api/javascript/mock.md) for further info.
* __`core.mocks.ids`__: The `mocks.ids` getter will be removed and using them from v3.6 produces alerts. `core.mock.collections.ids` getter must be used instead. [Read the mock API docs](../api/javascript/mock.md) for further info.
* __`core.mocks.plainMocks`__: The `mocks.plainMocks` getter will be removed and using it from v3.6 produces an alert. `core.mock.collections.plain` getter must be used instead, but take into account that the items properties have changed in the new getter. [Read the mock API docs](../api/javascript/mock.md) for further info.
* __`core.logs`__: The `core.logs` getter will be removed and using them from v3.6 produces an alert. `core.logger.globalStore` getter must be used instead. [Read the logger API docs](../api/javascript/logger.md) for further info.
* __`core.onChangeAlerts`__: The `core.onChangeAlerts` method will be removed and using them from v3.6 produces an alert. `core.alerts.root.onChange` method must be used instead. [Read the alerts API docs](../api/javascript/alerts.md) for further info.
* __`core.onChangeLogs`__: The `core.onChangeLogs` method will be removed and using them from v3.6 produces an alert. `core.logger.onChangeGlobalStore` method must be used instead. [Read the logger API docs](../api/javascript/logger.md) for further info.

## Options

* __`mocks.selected`__: This option will be removed. Use `mock.collections.selected` instead.
* __`mocks.delay`__: This option will be removed. Use `mock.routes.delay` instead.
* __`routesHandlers`__: This option will be removed. Use `variantHandlers.register` instead.

## REST API

From v3.6, a new REST API server is started in a different port of the API mock. URLs and models was changed too, and Swagger UI was added. Review the [new REST API docs](../integrations/rest-api.md) for further info. The legacy API in the `/admin` path will be still available in all v3.x versions, but using it will produce an alert.

## Alerts

* The __`core.alerts`__ getter in the core when created programmatically was different to the `core.alerts` property received in the plugins from v3.2 due to backward compatibility reasons. In v4 it will return an `alerts` instance in the first case too. In the first case, it was returning a plain alerts collection. So, if you are using a programmatic root core, you should start using `core.alertsApi.customFlat` to get the same values, because that alias will be maintained in v4. Note that, when receiving the core as a parameter in plugins, you should continue using the `alerts` property, which will not change in v4.
* The __`addAlert`__ and __`removeAlerts`__ methods that were being passed to plugins were deprecated in v3.1, and they will be removed in v4. Plugins are receiving an `alerts` property in the core to be used instead, which was also available in the root programmatic core using `core.alertsApi`. [Read the alerts API docs](../api/javascript/alerts.md) for further info.


## Plugins

### Core property

In version v3.1 a `core` property was added to the argument passed to the plugins. From v3.2, the whole core API was passed as first argument, but with some methods specifically scoped for the plugin. The `core` property was also maintained for backward compatibility but using it produced an alert. So, in v4 the `core` property will be definitively removed.

V3 example:

```js
class Plugin {
  constructor({ logger, core, addAlert, removeAlerts }) {
    // core property was almost an alias containing again all of the rest of properties received
  }
}
```
V4 example:
```js
class Plugin {
  constructor({ logger }) {
    // core property is no longer received
  }
}
```

### Formats

From version v3.4, loading any plugin created as a function or as a plain object will produce an alert. In v4.x, plugins will have to be defined only as classes. So, it is strongly recommended that [any other format of plugin is converted into a class](../plugins/development.md) while using >=v3.4, so the code will be ready for migrating to v4.x.

## Route variants handlers

From Mocks Server v3.5, new variants handlers were added: `json` and `middleware`. The `plugin-proxy` package was also updated, and it added a new `proxy-v4` handler. In Mocks Server v4.0, these handlers will have to be used instead of the default one.

This was made because in v3.x, the properties of the route variants differed depending on the used handler, and this made difficult to validate them and could produce conflicts between variant properties and specific handler properties. __In v4.x, all of the handlers properties must be defined in the `options` property of the variant__, which will be mandatory. The variant handler will be to be defined in the mandatory `type` property. 

__The code can be migrated from v3.5, which will be compatible both with the new way and old way of defining variants in order to allow a progressive migration.__ The way of migrating the code depends of the format of the variant:

### Migrating variants defined as plain response object

Variants using the `default` handler containing a plain object response and a status can be migrated simply adding a `type: "json"` property, and renaming the `response` property into `options`. So, a variant defined in version lower than 3.5 as:

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "success",
        response: {
          status: 200,
          body: USERS,
        },
      },
    ]
  },
]
```

From v3.6 it has to be defined as:

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "json", // Add variant type property with "json" value
        options: {
          status: 200,
          body: USERS,
        },
      },
    ]
  },
]
```

### Migrating variants defined as plain text response

Variants using the `default` handler containing a plain text response and a status can be migrated simply adding a `type: "text"` property, and renaming the `response` property into `options`. So, a variant defined in version lower than 3.7 as:

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "success",
        response: {
          status: 200,
          body: "Foo text",
        },
      },
    ]
  },
]
```

From v3.7 it has to be defined as:

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "text", // Add variant type property with "text" value
        options: {
          status: 200,
          body: "Foo text",
        },
      },
    ]
  },
]
```

### Migrating variants with empty body

Variants using the `default` handler without body and a status can be migrated simply adding a `type: "status"` property. So, a variant defined in version lower than 3.8 as:

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "success",
        response: {
          status: 200,
        },
      },
    ]
  },
]
```

From v3.8 it has to be defined as:

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "status", // Add variant type property with "status" value
        options: {
          status: 200,
        },
      },
    ]
  },
]
```

### Migrating variants defined as middlewares

Variants defining the `response` property as a function (middlewares) in version lower than v3.5 must to be migrated adding a `type: "middleware"`. The `response` property has to be converted into an `options` object containing a `middleware` property, which must contain the function. So, A variant defined in version lower than 3.5 as:

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "real",
        response: (req, res, next) => next(),
      },
    ]
  },
]
```

From v3.6 it has to be defined as:

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "real",
        type: "middleware", // Add the type property with "middleware" value
        options: { // Move the function to a "middleware" property under "options"
          middleware: (req, res, next) => next(),
        },
      },
    ]
  },
]
```

### Migrating proxy variants

In v3.5 a new handler was added: `proxy-v4`. This handler is compatible with the coming Mocks Server v4 version, while the `proxy` one can still be used. So, in order to adapt the code to the v4 version, it is recommended to migrate all of the variants using the `proxy` handler in order to use the new `proxy-v4` one. In the `proxy-v4` handler, all of the properties for the variant handler have to be defined under the `options` property of the variant, instead of defining them in the root level.

So, a `proxy` variant defined in version lower than 3.5 as:

```js
module.exports = [
  {
    id: "get-user",
    url: "/api/users/:id",
    method: "GET"],
    variants: [
      {
        id: "real-api",
        handler: "proxy",
        host: "http://127.0.0.1:8080",
        options: {
          userResDecorator: (function(proxyRes, proxyResData, userReq, userRes) {
            data = JSON.parse(proxyResData.toString('utf8'));
            data.name = `Modified ${data.name}`;
            return JSON.stringify(data);
          })
        },
      },
    ],
  },
];
```

From v3.6 it has to be defined as:

```js
module.exports = [
  {
    id: "get-user",
    url: "/api/users/:id",
    method: "GET"],
    variants: [
      {
        id: "real-api",
        type: "proxy-v4", // Change to "proxy-v4"
        options: { // Move host and options properties under the variant options property
          host: "http://127.0.0.1:8080",
          options: {
            userResDecorator: (function(proxyRes, proxyResData, userReq, userRes) {
              data = JSON.parse(proxyResData.toString('utf8'));
              data.name = `Modified ${data.name}`;
              return JSON.stringify(data);
            })
          },
        },
      },
    ],
  },
];
```

## Route variants handlers API

In versions lower than v3.4, the properties of the route variants differed depending on the used handler, and this made difficult to validate them and could produce conflicts between variant properties and specific handler properties. __From v3.5, a new way of defining variant handlers was introduced__, and it will be the only way from v4.x. In the new format, the `middleware` method of the `Handler` classes will receive as first parameter only the properties defined in the `options` property of the route variant instead of all of the route variant properties. This ensures that the `Handlers` can only use the properties that they should use.

From v3.5, you can use the new API adding a static `version` property returning `4` to the class, so Mocks Server can know which parameters it should pass to the class. Note that doing this will imply next things:

* The `middleware` method will receive as first argument only the properties defined in the `options` property of the variant instead of all the variant properties.
* The `validationSchema` property will be scoped only to the `options` properties instead of all of the variant properties.
* The `plainResponsePreview` property must be renamed into `preview`.

So, a route handler defined in v3.4 as:

```js
// ./CustomRoutesHandler.js

class CustomRoutesHandler {
  static get id() {
    return "error";
  }

  static get validationSchema() {
    return {
      type: "object",
      properties: {
        response: {
          type: "object",
          properties: {
            code: {
              type: "number",
            },
            message: {
              type: "string",
            },
          },
          required: ["code", "message"],
          additionalProperties: false,
        }
      },
      required: ["response"],
    };
  }

  constructor(variant, core) {
    this._code = variant.response.code;
    this._message = variant.response.message;
    this._core = core;
  }

  middleware(req, res, next) {
    this._core.logger.info("Sending response");
    res.status(this._code);
    res.send({
      message: this._message
    });
  }

  get plainResponsePreview() {
    return {
      body: {
        message: this._message
      },
      status: this._code,
    };
  }
}

module.exports = CustomRoutesHandler;
```

From v3.5 it should be changed into:

```js
// ./CustomRoutesHandler.js

class CustomRoutesHandler {
  static get id() {
    return "error";
  }

  // Return 4 in version to use the new API
  static get version() {
    return "4";
  }

  // Validate only the content of the variant `options` property
  static get validationSchema() {
    return {
      type: "object",
      properties: {
        code: {
          type: "number",
        },
        message: {
          type: "string",
        },
      },
      required: ["code", "message"],
      additionalProperties: false,
    };
  }

  // Receives the options property in the constructor instead of the whole variant
  constructor(options, core) {
    this._code = options.code;
    this._message = options.message;
    this._core = core;
  }

  middleware(req, res, next) {
    this._core.logger.info("Sending response");
    res.status(this._code);
    res.send({
      message: this._message
    });
  }

  // Rename plainResponsePreview into preview
  get preview() {
    return {
      body: {
        message: this._message
      },
      status: this._code,
    };
  }
}

module.exports = CustomRoutesHandler;
```
