---
id: advanced-custom-fixtures-handlers
title: Custom fixtures handlers
---

## What is a "fixtures handler"?

"Fixtures handler" are the pieces at charge of handling the fixtures declarations and send responses when appropriate.

The mocks-server includes only one fixtures parser by default, which accepts fixtures declared in the [format described in the "fixtures" chapter](get-started-fixtures), but **you can add your own fixtures declarations formats.**

This feature, combined with the [plugins development](advanced-developing-plugins), gives you the possibility of extend the mocks-server with almost every new feature you want.

## Fixtures handler development

A fixture handler should be defined as a `Class` containing:

#### `static recognize(fixtureCandidate)`

This static method will be called when mocks files are loaded. Every object found in the `mocks` folder will be passed to this method, in order to let the fixture handler recognize if it is a fixture that he is able to handle or not.

This method should check the received object, and return `true` if it recognizes it as a fixture, or `false` if not.

#### `static get displayName()`

This sttic getter should return the name of the fixtures handler, which is useful for debugging purposes.

#### `constructor(fixture, mocksServerInstance)`

If the `recognize` static method returns `true`, then the constructor will be called passing again the fixture, and the `mocksServerInstance` instance, which contains methods described in the [programmatic usage chapter](advanced-programmatic-usage).

#### `requestMatch(req)`

This method is called to check if the fixture should handle a certain request. It receives the `express` request object as argument, so you can check the `req.method`, `req.url` etc.
The method should return `true` if the fixture is at charge of handling the request, or `false` if not.

#### `handleRequest(req, res, next)`

If the `requestMatch` method returns `true`, then this method will be called passing the `express` middlewares `request`, `response` and `next` methods.

Then, this method should send the correspondant response based on the fixture properties. [Check the `express` documentation](http://expressjs.com/en/guide/using-middleware.html) to know how if you are not already familiared with it.

#### `get id()`

This getter should return an unique id for the fixture, different to all other fixtures. It should be calculated based on the fixture properties to make it persistant, or, in other words, it should return the same value for the same fixture each time the mocks server is started.

#### `get matchId()`

This getter should return an unique id for the fixture. This id should be unique from the point of view of the fixture properties that will make it match and response to an specific url and not others. (For example, if your fixture format include an "url" property, this should probably be used to calculate the `matchId`)
