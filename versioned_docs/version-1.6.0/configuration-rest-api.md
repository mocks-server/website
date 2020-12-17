---
id: configuration-rest-api
title: REST API
---

## REST API

The main distribution includes the [plugin-admin-api plugin](https://www.npmjs.com/package/@mocks-server/plugin-admin-api), which provides a REST API that allows to change dynamically the current behavior, change delay time, and another [Mocks Server options](configuration-options.md) .

This is __very useful when running acceptance tests, as you can change the behavior of the api__ simply with a request in your tests `before` method.

A __client for the administration api__ is also distributed as a separated package: [@mocks-server/admin-api-client](https://www.npmjs.com/package/@mocks-server/admin-api-client).

## Resources

Available api resources are:

* `GET` `/admin/about` Returns "plugin-admin-api" information.
  * Response body example: `{ "version": "1.2.0" }`
* `GET` `/admin/behaviors` Returns behaviors collection.
* `GET` `/admin/behaviors/:name` Returns an specific behavior.
* `GET` `/admin/fixtures` Returns fixtures collection.
* `GET` `/admin/fixtures/:id` Returns an specific fixture.
* `GET` `/admin/settings` Returns current server settings.
  * Response body example: `{ "delay": 0, behavior: "foo-behavior", path: "mocks" }`
* `PATCH` `/admin/settings` Changes current server settings.
  * Request body example: `{ "delay": 3000 }`

> Deprecated api resources under "/mocks" api path are still available.
