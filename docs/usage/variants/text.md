---
id: text
title: Text variants
description: Mocks Server route variants of type Text
keywords:
  - mocks server
  - mock server
  - nodejs
  - variants
  - variant
  - type
  - handler
  - text
  - usage
  - examples
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Variants of type `text` define the text body and the status code to be sent when a route is requested.

## Options

The `options` property in a variant of type `text` must be an object containing next properties:

* __`status`__ _(Number)_: Status code to send.
* __`body`__ _(String)_: Text to send as body of the request response.
* __`headers`__ _(Object)_: Object containing headers to set in the response. Optional.

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "error",
        type: "text", // variant of type text
        // highlight-start
        options: {
          status: 403, // status to send
          headers: { // response headers to send
            "x-custom-header": "foo-header-value",
          },
          body: "An error ocurred"
        },
        // highlight-end
      }
    ]
  }
];
```

## Response headers

By defaul, the `text` variant type sets a `Content-Type` header in the response with value `text/plain; charset=utf-8`, but it can be changed using the headers option.

```mdx-code-block
<Tabs>
<TabItem value="Default headers">
```

```js
module.exports = [
  {
    id: "get-user",
    url: "/api/text",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "text", // variant of type json
        // highlight-start
        options: {
          status: 200,
          body: "Foo body"
        },
        // highlight-end
      }
    ]
  }
];
```

:::note
The response will have the `Content-Type=text/plain; charset=utf-8` header.
:::

```mdx-code-block
</TabItem>
<TabItem value="Custom headers">
```

```js
module.exports = [
  {
    id: "get-user",
    url: "/api/text",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "text", // variant of type json
        // highlight-start
        options: {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8"
          },
          body: "<div>Foo body</div>"
        },
        // highlight-end
      }
    ]
  }
];
```
:::note
The response will have the `Content-Type=text/html; charset=utf-8` header.
:::

```mdx-code-block
</TabItem>
</Tabs>
```
