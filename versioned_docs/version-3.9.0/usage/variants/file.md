---
id: file
title: File variants
description: Mocks Server route variants of type file
keywords:
  - mocks server
  - mock server
  - nodejs
  - variants
  - variant
  - type
  - handler
  - file
  - html
  - css
  - json
  - image
  - usage
  - examples
---

Variants of type `file` define a file to transfer when a route is requested. It sets the Content-Type response HTTP header field based on the filename's extension.

## Options

The `options` property in a variant of type `file` must be an object containing next properties:

* __`path`__ _(String)_: Path to the file to be sent. __It can be an absolute path, or a relative path from `process.cwd`__, unless the `root` option is set in the `options` object described bellow.
* __`headers`__ _(Object)_: Object containing headers to set in the response. Optional.
* __`options`__ _(Object)_: Object containing any of the available [`express.sendFile` method options](https://expressjs.com/es/api.html#res.sendFile). Some of them are:
  * __`root`__ _(String)_: Root directory for relative filenames. The `path` option must be relative to this path, or absolute. Default is the value of `process.cwd()`.
  * __`maxAge`__ _(Number)_ : Set the max-age property of the Cache-Control header in milliseconds or a string in ms format.
  * __`...`__ : Any of the other options supported by the [`express.sendFile` method](https://expressjs.com/es/api.html#res.sendFile).

For example, use the following route to send the content of the `users.json` file as response for the path `/api/users`:

```js
module.exports = [
  {
    id: "get-users",
    url: "/api/users",
    variants: [
      {
        id: "success",
        // highlight-start
        type: "file",
        options: {
          status: 200, // Status to be sent
          path: "mocks/files/users.json", // path of the file to be transferred
          options: { // options for the express.sendFile method
            maxAge: 500
          }
        },
        // highlight-end
      }
    ]
  }
];
```

:::tip
The Content-Type response HTTP header field is set automatically based on the filename's extension, but you can still use the `headers` option to set your own headers or override the automatic header.
:::
