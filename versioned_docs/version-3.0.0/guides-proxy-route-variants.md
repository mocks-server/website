---
id: guides-proxy-route-variants
title: Proxy route variants
description: How to use Mocks Server proxy route variants
keywords:
  - mocks server
  - tutorial
  - guidelines
  - good practices
  - proxy
  - host
  - redirect
  - intercept
  - data
---

## Preface

Mocks Server supports defining custom [_Routes Handlers_](api-routes-handler.md) for route variants. One of the _Route Handlers_ included in the main distribution is [the `Proxy` one](plugins-proxy.md), which allows to proxy requests to another host and pass response back, and even modify the request or response data.

In this chapter we are going to see some examples of how _proxy route variants_ can be used.

## Options

Read the [Proxy plugin docs](plugins-proxy.md) to know more about all available options of the `Proxy routes handler`.

## Examples

### Proxy requests of one route

The `url` and `method` properties of a route can be very specific, so you can proxy only specific routes or methods to different hosts. In the next example, only `GET` request to the `/api/users` route will be proxied to `http://127.0.0.1:8080/api/users`, and only if the `users:real-api` route variant is enabled.

```js
module.exports = [
  {
    id: "users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "one",
        response: {
          status: 200,
          body: [ // body to send
            {
              "id": 1,
              "name": "John Doe"
            },
          ]
        }
      },
      {
        id: "real-api",
        handler: "proxy", // This route variant will use the "proxy" handler
        host: "http://127.0.0.1:8080", // proxy host
      },
    ],
  },
];
```

### Proxy all requests

Use the `*` wildcard in the `url` property and define all methods to proxy every request.

```js
module.exports = [
  {
    id: "proxy-all", // Proxy all requests
    url: "*",
    method: ["GET", "POST", "PATCH", "PUT"],
    variants: [
      {
        id: "real-api",
        handler: "proxy", // This route variant will use the "proxy" handler
        host: "http://127.0.0.1:8080", // proxy host
      },
      {
        id: "disabled", // This middleware does nothing, so we can easily disable the proxy and let other routes to handle the request
        response: (req, res, next) => next(), 
      },
    ],
  },
  {
    id: "get-users",
    url: "/api/users", // Handle GET requests to "/api/users"
    method: "GET",
    variants: [
      {
        id: "one",
        response: {
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
];
```

:::info
Note that __the order in which the _routes_ are added to a _mock_ matters__, so, if you add this route at the beginning of a mock, every request will be proxied, but if you add it to the end of the mock, only requests not matching with other routes will be proxied:
:::

```json
// mocks/mocks.json
// The "proxy-all:real-api" route variant is loaded first
[
  {
    "id": "base", //id of the mock
    "routesVariants": ["proxy-all:real-api", "get-users:one"] //routes variants to use
  },
]
```

> In this example, the `get-users:one` route variant will never be used, as the `proxy-all` route matches every route. Everything will be proxied by default. That's why the example contains a `disabled` middleware variant that does nothing, so we can easily disable the proxy and let other routes to handle the request using the `proxy-all:disabled` route variant.

### Proxy as a fallback

```json
// mocks/mocks.json
// The "proxy-all:real-api" route variant is loaded the last
[
  {
    "id": "base", //id of the mock
    "routesVariants": ["get-users:one", "proxy-all:real-api"] //routes variants to use
  },
]
```

> In this example, every request except the `/api/users` one will be proxied to `http://127.0.0.1:8080`

### Using the `filter` option

Maybe you want to proxy only some requests based in other criteria apart of the `url`. You can use the `filter` option to disable the handler when you want. When disabled, the route acts as a middleware, so next routes matching the `url` and `method` criteria will handle the route. Return `true` to keep the route variant enabled, or `false-y` to disable it.

_Read the [express-http-proxy](https://github.com/villadora/express-http-proxy) package documentation to know more about the `filter` option._

```js
module.exports = [
  {
    id: "proxy-all",
    url: "*",
    method: ["GET", "POST", "PATCH", "PUT"],
    variants: [
      {
        id: "real-api",
        handler: "proxy",
        host: "http://127.0.0.1:8080",
        options: {
          filter: function(req, res) {
            return req.method === "GET" && req.url.includes("users/") && req.params.id === "2";
          },
        },
      },
    ],
  },
];
```

> This example could also be achieved adding a `GET` route with url `/users/2` before the `proxy-all` one, so it would handle the request. Depending of your requirements, it is in your hand to decide whether to use `filter`, the order of route variants, or a combination of all of them.

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
        id: "real-api",
        handler: "proxy",
        host: "http://127.0.0.1:8080",
        options: {
          userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
            data = JSON.parse(proxyResData.toString('utf8'));
            data.name = `Modified ${data.name}`;
            return JSON.stringify(data);
          }
        },
      },
    ],
  },
];
```
> This example will proxy the requests to `/api/users/:id`, and it will add the "Modified " prefix to all user names.

### Modifying the request

You can use the [express-http-proxy](https://github.com/villadora/express-http-proxy) `proxyReqOptDecorator` option to intercept the request before it is sent to the host and modify it:

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
          proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
            // you can update headers
            proxyReqOpts.headers['Content-Type'] = 'text/html';
            // you can change the method
            proxyReqOpts.method = 'GET';
            return proxyReqOpts;
          }
        },
      },
    ],
  },
];
```
> Note: The `req.path` cannot be changed via this method; use the `proxyReqPathResolver` instead. Read the [express-http-proxy docs to check all available options](https://github.com/villadora/express-http-proxy).
