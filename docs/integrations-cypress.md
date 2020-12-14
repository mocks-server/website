---
id: integrations-cypress
title: Cypress integration
---

## Cypress commands

The Mock Server integrates with [Cypress](https://www.cypress.io/) tests very well.

Using the Cypress commands provided by the package [@mocks-server/cypress-commands](http://npmjs.com/package/@mocks-server/cypress-commands) you'll be able to change the current behavior of the server simply using a Cypress command. This means that you can __develop solid tests, without the dependency of the real api__, because you will control in every moment the responses that the api will return to your web page.

You'll be able to develop Cypress tests for error cases, slow requests _(using the `cy.mocksServerSetDelay` command)_ and many other cases that are very hard to reproduce with a real api, with the advantage that you will also reuse the same mocks while you are developing the application.

## Start the application, Mocks Server and Cypress

For running the tests, you'll need to start your application configured for making requests to the mock server, start the mock server, and only then, start the execution of Cypress.

We recommend the usage of the "start-server-and-test" package to start all needed dependencies before running tests.

The next example is based on a "create-react-app" application which is using the `REACT_APP_BASE_API` environment variable to set the api url:

```json
{
  "scripts": {
    "mocks:ci": "mocks-server --cli=false",
    "start:mocked": "REACT_APP_BASE_API=http://localhost:3100 react-scripts start",
    "mocks:ci-and-start:mocked": "start-server-and-test mocks:ci tcp:3100 start:mocked",
    "cypress:run": "cypress run",
    "test:mocked": "start-server-and-test mocks:ci-and-start:mocked http-get://localhost:3000 cypress:run",
  }
}
```

Now, when running `npm run test:mocked` the mock server will be started without the interactive CLI, then the application will be started configured to make requests to the mock server, and then the Cypress tests will be executed.

## Reusing tests for e2e and mocks

Running tests only using a mock server is not enough, for sure that you want to run your tests also using the real api, but only a subgroup of them, as not every tests will be valid for the real api (as error cases, etc.).

Here you have a proposal about how to reuse your tests and run them in two different ways. For the moment it requires some extra configuration, but we will try to provide better tools to achieve this easier in next releases:

### Use an environment variable to skip tests

We will use a `MOCKS_DISABLED` environment variable to skip tests that can be executed only when the application is requesting to the mocks server.

Create a "onlyMocks" utility in the `cypress/support/utils.js` file:

```
export const onlyMocks = fn => {
  if (!Cypress.env("MOCKS_DISABLED")) {
    fn();
  }
};
```

Now, wrap your mock-server dependent tests definitions using the "onlyMocks" method:

```javascript
import { onlyMocks } from "../support/utils";

onlyMocks(() => {
  describe("This tests will only be executed when mocks are enabled", () => {
    // ...
  });
});
```

### Disable Mocks Server Cypress commands

Reuse the same method to ensure that Cypress commands requesting to the Mocks Server will not be executed when the Mocks Server is not started:

```javascript
import { onlyMocks } from "../support/utils";

describe("This tests will be executed for mocks and real api", () => {
  before(() => {
    onlyMocks(() => {
      cy.mocksServerChangeBehavior("foo-behavior");
    });
  });
});
```

### Start the application with the real api and Cypress

Based on the previous example, now we can add a command to start the application configured to make requests to the real api and run Cypress at a time:

```json
{
  "scripts": {
    "mocks:ci": "mocks-server --cli=false",
    "start:mocked": "REACT_APP_BASE_API=http://localhost:3100 react-scripts start",
    "start:api": "REACT_APP_BASE_API=http://foo-api.com react-scripts start",
    "mocks:ci-and-start:mocked": "start-server-and-test mocks:ci tcp:3100 start:mocked",
    "cypress:run": "cypress run",
    "test:mocked": "start-server-and-test mocks:ci-and-start:mocked http-get://localhost:3000 cypress:run",
    "test:api": "start-server-and-test start:api http-get://localhost:3000 CYPRESS_MOCKS_DISABLED=true cypress:run"
  }
}
```

Now, when running `npm run test:api` the application will be started configured to make requests to the real api, and then the Cypress tests will be executed skipping mock-dependent tests.
