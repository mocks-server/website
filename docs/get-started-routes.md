---
id: get-started-routes
title: Routes
description: What is a Mocks Server route, and how it should be defined
keywords:
  - mocks server
  - routes
  - route variants
  - variants
  - first steps
  - intro
  - get started
  - cors
  - http methods
---

## Intro

* A __route__ defines the handler for an specific __request__ _(url and method)_ and the response to be sent.
* Routes can contain many __variants__, which are different responses for the same route.
* Routes must be defined in the `mocks/routes` folder of your project. You can [organize files inside that folder at your convenience](guides-organizing-files.md), even creating subfolders, the only rule is that every file should export an array of routes.

## API

The standard format for defining a route is to declare an object containing:

* __`id`__ _(String)_: Used as a reference for grouping routes in different "mocks", etc.
* __`url`__ _(String|Regexp)_: Path of the route. Mocks Server uses `express` under the hood, so [you can read its docs](https://expressjs.com/en/guide/routing.html) or the [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) documentation for further info about how to use routing.
* __`method`__ _(String|Array)_: Method of the request. Defines the HTTP method to which the route will response. It can be also defined as an array of methods, then the route will response to all of them. Valid values are next HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `TRACE` or `OPTIONS` _([usage of the `OPTIONS` method requires some additional configuration](#how-to-use-the-options-method))_.
* __`delay`__ _(Number)_: Milliseconds of delay for all variants of this route. This option will override the value of the `delay` global setting. It can be overriden by the `delay` defined in a variant.
* __`variants`__ _(Array)_: of variants containing:
  * __`id`__ _(String)_: Id of the route variant. Used afterwards in combination with the route id to define which variants has to use an specific mock.
  * __`handler`__ _(String)_: Id of the handler to use for the variant (default is the built-in one).
  * __`delay`__ _(Number|null)_: Milliseconds of delay for this variant. It would override the route `delay` if it were defined and the `delay` global setting. If it is set to `null`, the variant will use the `delay` global setting even when the route has a delay defined.
  * __`response`__ _(Object|Function)_: Defines the response that the server will send to the request. It can be defined as a plain object, or as an `express` middleware.
    * `Object`
      * __`headers`__ _(Object)_: Object containing headers to set in the response.
      * __`status`__ _(Number)_: Status code to send.
      * __`body`__ _(Object)_: Object to send as body in the response.
    * `middleware(req, res, next, mocksServer)`
      * __`req`__ Express middleware `req` object.
      * __`res`__ Express middleware `res` methods.
      * __`next`__ Express middleware `next` method.
      * __`mocksServer`__ Mocks Server instance methods. Using this you could change the settings of the server itself from a request. [Read the API docs for further info](api-mocks-server-api.md) about available methods.

:::note
The format of variants describe here is the default one, but more formats can be added [using custom routes handlers](api-routes-handler.md).
:::

## Examples

In the next example you can see how routes are defined using `json` files:

```json
[
  {
    "id": "get-users", // id of the route
    "url": "/api/users", // url in express format
    "method": "GET", // HTTP method
    "variants": [
      {
        "id": "success", // id of the variant
        "response": {
          "status": 200, // status to send
          "body": [ // body to send
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
      {
        "id": "error", // id of the variant
        "response": {
          "status": 400, // status to send
          "body": { // body to send
            "message": "Error"
          }
        }
      }
    ]
  }
]
```

And how routes can be defined in JavaScript files, and can use an `express` middleware for handling the response:

```js
const USERS = [ // body to send
  {
    id: 1,
    name: "John Doe"
  },
  {
    id: 2,
    name: "Jane Doe"
  }
];

module.exports = [
  {
    id: "get-users", // id of the route
    url: "/api/users", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        response: {
          status: 200, // status to send
          body: USERS, // body to send
        },
      },
      {
        id: "error", // id of the variant
        response: {
          status: 400, // status to send
          body: { // body to send
            message: "Error"
          }
        }
      }
    ]
  },
  {
    id: "get-user", // id of the route
    url: "/api/users/:id", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        response: {
          status: 200, // status to send
          body: USERS[0], // body to send
        },
      },
      {
        id: "real", // id of the variant
        response: (req, res) => {
          const userId = req.params.id;
          const user = USERS.find((userData) => userData.id === Number(userId));
          if (user) {
            res.status(200);
            res.send(user);
          } else {
            res.status(404);
            res.send({
              message: "User not found",
            });
          }
        }
      }
    ]
  }
]
```

## How to change current route variant

### Adding it to a mock

Read the [next chapter to know how group different route variants into `mocks`](get-started-mocks.md), and change all of the responses of your mocked API at a time changing the current `mock`.

### Using the interactive CLI

You can define custom route variants to be used by the current mock using the interactive CLI. When you add a route variant, it is like adding it to the `mock` definition, so the route will use this variant instead of the one defined in the `mock`.

![Interactive CLI](assets/inquirer-cli.gif)

### Using the admin API REST

Make a request to the Mocks Server administration REST API:
```bash
curl -X POST -d routeVariant=get-user:real http://localhost:3100/admin/custom-route-variants
```

### Integrations

Or install by yourself and use one plugin providing integration with other tools:

* Use the [Cypress](https://www.cypress.io/) command provided by `@mocks-server/cypress-commands`:

```javascript
cy.mocksServerUseRouteVariant("get-user:real");
```

:::note
When the current mock is changed, all custom route variants defined using the methods described here will be lost. If you want to persist changes, you should define a mock as it is described in the next chapter.
:::

## How to use the OPTIONS method

The usage of the `OPTIONS` method in routes requires some additional configuration due to the built-in [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) middleware.

Mocks Server adds by default a middleware to enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) automatically in all routes. It also enables CORS pre-flight responses, so it will respond with a 204 status to all requests using the `OPTIONS` method to any route. This means that the `OPTIONS` method can't be used in `routes` until this middleware is disabled, because the built-in CORS pre-flight middleware will send the response first.

So, if you want to handle `OPTIONS` requests by yourself, you should disable the `corsPreFlight` option using the configuration file or the command line argument `--no-corsPreFlight` (read the [configuration chapter](configuration-options.md) for further info).

Mocks Server uses the [`cors` npm package](https://www.npmjs.com/package/cors) under the hood to enable CORS, so you could still enable it only for your desired routes using the same package if you disabled it globally. Read [how to add Mocks Server middlewares](guides-using-middlewares.md) for further info.

