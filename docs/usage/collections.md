---
id: collections
title: Collections
description: Mocks Server collections
keywords:
  - mocks server
  - mock server
  - nodejs
  - variants
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
```

## Description

* A `collection` of route variants defines all current routes with their correspondent variant in the API mock.
* They can be created extending other collections. So, you can store many collections and change the whole API behavior by simply changing the current one.

So, basically, when you define a collection, you are saying to the server:

> _"When this route is requested send the response defined on its variant X, for that one use the response defined on its variant Y, etc."_

__The management of different responses for the same route and the ability to store different collections allows to easily toggle between many predefined API state simulations__ without having to modify any code. This is great while developing an API client, because all of the responses of the API can be changed at a time using the interactive CLI. And it is also great while running tests, because the different collections can be used to test different scenarios.

```mdx-code-block
<DocsImage src={MainConceptsSchema} alt="Main concepts schema" />
```

## Load

* Usually, collections must be defined in the `mocks/collections.js` file of your project. You can also use a `.json` file, or event other formats [using Babel](../guides/using-babel.md).
* Collections can also be loaded programmatically using the [JavaScript API](../integrations/javascript.md).

```
project-root/
├── mocks/
│   ├── routes/
│   │   ├── common.js
│   │   ├── books.js
│   │   └── users.js
│   └── collections.js <- DEFINE YOUR COLLECTIONS HERE
└── mocks.config.js
```

## Format

Collections must be defined as an array of objects containing:

* __`id`__ _(String)_: Identifier for the collection.
* __`from`__ _(String)_: Optional. Collection id from which this collection extends.
* __`routes`__ _(Array of Strings)_: Route ids and the variant id to be used by each one of them, expressed in the format `[routeId]:[variantId]`


```mdx-code-block
<Tabs>
<TabItem value="Json">
```

```json
[
  {
    "id": "base", // collection id
    "routes": ["get-users:all", "get-user:id-1"] // collection routes
  },
  {
    "id": "user-2", // collection id
    "from": "base", // extends "base" collection
    "routes": ["get-user:id-2"] // "get-user" route uses "id-2" variant instead of "id-1"
  }
]
```

```mdx-code-block
</TabItem>
<TabItem value="JavaScript">
```

```js
module.exports = [
  {
    id: "base", // collection id
    routes: ["get-users:all", "get-user:id-1"] // collection routes
  },
  {
    id: "user-2", // collection id
    from: "base", // extends "base" collection
    routes: ["get-user:id-2"] // "get-user" route uses "id-2" variant instead of "id-1"
  }
];
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Changing the current collection

You can use the configuration or any of the available APIs or integration tools to change the current collection while the server is running:

```mdx-code-block
<Tabs>
<TabItem value="Configuration">
```

```js
module.exports = {
  mock: {
    collections: {
      selected: "collection-b",
    },
  },
};
```

```mdx-code-block
</TabItem>
<TabItem value="NodeJS">
```

```js
const Core = require("@mocks-server/main");

const core = new Core();

core.start().then(() => {
  // highlight-next-line
  core.mock.collections.select("collection-b");
});
```

```mdx-code-block
</TabItem>
<TabItem value="Interactive CLI">
```

![Interactive CLI](../assets/inquirer-cli.gif)

:::note
Select "Select collection" -> press "Enter" -> Select the collection you want for the server to use -> press "Enter".
:::

```mdx-code-block
</TabItem>
<TabItem value="Cypress">
```

```js
describe("books page", () => {
  describe("when there are two books", () => {
    before(() => {
      // highlight-next-line
      cy.mocksSetCollection("collection-b"); // Change collection to "collection-b"
      cy.visit("/");
    });

    it("should display two users", () => {
      cy.get("#users li").should("have.length", 2);
    });
  });
});
```

```mdx-code-block
</TabItem>
<TabItem value="REST API">
```

