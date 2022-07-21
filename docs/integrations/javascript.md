---
id: javascript
title: JavaScript integration
description: How to use Mocks Server using JavaScript
keywords:
  - mocks server
  - mock server
  - JavaScript
  - node
  - nodejs
  - integration
  - tutorial
  - guide
  - how to
  - programmatic
  - usage
  - api
  - constructor
  - instance
---

## Preface

The server provides a JavaScript API that enables you to control it and to tap into, modify, or extend its internal behavior. It provides its JavaScript `core` instance to plugins, middlewares and other system elements.

## Ways of obtaining a core instance

Apart from [creating your own `core` instance programmatically](#creating-your-own-instance), you can also use it from other system elements, because it is passed as an argument to them. Some elements to which the core instance is passed are:

* __Plugins__: A plugin receives the core instance on its constructor and in all of its standardized methods. Read [plugins development](../plugins/development.md) for further info.
* __Variant handlers__: A variant handler receives the core instance on its constructor. Read [variant handlers development](../variant-handlers/development.md) for further info.
  * __middleware variants__: The core is passed from the `middleware` variant handler to the middleware functions defined in that type of variants. So, it can be used directly in Express middlewares. Read the [middleware variant chapter](../usage/variants/middleware.md) for further info.


## Creating your own instance

The server can be also instantiated and started programmatically.

```js
const Core = require("@mocks-server/main");
const { routes, collections } = require("./fixtures");

const server = new Core({
  config: {
    readFile: false,
  },
  files: {
    read: false,
  },
  plugins: {
    inquirerCli: {
      enabled: false,
    },
  },
});

server.start().then(() => {
  const { loadRoutes, loadCollections } = server.mock.createLoaders();
  loadRoutes(routes);
  loadCollections(collections);

  server.mock.collections.select("collection-a");
});
```

:::tip
Read the [API chapter](../api/javascript.md) for further info about core available methods
:::

### Use cases

Starting the server using JavaScript may be useful for:

* [Control it from your preferred unit testing framework, such as Jest.](#example-with-jest)
* [Creating your own Mocks Server distribution](#creating-your-own-distribution), pre-installing the plugins of your choice.

:::tip
It is also possible to tap into, modify, or extend the server internal behavior without having to start it by your own. You can also [create a plugin](#customization-using-plugins) and load it using the configuration file.
:::

## Example with Jest

You can start, control and stop the mock server programmatically from your NodeJs unit tests.

You could use the configuration file and load routes, variants and collections creating files in the "mocks" folder as usual, or even disable files and load all configuration and fixtures programmatically also:

```js
const Core = require("@mocks-server/main");
const { routes, collections } = require("./fixtures");

beforeAll(async () => {
    const server = new Core({
      config: {
        readFile: false,
      },
      files: {
        read: false,
      },
      plugins: {
        inquirerCli: {
          enabled: false,
        },
      },
    });

    await server.start();
    const { loadRoutes, loadCollections } = server.mock.createLoaders();
    loadRoutes(routes);
    loadCollections(collections);
});

afterAll(async () => {
    await server.stop();
});

describe("users API client", () => {
  it("getUsers method should return 3 users", async () => {
      // Select the collection returning the expected data
      server.mock.collections.select("3-users");

      // configure the unit under test
      const usersApiClient = new UsersService('http://localhost:3100/api/users');

      // call your unit under test, which invokes the mock
      const users = await usersApiClient.getUsers();

      // assert values returned by the mock
      expect(users.length).toEqual(3);
  });
});
```

## Creating your own distribution

The main distribution of Mocks Server ([@mocks-server/main](https://www.npmjs.com/package/@mocks-server/main)) includes some preinstalled plugins. But you could also create your own distribution with the plugins of your choice or predefined configuration in case you need to reuse those presets in many projects, for example. To achieve it, you should use the [@mocks-server/core](https://www.npmjs.com/package/@mocks-server/core) package, and start it by your own setting the programmatic configuration that you need. Using the "programmatic" configuration still allows the end user to modify it using [other configuration methods](../configuration/how-to-change-settings.md), such as the configuration file, environment variables, etc.

```js
const Core = require("@mocks-server/core");
const PluginProxy = require("@mocks-server/plugin-proxy");

const MyPlugin = require("./MyPlugin");

const start = () => {
  const server = new Core(
    {
      plugins: {
        register: [PluginProxy, MyPlugin],
      },
    },
  );
  return server.start();
};

module.exports = {
  start,
};
```

## Customization using plugins

If you only want tap into, modify, or extend the server internal behavior, then you probably don't need to start the server by your own. You can use the main distribution and use the configuration file to add your own plugin, which provides to you access to the [whole server core JavaScript API](../api/javascript.md).

:::tip
Read the [plugins chapter](../plugins/intro.md) for further info about how to create plugins.
:::
