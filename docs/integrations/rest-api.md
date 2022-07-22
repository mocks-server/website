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

## API resources

Available API resources are described in the OpenAPI specification provided by the API server itself at [http://localhost:3110/docs/open-api.json](http://localhost:3110/docs/open-api.json).

:::tip
Start Mocks Server and browse to [http://localhost:3110/docs](http://localhost:3110/docs) to checkout the API Swagger UI.
:::

```mdx-code-block
<DocsImage src={Swagger} alt="Swagger UI" />
```

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

:::info
Learn more about how to set Mocks Server settings in the [configuration chapter](../configuration/how-to-change-settings.md)
:::
