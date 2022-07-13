---
id: development
title: Creating variant handlers
description: How to create custom variant handlers
keywords:
  - mocks server
  - customization
  - variants
  - types
  - variant types
  - development
  - handler
  - format
---

## Preface

In the previous chapters [we saw what a Variant Handler is](variant-handlers/intro.md), and [how to install it](variant-handlers/installation.md). Now we are going to see how to create them, so you can add your own features to Mocks Server easily 🙂.

A Variant Handler basically consists on a JavaScript `Class` which receives the variant options in the `constructor` method, and which must contain a `middleware` method. This method receives the same parameters than an [Express middleware](https://expressjs.com/en/guide/using-middleware.html), and it will be executed whenever the route is requested.

## Properties

A Variant Handler must be defined as a `Class` containing:

#### `static get id()`

This static getter will be used to recognize the Routes Handler. When defining a route variant, the handler to be used is defined using the `type` property. That property in the route variant must be equal to the `id` of the Variant Handler to be used.

#### `static get validationSchema()`

This static getter must return a JSON schema defining the specific options required by the handler. It will be used by the core to validate the route variants of this type. `ajv` is used under the hood to perform validations. Take into account next points when defining the json schema:

* You must only define those properties defined in the `options` property of the variant definition.
* Mocks Server supports a special JSON schema keyword named `instanceof`. You can use it to indicate that a property must be an instance of a `Function`, or a `RegExp` for example.

#### `constructor(options, core)`

* `options`: All properties in the `options` property of the route variant.
* `core`: The [`core` instance](api/core.md), but with some methods specifically scoped for each route variant, such as `core.logger` and `core.alerts`, which are namespaced using each route variant id. So, logs or alerts from each different route variant can be easily identified.

#### `middleware(req, res, next)`

This is the middleware that will be called when the route is requested.

#### `get preview()`

This getter has to return a plain object containing an approached preview of the response that will be sent when the route variant is used. This is useful to provide information to other plugins or Mocks Server integration tools. If you have not enough information to predict the response (as in the case of the `middleware` handler, for example), then you should return `null`.

## Example

In the next example we are going to see how to create a custom Variant Handler that would receive `code` and `message` options. It would send an HTTP error response based on those options whenever the route is executed. 

```js
class ErrorResponseHandler {
  static get id() {
    return "error";
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

  constructor(options, core) {
    this._code = options.code;
    this._message = options.message;
    this._core = core;
  }

  middleware(req, res, next) {
    // Next log automatically includes the route variant id
    this._core.logger.info("Sending error response");
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

module.exports = ErrorResponseHandler;
```

Once created, you could register your new Variant Handler using the configuration file:

```javascript
// mocks.config.js

const ErrorResponseHandler = require("./ErrorResponseHandler");

module.exports = {
  routes: {
    variantHandlers: {
      // highlight-next-line
      register: [ErrorResponseHandler],
    },
  },
  server: {
    port: 3100,
  },
};
```

:::info
You can also add Route Handlers programmatically using the [`core.routes.registerHandler` method](api/core.md)
:::

And then, you could use the new variant type when defining route variants:

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
        // highlight-start
        handler: "error", // id of the handler to be used
        options: { // options that the handler will receive
          code: 400,
          message: "Error message",
        },
        // highlight-end
      }
      {
        id: "empty",
        handler: "json", // This one will use the "json" handler
        options: {
          status: 200,
          body: []
        }
      },
    ]
  }
]
```

