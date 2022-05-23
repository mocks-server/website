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

#### `static get validationSchema()`

This static getter must return a JSON schema defining the specific properties required by the handler. It will be used by the core to validate the route variants of this type. `ajv` is used under the hood to perform validations. Take into account next points when defining the json schema:

* You must only define those properties added by the route handler to the variant definition. Those that are common to all route variant types must not be defined. So, you shouldn't use `additionalProperties:false` at the root level of the schema. Otherwise, the properties that are common to all route variants would be considered invalid.
* Mocks Server supports a special JSON schema keyword named "instanceof". You can use it to indicate that a property must be an instance of a "function", or a "RegExp" for example.

#### `constructor(route, mocksServer)`

* `route`: All route and route variants properties from the `route` definition _(`method`, `url`, `variantId`, and all other properties defined in the route variant object)_.
* `mocksServer`: The [`mocksServer` instance](api-mocks-server-api.md).

#### `middleware(req, res, next)`

This is the middleware that will be called when the route url matches and the specific variant type corresponds to this route handler (it is equal to the route handler id).

#### `get plainResponsePreview()`

This getter should return a plain object containing an approached preview of the response that will be sent when the route variant is used. This is useful to provide information to other plugins or Mocks Server interfaces.

## Example

Here you have an example of how a custom Routes Handler should be defined:

```javascript
// ./CustomRoutesHandler.js

class CustomRoutesHandler {
  static get id() {
    return "error";
  }

  constructor(routeVariant, mocksServer) {
    this._error = routeVariant.error;
    this._variantId = routeVariant.variantId;
    this._mocksServer = mocksServer;
  }

  middleware(req, res, next) {
    this._mocksServer.tracer.info(`Sending route variant "${this._variantId}"`);
    res.status(this._error.code);
    res.send({
      message: this._error.message
    });
  }

  get plainResponsePreview() {
    return {
      body: {
        message: this._error.message
      },
      status: this._error.code,
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
You can also add Route Handlers programmatically using the [`mocksServer.addRoutesHandler` method](api-mocks-server-api.md) (useful to be used from [plugins](plugins-developing-plugins.md), for example)
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
        error: {
          code: 400,
          message: "Error message",
        }
      }
      {
        // This one will use the "default" handler
        id: "empty",
        response: {
          status: 200,
          body: []
        }
      },
    ]
  }
]
```
