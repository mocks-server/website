---
id: https-protocol
title: Enabling HTTPS
description: How to enable the https protocol
keywords:
  - mocks server
  - mock server
  - guides
  - guidelines
  - secure
  - https
  - protocol
  - certificate
  - configuration
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Preface

Both the mock server and the administration API can be configured to use the HTTPS protocol. __They can be enabled separately, so, you can have an HTTP mock and a secure administration API, or vice versa.__ 

This guide will help you in the whole process, from creating a self-signed certificate to configure the server and the clients or any other integration tool.

## Creating a self-signed certificate

If you changed the `server.host` option and you have a valid certificate and key for that host you could use it directly and skip this step. If not, you can create a self-signed certificate.

Use the next commands to create certificate and keys files in the current folder:

```sh
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```

```
project-root/
├── cert.pem
└── key.pem
```

<details>
<summary>
Using a single command without prompts
</summary>
<div>

You can also create a self-signed certificate using the next single command without any prompt, which may be useful in CI pipelines, for example. But take into account that a certificate created this way won't be able to be installed on local machines in order to skip some security checks in the browser, for example:

```sh
openssl req -newkey rsa:4096 -days 9999 -nodes -x509 -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=localhost" -keyout key.pem -out cert.pem
```

</div>
</details>

:::caution
Using a self-signed certificate has some security implications, so you'll probably will have to configure your mock clients to be able to connect. Read ["Configuring other clients when using a self-signed certificate"](#configuring-other-clients-when-using-a-self-signed-certificate) for further info. 
:::

## Configuring the server

When you already have the certificate and key file, you can configure the server:

```mdx-code-block
<Tabs>
<TabItem value="JS config file">
```

```js
module.exports = {
  server: {
    https: {
      enabled: true,
      cert: "cert.pem",
      key: "key.pem"
    }
  }
};
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --server.https.enabled --server.https.cert=cert.pem --server.https.key=key.pem
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_SERVER_HTTPS_ENABLED=true MOCKS_SERVER_HTTPS_CERT=cert.pem MOCKS_SERVER_HTTPS_CERT=key.pem npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  server: {
    https: {
      enabled: true,
      cert: "cert.pem",
      key: "key.pem"
    }
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
```

:::info
The `cert` and `key` options support a path relative to the current working directory (`process.cwd()`) or an absolute path.
:::

Now, once started, the server will be listening at [https://localhost:3100](https://localhost:3100) instead of [http://localhost:3100](http://localhost:3100)

## Configuring the administration API

You can use the same self-signed certificate for the administration API, or you could also change the `plugins.adminApi.host` option and use a valid certificate for that host.

To enable HTTPS in the administration API use the next configuration:

```mdx-code-block
<Tabs>
<TabItem value="JS config file">
```

```js
module.exports = {
  plugins: {
    adminApi: {
      https: {
        enabled: true,
        cert: "cert.pem",
        key: "key.pem"
      }
    }
  }
};
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --plugins.adminApi.https.enabled --plugins.adminApi.https.cert=cert.pem --plugins.adminApi.https.key=key.pem
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_PLUGINS_ADMIN_API_HTTPS_ENABLED=true MOCKS_PLUGINS_ADMIN_API_HTTPS_CERT=cert.pem MOCKS_PLUGINS_ADMIN_API_HTTPS_CERT=key.pem npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  plugins: {
    adminApi: {
      https: {
        enabled: true,
        cert: "cert.pem",
        key: "key.pem"
      }
    }
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Configuring the administration API clients

When you change the administration API to use the HTTPS protocol, you'll have to configure also the clients properly to be able to connect with it.

### JavaScript client

If you are using the [`@mocks-server/admin-api-client` package](https://www.npmjs.com/package/@mocks-server/admin-api-client), you can use its configuration method to enable the HTTPS protocol:

```mdx-code-block
<Tabs>
<TabItem value="With valid certificate">
```

```js
import { AdminApiClient } from "@mocks-server/admin-api-client";

const apiClient = new AdminApiClient();

// highlight-start
apiClient.configClient({
  host: "foo-host",
  https: true,
});
// highlight-end
```

```mdx-code-block
</TabItem>
<TabItem value="With self-signed certificate">
```

```js
import https from "https";
import { AdminApiClient } from "@mocks-server/admin-api-client";

// highlight-start
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
// highlight-end

const apiClient = new AdminApiClient();

// highlight-start
apiClient.configClient({
  https: true,
  agent: httpsAgent,
});
// highlight-end
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Cypress commands

If you are using the [`@mocks-server/cypress-commands` package](https://www.npmjs.com/package/@mocks-server/cypress-commands) to control the server from Cypress tests, then you can use any of its available configuration methods to set the HTTPS protocol in the API client. Read The [Cypress integration chapter](../integrations/cypress.md#enabling-https) for further info.

### Postman

If you are using our Postman collection as an API client, remember to change the `protocol` variable to `https`.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/1246644-3976d7be-07fd-4ba6-b8d9-eb2943586f3c?action=collection%2Ffork&collection-url=entityId%3D1246644-3976d7be-07fd-4ba6-b8d9-eb2943586f3c%26entityType%3Dcollection%26workspaceId%3Dbd824f20-8630-4510-bd29-79d81e482f36)

## Configuring other clients when using a self-signed certificate

When the mock server or the admin API are started using HTTPS protocol with a self-signed certificate, some clients will probably have to be configured to skip some security checks.

:::info
This section merely offers guidance on how to skip some security checks when using self-signed certificates in local or CI environments for development purposes when using Mocks Server. Note that using these methods in other contexts is not within the scope of Mocks Server documentation.
:::

### Browser

If you are using Google Chrome or another browser as a client for the mock, you'll probably have to install the certificate in your local machine. On MacOs, for example, you can double-click the certificate file and it will be installed in the system key chain, then you have to change its configuration to be always trusted.

Then, in Google Chrome, you'll still get a security notice in the browser, but you'll be able to accept the risk by clicking "advanced" > "continue to...".

### Cross-fetch

If you are using [node-fetch](https://github.com/node-fetch/node-fetch) or [cross-fetch](https://github.com/lquixada/cross-fetch) to perform requests to the mock or the admin API, you can provide a custom https client configured to avoid unauthorized rejections:

```js
const https = require("https");
const crossFetch = require("cross-fetch");

// highlight-start
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
// highlight-end

const response = await crossFetch("https://127.0.0.1:3100/api/users", {
  // highlight-next-line
  agent: httpsAgent,
});
const users = await response.json();
```
