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
---

## Intro

* A __route__ defines the handler for an specific request and the response to be sent.
* Routes can contain many __variants__, which are different responses for the same route.
* Routes must be defined in the `mocks/routes` folder of your project. Every file in that folder should export an array of routes, so you can organize them at your convenience.

## API

The standard format for defining a route is to declare an object containing:

* __`id`__ _(String)_: Used as a reference for grouping routes in different "mocks", etc.
* __`url`__ _(String|Regexp)_: Path of the route. Mocks Server uses `express` under the hood, so [you can read its docs](https://expressjs.com/en/guide/routing.html) or the [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) documentation for further info about how to use routing.
* __`method`__ _(String)_: Method of the request. Defines the HTTP method to which the route will response. Valid values are http request methods, such as "GET", "POST", "PUT", etc.
* __`delay`__ Miliseconds of delay for all variants of this route. This option will overwrite the value of the `delay` global setting. It can be overwritten by the `delay` defined in variant.
* __`variants`__ _(Array)_: of variants containing:
  * __`id`__ _(String)_: Id of the route variant. Used afterwards in combination with the route id to define which variants has to use an specific mock.
  * __`handler`__ _(String)_: Id of the handler to use for the variant (default is the built-in one).
  * __`delay`__ _(Number)_: Miliseconds of delay for this variant. It would overwrite the route `delay` if it were defined and the `delay` global setting.
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
