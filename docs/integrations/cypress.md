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

This module is distributed via npm and should be installed as one of your project's devDependencies:

```bash
npm i --save-dev @mocks-server/cypress-commands
```

### Registering commands

`@mocks-server/cypress-commands` extends Cypress' cy commands.

At the top of your Cypress' support file (usually `cypress/support/e2e.js` for `e2e` testing type):

```javascript
import { register } from "@mocks-server/cypress-commands";

register();
```

Read [Cypress configuration docs](https://docs.cypress.io/guides/references/configuration) for further info.

<details>
<summary>
Registering commands in Cypress lower than 10.0
</summary>
<div>

Add these lines to your project's `cypress/support/index.js`:

```js
import { register } from "@mocks-server/cypress-commands";

register();
```

</div>
</details>

## Cypress Commands

### cy.mocksSetCollection()

Set current [collection](../usage/collections.md):

```js
cy.mocksSetCollection("admin-user");
```

### cy.mocksUseRouteVariant()

Use specific [route variant](../usage/routes.md):

```js
cy.mocksUseRouteVariant("get-users:error");
```

### cy.mocksRestoreRouteVariants()

Restore [route variants](../usage/routes.md) to those defined in current [collection](../usage/collections.md):

```js
cy.mocksRestoreRouteVariants();
```

### cy.mocksSetDelay()

Set delay time:

```js
cy.mocksSetDelay(2000);
```

### cy.mocksSetConfig()

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

### cy.mocksConfigClient()

Configures the [Mocks Server administration API client](https://github.com/mocks-server/admin-api-client), used under the hood to communicate with the administration REST API.

* __`configuration`__ _`<Object>`_ - It must be an object containing any of next properties:
  * __`enabled`__ Enables or disables the API client.
  * __`port`__ Changes the API client port. 
  * __`host`__ Changes the API client host.

```js
cy.mocksConfigClient({
  port: 3110,
  host: "127.0.0.1"
  enabled: true,
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

## Configuration

By default, the API client is configured to request to `http://127.0.0.1:3110/api`, based in the [default Mocks Server Plugin Admin Api options](../configuration/options.md)

Use next settings only if you changed the administration API configuration and you need to configure the client properly, or in case you also need to run your tests without starting the Mocks Server.

You can change both the host and port of the administration API using the `cy.mocksConfigClient` command mentioned above, or the plugin environment variables:

* __`MOCKS_SERVER_LOGS`__: Log commands status on Cypress or not. Default is `true`.
* __`MOCKS_SERVER_ADMIN_API_PORT`__: Modifies the admin API client port. Default is `3110`.
* __`MOCKS_SERVER_ADMIN_API_HOST`__: Modifies the admin API client host. Default is `127.0.0.1`.
* __`MOCKS_SERVER_ENABLED`__: Disables requests to the Mocks Server admin API, so the commands will not fail even when Mocks Server is not running. This is useful to reuse same tests with a mocked API and a real API, because commands to change Mocks Server configuration will be ignored.

> Note: These environment variables only affect to the default Mocks Server API client (except `MOCKS_SERVER_LOGS`). Read [usage with multiple Mocks Servers](#usage-with-multiple-mocks-servers) bellow for further info.

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

## Usage with multiple Mocks Servers

This package can be used also to control multiple Mocks Server processes. __All commands described above support passing an extra argument__, which can be a different `AdminApiClient` instance configured in a different way. When the commands receive a `AdminApiClient` instance, it uses its configuration to perform requests to the Mocks Server administration API client instead of the default one.

Note that changing the plugin environment variables values don't affect to custom API clients created this way, so, if you want to configure them using environment variables you'll have to use your own.

### AdminApiClient(configuration)

Returns a new Mocks Server Admin API client to be provided to this plugin's Cypress commands, so they use that client instead of the default one. Configuration options are the same than described for the `cy.mocksConfigClient` command:

* __`configuration`__ _`<Object>`_ - Optional (configuration can be changed also afterwards using the `cy.mocksConfigClient` command and passing the client to be configured). It should be an object containing any of next properties:
  * __`enabled`__ Enables or disables the client.
  * __`port`__ Changes the client port. 
  * __`host`__ Changes the client host.

### Commands API when using a custom client

* __`cy.mocksSetCollection("users-error", adminApiClient)`__ - Set current collection using the provided client.
* __`cy.mocksUseRouteVariant("users:success", adminApiClient)`__ - Set a specific route variant using the provided client.
* __`cy.mocksRestoreRouteVariants(adminApiClient)`__ - Restore route variants using the provided client.
* __`cy.mocksSetDelay(2000, adminApiClient)`__ - Set routes default delay using the provided client.
* __`cy.mocksSetConfig(mocksServerConfiguration, adminApiClient)`__ - Set any [Mocks Server setting](../configuration/options.md) using the provided client.
* __`cy.mocksConfigClient(clientConfiguration, adminApiClient)`__ - Configures the provided admin API client.

### Example

```js
import { AdminApiClient } from "@mocks-server/cypress-commands";

const usersApiClient = new AdminApiClient({
  port: 3500,
  host: "127.0.0.1"
});
const gravatarApiClient = new AdminApiClient({
  port: 3200,
  host: "localhost"
});

describe("users page", () => {
  describe("When normal user is logged in and gravatar API does not work", () => {
    before(() => {
      cy.mocksSetCollection("normal-user", usersApiClient);
      cy.mocksSetCollection("server-error", gravatarApiClient);
      cy.visit("/");
    });

    it("should not see the users section link", () => {
      cy.get("#users-section-link").should("not.be.visible");
    });

    it("should not display user avatars", () => {
      cy.get(".user-avatar").should("not.be.visible");
    });
  });
});
```
