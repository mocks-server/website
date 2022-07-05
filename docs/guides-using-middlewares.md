---
id: guides-using-middlewares
title: Using middlewares
description: How to use express middlewares in Mocks Server route variants
keywords:
  - mocks server
  - tutorial
  - guidelines
  - good practices
  - express
  - middlewares
  - customization
  - headers
  - dynamic
  - data
---

## Preface

The [`middleware` routes handler](get-started-routes.md) allows to define [`Express` middlewares](https://expressjs.com/en/guide/using-middleware.html). This means that you can use them for several purposes, as persisting data modifications, add common headers to all your routes, log data from all requests, etc.

In this chapter we are going to see two usual examples of how middlewares may be used, and a more advanced one, showing how the Mocks Server programmatic API can be used inside middlewares.

## Adding common headers to all requests

Your mocked API would usually add some headers to all responses, and it wouldn't be a good idea to redefine the same headers in all your Mocks Server route variants. No problem, here come the `middlewares` to the rescue.

### Creating the route

You can create a `middlewares.js` file in the `routes` folder, intended to contain this headers middleware and any other common middleware you need _(you could name the file as you want, this is only a suggestion)_.

```
routes/
├── middlewares.js
└── users.js
```

Now, let's create a [`route`](get-started-routes.md) with a wildcard url, and an array containing all methods in which the middleware should be executed. We will add also a `variant` named "enabled", containing the middleware that adds the headers, and another one name "disabled", that basically does nothing.

```js
// mocks/routes/middlewares.js

module.exports = [
  {
    id: "add-headers",
    url: "*",
    method: ["GET", "POST", "PUT", "PATCH"],
    variants: [
      {
        id: "enabled",
        handler: "middleware",
        response: {
          middleware: (req, res, next) => {
            res.set('Content-Type', 'application/json; charset=utf-8');
            next();
          },
        },
      },
      {
        id: "disabled",
        handler: "middleware",
        response: {
          middleware: (req, res, next) => next()
        },
      },
    ]
  }  
];
```

:::info
Read the [express routing docs](https://expressjs.com/en/guide/routing.html) or the [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) documentation for further info about how to use routing in the "routes" "url" property.
:::

### Using the route in mocks

Now, let's add the `add-headers` route to the `base` mock, so all others will inherit it, as they are extending from `base`:

```json
// mocks/mocks.json
[
  {
    "id": "base",
    "routesVariants": ["add-headers:enabled", "get-users:success", "get-user:success"]
  },
  {
    "id": "user-real",
    "from": "base", // this mock will also have headers enabled in all requests
    "routesVariants": ["get-user:real"]
  },
  {
    "id": "no-headers",
    "from": "base", 
    "routesVariants": ["add-headers:disabled"] // this mock will not set headers
  }
]
```

### Sorting middleware routes

As mentioned in the [`mocks` docs](get-started-mocks.md), the order matters when adding middleware route variants to `mocks`.

The order in which Mocks Server register middlewares is strictly the same in which route variants are defined in the array, so take it into account when adding your route variants middlewares.

When extending from another mock, the new route variant will replace the old one in the same position that the same route was originally defined. This means that, in the previous `mocks` example, the `no-headers` mock will keep the `add-headers` route in the first position, as it was originally defined in the `base` mock, so it will work properly.

## Persisting data modifications

This is __usually not recommended__, because doing it, you will be almost implementing a "real API", so maybe it should be better to shutdown the Mocks Server and connect the application to your real API, but for some special cases maybe you need to accomplish it. So, let's see how it can be done.

While Mocks Server is running, the modifications made to any JavaScript object in the `routes` folder will be kept in memory, so you could take advantage of this to persist some data while the server is running _(note that modifications will be lost when the files are modified and reloaded, for example)_

Example:


```js
const USERS = [ // data in memory
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
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "success",
        handler: "json",
        response: {
          status: 200,
          body: USERS,
        },
      },
    ]
  },
  {
    id: "get-user",
    url: "/api/users/:id",
    method: "GET",
    variants: [
      {
        id: "success",
        handler: "json",
        response: {
          status: 200,
          body: USERS[0],
        },
      },
    ]
  },
  {
    id: "update-user",
    url: "/api/users/:id",
    method: "PUT",
    variants: [
      {
        id: "real-modification",
        handler: "middleware",
        response: {
          middleware: (req, res, next) => {
            const userId = req.params.id;
            const user = USERS.find((userData) => userData.id === Number(userId));
            if (user) {
              user.name = req.body.name; // MODIFY THE USER IN MEMORY!!
              res.status(204).send();
            } else {
              res.status(404);
              res.send({
                message: "User not found",
              });
            }
          },
        },
      },
    ]
  }
]
```

In the example, a `PUT` request to `/api/users/1` with a `body` like `{ name: "Modified name" }` would result in consequent `GET` requests to `/api/users` or `/api/users/:id` returning the first user with name "Modified name".

## Using the Mocks Server core API in middlewares

As seen, Mocks Server route variants using the `middleware` handler will receive same arguments as `express` middlewares, but they also will receive an extra argument containing [the whole `core` API](api-mocks-server-api.md).

This means that it is possible to change the Mocks Server settings from a middleware, for example, so you could set a new global `delay` when a request is received, or change the current mock, or an specific route variant, etc.

In the next example, when requesting `/api/users` the first time, the server will return the users collection, and then it will change the `get-users` route variant to `error`, so the next time it is called it will return a 400 status code.

```js
const USERS = ;

module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "success",
        handler: "middleware",
        response: {
          middleware: (req, res, next, core) => {
            res.status(200).send([
              {
                id: 1,
                name: "John Doe"
              },
              {
                id: 2,
                name: "Jane Doe"
              }
            ]);
            // In the next request the mock will use another route variant!!
            core.mocks.useRouteVariant("get-users:error");
          },
        },
      },
      {
        id: "error",
        handler: "json",
        response: {
          status: 400,
          body: {
            message: "Error"
          }
        }
      }
    ]
  },
]
```


