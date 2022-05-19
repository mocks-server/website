---
id: guides-migrating-from-v2
title: Migrating from v2 to v3
description: How to migrate from v2.x to v3.x
keywords:
  - mocks server
  - tutorial
  - migration
  - version
  - update
  - legacy
  - guide
  - deprecated
---

:::warning
If you are already using Mocks Server v1.x you should [migrate first from v1.x to v2.x](guides-migrating-from-v1.md), and then read this chapter to migrate to v3.x.
:::

## V3 Motivation

Introducing great __breaking changes is something that we always try to avoid__ on each new major version in order to make as much easy as possible the migration to the users. But 
the v3.0.0 version introduces a __great change in the concept of how the project configuration is structured, and how it can be defined__:

This projects tries to be as much modular as possible in order to make easier its evolution and maintance, and in order to make it flexible and easy to adapt to different use cases. That's why its architecture is based on the concept of plugins. In the case of the configuration, in the prior versions each plugin could add its own configuration options to the "root" level, and this may produce conflicts with other plugins or internal core elements. From this version, __we have introduced the concept of "configuration namespaces"__, so each plugin can define and access to its own options without the risk of conflicts. Apart of this, the configuration mechanism has been improved a lot, and from now it can be defined using even environment variables. Objects or arrays can also be defined in command line arguments or environment variables, etc.

