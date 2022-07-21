---
id: middleware
title: Middleware variants
description: Mocks Server route variants of type Middleware
keywords:
  - mocks server
  - mock server
  - nodejs
  - variants
  - variant
  - type
  - handler
  - middleware
  - usage
  - examples
---

Variants of type `middleware` define an [Express middleware](https://expressjs.com/en/guide/using-middleware.html) to be executed when the request is received. It is completely on your hand to send a response, or to pass the request to the next middleware, etc.

## Options

The `options` property in a variant of type `middleware` must be an object containing next properties:

* __`middleware`__ _(Function)_: [Express middleware](https://expressjs.com/en/guide/using-middleware.html). It also receives an extra parameter containing the whole [Mocks Server core instance](../../api/javascript.md) allowing to interact with the server.

```js
const { allUsers } = require("../fixtures/users");

module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "all-users",
        type: "middleware", // variant of type "middleware"
        // highlight-start
        options: {
          middleware: (req, res, next, core) => { // middleware to use
            core.logger.info("Request received!");
            res.status(200);
            res.send(allUsers);
          },
        },
        // highlight-end
      }
    ]
  }
];
```

## Middleware API

The `middleware` function defined in a variant of type `middleware` receives next arguments when the request is executed:

* `middleware(req, res, next, core)`:
  * __`req`__ Express middleware `req` object.
  * __`res`__ Express middleware `res` object.
  * __`next`__ Express middleware `next` object.
  * __`core`__ Mocks Server `core` API, enabling you to tap into, modify, or extend its internal behavior. Read [core API](../../api/javascript.md) for further info.

:::tip
Read the [Express middleware docs](https://expressjs.com/en/guide/using-middleware.html) for further info about using middlewares.
:::

## Some use cases

Middlewares may be used for several purposes, as persisting data modifications, filtering data from fixtures, adding common headers to all of the routes, logging data from requests, etc.

Here we are going to give some examples, but they __enable to do almost anything that can be done using Express, and they also enable to use the Mocks Server JavaScript API when a request is received__, so the possibilities are huge.

:::caution
Some of these examples show how to do things that usually shouldn't be done, because the mock should be maintained as simple as possible. For example, persisting data modifications in the server could be considered a bad practice, but for some special cases maybe you need to do it, so let's see how to achieve it.
:::

### Filtering data

Middlewares can be used to get information from the request parameters and filter the response data in consequence. Suppose that you have defined an `users.js` file that contains a collection of users fixtures. Then you can create an `/api/users` route returning all of your users, and a `/api/users/:id` returning always the same user. If this is not enough and you need your mock to return a different user depending on the received id, you don't have to create a different route for each user. You can use a middleware searching for the desired user and returning it.

```js
const { allUsers } = require("../fixtures/users");

module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "all-users",
        type: "json", // variant of type "json".
        options: {
          status: 200,
          body: allUsers // Send all users
        },
      }
    ]
  },
  {
    id: "get-user",
    url: "/api/users/:id",
    method: "GET",
    variants: [
      {
        id: "real-user",
        type: "middleware", // variant of type "middleware"
        options: {
          // highlight-start
          middleware: (req, res) => { // Search for the user and return it
            const user = allUsers.find((user) => user.id === req.params.id);
            if (user) {
              res.status(200);
              res.send(user);
            } else {
              res.status(404);
              res.send();
            }
          },
          // highlight-end
        },
      }
    ]
  }
];
```

### Changing the current collection

Now, based on the previous example, suppose that you also have a DELETE `/api/users/:id` route, and you want the GET `api/users/:id` to return a 404 status code after the first one is requested. Suppose also that you have a `user-deleted` collection returning a 404 status code whenever GET `api/users/:id` is requested. Then, you could use the core API to change the current collection once DELETE `/api/users/:id` is requested:

```js
const { allUsers } = require("../fixtures/users");

module.exports = [
  {
    id: "delete-user",
    url: "/api/users/:id",
    method: "DELETE",
    variants: [
      {
        id: "change-collection",
        type: "middleware", // variant of type "middleware"
        options: {
          // highlight-start
          middleware: (req, res, next, core) => { // Search for the user and return it
            res.status(204);
            res.send();
            core.mock.collections.select("user-deleted");
          },
          // highlight-end
        },
      }
    ]
  }
];
```

### Persisting data modifications

Based on the previous example, we could go a step further and remove the user that is being deleted from the users fixtures, so next requests won't return it. Take into account that the modifications made to any JavaScript object in the `routes` folder will be kept in memory, so you could take advantage of this to persist some data modifications while the server is running _(note that modifications will be lost when the files are modified and reloaded, for example)._

```js
const { allUsers } = require("../fixtures/users");

module.exports = [
  {
    id: "delete-user",
    url: "/api/users/:id",
    method: "DELETE",
    variants: [
      {
        id: "delete-user",
        type: "middleware", // variant of type "middleware"
        options: {
          // highlight-start
          middleware: (req, res, next, core) => { // Search for the user and remove it
            const userIndex = allUsers.findIndex((user) => user.id === req.params.id);
            if (userIndex >= 0) {
              allUsers.splice(userIndex, 1);
              res.status(204);
              res.send();
            } else {
              res.status(404);
              res.send();
            }
          },
          // highlight-end
        },
      }
    ]
  }
];
```

### Adding common headers to all responses

Middlewares can be used also to modify the response object, and let another route to definitively send it. So, based on this feature, we could add some headers to all API responses without the need to define them in all of our routes.

```js
// mocks/routes/middlewares.js

module.exports = [
  {
    id: "add-headers",
    url: "*",
    method: ["GET", "POST", "PUT", "PATCH"],
    variants: [
      {
        id: "add-x-custom-header",
        type: "middleware",
        options: {
          // highlight-start
          middleware: (req, res, next) => {
            res.set('x-custom-header', 'custom header value'); // Set response header
            next(); // Let other routes to be processed
          },
          // highlight-end
        },
      },
    ]
  }  
];
```

:::caution
In order to make it work, you should add this route to your collection before any other route, because it must be processed the first. Read more about how to define collections in the [collections](../collections.md) chapter.
:::