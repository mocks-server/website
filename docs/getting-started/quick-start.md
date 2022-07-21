---
id: quick-start
title: Quick start
slug: /quick-start
description: First steps with Mocks Server
keywords:
  - mocks server
  - mock server
  - nodejs
  - quick start
  - tutorial
  - first steps
  - configuration
  - setup
  - fast track
  - introduction
  - guide
  - how to
---

## Installation

A quick reminder of [how to install Mocks Server](./installation.md) using NPM:

```bash
npm i -D @mocks-server/main
```

Add the next script to the `package.json` file:

```json
{
  "scripts": {
    // highlight-next-line
    "mocks" : "mocks-server"
  }
}
```

## Start the mock server

Once you have [installed Mocks Server and added the npm script](./installation.md), you'll be able to start it by simply running an NPM command in the project's folder:

```bash
npm run mocks
```

## Interactive CLI

When it is started, the interactive CLI is displayed. It allows you to see some details about the current configuration. Using the arrow keys and the `Return` key you can choose menu options in order to perform some actions, like changing the current collection, setting a delay time for the server responses, etc.

![Interactive CLI](../assets/inquirer-cli.gif)

This CLI is a great tool for controlling the mock server while you are developing an API client, because you can change the server responses in real time using it without modifying any code. Suppose that you are developing a web application that is polling to the API, and you want to check if it is refreshing the data properly. The only thing that you have to do is to use the CLI to change the current responses collection, and the next time the application requests a data, the response will be different.

:::note
The [interactive CLI can be disabled using configuration](../configuration/how-to-change-settings.md), and then the server logs will be displayed instead. This should be done when using the server for running tests, for example.
:::

## Main concepts

* __Routes__: A `route` defines the url and method of an API resource. Wildcards can be used in urls and methods, so one `route` can simulate one real API resource, or many.
* __Variants__: Each `route` can contain many different `variants`. Each `variants` can define a response to send, or a middleware to execute, or a url to proxy the request, etc.
* __Collections__: A `collection` of route variants defines all current routes and variants in the mocked API. They can be created extending other collections. So, you can store many collections and change the whole API behavior by simply changing the current one.

:::tip
Read the [usage chapter](../usage/basics.md) in 5 minutes ⏱ to fully understand the Mocks Server main concepts: Routes, Variants and Collections.
:::

## Scaffold

When the server is started for the first time, it will create a configuration file and a scaffold folder containing some examples of routes and collections.

```
project-root/
├── mocks/
│   ├── routes/ <- DEFINE YOUR ROUTES HERE
│   │   ├── common.js
│   │   └── users.js
│   └── collections.json <- DEFINE YOUR COLLECTIONS HERE
└── mocks.config.js <- DEFINE YOUR CONFIGURATION HERE
```

* The server loads all files in the `mocks/routes` folder, which must contain the [route definitions](../usage/routes.md).
* The `mocks/collections.json` file is used to define [collections](../usage/collections.md) of [route variants](../usage/variants.md).
* The server watches for changes in all files in the `mocks` folder, so changing a file will immediately update the mocked API.

:::info
Collections and routes can also be defined programmatically. Read the [Javascript integration chapter](../integrations/javascript.md) for further info.
:::

## First steps

In this brief tutorial we are going to use the interactive CLI to change the responses of the API mock in order to learn some basic concepts. But remember that this can also be made using any of the available APIs in Mocks Server or any of the integration tools.

### Changing the current collection

The scaffold creates an API mock containing two main routes. The selected default collection is `base`, which returns 3 users in `api/users` and the user 1 in `api/users/:id`:

