---
id: proxy
title: Proxy variants
description: Mocks Server route variants of type Proxy
keywords:
  - mocks server
  - mock server
  - nodejs
  - variants
  - variant
  - type
  - handler
  - proxy
  - request
  - host
  - redirect
  - intercept
  - usage
  - examples
---

Variants of type `proxy` allow to proxy the request to another host and pass response back. They also make able to modify the request before sending it to the other host, or to modify the response before sending it to the client.

## Options

The `options` property in a variant of type `proxy` must be an object containing next properties:

* __`host`__ _(String|Function)_: The proxy host. Equivalent to the [`express-http-proxy` `host` option](https://github.com/villadora/express-http-proxy#host), so it can also be a function.
* __`options`__ _(Object)_: Object containing any of the [options supported by the `express-http-proxy` package](https://github.com/villadora/express-http-proxy#options). Some of them are:
  * __`filter`__ _(Function)_: [`filter` option](https://github.com/villadora/express-http-proxy#filter-supports-promises) for `express-http-proxy`.
  * __`userResDecorator`__ _(Function)_: [`userResDecorator` option](https://github.com/villadora/express-http-proxy#userresdecorator-was-intercept-supports-promise) for `express-http-proxy`.
  * __...__ all other [`express-http-proxy` options](https://github.com/villadora/express-http-proxy#options) are also supported.

:::info 
A variant of type `proxy` uses the [express-http-proxy](https://github.com/villadora/express-http-proxy) package under the hood, and it supports all of its options.
:::

## Examples

Here you have some examples in which the usage of the `proxy` variant type might be useful.

### Proxy requests of one route

The next example shows how to proxy GET requests to the `/api/users` url to `http://127.0.0.1:8080/api/users`

```js
module.exports = [
  {
    id: "users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "real-api",
        type: "proxy", // Variant of type "proxy"
        options: {
          host: "http://127.0.0.1:8080", // proxy host
        },
      },
    ],
  },
];
```

### Proxy all requests with a delay

You could use a proxy variant to proxy a whole API path (or even the whole API) to a host, and set a delay time for the responses. So you can slow down the real API responses:

```js
module.exports = [
  {
    id: "books",
    url: "/api/books/*",
    delay: 1000, // Delay
    method: "GET",
    variants: [
      {
        id: "proxied",
        type: "proxy", // Variant of type "proxy"
        options: {
          host: "http://127.0.0.1:8080", // proxy host
        },
      },
    ],
  },
];
```

### Proxy as a fallback

Adding a route  to the end of a collection would produce the route being used if no other previous route matches the url and method. So, you could simulate only some routes and add a  fallback to the real API for the routes that were not specifically defined.


```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users", // Handle GET requests to "/api/users"
    method: "GET",
    variants: [
      {
        id: "one",
        type: "json",
        options: {
          status: 200,
          body: [ // body to send
            {
              "id": 1,
              "name": "John Doe"
            },
          ]
        }
      },
    ],
  },
  {
    id: "proxy-all", // Proxy all requests
    url: "*",
    method: ["GET", "POST", "PATCH", "PUT"],
    variants: [
      {
        id: "real-api",
        type: "proxy", // This route variant will use the "proxy" handler
        options: {
          host: "http://127.0.0.1:8080", // proxy host
        },
      },
    ],
  },
];
```

Now you should define the collection as in:

```json
[
  {
    "id": "proxy-fallback",
    "routes": ["get-users:one", "proxy-all:real-api"]
  },
]
```

:::note
In this example, every request except the `/api/users` one will be proxied to `http://127.0.0.1:8080`
:::

:::tip
For further information about how to define collections, please [read the collections chapter](usage/collections.md).
:::

### Modifying the host response

You can use the [express-http-proxy](https://github.com/villadora/express-http-proxy) `userResDecorator` option to intercept the response from the host and modify it:

```js
module.exports = [
  {
    id: "get-user",
    url: "/api/users/:id",
    method: "GET"],
    variants: [
      {
        id: "add-prefix",
        type: "proxy",
        options: {
          host: "http://127.0.0.1:8080",
          options: {
            userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
              data = JSON.parse(proxyResData.toString('utf8'));
              data.name = `Modified ${data.name}`;
              return JSON.stringify(data);
            }
          },
        },
      },
    ],
  },
];
```

:::note 
This example will proxy the requests to `/api/users/:id`, and it will add the "Modified " prefix to the user name.
:::

### Modifying the request

You can use the [express-http-proxy](https://github.com/villadora/express-http-proxy) `proxyReqOptDecorator` option to intercept the request before it is sent to the host and modify it:

```js
module.exports = [
  {
    id: "get-user",
    url: "/api/users/:id",
    method: "GET",
    variants: [
      {
        id: "real-api",
        type: "proxy",
        response: {
          host: "http://127.0.0.1:8080",
          options: {
            proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
              // you can update headers
              proxyReqOpts.headers['Content-Type'] = 'text/html';
              // you can change the method
              proxyReqOpts.method = 'GET';
              return proxyReqOpts;
            }
          },
        },
      },
    ],
  },
];
```

:::note
Note: The `req.path` cannot be changed via this method. Use the `proxyReqPathResolver` instead. Read the [express-http-proxy docs to check all available options](https://github.com/villadora/express-http-proxy).
:::
