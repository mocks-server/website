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

Using the [Cypress](https://www.cypress.io/) commands provided by the package [@mocks-server/cypress-commands](http://npmjs.com/package/@mocks-server/cypress-commands) you'll be able to change the current [`collection`](../usage/collections.md) of Mocks Server or change any other server settings simply using a Cypress command. This means that you can __develop solid tests, without the dependency of the real API__, because you can control in every moment the responses that the API will return to your web page.

__You'll be able to develop Cypress tests for error cases, slow requests and many other cases that are very hard to reproduce with a real API__, with the advantage that you could reuse the same mock while you are developing the application, because in that case you can control it using any of the other integration tools, such as the [interactive CLI](./command-line.md).

## Installation

```bash
npm i --save-dev @mocks-server/cypress-commands
```

Add this line to your project's `cypress/support/commands.js` file:

```js
import "@mocks-server/cypress-commands"
```

## Cypress Commands

Set current [collection](../usage/collections.md):

```js
cy.mocksSetCollection("admin-user");
```

Use specific [route variant](../usage/routes.md):

```js
cy.mocksUseRouteVariant("get-users:error");
```

Restore [route variants](../usage/routes.md) to those defined in current [collection](../usage/collections.md):

```js
cy.mocksRestoreRouteVariants();
```

Set delay time:

```js
cy.mocksSetDelay(2000);
```

Set any other [configuration option](../configuration/options.md):

```js
cy.mocksSetConfig({
  files: {
    watch: false,
  },
  mock: {
    routes: {
      delay: 0,
    },
    collections: {
      selected: "get-users-error"
    },
  },
});
```

Configures the [Mocks Server administration API client](https://github.com/mocks-server/main/tree/master/packages/admin-api-client/README.md), used under the hood to communicate with the [Mocks Server administration API](./rest-api.md). Use this command only if you changed the administration API configuration and you need to configure the client properly.

```js
cy.mocksConfigAdminApiClient({
  port: 3110,
  host: "127.0.0.1"
});
```

## Example

```js
describe("books page", () => {
  describe("when there are two books", () => {
    before(() => {
      // highlight-next-line
      cy.mocksSetCollection("two-books"); // Use "two-books" collection
      cy.visit("/");
    });

    it("should display two books", () => {
      cy.get("#books li").should("have.length", 2);
    });
  });

  describe("when there is an error loading data", () => {
    before(() => {
      // highlight-next-line
      cy.mocksUseRouteVariant("get-books:error"); // Use "get-books:error" route variant
      cy.visit("/");
    });

    after(() => {
      // highlight-next-line
      cy.mocksRestoreRouteVariants(); // Restore mock route variants after the test
    });

    it("should display error message", () => {
      cy.get("#books .error").should("exist");
    });
  });

  describe("when the API is slow", () => {
    before(() => {
      // highlight-next-line
      cy.mocksSetDelay(3000); // Set a delay of 3 seconds in API responses
      cy.visit("/");
    });

    after(() => {
      // highlight-next-line
      cy.mocksSetDelay(0); // Restore the delay to 0
    });

    it("should display loading", () => {
      cy.get("#books .loading").should("exist");
    });

    it("should display two books", () => {
      cy.get("#books li").should("have.length", 2);
    });
  });
});

```

## Starting the application, Mocks Server and Cypress

For running tests, you'll need to start your application configured to make requests to the Mocks Server url, start Mocks server, and only then, start the execution of Cypress.

We recommend the usage of the [`start-server-and-test`](https://github.com/bahmutov/start-server-and-test) package to start all needed dependencies before running tests.

The next example is based on a `create-react-app` application which is using the `REACT_APP_BASE_API` environment variable to set the api url:

```json
{
  "scripts": {
    "mocks:ci": "mocks-server --no-plugins.inquirerCli.enabled",
    "start": "REACT_APP_BASE_API=http://localhost:3100 react-scripts start",
    "mocks:ci-and-start": "start-server-and-test mocks:ci tcp:3100 start",
    "cypress:run": "cypress run",
    "test": "start-server-and-test mocks:ci-and-start http-get://localhost:3000 cypress:run",
  }
}
```

Now, when running `npm run test`, Mocks Server will be started without the interactive CLI, then the application will be started configured to make requests to the Mocks Server url, and then the Cypress tests will be executed.

## Configuration

By default, the API client is configured to request to `http://localhost:3110/api`, based in the [default Mocks Server options](../configuration/options.md)

You can change both the host and port of the [administration API](./rest-api.md) using the `cy.mocksConfigAdminApiClient` command mentioned above, or the plugin environment variables:

* __`MOCKS_SERVER_ADMIN_API_PORT`__: Modifies the admin API client port. Default is `3110`.
* __`MOCKS_SERVER_ADMIN_API_HOST`__: Modifies the admin API client host. Default is `127.0.0.1`.
* __`MOCKS_SERVER_ENABLED`__: Disables requests to the Mocks Server admin API, so the commands will not fail even when Mocks Server is not running. This is useful to reuse same tests with a mocked API and a real API, because commands to change Mocks Server configuration will be ignored.