* [http://localhost:3100/api/users/](http://localhost:3100/api/users/) -> `[{"id":1,"name":"John Doe"},{"id":2,"name":"Jane Doe"}]`
* [http://localhost:3100/api/users/2](http://localhost:3100/api/users/2) -> `{"id":1,"name":"John Doe"}`

:::note
Note that the server is sending the user with id 1 even when we requested the user with id 2. And this is completely normal, because this is an API mock 😉.
:::

But, what about if you need another responses in a particular moment? For example, you want 3 users instead of 2 in `api/users`, and the user 2 to be returned by `api/users/:id`. Well, then you're lucky, because the scaffold already contains a collection sending that specific responses 😄. Let's change the current collection to `all-users`:

* Select `Select collection` -> press `Return` -> select `all-users` -> press `Return`.

Now, the responses of both routes have changed:

* [http://localhost:3100/api/users/](http://localhost:3100/api/users/) -> `[{"id":1,"name":"John Doe"},{"id":2,"name":"Jane Doe"},{"id":3,"name":"Tommy"},{"id":4,"name":"Timmy"}]`
* [http://localhost:3100/api/users/2](http://localhost:3100/api/users/2) -> `{"id":3,"name":"Tommy"}`

### Changing a route variant

But, what about if you want the API to return all users in `api/users`, but still return the user 2 in `api/users/:id`? Should you create another collection just to change the response of that single url? The response is _no_. You can also change the response of a single url [changing a route variant](../usage/collections.md#defining-custom-route-variants):

* Select `Use route variant` -> press `Return` -> select `get-user:success` -> press `Return`.

Now, the responses of the routes are:

* [http://localhost:3100/api/users/](http://localhost:3100/api/users/) -> `[{"id":1,"name":"John Doe"},{"id":2,"name":"Jane Doe"},{"id":3,"name":"Tommy"},{"id":4,"name":"Timmy"}]`
* [http://localhost:3100/api/users/2](http://localhost:3100/api/users/2) -> `{"id":1,"name":"John Doe"}`

What happened? As you can see in the interactive CLI, the current collection is still `all-users`, so it returns all of the users in `api/users`, but you have set the custom route variant `get-user:success`, so it returns the `success` variant of the `get-user` route instead of the default variant defined in the collection.

:::caution
Changes in route variants are lost whenever another collection is selected or a change is made in files. If you need to set that scenario frequently, you should consider creating a collection instead.
:::

### Creating variants

Now suppose that we want the API to return the user 2 in `api/users/:id`. After checking the `get-user` route in the `mocks/routes/users.js` file in order to know if it contains any variant returning that data, we know that it contains only three variants:

* `success` - Returns the user 1
* `id-3` - Returns the user 3
* `real` - Middleware that searches for the user by the received id and returns it.

We could use the `get-user:real` route variant and request for  `api/users/2`, but that is not what we want in this particular case. We want the API to always return the user 2. So, let's create another variant. Add the next code to the `variants` array in the `get-user` route:

```js
{
  id: "id-2", // id of the variant
  type: "json", // variant type
  response: {
    status: 200, // status to send
    body: ALL_USERS[1], // body to send
  },
}
```

The new variant is added once the file is saved. So, let's change again the current collection route variants:

* Select `Use route variant` -> press `Return` -> select `get-user:id-2` -> press `Return`.

* [http://localhost:3100/api/users/2](http://localhost:3100/api/users/2) -> `{"id":2,"name":"Jane Doe"}`

:::tip
Read the [routes](../usage/routes.md) and [variants](../usage/variants.md) chapters to learn more about how to create them.
:::

### Creating collections

Well, finally, this is the state that we wanted: We are returning all users in `api/users/` and the user 2 in `api/users/:id`. Suppose that we need to set that specific responses frequently, or that we want to store them for running tests or any other reason. Then, we can create a collection:

Open the `mocks/collections.json` file. There you'll find an array with four elements. Let's add our new collection to it:

```json
{
  "id": "all-users-user-2",
  "from": "all-users",
  "routes": ["get-user:id-2"]
}
```

This means that, for creating our collection `all-users-user-2` we are extending the `all-users` collection, and we are defining for it another variant for the route `get-user`. Then, for this collection Mocks server will use all of the route variants defined in the `all-users` collection, but it will use the `id-2` variant instead of the `id-3` one. We can define as many other route variants as we want for each collection.

Now, let's select our new collection:

* Select `Select collection` -> press `Return` -> select `all-users-user-2` -> press `Return`.

* [http://localhost:3100/api/users/](http://localhost:3100/api/users/) -> `[{"id":1,"name":"John Doe"},{"id":2,"name":"Jane Doe"},{"id":3,"name":"Tommy"},{"id":4,"name":"Timmy"}]`
* [http://localhost:3100/api/users/2](http://localhost:3100/api/users/2) -> `{"id":2,"name":"Jane Doe"}`

:::tip
Read the [collections chapter](../usage/collections.md) to learn more about how to define them.
:::

### Changing the configuration

Now that we have created our own collection, we want the server to use it whenever it is started. So, let's change the configuration. Modify the `mocks.config.js` file and change the `mock.collections.selected` property:

```js
{
  mock: {
    collections: {
      selected: "all-users-user-2",
    },
  }
}
```

The next time the server is started, it will use that collection.

:::info
Modifying the `mocks.config.js` file is not the only method for changing configuration. You can also use environment variables or command line arguments, for example. Read the [configuration chapter](../configuration/how-to-change-settings.md) for further info.
:::

## Next steps

* Read the [usage chapter](../usage/basics.md) to fully understand the concepts of Route, Variant and Collection, and how to create or modify them.
* Read the [configuration chapter](../configuration/how-to-change-settings.md) in order to be able to configure the server for different use cases and environments: Local development, running tests locally, running tests in CI, etc.
* Read one of the different integration chapters in order to easily control Mocks Server using your preferred tool or ecosystem:
  * [CLI](../integrations/command-line.md)
  * [JavaScript](../integrations/javascript.md)
  * [Cypress](../integrations/cypress.md)
  * [REST API](../integrations/rest-api.md)
* Do you have an idea for extending Mocks Server with your own features?
  * Add new variant types by creating [custom variant type handlers](../variant-handlers/intro.md).
  * [Plugins](../plugins/intro.md) enable you to tap into, modify, or extend its internal behavior.
