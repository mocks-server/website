---
id: static
title: Static variants
description: Mocks Server route variants of type static
keywords:
  - mocks server
  - mock server
  - nodejs
  - variants
  - variant
  - type
  - handler
  - static
  - html
  - css
  - image
  - usage
  - examples
---

Variants of type `static` define a folder from which to serve static assets.

## Options

The `options` property in a variant of type `static` must be an object containing next properties:

* __`path`__ _(String)_: Path to the folder to be served. __It can be a relative path from `process.cwd`, or an absolute path__.
* __`headers`__ _(Object)_: Object containing headers to set in the response of all static assets. Optional.
* __`options`__ _(Object)_: Object containing any of the available [`express.static` method options](https://expressjs.com/en/4x/api.html#express.static). Some of them are:
  * __`index`__ _(Boolean|String)_: Sends the specified directory index file. Set to false to disable directory indexing.
  * __`maxAge`__ _(Number)_ : Set the max-age property of the Cache-Control header in milliseconds or a string in ms format.
  * __`redirect`__ _(Boolean)_ : Redirect to trailing `/` when the `pathname` is a directory.
  * __`...`__ : Any of the other options supported by the [`express.static` method](https://expressjs.com/en/4x/api.html#express.static).

For example, use the following route to serve HTML files, images, CSS files, and JavaScript files in a directory named `public` in the `mocks` folder:

```js
module.exports = [
  {
    id: "public",
    url: "/web",
    variants: [
      {
        id: "available",
        // highlight-start
        type: "static",
        options: {
          path: "mocks/public", // path of the folder to be served
          headers: { // response headers to send in every asset request
            "x-custom-header": "foo-header-value",
          },
          options: { // options for the express.static method
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
Yo can still use the variant `delay` option in variants of type `static`. So, you can simulate static assets being served slowly.
:::

## Route method

Note that the static assets Variant Handler is implemented using an [Express router](https://expressjs.com/en/4x/api.html#router) instead of an [Express middleware](https://expressjs.com/en/guide/using-middleware.html), so, it has no sense to define the `method` in a route which will contain only variants of type `static`. When defined, if the current variant is of type `static` the route method will be ignored and the router will handle all HTTP methods (until you have defined a previous route handling some specific methods of the same url). For further info about the internal details, read the [Variant Handlers development chapter](../../variant-handlers/development.md).

:::info
When the variant is of type `static`, the route method will be ignored and it will handle all HTTP methods.
:::

## Examples

### Slow assets

You can still use the `delay` property of [routes](../routes.md/#format) and [variants](../variants.md/#format) to simulate that your static assets are server slowly.

```js
module.exports = [
  {
    id: "public",
    url: "/web",
    variants: [
      {
        id: "available",
        type: "static",
        options: {
          path: "mocks/public",
        },
      },
      {
        // highlight-start
        id: "slow",
        delay: 1000,
        // highlight-end
        type: "static",
        options: {
          path: "mocks/public",
        },
        
      }
    ]
  }
];
```

:::info
Using the [global `delay` setting](../../configuration/options.md) will also affect to static variants.
:::

### Simulating errors on requests to assets

Using multiple routes, it is possible to serve static assets and still simulate some errors on requests to some of them (or all of them).

In the next example, you can see that there is a route handling the requests to the `/web/intro.html` url with two variants: The first one is disabled, and the second one returns a JSON error. After this route, there is another one serving all static files in the `mocks/public` folder under the `/web` url.

```js
module.exports = [
  {
    id: "web-intro",
    url: "/web/intro.html",
    variants: [
      {
        id: "disabled",
        // highlight-start
        disabled: true, // Disables the route
        // highlight-end
      },
      {
        id: "error",
        // highlight-start
        type: "json", // Sends a JSON response
        options: {
          status: 500,
          body: {
            message: "There was an error",
          },
        },
        // highlight-end
      },
    ]
  },
  {
    id: "web",
    url: "/web",
    variants: [
      {
        id: "available",
        // highlight-start
        type: "static", // Static variant
        options: {
          path: "mocks/public", // Path of the folder to be served
        },
        // highlight-end
      }
    ]
  }
];
```

Then, in the `collections.json` file, two collections are created: The first one disables the first route, and the second one uses the variant producing the error.

```js
module.exports = [
  {
    id: "web-success",
    routes: ["web-intro:disabled", "web:available"]
  },
  {
    id: "web-partial-error",
    from: "web-success",
    routes: ["web-intro:error"]
  },
];
```

So, when the first collection is selected, the first route is ignored because its current variant is disabled, and all static assets are served. But when the second collection is selected, the route handling the `/web/intro.html` route is enabled and returns an error, so that specific route returns an error, but all of the rest of static assets are served normally.

```js
await core.mock.collections.select("web-success"); // All static assets are served

await core.mock.collections.select("web-partial-error"); // Only `/web/intro.html` returns an error
```

:::tip
You can also simulate errors on groups of static assets or even all assets using this same example, but changing the `url` of the `web-intro` route. For example, changing it to `/web/**` would produce all routes to return the error response, and changing it to `/web/img/**` would produce to return an error on requesting any asset in the `img` subfolder.
:::
