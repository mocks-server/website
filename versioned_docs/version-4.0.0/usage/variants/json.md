---
id: json
title: Json variants
description: Mocks Server route variants of type JSON
keywords:
  - mocks server
  - mock server
  - nodejs
  - variants
  - variant
  - type
  - handler
  - json
  - usage
  - examples
---

Variants of type `json` define the JSON body and the status code to be sent when a route is requested.

## Options

The `options` property in a variant of type `json` must be an object containing next properties:

* __`status`__ _(Number)_: Status code to send.
* __`body`__ _(Object)_: Object to send as body of the request response.
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
        type: "json", // variant of type json
        // highlight-start
        options: {
          status: 200, // status to send
          headers: { // response headers to send
            "x-custom-header": "foo-header-value",
          },
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
        // highlight-end
      }
    ]
  }
];
```

## Response headers

By default, the `json` variant type sets a `Content-Type` header in the response with value `application/json; charset=utf-8`, but it can be changed using the headers option.
