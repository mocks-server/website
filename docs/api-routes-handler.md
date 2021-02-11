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

#### `constructor(route, mocksServer)`

* `route`: All route and route variants properties from the `route` definition _(`method`, `url`, `variantId`, and all other properties defined in the route variant object)_.
* `mocksServer`: The [`mocksServer` instance](api-mocks-server-api.md).

#### `middleware(req, res, next)`

This is the middleware that will be called when the route url matches and the specific variant should be used.

#### `get plainResponsePreview()`

This getter should return a plain object containing an approached preview of the response that will be sent when the route variant is used. This is useful to provide information to other plugins or Mocks Server interfaces.

## Example

Here you have an example of how a custom Routes Handler should be defined:

```javascript
// ./CustomRoutesHandler.js

class CustomRoutesHandler {
  static get id() {
    return "custom";
  }

  constructor(route, mocksServer) {
    this._response = route.response;
    this._variantId = route.variantId;
    this._mocksServer = mocksServer;
  }

  middleware(req, res, next) {
    this._mocksServer.tracer.info(`Sending route variant "${this._variantId}"`);
    res.status(this._response.status);
    res.send(this._response.body);
  }

  get plainResponsePreview() {
    return {
      body: this._response.body,
      status: this._response.status,
    };
  }
}

module.exports = CustomRoutesHandler;
```

Then you could add your custom Routes Handler using the `mocks.config.js` file:

```javascript
// mocks.config.js

const CustomRoutesHandler = require("./CustomRoutesHandler");

module.exports = {
  addRoutesHandlers: [CustomRoutesHandler],
  options: {
    port: 3100,
    mock: "base",
    cli: true
  }
};
```

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
        id: "empty",
        handler: "custom", // id of the handler to be used
        response: {
          status: 200,
          body: []
        }
      },
      {
        id: "error", 
        response: {
          status: 400,
          body: {
            message: "Error"
          }
        }
      }
    ]
  }
]
```
