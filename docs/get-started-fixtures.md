---
id: get-started-fixtures
title: Fixtures
---

## Definition

A "fixture" defines the handler for an specific request and the response to be sent.

The standard format for defining a fixture is to declare an object containing next properties:

* `id`: `<String>` Used as a reference for grouping fixtures in "behaviors", etc.
* `url`: `uri as <String>` Uri of the resource. It can contains expressions for matching dynamic uris. Read the [route-parser](https://www.npmjs.com/package/route-parser) documentation for further info about how to use dynamic routing.
* `method`: `<String>` Method of the request. Defines to which method will response this fixture. Valid values are http request methods, such as "GET", "POST", "PUT", etc.
* `response`: `<Object>` Defines the response that the server will send to the request:
  * `status`: `<Number>` Status code to send.
  * `body`: `<Object>` Object to send as body in the response.
* `response`: `<Function>` In case the fixture is defined using javascript, the response can be an [express middleware](http://expressjs.com/en/guide/using-middleware.html) too. The function will receive the [express](http://expressjs.com/es/api.html) `request`, `response` and `next` arguments, so you will be free to handle the request at your convenience.

> This is the standard format of defining fixtures, but more formats can be added [using the `addFixturesHandler` method](advanced-custom-fixtures-handlers).

## Examples

In the next example you can see how fixtures are defined using `json` definitions:

```json
[
  {
    "id": "get-users",
    "url": "/api/users",
    "method": "GET",
    "response": {
      "status": 200,
      "body": [
        {
          "id": 1,
          "name": "John Doe"
        },
        {
          "id": 2,
          "name": "Jane Doe"
        }
      ]
    }
  }, 
  {
    "id": "get-user",
    "url": "/api/users/:id",
    "method": "GET",
    "response": {
      "status": 200,
      "body": {
        "id": 1,
        "name": "John Doe"
      }
    }
  }
]
```

And how a fixture can be defined in javascript using an express middleware for handling the response:

```javascript
// fixture with an express middleware

const getUserDynamic = {
  id: "get-user-dynamic"
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
  getUserDynamic
};
```
