---
id: using-the-options-method
title: Using the OPTIONS method
description: How to use the OPTIONS method in routes
keywords:
  - mocks server
  - mock server
  - guides
  - guidelines
  - tutorial
  - method
  - http
  - options
  - cors
---

## Preface

Due to the built-in [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) middleware, the usage of the `OPTIONS` method in [`routes`](../usage/routes.md) requires some additional configuration.

Mocks Server adds by default a middleware to enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) automatically in all routes. It also enables CORS pre-flight responses, so it will respond with a 204 status to all requests using the `OPTIONS` method to any route. This means that the `OPTIONS` method can't be used in `routes` until this middleware is disabled, because the built-in CORS pre-flight middleware would send the request response before your route is executed.

## Disabling CORS pre-flight response 

If you want to handle all `OPTIONS` requests by yourself, you can enable the `preflightContinue` option of the `cors` middleware using the configuration file:

```js
module.exports = {
  server: {
    cors: {
      options: { 
        preflightContinue: true 
      }
    }
  }
};
```

:::tip
Read the [configuration chapter](../configuration/how-to-change-settings.md) for further info.
:::

### Enabling CORS pre-flight response only for some paths

Mocks Server uses the [`cors` npm package](https://www.npmjs.com/package/cors) under the hood to enable CORS, so you could still enable it only for your desired routes using the same package even if you disabled it globally.

To do that, you should install `cors` and create a route adding the `cors` middleware to the correspondent path.

```bash
npm i --save-dev cors
```

```js
const cors = require("cors");

module.exports = [
  {
    "id": "cors",
    "url": "/api/users/*", // paths to enable cors
    "method": ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"], // HTTP methodS
    "variants": [
      // highlight-start
      {
        "id": "enabled",
        "type": "middleware",
        "options": {
          "middleware": cors(),
        }
      },
      // highlight-end
    ]
  }
];
```

Then, remember to add your route to the beginning of your "base" [collection](../usage/collections.md):

```json
[
  {
    "id": "base", // collection from which the others extend
    // highlight-next-line
    "routes": ["cors", "get-users:all", "get-user:id-1"] // add cors middleware to the beggining of the routes array
  }
]
```

:::tip
Read [how to use middleware variants](../usage/variants/middleware.md) for further info.
:::
