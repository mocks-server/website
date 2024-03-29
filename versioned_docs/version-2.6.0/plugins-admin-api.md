---
id: plugins-admin-api
title: Administration REST API
description: How to administrate Mocks Server using the REST API
keywords:
  - mocks server
  - configuration
  - administration
  - plugin
  - api
  - rest
  - settings
  - options
---

## plugin-admin-api

__The main distribution includes the [plugin-admin-api plugin](https://www.npmjs.com/package/@mocks-server/plugin-admin-api) preinstalled__. It provides a REST API that allows to change the server settings while it is running, etc.

This is __very useful when running acceptance tests, as you can change the current mock__ simply with a HTTP request in the `before` method of your tests, for example.

A __client for the administration api__ is also distributed as a separated package: [@mocks-server/admin-api-client](https://www.npmjs.com/package/@mocks-server/admin-api-client).

## Options

* __`adminApiPath`__ _(String)_: Path for the administration api. Default is `/admin`. You should change it only in case there is any conflict with the api you are mocking.

## API resources

Available API resources are:

* `GET` `/admin/about` Returns "plugin-admin-api" information.
  * Response body example: `{ "version": "1.2.0" }`
* `GET` `/admin/mocks` Returns mocks.
* `GET` `/admin/mocks/:id` Returns a specific mock.
* `GET` `/admin/routes` Returns routes collection.
* `GET` `/admin/routes/:id` Returns a specific route.
* `GET` `/admin/routes-variants` Returns routes variants collection.
* `GET` `/admin/routes-variants/:id` Returns a specific route variant.
* `GET` `/admin/mock-custom-routes-variants` Returns an array of currently custom routes variants ids.
* `POST` `/admin/mock-custom-routes-variants` Defines a route variant to be used by current mock.
  * Request body example: `{ "id": "users:error" }`
* `DELETE` `/admin/mock-custom-routes-variants` Restore routes variants to those defined in current mock.
* `GET` `/admin/settings` Returns current server settings.
  * Response body example: `{ "delay": 0, mock: "foo-mock", path: "mocks" }`
* `PATCH` `/admin/settings` Changes current server settings.
  * Request body example: `{ "delay": 3000 }`
* `GET` `/admin/alerts` Returns current alerts.
* `GET` `/admin/alerts/:id` Returns a specific alert. The alert `id` is equivalent to the alert `context` _(read the [developing plugins chapter](plugins-developing-plugins.md) for further info about alerts)_.

:::note
v1.x deprecated api resources are also still available under the `/legacy` path.
:::
