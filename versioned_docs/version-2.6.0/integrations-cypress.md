---
id: integrations-cypress
title: Cypress integration
description: How to use Mocks Server with Cypress
keywords:
  - mocks server
  - Cypress
  - integration
  - tutorial
---

## Preface

Using the [Cypress](https://www.cypress.io/) commands provided by the package [@mocks-server/cypress-commands](http://npmjs.com/package/@mocks-server/cypress-commands) you'll be able to change the current [`mock`](get-started-mocks.md) of Mocks Server simply using a Cypress command. This means that you can __develop solid tests, without the dependency of the real API__, because you can control in every moment the responses that the api will return to your web page.

__You'll be able to develop Cypress tests for error cases, slow requests and many other cases that are very hard to reproduce with a real api__, with the advantage that you could reuse the same mocks while you are developing the application.

## Installation

```bash
npm i --save-dev @mocks-server/cypress-commands
```

Add this line to your project's `cypress/support/commands.js` file:

```js
import "@mocks-server/cypress-commands"
```
## Cypress Commands

Set current [mock](get-started-mocks.md):

```js
cy.mocksSetMock("admin-user");
```

Use specific [route variant](get-started-routes.md):

```js
cy.mocksUseRouteVariant("get-users:error");
```

Restore [routes variants](get-started-routes.md) to those defined in current [mock](get-started-mocks.md):

```js
cy.mocksRestoreRoutesVariants();
```

Set delay time:

```js
cy.mocksSetDelay(2000);
```

Set any [setting](configuration-options.md):

```js
cy.mocksSetSettings({
  watch: false,
  delay: 0,
  mock: "get-users-error"
});
```

Configures the [Mocks Server administration API client](https://github.com/mocks-server/admin-api-client), used under the hood:

```js
cy.mocksConfig({
  adminApiPath: "/foo",
  baseUrl: "http://localhost:3000"
})
```

## Example

```js
describe("books page", () => {
  describe("when there are two books", () => {
    before(() => {
      cy.mocksSetMock("two-books"); // Use "two-books" mock
      cy.visit("/");
    });

    it("should display two books", () => {
      cy.get("#books li").should("have.length", 2);
    });
  });

  describe("when there is an error loading data", () => {
    before(() => {
      cy.mocksUseRouteVariant("get-books:error"); // Use "get-books:error" route variant
      cy.visit("/");
    });

    after(() => {
      cy.mocksRestoreRoutesVariants(); // Restore mock route variants after the test
    });

    it("should display error message", () => {
      cy.get("#books .error").should("exist");
    });
  });

  describe("when the API is slow", () => {
    before(() => {
      cy.mocksSetDelay(3000); // Set a delay of 3 seconds in API responses
      cy.visit("/");
    });

    after(() => {
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

## Start the application, Mocks Server and Cypress

For running tests, you'll need to start your application configured to make requests to the Mocks Server url, start Mocks server, and only then, start the execution of Cypress.

We recommend the usage of the [`start-server-and-test`](https://github.com/bahmutov/start-server-and-test) package to start all needed dependencies before running tests.

The next example is based on a `create-react-app` application which is using the `REACT_APP_BASE_API` environment variable to set the api url:

```json
{
  "scripts": {
    "mocks:ci": "mocks-server --no-cli",
    "start:mocked": "REACT_APP_BASE_API=http://localhost:3100 react-scripts start",
    "mocks:ci-and-start:mocked": "start-server-and-test mocks:ci tcp:3100 start:mocked",
    "cypress:run": "cypress run",
    "test:mocked": "start-server-and-test mocks:ci-and-start:mocked http-get://localhost:3000 cypress:run",
  }
}
```

Now, when running `npm run test:mocked`, Mocks Server will be started without the interactive CLI, then the application will be started configured to make requests to the Mocks Server url, and then the Cypress tests will be executed.

## Configuration

By default, the API client is configured to request to `http://localhost:3100/admin`, based in the [default Mocks Server options](configuration-options.md)

You can change both the base url of Mocks Server, and the api path of the [administration API](plugins-admin-api.md) using the `cy.mocksConfig` command mentioned above, or the plugin environment variables:

* __`MOCKS_SERVER_BASE_URL`__: Modifies the base url of Mocks Server. Default is `http://localhost:3100`.
* __`MOCKS_SERVER_ADMIN_API_PATH`__: Modifies the path of the Mocks Server administration API. Default is `/admin`.
* __`MOCKS_SERVER_ENABLED`__: Disables requests to Mocks Server, so the commands will not fail even when Mocks Server is not running. This is useful to reuse same tests with mocks and a real API, because commands to change Mocks Server settings will be ignored.

## Reusing tests for real and mocked APIs

Running tests only using a mock server is not enough, probably you may want to run your tests also using the real API, but only a subgroup of them, as not every tests will be valid for the real API (error cases, etc.).

Here you have a proposal about how to reuse your tests and run them in two different ways:

### Use an environment variable to skip tests

We will use the `MOCKS_SERVER_ENABLED` environment variable to know if Mocks Server is enabled, and skip tests that can be executed only when the api is mocked.

Create an `onlyMocks` method in the `cypress/support/utils.js` file:

```
export const onlyMocks = fn => {
  if (!!Cypress.env("MOCKS_SERVER_ENABLED")) {
    fn();
  }
};
```

Now, wrap your Mocks Server dependent tests definitions using the `onlyMocks` method:

```javascript
import { onlyMocks } from "../support/utils";

onlyMocks(() => {
  describe("This tests will only be executed when mocks are enabled", () => {
    // ...
  });
});
```

### Start the application with the real API and Cypress

Based on the previous example, now we can add a command to start the application configured to make requests to the real API and run Cypress at a time:

```json
{
  "scripts": {
    "mocks:ci": "mocks-server --no-cli",
    "start:mocked": "REACT_APP_BASE_API=http://localhost:3100 react-scripts start",
    "start:api": "REACT_APP_BASE_API=http://foo-api.com react-scripts start",
    "mocks:ci-and-start:mocked": "start-server-and-test mocks:ci tcp:3100 start:mocked",
    "cypress:run": "cypress run",
    "cypress:run:no-mocks": "MOCKS_SERVER_ENABLED=false cypress run",
    "test:mocked": "start-server-and-test mocks:ci-and-start:mocked http-get://localhost:3000 cypress:run",
    "test:api": "start-server-and-test start:api http-get://localhost:3000 cypress:run:no-mocks"
  }
}
```

Now, when running `npm run test:api` the application will be started configured to make requests to the real API, and then the Cypress tests will be executed skipping mock-dependent tests. You could also use `npm run test:mocked` to run Mocks Server, start the application configured to make requests to it, and run Cypress without skipping any test.

