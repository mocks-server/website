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

:::tip
Start Mocks Server and browse to [http://localhost:3110/docs](http://localhost:3110/docs) to checkout the API Swagger UI.
:::

```mdx-code-block
<DocsImage src={Swagger} alt="Swagger UI" />
```

:::tip
A __JavaScript client for the administration api__ is also distributed as a separated package: [@mocks-server/admin-api-client](https://github.com/mocks-server/main/tree/master/packages/admin-api-client).
:::
