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

* A __mock defines a collection of ["route variants"](get-started-routes.md)__. So you can create different "mocks" to store __different states of your mocked API__, and change between them easily while you are developing or while running tests.
* Mocks can extend from another mock. It is like "copying" an existent one, and changing only one "route variant", or many.
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

:::info
The currently selected mock can be defined using the configuration. Read the [configuration chapter](configuration-options.md) for further info. Here you have some examples of how to use configuration for changing the current mock.
:::

### Using command line arguments

For defining the current mock, you can use [command line arguments](configuration-command-line-arguments.md) when starting the server:

```bash
npm run mocks -- --mocks.selected=user-real
```

### Using the interactive CLI

You can also change the current mock using the interactive CLI:

![Interactive CLI](assets/inquirer-cli.gif)

### Using the admin API REST

Make a request to the Mocks Server administration REST API provided by `@mocks-server/plugin-admin-api` (included in the main distribution):

```bash
curl -X PATCH -d '{"mocks":{"selected":"user-real"}}' -H 'Content-Type: application/json' http://localhost:3200/admin/settings
```

### Integrations

Or install by yourself and use one plugin providing integration with other tools:

* Use the [Cypress](https://www.cypress.io/) command provided by `@mocks-server/cypress-commands`:

```javascript
cy.mocksServerSetMock("user-real");
```

## The order matters

Note that __the order in which route variants are added to the array may be important__. As seen in the previous chapter, route variants responses can be defined as `Express` middlewares, so maybe some routes are not going to send a response, and should be added in a specific order.

The order in which Mocks Server register express middlewares is strictly the same in which route variants are defined in the array, so take it into account when adding your route variants middlewares.

When extending from another mock, the new route variant will replace the old one in the same position that it was originally defined.

Read the ["using middlewares" guide](guides-using-middlewares.md) for further info and examples.
