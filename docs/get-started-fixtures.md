---
id: get-started-fixtures
title: Fixtures
---

## Definition

A "fixture" defines the response for an specific uri. It has to be an object containing properties:

* `url`: `uri as <String>` Uri of the resource. It can contains expressions for matching dynamic uris. Read the [route-parser](https://www.npmjs.com/package/route-parser) documentation for further info about how to use dynamic routing.
* `method`: `<String>` Method of the request. Defines to which method will response this fixture. Valid values are http request methods, such as "GET", "POST", "PUT", etc.
* `response`: `<Object>` Defines the response that the Mocks Server will send to the request:
  * `status`: `<Number>` Status code to send.
  * `body`: `<Object>` Object to send as body in the response.
* `response`: `<Function>` Response can be defined as a function too. The function will receive the [express](http://expressjs.com/es/api.html) `request`, `response` and `next` arguments, so you are free to handle the server request as you need. _This is what we call a "dynamic" fixture._

## Examples

In the next example you can see how static and dynamic fixtures are defined:

```js
// File containing "users" fixtures

// fixtures with static responses
const getUsers = {
  url: "/api/users",
  method: "GET",
  response: {
    status: 200,
    body: [
      {
        name: "Foo user name"
      }
    ]
  }
};

const updateUser = {
  url: "/api/user/:id",
  method: "PUT",
  response: {
    status: 204
  }
};

const updateUserError = {
  url: "/api/user/:id",
  method: "PUT",
  response: {
    status: 500,
    body: {
      message: "Internal Server Error"
    }
  }
};

// fixture with a dynamic response
const getUser = {
  url: "/api/users/:id",
  method: "GET",
  response: (req, res) => {
    if(req.params.id === "23") {
      res.status(403);
      res.send({
        message: "Forbidden"
      });
    }
    res.status(200);
    res.send({
      name: "Foo user name"
    });
  }
};

module.exports = {
  getUsers,
  updateUser,
  updateUserError,
  getUser
};
```
