---
id: javascript
title: JavaScript API
description: Mocks Server JavaScript API
keywords:
  - mocks server
  - programmatic
  - api
  - core
  - methods
  - properties
  - getters
  - advanced usage
  - JavaScript
  - js
  - node
  - nodejs
---

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';
```

## Preface

Mocks Server provides its `core` instance to plugins, middlewares and other system elements. It contains methods allowing to configure it, start or stop it, listen to its events, etc. Using it also enables to tap into, modify, or extend its internal behavior.

:::caution
Use only the API methods described in this docs. Use other methods under your own risk, and take into account that they may change in minor versions without considering it as a breaking change.
:::

## Constructor

__`new Core([config], [advancedOptions])`__: Creates a new Mocks Server core instance. Read the [Javascript integrations](../integrations/javascript.md) for further info.
  * `config` _(Object)_: Any of [Mocks Server core options](../configuration/options.md#core-options) or [plugins options](../configuration/options.md#plugin-options). Command line arguments, environment variables and configuration file options would override the values defined here.
  * `advancedOptions` _(Object)_:
    * `pkg` _(Object)_: Useful when creating custom distributions. It allows to define a different package name and version to check for updates. For example, the `@mocks-server/main` distribution provides its name and version to the core using this parameter, so when the core checks for updates, it uses these properties instead of its own.
      * `name` _(String)_: Package name
      * `version` _(String)_: Current package version

```js
const Core = require("@mocks-server/core");

// highlight-next-line
const core = new Core({
  server: {
    port: 3500
  },
});

// highlight-next-line
core.init().then(async () => {
  // highlight-start
  await core.start();
  await core.stop();
  // highlight-end
});
```

:::caution
The `Core` constructor is exported only by the `@mocks-server/core` package, and it doesn't include any pre-installed plugins, so you should [install them by yourself](../plugins/installation.md) if you choose this method for starting Mocks Server programmatically. Read the [next section](#creating-an-instance-with-pre-installed-plugins) for an alternative method of creating a core instance using the `@mocks-server/main` package, which includes pre-installed plugins and other optimal configuration to start it programmatically.
:::

### Creating an instance with pre-installed plugins

The `@mocks-server/main` distribution includes some plugins providing useful integrations, such as the [Admin Api Plugin](../integrations/rest-api.md), etc. If you create a new server instance using the `@mocks-server/core` package as in the example above, you would have to [install your desired plugins](../plugins/installation.md) by your own (which may be useful to [create your own distribution](../integrations/javascript.md#creating-your-own-distribution), for example).

Note also that the [default configuration](../configuration/options.md) of `@mocks-server/core` is intended to be used in CLI, so it tries to load files, read arguments and environment variables, etc. which might not be ideal to start it programmatically in Jest tests, for example.

But it is also possible to create an instance with all `@mocks-server/main` distribution plugins and configuration optimized for a programmatic usage using the next function exported by the library:

__`createServer([config])`__: Returns a new core instance. The `config` provided is merged with the default package config, which includes some pre-installed plugins and optimized configuration for a programmatic usage:
  * It disables the files load. The scaffold is not created and routes and collections must have to be loaded using the JavaScript API.
  * It disables loading configuration from file, environment variables or arguments. So, possible conflicts are avoided and all configuration has to be provided programmatically.
  * It disables the interactive CLI plugin.

```js
const { createServer } = require("@mocks-server/main");
const { routes, collections } = require("./fixtures");

// highlight-next-line
const core = createServer({
  server: {
    port: 3500
  },
});

// highlight-next-line
core.init().then(async () => {
  // highlight-start
  const { loadRoutes, loadCollections } = core.mock.createLoaders();
  loadRoutes(routes);
  loadCollections(collections);
  
  await core.start();
  // highlight-end
});
```

<details>
<summary>
Creating an instance with pre-installed plugins and custom configuration
</summary>
<div>

You can also use the `createServer` method to create an instance programmatically, but loading files from the `mocks` folder and configuration files, for example. In the next example, the server would be started as it was started using the `mocks-server` CLI command:

```js
const { createServer } = require("@mocks-server/main");

// highlight-next-line
const core = createServer({
  config: {
    readArguments: true,
    readEnvironment: true,
    readFile: true,
  },
  plugins: {
    inquirerCli: {
      enabled: true,
    },
  },
  files: {
    enabled: true,
  },
});

// highlight-next-line
core.start();
```

</div>
</details>

### Other ways of accessing to the core instance

Apart from creating your own `core` instance programmatically, you can also use it from other system elements, because it is passed as an argument to them. Some elements to which the core instance is passed are:

* __Plugins__: A plugin receives the core instance on its constructor and in all of its standardized methods. Read [plugins development](../plugins/development.md) for further info.
* __Variant handlers__: A variant handler receives the core instance on its constructor. Read [variant handlers development](../variant-handlers/development.md) for further info.
  * __middleware variants__: The core is passed from the `middleware` variant handler to the middleware functions defined in that type of variants. So, it can be used directly in Express middlewares. Read the [middleware variant chapter](../usage/variants/middleware.md) for further info.

:::tip
Read the [plugins development](../plugins/development.md) and [variant handlers development](../plugins/development.md) chapters for further info.
:::

## API

Here are described the methods that are available at first level of the `core` instance.

### init()

__`core.init([config])`__: Register plugins, initialize options and prepare all other internal dependencies needed to start the server. Returns a promise. Accepts next arguments:
  * `config` _(Object)_: Any of [Mocks Server options](../configuration/options.md#core-options) or [plugin options](../configuration/options.md#plugin-options). If provided, the config passed in the [constructor](#constructor) would be merged with this one. Command line arguments, environment variables and configuration file options would override the values defined here. Options are internally available using the [`core.config` API](./javascript/config.md) once they are initialized.

### start()

__`core.start()`__: Start the server, plugins, and all other internal elements. Returns a promise. It calls to the `init` method internally if it was not done before.

### stop()

__`core.stop()`__: Stop the server, plugins, and all other internal elements. Returns a promise.

## Children objects APIs

Continue reading to checkout the API docs of other objects available in the `core` instance:

```mdx-code-block
<DocCardList items={useCurrentSidebarCategory().items}/>
```