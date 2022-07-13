---
id: migrating-from-v3
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
If you are already using Mocks Server v2.x you should [migrate first from v2.x to v3.x](releases/migrating-from-v2.md), and then read this chapter to prepare migration to v4.x.
:::

## Preface

Even when v4 release is still not published, we are deprecating some things in v3 that will be removed in v4. While v4 is not released, every change in v3.x will be completely backward compatible, but __users upgrading to next minor versions would probably receive alerts about usage of deprecated methods, etc__.

So, every time you upgrade a minor version and receive a deprecation alert, you can come to this page and see how to adapt your code for the next major version, so you'll be able to prepare to it progressively and finally update to v4 without breaking changes.


## Changes summary

The main breaking changes in v4.x will be:

* __Some core API methods will be removed__. Read [core API](#core-api) below for further info.
* __Legacy alerts object will be removed__. Read [alerts](#alerts) for further info.
* __Arguments received by the plugins__. Read [plugins](#plugins) below for further info.
* __Remove support for defining plugins as objects or functions__. Read [plugins](#plugins) below for further info.
* __Default route variants handler will be removed__. Read [route variants handlers](#route-variants-handlers) below for further info.
* __The API for developing variants handlers will change__. Read [route variants handlers API](#route-variants-handlers) below for further info.

## Core API

* __`core.tracer`__: The `tracer` object will be completely removed and using it from v3.2 produces an alert. You must use `core.logger` instead, which is already namespaced when passed to plugins and route middlewares. [Read the logger API docs](api/core.md#logger) for further info.

## Alerts

* The __`core.alerts`__ getter in the core when created programmatically was different to the `core.alerts` property received in the plugins from v3.2 due to backward compatibility reasons. In v4 it will return an `alerts` instance in the first case too. In the first case, it was returning a plain alerts collection. So, if you are using a programmatic root core, you should start using `core.alertsApi.customFlat` to get the same values, because that alias will be maintained in v4. Note that, in the case of plugins, you should continue using the `alerts` property, which will not change in v4.
* The __`addAlert`__ and __`removeAlerts`__ methods that were being passed to plugins were deprecated in v3.1, and they will be removed in v4. Plugins are receiving an `alerts` property in the core to be used instead, which was also available in the root programmatic core using `core.alertsApi`. [Read the alerts API docs](api/core.md#alerts) for further info.


## Plugins

### Core property

In version 3.1 a `core` property was added to the argument passed to the plugins. From `v3.2`, the whole core API was passed as first argument, but with some methods specifically scoped for the plugin. The `core` property was also maintained for backward compatibility but using it produced an alert. So, in v4 the `core` property will be definitively removed.

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

From version 3.4, loading any plugin created as a function or as a plain object will produce an alert. In v4.x, plugins will have to be defined only as classes. So, it is strongly recommended that [any other format of plugin is converted into a class](plugins/development.md) while using >=v3.4, so the code will be ready for migrating to v4.x.

## Route variants handlers

From Mocks Server v3.5, new variants handlers were added: `json` and `middleware`. The `plugin-proxy` package was also updated, and it added a new `proxy-v4` handler. In Mocks Server v4.0, these handlers will have to be used instead of the default one.

This was made because in v3.x, the properties of the route variants differed depending on the used handler, and this made difficult to validate them and could produce conflicts between variant properties and specific handler properties. __In v4.x, all of the handlers properties must be defined in the `response` property of the variant__, which will be mandatory.

__The code can be migrated from v3.5, which will be compatible both with the new way and old way of defining variants in order to allow a progressive migration.__ The way of migrating the code depends of the format of the variant:

### Migrating variants defined as plain response object

Variants using the `default` handler containing a plain response and status can be migrated simply adding a `handler: "json"` property. A variant defined in version lower than 3.5 as:

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

From v3.5 it has to be defined as:

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "success",
        variant: "json", // Add variant property with "json" value
        response: {
          status: 200,
          body: USERS,
        },
      },
    ]
  },
]
```

### Migrating variants defined as middlewares

Variants defining the `response` property as a function (middlewares) in version lower than v3.5 must to be migrated adding a `handler: "middleware"`. The `response` property has to be converted into an object containing a `middleware` property, which must contain the function. So, A variant defined in version lower than 3.5 as:

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

From v3.5 it has to be defined as:

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "real",
        handler: "middleware", // Add the handler property with "middleware" value
        response: { // Move the function to a "middleware" property under "response"
          middleware: (req, res, next) => next(),
        },
      },
    ]
  },
]
```

### Migrating proxy variants

In v3.5 a new handler was added: `proxy-v4`. This handler is compatible with the coming Mocks Server v4 version, while the `proxy` one can still be used. So, in order to adapt the code to the v4 version, it is recommended to migrate all of the variants using the `proxy` handler in order to use the new `proxy-v4` one. In the `proxy-v4` handler, all of the properties for the variant handler have to be defined under the `response` property of the variant, instead of defining them in the root level.

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

From v3.5 it has to be defined as:

```js
module.exports = [
  {
    id: "get-user",
    url: "/api/users/:id",
    method: "GET"],
    variants: [
      {
        id: "real-api",
        handler: "proxy-v4", // Change to "proxy-v4"
        response: { // Move host and options properties under the response property
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

In versions lower than v3.4, the properties of the route variants differed depending on the used handler, and this made difficult to validate them and could produce conflicts between variant properties and specific handler properties. __From v3.5, a new way of defining variant handlers was introduced__, and it will be the only way from v4.x. In the new format, the `middleware` method of the `Handler` classes will receive as first parameter only the properties defined in the `response` property of the route variant instead of all of the route variant properties. This ensures that the `Handlers` can only use the properties that they should use.

From v3.5, you can use the new API adding a static `version` property returning `4` to the class, so Mocks Server can know which parameters it should pass to the class. Note that doing this will imply next things:

* The `middleware` method will receive as first argument only the properties defined in the `response` property of the variant instead of all the variant properties.
* The `validationSchema` property will be scoped only to the `response` properties instead of all of the variant properties.
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

From v3.5 should be changed into:

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

  // Validate only the content of the variant `response` property
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

  // Receives the response property in the constructor instead of the whole variant
  constructor(response, core) {
    this._code = response.code;
    this._message = response.message;
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
