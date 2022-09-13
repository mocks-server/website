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
  - swagger
---

```mdx-code-block
import DocsImage from '@site/src/components/DocsImage';
import Swagger from '../assets/swagger.png';
```

## Preface

The [Mocks Server main distribution](https://github.com/mocks-server/main/tree/master/packages/main) includes the [admin-api plugin](https://github.com/mocks-server/main/tree/master/packages/plugin-admin-api) preinstalled. It provides a REST API allowing to interact with the server while it is running.

The administration API is started on a different server of the API mock. By default, it is started in the `3110` port, but this can be changed using [configuration](#configuration).

## Postman collection

Once Mocks Server is running, you can use our Postman public collection to interact with the administration API:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/1246644-3976d7be-07fd-4ba6-b8d9-eb2943586f3c?action=collection%2Ffork&collection-url=entityId%3D1246644-3976d7be-07fd-4ba6-b8d9-eb2943586f3c%26entityType%3Dcollection%26workspaceId%3Dbd824f20-8630-4510-bd29-79d81e482f36)

## Swagger

Available API resources are described in the OpenAPI specification provided by the API server itself at [http://localhost:3110/docs/openapi.json](http://localhost:3110/docs/openapi.json).

:::tip
Start Mocks Server and browse to [http://localhost:3110/docs](http://localhost:3110/docs) to check out the API Swagger UI.
:::

```mdx-code-block
<DocsImage src={Swagger} alt="Swagger UI" />
```

## Javascript API client

:::tip
A __JavaScript client for the administration api__ is also distributed as a separated package: [@mocks-server/admin-api-client](https://github.com/mocks-server/main/tree/master/packages/admin-api-client).
:::

## Examples

### Get collections

```bash
curl http://localhost:3110/api/mock/collections
```

### Change the current collection

```bash
curl -X PATCH -d '{"mock":{"collections":{"selected":"collection-b"}}}' -H 'Content-Type: application/json' http://localhost:3110/api/config
```

## Configuration

You can use the next Mocks Server configuration properties to change the API configuration:

* __`plugins.adminApi.port`__ _(Number)_: Port for the administration REST API. Default is `3110`.
* __`plugins.adminApi.host`__ _(String)_: Host for the administration REST API. Default is `0.0.0.0` (Reachable to all IPv4 addresses on the local machine).
* __`plugins.adminApi.https.enabled`__ _(Boolean)_: Enables the HTTPS protocol in the administration REST API. For further information [read the "Enabling HTTPS" guide](../guides/https-protocol.md).
* __`plugins.adminApi.https.cert`__ _(String)_: Path to the HTTPS certificate. Relative to the current `process.cwd()` or absolute.
* __`plugins.adminApi.https.key`__ _(String)_: Path to the HTTPS certificate key. Relative to the current `process.cwd()` or absolute.

:::info
Learn more about how to set Mocks Server settings in the [configuration chapter](../configuration/how-to-change-settings.md)
:::
