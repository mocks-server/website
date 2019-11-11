---
id: get-started-behaviors
title: Behaviors
---

## Definition

Each behavior consists in a set of ["fixtures"](get-started-fixtures.md), which are server responses for specific uris.

The Mocks Server can handle multiple behaviors, so you can change the API responses at your convenienve just in a second.


## Creating a behavior

For creating a Behavior, you have to use the mocks-server `Behavior` class, providing an array of ["fixtures"](get-started-fixtures.md) to it:

_Read the ["fixtures" code example](get-started-fixtures.md#examples) to see how fixtures were defined first._

```js
const { Behavior } = require("@mocks-server/main");

const { getUsers, getUser, updateUser } = require("./fixtures/users");

const standard = new Behavior([
  getUsers,
  getUser,
  updateUser
]);

module.exports = {
  standard
};
```

> __Save this file in the `behaviors` folder__ that you defined for your mocks-server when started.

Now, when loaded, the server will have available an "standard" behavior, which contains three fixtures.


## Extending behaviors

Behaviors are extensibles, so, you can have an "standard" behavior, which defines the standard behavior of the mocks server and responses for all api uris, and modify this behavior creating new ones that change only responses for certain "uris". All extended behaviors are extensible as well.

You can add another one behavior extending the first one and changing only the response for "getUsers", for example:

```js
const { Behavior } = require("@mocks-server/main");

const { getUsers, getUser, updateUser, updateUserError } = require("./fixtures/users");

const standard = new Behavior([
  getUsers,
  getUser,
  updateUser
]);

const errorUpdatingUser = base.extend([updateUserError]);

module.exports = {
  standard,
  errorUpdatingUser
};
```

Now, server will have available "standard" and "errorUpdatingUser" behaviors.

The "errorUpdatingUser" behavior will send a different response only for the `/api/users/:id` uri with `PUT` method _(supossing that "updateUser" and "errorUpdatingUser" have the same value for the `url` property)_.

