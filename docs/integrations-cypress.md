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

## Cypress commands

Mocks Server integrates with [Cypress](https://www.cypress.io/) tests very well.

Using the Cypress commands provided by the package [@mocks-server/cypress-commands](http://npmjs.com/package/@mocks-server/cypress-commands) you'll be able to change the current [`mock`](get-started-mocks.md) of the server simply using a Cypress command. This means that you can __develop solid tests, without the dependency of the real API__, because you will control in every moment the responses that the api will return to your web page.

### Commands

Set current [mock](get-started-mocks.md):

```js
cy.mocksServerSetMock("admin-user");
```

Use specific [route variant](get-started-routes.md):

```js
cy.mocksServerUseRouteVariant("get-users:error");
```

Set delay time:

```js
cy.mocksServerSetDelay(2000);
```

Set any setting:

```js
cy.mocksServerSetSettings({
  watch: false,
  delay: 0,
  mock: "get-users-error"
});
```

You'll be able to develop Cypress tests for error cases, slow requests _(using the `cy.mocksServerSetDelay` command)_ and many other cases that are very hard to reproduce with a real api, with the advantage that you will also reuse the same mocks while you are developing the application.

## Start the application, Mocks Server and Cypress

For running tests, you'll need to start your application configured to make requests to the Mocks Server url, start the Mocks server, and only then, start the execution of Cypress.

We recommend the usage of the [`start-server-and-test`](https://github.com/bahmutov/start-server-and-test) package to start all needed dependencies before running tests.

The next example is based on a `create-react-app` application which is using the `REACT_APP_BASE_API` environment variable to set the api url:

```json
{
  "scripts": {
    "mocks:ci": "mocks-server --cli=false",
    "start:mocked": "REACT_APP_BASE_API=http://localhost:3100 react-scripts start",
    "mocks:ci-and-start:mocked": "start-server-and-test mocks:ci tcp:3100 start:mocked",
    "cypress:run": "MOCKS_SERVER_URL=ttp://localhost:3100 cypress run",
    "test:mocked": "start-server-and-test mocks:ci-and-start:mocked http-get://localhost:3000 cypress:run",
  }
}
```

Now, when running `npm run test:mocked`, Mocks Server will be started without the interactive CLI, then the application will be started configured to make requests to the Mocks Server url, and then the Cypress tests will be executed.

## Reusing tests for e2e and mocks

Running tests only using a mock server is not enough, for sure that you want to run your tests also using the real API, but only a subgroup of them, as not every tests will be valid for the real API (error cases, etc.).

Here you have a proposal about how to reuse your tests and run them in two different ways:

### Use an environment variable to skip tests

We will use the `MOCKS_SERVER_URL` environment variable to know if Mocks Server is enabled, and skip tests that can be executed only when the api is mocked.

Create a `onlyMocks` utility in the `cypress/support/utils.js` file:

```
export const onlyMocks = fn => {
  if (!!Cypress.env("MOCKS_SERVER_URL")) {
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
    "mocks:ci": "mocks-server --cli=false",
    "start:mocked": "REACT_APP_BASE_API=http://localhost:3100 react-scripts start",
    "start:api": "REACT_APP_BASE_API=http://foo-api.com react-scripts start",
    "mocks:ci-and-start:mocked": "start-server-and-test mocks:ci tcp:3100 start:mocked",
    "cypress:run": "cypress run",
    "test:mocked": "start-server-and-test mocks:ci-and-start:mocked http-get://localhost:3000 cypress:run",
    "test:api": "start-server-and-test start:api http-get://localhost:3000 cypress:run"
  }
}
```

Now, when running `npm run test:api` the application will be started configured to make requests to the real API, and then the Cypress tests will be executed skipping mock-dependent tests.
