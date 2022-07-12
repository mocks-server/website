---
id: rest-api
title: REST API integration
description: How to use Mocks Server administration REST API
keywords:
  - mocks server
  - mock server
  - REST API
  - api
  - http
  - integration
  - administration
  - configuration
  - tutorial
  - guide
  - how to
  - usage
---

## Preface

The [Mocks Server main distribution](https://github.com/mocks-server/main/tree/master/packages/main) includes the [admin-api plugin](https://github.com/mocks-server/main/tree/master/packages/plugin-admin-api) preinstalled. It provides a REST API allowing to interact with the server while it is running.

The administration API is started in the same server than the API mock, but in a different path. It is located in the `/admin` path by default, but this can be changed using [configuration](#configuration).

:::tip
A __JavaScript client for the administration api__ is also distributed as a separated package: [@mocks-server/admin-api-client](https://github.com/mocks-server/main/tree/master/packages/admin-api-client).
:::

## API resources

Available API resources are:

* `GET` `/admin/about` Returns "plugin-admin-api" information.
  * Response body example: `{ "version": "1.2.0" }`
* `GET` `/admin/collections` Returns collections.
* `GET` `/admin/collections/:id` Returns a specific collection.
* `GET` `/admin/routes` Returns all routes.
* `GET` `/admin/routes/:id` Returns a specific route.
* `GET` `/admin/routes-variants` Returns all routes variants.
* `GET` `/admin/routes-variants/:id` Returns a specific route variant.
* `GET` `/admin/mock-custom-routes-variants` Returns an array of currently custom routes variants ids.
* `POST` `/admin/mock-custom-routes-variants` Defines a route variant to be used by current mock.
  * Request body example: `{ "id": "users:error" }`
* `DELETE` `/admin/mock-custom-routes-variants` Restore routes variants to those defined in current mock.
* `GET` `/admin/settings` Returns current server settings.
  * Response body example: `{ "server": { "delay": 0 }, "mocks": { "selected": "foo-mock" } }`
* `PATCH` `/admin/settings` Changes current server settings.
  * Request body example: `{ "server": { "delay": 3000 } }`
* `GET` `/admin/alerts` Returns current server alerts.
* `GET` `/admin/alerts/:id` Returns a specific alert. _(read the [core API](api/core.md) for further info about alerts)_.

## Examples

### Get collections

```bash
curl http://localhost:3100/admin/collections
```

### Change the current collection

```bash
curl -X PATCH -d '{"routes":{"collections":{"selected":"collection-b"}}}' -H 'Content-Type: application/json' http://localhost:3100/admin/settings
```

## Configuration

You can use the next Mocks Server configuration properties to change the behavior of the API:

* __`plugins.adminApi.path`__ _(String)_: Path for the administration REST API. Default is `/admin`. You should change it only in case there is any conflict with the API you are mocking.

:::info
Learn more about how to set Mocks Server settings in the [configuration chapter](configuration/how-to-change-settings.md)
:::
