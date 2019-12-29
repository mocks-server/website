---
id: version-1.5.0-advanced-custom-fixtures-handlers
title: Custom fixtures handlers
original_id: advanced-custom-fixtures-handlers
---

## What is a "fixtures handler"?

"Fixtures handlers" are the pieces at charge of handling the fixtures declarations, discerning whether a request has to be handled by a fixture or not, and sending responses when appropriate.

The mocks-server includes only one fixtures parser by default, which accepts fixtures declared in the [format described in the "fixtures" chapter](get-started-fixtures), but **you can add your own fixtures declarations formats.**

This feature, combined with the [plugins development](advanced-developing-plugins), gives you the possibility of extend the mocks-server with almost every new feature you want.

## Fixtures handler development

A fixture handler should be defined as a `Class` containing:

#### `static recognize(fixtureCandidate)`

This static method will be called when mocks files are loaded. Every object found in the `mocks` folder will be passed to this method, in order to let the fixture handler recognize if it is a fixture that he is able to handle or not.

This method should check the received object, and return `true` if it recognizes it as a fixture, or `false` if not.

#### `static get displayName()`

This static getter should return the name of the fixtures handler, which is useful for debugging purposes.

#### `constructor(fixture, mocksServerInstance)`

If the `recognize` static method returns `true`, then the constructor will be called passing again the fixture, and the `mocksServerInstance` instance, which contains methods described in the [programmatic usage chapter](advanced-programmatic-usage).

#### `requestMatch(req)`

This method is called to check if the fixture should handle a certain request. It receives the `express` request object as argument, so you can check the `req.method`, `req.url` etc.
The method should return `true` if the fixture is at charge of handling the request, or `false` if not.

#### `handleRequest(req, res, next)`

If the `requestMatch` method returns `true`, then this method will be called passing the `express` middlewares `request`, `response` and `next` methods.

Then, this method should send the correspondant response based on the fixture properties. [Check the `express` documentation](http://expressjs.com/en/guide/using-middleware.html) to know how if you are not already familiared with it.

_This project works well with ["@hapi/boom"](https://www.npmjs.com/package/@hapi/boom), so you can use it for responding http errors (simply call `next(Boom.badRequest())`, for example)_

#### `get id()`

This getter should return an unique id for the fixture, different to all other fixtures. It should be calculated based on the fixture properties to make it persistant, or, in other words, it should return the same value for the same fixture each time the mocks server is started.

#### `get requestMatchId()`

This getter should return an unique id for the fixture. This id should be unique from the point of view of the fixture properties that will make it match and response to an specific request and not to others. (For example, if your fixture format includes "url" and "method" properties, these should probably be used to calculate the `requestMatchId`)

#### `get request()`

This getter should return an object which properties describe what makes this fixture handler to match a request or not.

#### `get response()`

This getter should return a response preview. This response getter is used only for debug and display purposes, real response should be sent by the `handleRequest` method.

## Example

Here you have an example of how a fixtures handler should be defined:

```javascript
// ./CustomFixturesHandler.js
class CustomFixturesHandler {
  static recognize(fixture) {
    if (fixture.at && fixture.with && fixture.send && fixture.status) {
      return true;
    }
    return false;
  }

  static get displayName() {
    return "custom-fixtures-handler";
  }

  constructor(fixture, core) {
    this._core = core;
    this._at = fixture.at;
    this._with = fixture.with;
    this._send = fixture.send;
    this._status = fixture.status;
    this._id = JSON.stringify(fixture);
    this._requestMatchId = `${this._with}-${this._at}`;
  }

  requestMatch(req) {
    return req.method === this._method && req.url === this._at;
  }

  handleRequest(req, res) {
    this._core.tracer.debug(`Sending fixture ${this._id} to request with id ${req.id}`);
    res.status(this._status);
    res.send(this._send);
  }

  get requestMatchId() {
    return this._requestMatchId;
  }

  get id() {
    return this._id;
  }

  get request() {
    return {
      at: this._at,
      with: this._with
    };
  }

  get response() {
    return {
      status: this._status,
      body: this._send
    };
  }
}

module.exports = CustomFixturesHandler;
```

Now, after adding this custom fixture handler with the `addFixturesHandler` method, Mocks Server will accept fixtures defined as:

```javascript
// ./mocks/fixtures/users.js
const getUsersSuccess = {
  at: "/api/users",
  with: "GET",
  status: 200,
  send: [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@foo.com"
    }
  ]
};

module.exports = {
  getUsersSuccess
};
```

> By the moment, custom fixtures handlers [can be added to the server only programmatically](advanced-programmatic-usage). In next releases this can be done easier through a configuration file in the root folder of the project.
