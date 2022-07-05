---
id: api-routes-handler
title: Routes Handler
description: How to add custom routes handlers
keywords:
  - mocks server
  - customization
  - routes
  - routes variants
  - handler
  - format
---

## What is a Routes Handler?

A "Routes handler" is the element at charge of handling the [routes variants declarations](get-started-routes.md), and sending the appropriate response.

Mocks Server includes only one Routes Handler by default, which accepts routes variants declared in the [format described in the `routes` chapter](get-started-routes.md), but __you can add your own route variants formats__.

This feature, combined with the [plugins development](plugins-developing-plugins.md), gives you the possibility of adding to Mocks Server almost every new feature you want.

## Creating custom Routes Handlers

A Routes Handler should be defined as a `Class` containing:

#### `static get id()`

This static getter will be used to recognize the Routes Handler. When defining a route variant, the handler to be used can be defined using the `handler` property. That property in route variants should be the `id` of the Route Handler to be used.

#### `static get version()`

This property was added in v3.5 in order to allow to adapt to the next major version without breaking changes. It must return "4" in order to be able to use the API described in this page. Please read other version docs to check old handlers APIs.

#### `static get validationSchema()`

This static getter must return a JSON schema defining the specific properties required by the handler. It will be used by the core to validate the route variants of this type. `ajv` is used under the hood to perform validations. Take into account next points when defining the json schema:

* You must only define those properties defined in the `response` property of the variant definition.
* Mocks Server supports a special JSON schema keyword named `instanceof`. You can use it to indicate that a property must be an instance of a `Function`, or a `RegExp` for example.

#### `constructor(response, core)`

* `response`: All properties in the `response` property of the route variant definition.
* `core`: The [`core` instance](api-mocks-server-api.md), but with some methods specifically scoped for each route variant, such as `core.logger` and `core.alerts`, which are namespaced using each route variant id. So, logs or alerts from each different route variant can be easily identified.

#### `middleware(req, res, next)`

This is the middleware that will be called when the route url matches and the specific variant type corresponds to this route handler (it is equal to the route handler id).

#### `get preview()`

This getter should return a plain object containing an approached preview of the response that will be sent when the route variant is used. This is useful to provide information to other plugins or Mocks Server interfaces. If you have not enough information to predict the response (as in the case of `middlewares` handler, for example), you should return `null`.

## Example

Here you have an example of how a custom Routes Handler should be defined:

```js
// ./CustomRoutesHandler.js

class CustomRoutesHandler {
  static get id() {
    return "error";
  }

  static get version() {
    return "4";
  }

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

  constructor(response, core) {
    this._code = response.code;
    this._message = response.message;
    this._core = core;
  }

  middleware(req, res, next) {
    // Next log automatically includes the route variant id
    this._core.logger.info("Sending response");
    res.status(this._code);
    res.send({
      message: this._message
    });
  }

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

Then you can add your custom Routes Handler using the configuration file:

```javascript
// mocks.config.js

const CustomRoutesHandler = require("./CustomRoutesHandler");

module.exports = {
  routesHandlers: [CustomRoutesHandler],
  server: {
    port: 3100,
  },
  mocks: {
    selected: "base",
  },
};
```

:::note
You can also add Route Handlers programmatically using the [`core.addRoutesHandler` method](api-mocks-server-api.md) (useful to be used from [plugins](plugins-developing-plugins.md), for example)
:::

And now, you can use the custom handler when defining route variants:

```js
// mocks/routes/users.js

module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "error-400",
        handler: "error", // id of the handler to be used
        response: { // object that the handler will receive
          code: 400,
          message: "Error message",
        },
      }
      {
        // This one will use the "json" handler
        id: "empty",
        handler: "json",
        response: {
          status: 200,
          body: []
        }
      },
    ]
  }
]
```
