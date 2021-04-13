---
id: get-started-mocks
title: Mocks
description: What is a Mocks Server mock, and how it should be defined
keywords:
  - mocks server
  - mock
  - presets
  - first steps
  - intro
  - get started
---

## Intro

* A __mock__ defines a set of ["route variants"](get-started-routes.md)
* Mocks can extend from another mock, so you can "copy" an existent one, and change only one "route variant", for example.
* Mocks must be defined in the `mocks/mocks.(json|js)` file of your project _(or any other compatible extension if you are [using Babel](guides-using-babel.md))_. The file must export an array of mocks.

## API

A __mock__ is an object containing:

* __`id`__ _(String)_: Identifier for the mock.
* __`from`__ _(String)_: Optional. Mock id from which this mock extends.
* __`routesVariants`__ _(Array of Strings)_: Routes variants ids, expressed as `"[routeId]:[variantId]"`

```json
// mocks/mocks.json
[
  {
    "id": "base", //id of the mock
    "routesVariants": ["get-users:success", "get-user:success"] //route variants to use
  },
  {
    "id": "user-real", //id of the mock
    "from": "base", //inherits the route variants of "base" mock
    "routesVariants": ["get-user:real"] //get-user route uses another variant
  }
]
```

:::note
We recommend to always define a base mock containing one variant of all your routes. If you extend all other mocks from this one (or from another extending from this one), when you add new routes or middlewares, you'll only have to add them to the base mock.
:::

## Defining mocks using JavaScript

Mocks can also be defined using a JavaScript file. Simply rename the file `mocks/mocks.json` into `mocks/mocks.js` and export the mocks array:

```js
// mocks/mocks.js
module.exports = [
  {
    id: "base", //id of the mock
    routesVariants: ["get-users:success", "get-user:success"] //route variants to use
  },
  {
    id: "user-real", //id of the mock
    from: "base", //inherits the route variants of "base" mock
    routesVariants: ["get-user:real"] //get-user route uses another variant
  }
];
```

## How to change current mock

### Using command line arguments

For defining the current mock, you can use [command line arguments](configuration-command-line-arguments.md) when starting the server:

```bash
npm run mocks -- --mock=user-real
```

### Using the interactive CLI

You can also change the current mock using the interactive CLI:

![Interactive CLI](assets/inquirer-cli.gif)

### Using the admin API REST

Make a request to the Mocks Server administration REST API provided by `@mocks-server/plugin-admin-api` (included in the main distribution):

```bash
curl -X PATCH -d mock=user-real http://localhost:3100/admin/settings
```

### Integrations

Or install by yourself and use one plugin providing integration with other tools:

* Use the [Cypress](https://www.cypress.io/) command provided by `@mocks-server/cypress-commands`:

```javascript
cy.mocksServerSetMock("user-real");
```

## The order matters

Note that __the order in which route variants are added to the array may be important__. As seen in the previous chapter, route variants responses can be defined as `express` middlewares, so maybe some routes are not going to send a response, and should be added in an specific order.

The order in which Mocks Server register express middlewares is strictly the same in which route variants are defined in the array, so take it into account when adding your route variants middlewares.

When extending from another mock, the new route variant will replace the old one in the same position that it was originally defined.

Read the ["using middlewares" guide](guides-using-middlewares.md) for further info and examples.

<!-- In the next example, all of the variants `trace:enabled`, `trace:disabled` and `trace:debug` are middlewares of the url `*`, so they will be always executed. Note how it is added in first place in the `base` mock, in order to execute it in first place. -->
