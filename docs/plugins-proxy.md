---
id: plugins-proxy
title: Proxy
description: Plugin that allows to proxy requests to another host and pass response back
keywords:
  - mocks server
  - configuration
  - administration
  - plugin
  - proxy
  - host
  - route handler
  - options
---

## plugin-proxy

__The main distribution includes the [plugin-proxy plugin](https://www.npmjs.com/package/@mocks-server/plugin-proxy) preinstalled__. It provides a `proxy-v4` [route handler](api-routes-handler.md) that proxy requests to another host and pass response back.

This is __very useful when developing integration tests__, for example, because you can redirect requests to the original host and modify its responses. So, you can start developing integration tests before the real API is modified according to the new contract.

## Options

The `proxy-v4` route handler uses the [express-http-proxy](https://github.com/villadora/express-http-proxy) package under the hood, and supports all of its options.

When using the `proxy-v4` handler, you can define next properties in the `response` property of a route variant:

* __`host`__ _(String|Function)_: The proxy host. Equivalent to the [`express-http-proxy` `host` option](https://github.com/villadora/express-http-proxy#host), so it can also be a function.
* __`options`__ _(Object)_: Object containing any of the [options supported by the `express-http-proxy` package](https://github.com/villadora/express-http-proxy#options). Some of them are:
  * __`filter`__ _(Function)_: [`filter` option](https://github.com/villadora/express-http-proxy#filter-supports-promises) for `express-http-proxy`.
  * __`userResDecorator`__ _(Function)_: [`userResDecorator` option](https://github.com/villadora/express-http-proxy#userresdecorator-was-intercept-supports-promise) for `express-http-proxy`.
  * __...__ all other [`express-http-proxy` options](https://github.com/villadora/express-http-proxy#options) are also supported.

> Tip: Note that the `delay` option of the route variant is still valid, so you can use it to simulate that host responses are slow.

## Usage

Read the [proxy route variants guide](guides-proxy-route-variants.md) to get some suggestions about how to use it.

This example will proxy the requests to `/api/users/:id` to a theoretical API in `http://127.0.0.1:8080/api/users/:id`, and it will add the "Modified " prefix to all user names:

```js
module.exports = [
  {
    id: "get-user",
    url: "/api/users/:id",
    method: "GET"],
    variants: [
      {
        id: "real-api",
        handler: "proxy-v4",
        response: {
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
