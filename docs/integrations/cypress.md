---
id: cypress
title: Cypress integration
description: How to use Mocks Server with Cypress
keywords:
  - mocks server
  - mock server
  - Cypress
  - integration
  - tutorial
  - guide
  - how to
  - cypress commands
  - E2E
  - settings
---

## Preface

Using the [Cypress](https://www.cypress.io/) commands provided by the package [@mocks-server/cypress-commands](http://npmjs.com/package/@mocks-server/cypress-commands) you'll be able to change the current [`collection`](usage/collections.md) of Mocks Server or change any other server settings simply using a Cypress command. This means that you can __develop solid tests, without the dependency of the real API__, because you can control in every moment the responses that the API will return to your web page.

__You'll be able to develop Cypress tests for error cases, slow requests and many other cases that are very hard to reproduce with a real API__, with the advantage that you could reuse the same mock while you are developing the application, because in that case you can control it using any of the other integration tools, such as the [interactive CLI](integrations/command-line.md).

## Installation

```bash
npm i --save-dev @mocks-server/cypress-commands
```

Add this line to your project's `cypress/support/commands.js` file:

```js
import "@mocks-server/cypress-commands"
```

## Cypress Commands

Set current [collection](usage/collections.md):

```js
cy.mocksSetCollection("admin-user");
```

Use specific [route variant](usage/routes.md):

```js
cy.mocksUseRouteVariant("get-users:error");
```

Restore [routes variants](usage/routes.md) to those defined in current [collection](usage/collections.md):

```js
cy.mocksRestoreRoutesVariants();
```

Set delay time:

```js
cy.mocksSetDelay(2000);
```

Set any other [configuration option](configuration/options.md):

```js
cy.mocksConfig({
  files: {
    watch: false,
  },
  server: {
    delay: 0,
  },
  routes: {
    collections: {
      selected: "get-users-error"
    },
  },
});
```

Configures the [Mocks Server administration API client](https://github.com/mocks-server/main/tree/master/packages/admin-api-client/README.md), used under the hood to communicate with the [Mocks Server administration API](integrations/rest-api.md). Use this command only if you changed the administration API configuration and you need to configure the client properly.

```js
cy.mocksConfigAdminApiClient({
  path: "/foo",
  baseUrl: "http://localhost:3300"
});
```
