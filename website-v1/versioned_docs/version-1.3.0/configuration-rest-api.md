---
id: version-1.3.0-configuration-rest-api
title: REST API
original_id: configuration-rest-api
---

## REST API

The server includes a REST API that allows to change dinamically the current behavior, change delay time, and another [Mocks Server options](configuration-command-line-arguments.md) .

This is __very useful when running acceptance tests, as you can change the behavior of the api__ simply with a request in your tests `before` method.

## Resources

Available api resources are:

* `GET` `/mocks/behaviors` Returns an array containing all available behaviors.
* `GET` `/mocks/behaviors/current` Returns current behavior.
* `PUT` `/mocks/behaviors/current` Set current behavior.
  * Request body example: `{ "name": "behavior-name" }`
* `GET` `/mocks/settings` Return current server settings.
  * Response body example: `{ "delay": 0 }`
* `PUT` `/mocks/settings` Change current server settings.
  * Request body example: `{ "delay": 3000 }`
