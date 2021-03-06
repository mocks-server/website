---
id: get-started-behaviors
title: Behaviors
description: Get started with Mocks Server behaviors
keywords:
  - mocks server
  - behavior
  - intro
---

## Definition

The Mocks Server can handle multiple behaviors, so you can change the API responses at your convenience while the server is running.

Each behavior consists in a set of ["fixtures"](get-started-fixtures.md), which are handlers for specific requests. When a behavior contains multiple fixtures that should handle the same request _(same method and url)_, __the last one in the array will have priority over the first one__. This has to be taken into account when we are extending behaviors.

## Defining behaviors using json

Behaviors are defined with an object containing next properties:

* `id`: `<String>` Used as reference for extending it, etc.
* `from`: `<String>` Optional. Behavior id from which this behavior will extend.
* `fixtures`: `<Array of String>` Fixtures ids.


## Extending behaviors

Behaviors are extensibles, so, you can have an "standard" behavior, which defines the default behavior of the mock server and responses for all your api uris, and extend this behavior creating new ones that change only responses for certain uris. All extended behaviors are extensible as well.

```json
[
  {
    "id": "standard",
    "fixtures": ["get-users", "get-user", "update-user", "create-user"]
  },
  {
    "id": "update-user-error",
    "from": "standard", // extends from standard behavior
    "fixtures": ["update-user-error"]
  }
]
```


## Defining behaviors using javascript

For creating a behavior using javascript, you have to use the mocks-server `Behavior` class, providing an array of ["fixtures"](get-started-fixtures.md) or fixtures ids to it.

`new Behavior(fixtures, options)`
* `fixtures`: `<Array>` of fixtures or fixtures ids.
* `options`: `<Object>`
  * `id`: `<String>` Id for the behavior.

_Read the ["fixtures" code example](get-started-fixtures.md#examples) to see how fixtures were defined first._

```javascript
const { Behavior } = require("@mocks-server/main");

const { getUsers, updateUser } = require("./fixtures/users");

module.exports = new Behavior([
  getUsers,
  "get-user", // A fixture id can be provided also.
  updateUser
], {
  id: "standard"
});
```

### Extending behaviors instances

Behaviors instances contain an `extend` method, which can be used to create a new behavior extending from it using javascript.

You can add another one behavior extending the first one and changing only the response of the `updateUser` fixture, for example:

```javascript
const { Behavior } = require("@mocks-server/main");

const { getUsers, updateUser, updateUserError } = require("./fixtures/users");

const standard = new Behavior([
  getUsers,
  "get-user", // A fixture id can be provided also.
  updateUser
], {
  id: "standard"
});

const errorUpdatingUser = standard.extend([ updateUserError ], {
  id: "update-user-error"
});

module.exports = [ standard, errorUpdatingUser ];
```

Now, the server will have available "standard" and "update-user-error" behaviors.

The "update-user-error" behavior will send a different response only for the `/api/users/:id` uri with `PUT` method _(supposing that `updateUser` and `updateUserError` fixtures have the same value for the `url` and `method` properties)_.

## Changing current behavior

For controlling the current behavior, you can use the [configuration](configuration-options.md) when starting the server:

```bash
npm run mocks -- --behavior=update-user-error
```

You can also use one of the plugins included in the `@mocks-server/main` distribution to change it while the server is running:

* Use the interactive CLI provided by `@mocks-server/plugin-inquirer-cli`:

![Interactive CLI](assets/interactive-cli-animation.gif)

* Make a request to the REST API provided by `@mocks-server/plugin-admin-api`:

```bash
curl -X PATCH -d behavior=update-user-error http://localhost:3100/admin/settings
```

Or install by yourself and use one plugin providing integration with other tools:

* Use the [Cypress](https://www.cypress.io/) command provided by `@mocks-server/cypress-commands`:

```javascript
cy.mocksServerSetBehavior("update-user-error");
```
