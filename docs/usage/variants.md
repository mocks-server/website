---
id: variants
title: Variants
description: Mocks Server route variants
keywords:
  - mocks server
  - mock server
  - nodejs
  - variants
  - variant
  - usage
  - concept
  - feature
  - get started
  - first steps
  - introduction
  - description
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocsImage from '@site/src/components/DocsImage';
import RoutesVariants from '../assets/routes-variants.png';
```

## Description

* Each route may contain many different variants. Each variant usually defines the response to be sent when the route is requested, and the user can choose which variant has to be used by each route on each particular moment.
* Depending on the variant type, variants can be defined in many ways, from [plain objects](./variants/json.md) to [plain text](./variants/text.md) or even [Express middlewares](./variants/middleware.md), and they act in different ways also, from sending a response to [proxy the request to another host](./variants/proxy.md).

:::info
The user can decide which variant is used on each particular moment, and he can also create [collections](./collections.md) defining the variant used by each different route. So, creating different collections you can store different API states and reuse them for running tests, etc.
:::

```mdx-code-block
<DocsImage src={RoutesVariants} alt="Routes and variants" />
```

## Format

Variants must be defined in the [`variants` property of the routes](./routes.md). Each variant must be defined as an object containing:

* __`id`__ _(String)_: Id of the variant. It is used in combination with the route id to define which variants has to use an specific collection, for example.
* __`delay`__ _(Number|null)_: Milliseconds of delay for this variant. It would override the route `delay` if it was defined and the `mock.routes.delay` global setting. If it is set to `null`, the variant will use the `mock.routes.delay` global setting even when the route has a delay defined.
* __`type`__ _(String)_: Id of the Variant Handler that will handle the request. In the "main" distribution of Mocks Server, it can be one of [`json`](./variants/json.md), [`middleware`](./variants/middleware.md) or [`proxy`](./variants/proxy.md).
* __`options`__ _(Object)_: Options for the Variant Handler. So, depending on the value of the `type` property, the `options` property may have a different format.
* __`disabled`__ _(Boolean)_: When it is `true` and the variant is used, the route is ignored. It is useful for disabling routes in some collections to let other routes handle the request, or for disabling middlewares in some scenarios, for example.

## Types

The value of the `type` property in a variant defines the Variant Handler that will handle a request. The `@mocks-server/main` package includes multiple variant handlers. The Variant Handler receives the `options` property from the variant, so, each different variant type requires a different format in the `options` object.

In the next chapters we will see in detail how to use each different variant type. For the moment, here you have a brief description of each type:

* __[`json`](./variants/json.md)__: Defines the JSON body and the status code to be sent when the route is requested.
* __[`text`](./variants/text.md)__: Defines the text body and the status code to be sent when the route is requested.
* __[`status`](./variants/status.md)__: Defines a status code to be sent without body when the route is requested. 
* __[`middleware`](./variants/middleware.md)__: Defines an [Express middleware](https://expressjs.com/en/guide/using-middleware.html) to be executed when the request is received. It is completely on your hand to send a response, or to pass the request to the next route, etc.
* __[`static`](./variants/static.md)__: Defines a folder from which to serve static assets.
* __[`file`](./variants/file.md)__: Defines a file to transfer when the route is requested.
* __[`proxy`](./variants/proxy.md)__: Defines a host to proxy the request when it is received. You can modify the request and/or the response also.

```mdx-code-block
<Tabs>
<TabItem value="json">
```

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      // highlight-start
      {
        id: "success", // id of the variant
        delay: 1000, // delay of the variant
        type: "json", // variant type
        options: { // options for the variant type handler
          status: 200, // status to send
          body: [ // body to send
            {
              id: 1,
              name: "John Doe"
            },
            {
              id: 2,
              name: "Jane Doe"
            }
          ]
        },
      }
      // highlight-end
    ]
  }
];
```

```mdx-code-block
</TabItem>
<TabItem value="text">
```

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      // highlight-start
      {
        id: "error",
        type: "text", // variant of type text
        options: {
          status: 403, // status to send
          body: "An error ocurred"
        },
      }
      // highlight-end
    ]
  }
];
```

```mdx-code-block
</TabItem>
<TabItem value="status">
```

```js
module.exports = [
  {
    id: "create-user",
    url: "/api/users",
    method: "POST",
    variants: [
      // highlight-start
      {
        id: "success",
        type: "status", // variant of type status
        options: {
          status: 201, // status to send
        },
      }
      // highlight-end
    ]
  }
];
```

```mdx-code-block
</TabItem>
<TabItem value="middleware">
```

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      // highlight-start
      {
        id: "success", // id of the variant
        delay: 1000, // delay of the variant
        type: "middleware", // variant type
        options: { // options for the variant type handler
          middleware: (req, res) => { // middleware to use
            res.status(200);
            res.send([
              {
                id: 1,
                name: "John Doe"
              },
              {
                id: 2,
                name: "Jane Doe"
              }
            ]);
          },
        },
      }
      // highlight-end
    ]
  }
];
```

```mdx-code-block
</TabItem>
<TabItem value="static">
```

```js
module.exports = [
  {
    id: "public",
    url: "/web",
    variants: [
      // highlight-start
      {
        id: "available",
        type: "static",
        options: {
          path: "mocks/public", // path of the folder to be served
        },
      }
      // highlight-end
    ]
  }
];
```

```mdx-code-block
</TabItem>
<TabItem value="file">
```

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    variants: [
      // highlight-start
      {
        id: "success",
        type: "file",
        options: {
          status: 200, // Status to be sent
          path: "mocks/files/users.json", // path of the file to be transferred
        },
      }
      // highlight-end
    ]
  }
];
```

```mdx-code-block
</TabItem>
<TabItem value="proxy">
```

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      // highlight-start
      {
        id: "from-real-api", // id of the variant
        delay: 1000, // delay of the variant
        type: "proxy-v4", // variant type
        options: { // options for the variant type handler
          host: "http://127.0.0.1:8080", // proxy host
        },
      }
      // highlight-end
    ]
  }
];
```

```mdx-code-block
</TabItem>
</Tabs>
```

:::tip
Read the next chapters to learn how to define each different variant type: [`json`](./variants/json.md), [`text`](./variants/text.md), [`status`](./variants/status.md), [`middleware`](./variants/middleware.md), [`static`](./variants/static.md), [`file`](./variants/file.md) or [`proxy`](./variants/proxy.md)
:::

### Custom types

Custom variant type handlers can be created and added to Mocks Server, so, you can define your own formats for defining routes, or even add new features to the server using them.

:::tip
Read the [`customization/Variant Handlers`](../variant-handlers/intro.md) chapter for further info about how to add new variant types.
:::