We thought about implementing a backward compatibility mechanism with the v2.x configuration, or even an automated migration process, but, after analyzing it deeply, we noticed that the effort of doing it, and the possible bugs that it may cause don't worth, taking into account that the configuration should not be hard to change by the users theirself. Anyway, __in this chapter you'll find a [complete equivalence table between old and new options](#configuration) to make it easier__.

About the plugins API, [it has been changed](#plugins) also because the number of arguments received by them was growing. So, from now everything is received in a single object. This maybe would make migrating to this version harder, but it will improve the migration process to next major versions, as well as it will make easier to us to provide backward compatibility mechanisms in the future.

As a summary, __the version 3 improves the configuration mechanism and other legacy technical debts in order to make easier to add new awesome features to the project in the future, so we apologize for the breaking changes and we hope that the migration job will worth__. 🙂


## Changes summary

The main changes from v2.x to v3.x are:

* __Backward compatibility with v1.x has been removed__. All v1.x legacy methods and routes have been removed from all packages.
* __Configuration has been completely modified__.
  * __Namespaces have been added__ in order to keep the configuration of each component and plugin isolated from the rest.
  * Now it supports different configuration file names and formats, such as `.yaml`, etc. [`Cosmiconfig`](https://github.com/davidtheclark/cosmiconfig) is used under the hood to provide this feature.
  * The way in which __command line arguments__ are defined has also changed due to namespaces.
  * Defining configuration using __environment variables__ now is supported also.
* __Methods for creating or reading settings programmatically__ (from the plugins, for example) have completely changed. Read the [configuration API section bellow for further info](#configuration-api).
* The `Core` object in the `@mocks-server/core` package __now is exported as `default`__. __This only affects to users [using the programmatic API](api-programmatic-usage).__
* __Some methods of the `Core` API have been removed__. Most of them are related to the configuration. See [programmatic API](#programmatic-api) below for further info.
* __Arguments received by the plugins have changed__. Read [plugins](#plugins) below for further info.
* __Drop support for Node.js 12.x__.

## Node.js version

Support for Node.js version 12.x has been removed. From now, packages tests are not executed any more using that version.

## Configuration

As mentioned, the configuration structure have been completely changed. You can read the [updated configuration docs for further info](#configuration-options). Now options can be defined using different file names and formats, process arguments and even environment variables.

:::tip
TIP: You can rename your current `mocks.config.js` file into `old_mocks.config.js` file. Then start the server and a new configuration scaffold file will be created, then it will be easier to move your current values to the new configuration file.
:::

__In order to adapt your current v2.x configuration to v3.x, here you have an equivalence table between old and new options, including command line arguments and new environment variables:__

| _Old option_ | New option | _Old argument_ | New argument | New env var |
|---|---|---|---|---|
| `path` | `files.path` | `--path` | `--files.path` | `MOCKS_FILES_PATH` |
| `port`| `server.port` | `--port` | `--server.port` | `MOCKS_SERVER_PORT` |
| `host` | `server.host` | `--host` | `--server.host` | `MOCKS_SERVER_HOST` |
| `log` | `log` | `--log` | `--log` | `MOCKS_LOG` |
| `watch` | `files.watch` | `--no-watch` | `--no-files.watch` | `MOCKS_FILES_WATCH` |
| `mock` | `mocks.selected` | `--mock` | `--mocks.selected` | `MOCKS_MOCKS_SELECTED` |
| `delay` | `mocks.delay` | `--delay` | `--mocks.delay` | `MOCKS_MOCKS_DELAY` |
| `cors` | `server.cors.enabled` | `--no-cors` | `--no-server.cors.enabled` | `MOCKS_SERVER_CORS_ENABLED` |
| `corsPreFlight`* | `server.cors.options` | `--no-corsPreFlight` | `--server.cors.options` | `MOCKS_SERVER_CORS_OPTIONS` |
| `cli` | `plugins.inquirerCli.enabled` | `--no-cli` | `--no-plugins.inquirerCli.enabled` | `MOCKS_PLUGINS_INQUIRER_CLI_ENABLED` |
| `adminApiPath` | `plugins.adminApi.path` | `--adminApiPath` | `--plugins.adminApi.path` | `MOCKS_PLUGINS_ADMIN_API_PATH` |
| `babelRegister` | `files.babelRegister.enabled` | - | `--files.babelRegister.enabled` | `MOCKS_FILES_BABEL_REGISTER_ENABLED` |
| `babelRegisterOptions` | `files.babelRegister.options` | - | `--files.babelRegister.options` | `MOCKS_FILES_BABEL_REGISTER_OPTIONS` |
| `plugins` | `plugins.register` | - | - | - |
| `addPlugins`* | `plugins.register` | - | - | - |
| `addRouteHandlers` | `routeHandlers` | - | - | - |
| `configFile` | `config.fileSearchPlaces` _(Array)_ | - | `--config.fileSearchPlaces` | `MOCKS_CONFIG_FILE_SEARCH_PLACES` |
| `onlyProgrammaticOptions` | - | - | - | - |
| `disableCommandLineArguments` | `config.readArguments` | - | - | `MOCKS_CONFIG_READ_ARGUMENTS` |
| `disableConfigFile` | `config.readFile` | - | `--no-config.readFile` | `MOCKS_CONFIG_READ_FILE` |
| - | `config.readEnvironment` | - | - | - |

:::note
* The `corsPreFlight` option now has to be defined directly as an option for the `cors` middleware, which can be an object with any option to it. So, now it becomes: `server: { cors: { options : { preflightContinue: true }}}`, or `--server.cors.options='{"corsPreFlight":true}'` in command line arguments.
* The `addPlugins` option has been deprecated. Now, if you want to add plugins to those defined programmatically (as the `main` package does), you should convert your `export` into a function. See the example below.
:::

### Examples

So, based on the table above, a typical v2 configuration file like the next one:

```js
module.exports = {
  options: {
    mock: "base",
    cli: false,
    port: 3200,
  },
};
```
It would become:

```js
module.exports = {
  mocks: {
    selected: "base",
  },
  plugins: {
    inquirerCli: {
      enabled: false,
    },
  },
  server: {
    port: 3200,
  },
};
```

If you were using the `addPlugins` method to register your own plugins in the `main` distribution, now you should do it like in:

```js
module.exports = (config) => {
  return {
    mocks: {
      selected: "base",
    },
    plugins: {
      register: [...config.plugins.register, CustomPlugin1, CustomPlugin2]
    },
    server: {
      port: 3200,
    },
  };
};
```

:::warning
Note that the configuration structure has changed also in all of the plugins, so the equivalence table above has to be taking into account also when making HTTP requests to the `plugin-admin-api`, for example.
:::

## Plugins

In order to make compatible your plugins with the v3 version, you have to:

* Add an `id` property to them (an static property in the case of Class plugins). This allows the core to create an appropiate namespace for the plugins and pass to them the correspondent `config` object.
* Change the Core API deprecated methods for creating and reading settings if you were using them by the new ones. Read the [configuration API section bellow for further info](#configuration-api).
* Change the arguments that they receive in the `constructor`, `register`, `init`, `start` and `stop` methods. Now they will receive a single argument as an object containing all needed methods and properties. Previously, the `core` API was received as first argument, and from now it is received as a `{ core }` property in the first argument. So a plugin that in V2 was defined as:

```js
class Plugin {
  constructor(core, { loadMocks, loadRoutes, addAlert, removeAlerts }) {
    // Do your stuff here
  }

  register(core, { loadMocks, loadRoutes, addAlert, removeAlerts }) {
    // Do your stuff here
  }

  init(core, { loadMocks, loadRoutes, addAlert, removeAlerts }) {
    // Do your stuff here
  }

  start(core, { loadMocks, loadRoutes, addAlert, removeAlerts }) {
    // Do your stuff here
  }

  stop(core, { loadMocks, loadRoutes, addAlert, removeAlerts }) {
    // Do your stuff here
  }

  get displayName() {
    return "myPlugin";
  }
}
```

Now it has to be defined as:

```js
class Plugin {
  static get id() {
    return "myPlugin";
  }

  constructor({ core, loadMocks, loadRoutes, addAlert, removeAlerts, config }) {
    // Do your stuff here
  }

  register({ core, loadMocks, loadRoutes, addAlert, removeAlerts, config }) {
    // Do your stuff here
  }

  init({ core, loadMocks, loadRoutes, addAlert, removeAlerts, config }) {
    // Do your stuff here
  }

  start({ core, loadMocks, loadRoutes, addAlert, removeAlerts, config }) {
    // Do your stuff here
  }

  stop({ core, loadMocks, loadRoutes, addAlert, removeAlerts, config }) {
    // Do your stuff here
  }
}
```

## Configuration API

As a result of the [programmatic API changes](#programmatic-api), old methods for creating or reading settings are not available any more, such as `mocksServer.addSetting`, `mocksServer.settings.get`, `mocksServer.settings.set` or `mocksServer.lowLevelConfig`. Now you can create, read, or listen to configuration changes using the `mocksServer.config` object, or using the `config` object received in plugins, which is already namespaced with each plugin name. Here you have a brief example of how you can migrate from one system to another. For further information, you should read the [updated documentation about creating plugins](plugins-developing-plugins.md).

If you were creating or reading settings like this in v2:

```js
class Plugin {
  constructor(core) {
    this._core = core;
    this._core.addSetting({
      name: "myOption",
      type: "string",
    });
  }

  start() {
    this._core.tracer.info(`Current value of my option is ${this._core.settings.get("myOption")}`);
    this._core.onChangeSettings(this._onChangeSettings.bind(this));
  }

  _onChangeSettings(changedSettings) {
    this._core.tracer.info(`Changed settings: ${JSON.stringify(changedSettings)}`);
  }

  get displayName() {
    return "myPlugin";
  }
}
```

Now you have to do it like this in v3:

```js
class Plugin {
  static get id() {
     return "myPlugin";
  }

  constructor({ core, config }) {
    this._core = core;
    this._myOption = config.addOption({
      name: "myOption",
      type: "string",
    });
  }

  start() {
    this._core.tracer.info(`Current value of my option is ${this._myOption.value}`);
    this._myOption.onChange(this._onChangeMyOption.bind(this));
  }

  _onChangeMyOption(newValue) {
    this._core.tracer.info(`My option changed to: ${newValue}`);
  }
}
```

:::info
And remember, from now, the user must define the options for your plugin under the namespace of your plugin `id`: `--plugins.myPlugin.myOption=foo`
:::

## Importing `@mocks-server/core`

The `Core` object in the `@mocks-server/core` package now is exported as `default`. So, if you were importing v2.x as in:

```js
const { Core } = require("@mocks-server/core"); // Will fail in v3.x
```

Now you should import it like:

```js
const Core = require("@mocks-server/core"); // Works in v3.x
```

## Programmatic API

Some of the next methods were added to v2.x in order to provide easy backward compatibility with v1.x. All of them have been removed in v3.x, so, if you started using v2.x, you may have not used any legacy method, and updating to v3.x shouldn't produce any breaking change.

In case you have not still migrated completely to v2.x, please read the ["Migrating from v1 to v2" guide](guides-migrating-from-v1.md). Once you have migrated to v2.x, next changes won't affect to you. Anyway, here is the complete list of methods removed from all `@mocks-server` packages in v3.x:

### `@mocks-server/core`

* The `Core` object now is export as `default`.
* The `Behavior` object has been removed and it is not exported any more.
* The `addFixturesHandler` and `onChangeLegacyMocks` have been removed from the `Core` API.
* The `behaviors` and `fixtures` getters have been removed from the `Core` API.
* The `pathLegacy`, `behavior` and `watchLegacy` options are not supported any more.
* The legacy `--behavior` command line argument has been removed.
* The `load:mocks:legacy` and `change:mocks:legacy` events are not emitted any more.
* The `addSetting` method has been removed from the `Core` API.. Now plugins should add their configuration options using the `config` object that they receive. The global `config` object is also available in the `core` API.
* The `onChangeSettings` method has been removed from the `Core` API.. Now listeners must be added using the `config` object.
* The `settings` getter has been removed from the `Core` API.. Instead of it, the `config` getter must be used, but note that its API have changed too.
* The `lowLevelConfig` getter has been removed from the `Core` API.. The concept of `lowLevelConfig` is not used any more, because now there are configuration namespaces, and everything can be configured at any lifecycle time. The `config` object must be used instead.

### `@mocks-server/main`

* Export `Core` as `default` export.
* The `Behavior` object has been removed and it is not exported any more.

### `@mocks-server/cypress-commands`

* The `mocksSetBehavior` command has been removed.

### `@mocks-server/plugin-inquirer-cli`

* Remove support for v1 legacy mode options.

### `@mocks-server/plugin-admin-api`

* All legacy APIs under the `/legacy` path have been removed.
* The `adminApiDeprecatedPaths` option is not supported any more.

### `@mocks-server/admin-api-paths`

* Removed `LEGACY`, `BEHAVIORS` and `FIXTURES` constants.

### `@mocks-server/admin-api-client-data-provider`

* Removed `behaviors`, `behavior`, `behaviorsModel`, `fixtures`, `fixture`, `fixtureModel` legacy objects and all of its methods.

### `@mocks-server/admin-api-client`

* Removed legacy methods `readBehaviors`, `readBehavior`, `readFixtures` and `readFixture`.
