---
id: tutorials-dynamic
title: Adding dynamic fixtures
---

## Preface

This tutorial assumes that you have completed the ["Adding static fixtures tutorial"](tutorials-static.md).

You have now all your static fixtures defined, but, what if you want your `/api/users/:id` api url to respond with the correspondent user without the need of changing the current behavior?

This is __usually not recommended__, because you are going to implement almost a "real api", and maybe it should be better to shutdown the Mocks Server and connect the application to your real api, but for some special cases maybe you need to accomplish it.

Let's see how:

## Define the initial users collection

Extract the users collection response from your static fixture, because it is going to be reused also by the dynamic fixture:

```javascript
//mocks/fixtures/users.js

const INITIAL_USERS = [
  {
    id: 1,
    name: "John Doe"
  },
  {
    id: 2,
    name: "Jane Doe"
  }
];

const getUsers = {
  url: "/api/users",
  method: "GET",
  response: {
    status: 200,
    body: INITIAL_USERS
  }
};

//...

```

## Add a dynamic fixture

Add a dynamic fixture for `GET` `/api/users/:id` that will respond with the user with correspondent id, or a "not found" error if any user matches:

```javascript
//mocks/fixtures/users.js

//....

const getRealUser = {
  url: "/api/users/:id",
  method: "GET",
  response: (req, res) => {
    const userId = req.params.id;
    const user = INITIAL_USERS.find(userData => userData.id === Number(userId));
    if(user) {
      res.status(200);
      res.send(user);
    } else {
      res.status(404);
      res.send({
        message: "User not found"
      });
    }
  }
}

module.exports = {
  getUsers,
  getUser,
  getUser2,
  getRealUser
};
```

> Dynamic fixtures functions are called with express "request", "response" and "next". Read the [express documentation][express-url] to learn more about `req`, `res`, `next`.

## Add a new behavior

Add a new behavior extending the "standard" one, and adding the `getRealUser` fixture:

```javascript
// /mocks/behaviors.js

const { Behavior } = require("@mocks-server/main");

const { getUsers, getUser, getUser2, getRealUser } = require("./fixtures/users");

const standard = new Behavior([
  getUsers,
  getUser
]);

// Extends the standard behavior adding "getUser2" fixture.
const user2 = standard.extend([getUser2]);

// Extends the standard behavior adding `getRealUser` dynamic fixture.
const dynamic = standard.extend([getRealUser]);

module.exports = {
  standard,
  user2,
  dynamic
};

```

## Change current behavior

Now you'll have three behaviors available: "standard", "user2" and "dynamic". Use the CLI to select the "dynamic" one.

![Available behaviors](assets/tutorials-dynamic-01.png)

## Check the responses

Browse to [http://localhost:3100/api/users/1](http://localhost:3100/api/users/1). You should see the first user:

```json
{"id":1,"name":"John Doe"}
```

Browse to [http://localhost:3100/api/users/2](http://localhost:3100/api/users/2). You should now see the second user:

```json
{"id":2,"name":"Jane Doe"}
```

Browse to [http://localhost:3100/api/users/3](http://localhost:3100/api/users/3):

```json
{"message":"User not found"}
```

## Persistence

You could add also dynamic fixtures for deleting, updating, or creating users, simply modifying the `INITIAL_USERS` memory object from each correspondent response function.

Changes would be be persisted in memory while the server is running.

[express-url]: https://expressjs.com/es/4x/api.html
