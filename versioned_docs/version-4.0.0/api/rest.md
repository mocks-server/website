---
id: rest
title: REST API
description: Mocks Server REST API
keywords:
  - mocks server
  - api
  - core
  - methods
  - properties
  - getters
  - advanced usage
  - REST
  - urls
  - configuration
  - js
  - swagger
  - http
---

```mdx-code-block
import DocsImage from '@site/src/components/DocsImage';
import Swagger from '../assets/swagger.png';
```

## Preface

The [Mocks Server main distribution](https://github.com/mocks-server/main/tree/master/packages/main) includes the [admin-api plugin](https://github.com/mocks-server/main/tree/master/packages/plugin-admin-api) preinstalled. It provides a REST API allowing to interact with the server while it is running. Read the [REST API integration chapter for further info](../integrations/rest-api.md).

## API

### Swagger

:::tip
Start Mocks Server and browse to [http://localhost:3110/docs](http://localhost:3110/docs) to check out the API resources in the Swagger UI.
:::

```mdx-code-block
<DocsImage src={Swagger} alt="Swagger UI" />
```

### Postman

Once Mocks Server is running, you can also use our Postman public collection to interact with the administration API:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/1246644-3976d7be-07fd-4ba6-b8d9-eb2943586f3c?action=collection%2Ffork&collection-url=entityId%3D1246644-3976d7be-07fd-4ba6-b8d9-eb2943586f3c%26entityType%3Dcollection%26workspaceId%3Dbd824f20-8630-4510-bd29-79d81e482f36)

## Javascript client

:::tip
A __JavaScript client for the administration api__ is also distributed as an NPM package: [@mocks-server/admin-api-client](https://github.com/mocks-server/main/tree/master/packages/admin-api-client).
:::
