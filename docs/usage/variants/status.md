---
id: status
title: Status variants
description: Mocks Server route variants of type Status
keywords:
  - mocks server
  - mock server
  - nodejs
  - variants
  - variant
  - type
  - handler
  - status
  - usage
  - examples
  - empty body
---

Variants of type `status` define status code to be sent without body when a route is requested.

## Options

The `options` property in a variant of type `status` must be an object containing next properties:

* __`status`__ _(Number)_: Status code to send.
* __`headers`__ _(Object)_: Object containing headers to set in the response. Optional.

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    method: "GET",
    variants: [
      {
        id: "success",
        type: "status", // variant of type status
        // highlight-start
        options: {
          status: 200, // status to send
          headers: { // response headers to send
            "x-custom-header": "foo-header-value",
          }
        },
        // highlight-end
      }
    ]
  }
];
```

:::info
A response defined with the `status` Variant Handler will always have an empty body.
:::

## Response headers

By default, the `status` variant type sets a `Content-Length` header in the response with value `0`, but it can be changed using the headers option.
