---
id: plugins-admin-api
title: Administration REST API
description: How to administrate Mocks Server using the REST API
keywords:
  - mocks server
  - configuration
  - administration
---

## plugin-admin-api

The main distribution includes the [plugin-admin-api plugin](https://www.npmjs.com/package/@mocks-server/plugin-admin-api), which provides a REST API that allows to change dinamically the current behavior, change delay time, and another [Mocks Server options](configuration-options.md) .

This is __very useful when running acceptance tests, as you can change the behavior of the api__ simply with a request in your tests `before` method, for example.

A __client for the administration api__ is also distributed as a separated package: [@mocks-server/admin-api-client](https://www.npmjs.com/package/@mocks-server/admin-api-client).

## Options

* `adminApiPath`: `<String>` Path for the administration api. Default is "/admin". You should change it only in case there is any conflict with the api you are mocking.
* `adminApiDeprecatedPaths` - `<Boolean>` Disables the deprecated "/mocks" api path, which is still enabled by default due to backward compatibility. Used as command line argument, you can disable it using `--no-adminApiDeprecatedPaths` (Read the [command-line-arguments chapter](configuration-command-line-arguments) for further info)

## Api resources

Available api resources are:

* `GET` `/admin/about` Returns "plugin-admin-api" information.
  * Response body example: `{ "version": "1.2.0" }`
* `GET` `/admin/behaviors` Returns behaviors collection.
* `GET` `/admin/behaviors/:id` Returns an specific behavior.
* `GET` `/admin/fixtures` Returns fixtures collection.
* `GET` `/admin/fixtures/:id` Returns an specific fixture.
* `GET` `/admin/settings` Returns current server settings.
  * Response body example: `{ "delay": 0, behavior: "foo-behavior", path: "mocks" }`
* `PATCH` `/admin/settings` Changes current server settings.
  * Request body example: `{ "delay": 3000 }`

> Deprecated api resources under "/mocks" api path are also still available.