```bash
curl -X PATCH -d '{"routes":{"collections":{"selected":"collection-b"}}}' -H 'Content-Type: application/json' http://localhost:3200/admin/settings
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Defining custom route variants

Mocks Server provides a feature to change the variant of routes defined in the current collection while the server is running without the need to create another collection nor modify any code.

For example, if the current collection defines that for the `route-A` it uses the `variant-B` (`"routes": ["route-A:variant-B"]`), you can change it temporarily to return the `variant-C` using any of the available APIs or integration tools. When doing so, the current collection will be modified in memory, and it will be restored whenever another collection is selected or routes or collections are reloaded.

:::info
This is very useful when you need to change the response of only one route temporarily, because you don't need to create another collection or to modify an existent one.
:::

```mdx-code-block
<Tabs>
<TabItem value="NodeJS">
```

```js
const Core = require("@mocks-server/main");

const core = new Core();

core.start().then(() => {
  core.mock.collections.select("collection-b");
  // highlight-next-line
  core.mock.collection.useRouteVariant("route-A:variant-C")
});
```

```mdx-code-block
</TabItem>
<TabItem value="Cypress">
```

```js
describe("books page", () => {
  describe("when there are two books", () => {
    before(() => {
      // highlight-next-line
      cy.mocksUseRouteVariant("get-books:two");
      cy.visit("/");
    });

    after(() => {
      // highlight-next-line
      cy.mocksRestoreRouteVariants();
    });

    it("should display two users", () => {
      cy.get("#users li").should("have.length", 2);
    });
  });
});
```

```mdx-code-block
</TabItem>
<TabItem value="REST API">
```

```bash
curl -X POST -d '{"id": "get-user:2"}' -H 'Content-Type: application/json' http://localhost:3110/api/mock/custom-route-variants
```

```mdx-code-block
</TabItem>
<TabItem value="Interactive CLI">
```

![Interactive CLI](../assets/inquirer-cli.gif)

:::note
Select "Use route variant" -> press "Enter" -> Select the route variant you want for the collection to use -> press "Enter".
:::

```mdx-code-block
</TabItem>
</Tabs>
```

:::caution
Custom variants for the current collections are lost whenever another collection is selected or a change is made in files. If you need to set that scenario frequently, then you should consider creating a collection instead.
:::

## Extending collections

Collections can be created extending another one. This means that __you can get all of the routes defined in one collection, and create another collection changing only the variants of some of its routes__.

This is specially important when an API contains many resources, because you could create a "base" collection containing all of the routes, and simulate different API behaviors creating collections from the "base" one. So, if you had to add another url to the API, for example, you could add it to the "base" collection and all of the other collections would inherit it.

As you will see in the next section, the order in which routes are added to a collection may be important. So, it is important to know that, __when extending collections and redefining the variant of one route, the route will keep the same order in which it was originally defined in the first collection__. For example:

```js
module.exports = [
  {
    id: "base",
    routes: ["get-users:all", "get-user:id-1", "delete-user:success", "create-user:success"]
  },
  // highlight-start
  {
    id: "user-2",
    from: "base",
    routes: ["get-user:id-2"] // "get-user" route is still in the second place of the collection
  }
  // highlight-end
];
```

## The order matters

Note that the order in which route variants are added to the array may be important. __The first route in the array matching the route method and route url will handle the request__.

If many routes match the url and method:
* The first route variant sending a response will produce the rest to be ignored.
* If the first variant matching the url and method is of type `middleware` and it calls to the `next` parameter, then the next route matching the url and method will be executed.

So, you can use the order of the routes in a collection to apply middlewares in the order that you want.

:::info
When creating collections extending from another one, the new route variant will replace the old one in the same position that it was originally defined. Read [extending collections](#extending-collections) above for further info.
:::

## Good practices

### Base collection

It is recommended to create a "base" collection containing all of the routes, and simulate different API behaviors creating collections from the "base" one. So, if you had to add another url to the API, for example, you could add it to the "base" collection and all of the other collections would inherit it.

:::note
The name of your "base" collection could be any other one, such as "main", "default", "all-routes", etc.
:::

### Limit the amount of collections

Sometimes you'll need to change the response of only one specific route. Instead of creating a new collection for that, you can set [custom route variants](#defining-custom-route-variants) and the current collection will be modified in memory.
