---
id: basics
title: Basics
description: Mocks Server main concepts
keywords:
  - mocks server
  - mock server
  - nodejs
  - routes
  - route
  - variants
  - variant
  - collections
  - collection
  - routes
  - usage
  - concept
  - feature
  - get started
  - first steps
  - introduction
  - description
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocsImage from '@site/src/components/DocsImage';
import MainConceptsSchema from '../assets/main-concepts.png';
import WorkflowSchema from '../assets/workflow.png';
```

## Main concepts

Mocks Server relies on three simple concepts for simulating, control and storage multiple API scenarios:

* __Routes__: A `route` defines the url and method of an API resource. Wildcards can be used in urls and methods, so, one `route` can simulate one real API resource, or many.
* __Variants__: Each `route` can contain many different `variants`. Each `variant` can define a response to send, or a middleware to execute, or a url to proxy the request, etc.
* __Collections__: A `collection` of route variants defines all current routes and variants in the mocked API. They can be created extending other collections. So, you can store many collections and change the whole API behavior by simply changing the current one.

```mdx-code-block
<DocsImage src={MainConceptsSchema} alt="Main concepts schema" />
```

:::info
Read [Routes](./routes.md), [Variants](./variants.md) and [Collections](./collections.md) chapters for further info about how to define them
:::

## Motivation

__The management of different responses for the same route and the ability to store different collections allows to easily toggle between many predefined API state simulations.__ This is perfect while developing an API client, because all of the responses of the API can be changed at a time using the interactive CLI, or one single response can be changed also without modifying any code. And it is also perfect while running tests, because the different route variants collections can be used to test different scenarios.

Exposing different APIs allowing to control the server while it is running makes able to integrate it easily with different tools and ecosystems. So, once the responses are defined, they can be reused in different development lifecycle stages, such as local development, continuous integration testing, etc.

```mdx-code-block
<DocsImage src={WorkflowSchema} alt="Workflow schema" />
```

Here you have some examples about how to change the current collection and other settings using different integration tools from different ecosystems:

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```js
const { createServer } = require("@mocks-server/main");

const core = createServer();

core.start().then(() => {
  // highlight-next-line
  core.mock.collections.select("collection-a");
});
```

```mdx-code-block
</TabItem>
<TabItem value="Interactive CLI">
```

![Interactive CLI](../assets/inquirer-cli.gif)

```mdx-code-block
</TabItem>
<TabItem value="Cypress">
```

```js
describe("users page", () => {
  describe("when there are two users in the API", () => {
    before(() => {
      // highlight-next-line
      cy.mocksSetCollection("two-users"); // Use "two-users" routes and variants
      cy.visit("/");
    });

    it("should display two users", () => {
      cy.get("#users li").should("have.length", 2);
    });
  });

  describe("when there is an error loading users", () => {
    before(() => {
      // highlight-next-line
      cy.mocksUseRouteVariant("get-users:error"); // Use "get-users:error" route variant
      cy.visit("/");
    });

    after(() => {
      // highlight-next-line
      cy.mocksRestoreRouteVariants(); // Restore mock route variants after the test
    });

    it("should display error message", () => {
      cy.get("#users .error").should("exist");
    });
  });
});
```

```mdx-code-block
</TabItem>
<TabItem value="REST API">
```

```bash
curl -X PATCH -d '{"mock":{"collections":{"selected":"collection-c"}}}' -H 'Content-Type: application/json' http://localhost:3200/admin/settings
```

```mdx-code-block
</TabItem>
</Tabs>
```

