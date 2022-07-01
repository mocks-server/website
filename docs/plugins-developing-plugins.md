---
id: plugins-developing-plugins
title: Developing plugins
description: How to develop Mocks Server plugins
keywords:
  - mocks server
  - customization
  - plugins
  - development
  - guide
---

## Plugins

Plugins can do a lot of things in Mocks Server. For example, you could use plugins to provide more interfaces, add [more routes handlers](api-routes-handler.md), add custom `express` routers to the server, etc.

### Naming plugins

It is recommended that plugins are published with the `mocks-server-plugin-[name]` name format in order to facilitate the search. Plugins should also contain the `mocks-server-plugin` tag in the `package.json` `tags` property.

## Plugins lifecycle

Plugins should contain __four main methods__, which will receive an argument containing the instance of [Mocks Server core API](api-mocks-server-api.md) with some __methods explicitly modified for each different plugin__. Please read the [API chapter](api-mocks-server-api.md) to know how to use the `core API`.

#### `register(core)`

This method will be called for registering the plugin during the Mocks Server initialization, before `options` have been initialized.

Here you should register your own custom `options` using the `core.config` object, register your own custom express routers using the `core.addRouter` method, add custom Route Handlers using `core.addRoutesHandler`, etc.

You should never access here to configuration values, because it is not still ready in this phase, which was designed with the intention of letting the plugins to add their own options.

#### `init(core)`

This method will be called when Mocks Server configuration is loaded and ready. Here you can already use the `core.config` object to get the user options for your plugin, and act in consequence, and you can also access to the whole configuration object using `core.config.root`. Here you should also add your listeners to the `core` events, such as `core.onChangeMocks`, etc.

#### `start(core)`

When this method is called, Mocks Server is already started and listening to requests, and the files watcher is observing for changes too. Here you should start the plugin processes in case there are.

#### `stop(core)`

This method will be called when the Mocks Server `stop` method is called. Here you should stop all the plugin processes in case you started anything in the `start` method.

:::warning
Plugins must also contain an `id` static property (usually the plugin name), which will be used by Mocks Server for providing to them namespaced configuration and alerts APIs and for other information purposes. It is recommended to use `camelCase` when defining the plugin id.
:::

## Plugins parameters

The __plugins methods receive a whole [`core` instance](api-mocks-server-api.md)__, but with some methods specifically scoped for the plugin. The core API docs also give details about the methods that are modified when the core is passed to a plugin, but here you have also a __summary of the modified methods__:

* __`core.loadMocks(mocks)`__: Load `mocks` definitions. Each time this method is called, __all previously loaded mocks will be replaced by the new ones, but only those added by this plugin__. Mocks loaded by the core or by other plugins will remain.
* __`core.loadRoutes(routes)`__: Load `routes` definitions. Each time this method is called, __all previously loaded routes will be replaced by the new ones, but only those added by this plugin__. Routes loaded by the core or by other plugins will remain.
* __`core.alerts`__: While in the main core API the `alerts` getter returns an array with all current alerts in plain format, in the plugins this property returns a scoped `alerts` instance using the plugin `id`. It allows to add or remove alerts or alerts namespaces without having conflicts with other plugins or other Mocks Server elements. Read the [`core.alertsApi`](api-mocks-server-api.md) docs to know how to use it, but take into account that in plugins you will receive an alerts subcollection instead of the root alerts object.
* __`core.config`__: A configuration namespace created specifically for the plugin, using its `id`. Read the [`core.config`](api-mocks-server-api.md) docs to know how to use it, but take into account that in plugins you will receive a configuration namespace instead of the root configuration object.
* __`core.logger`__: A namespaced logger using the plugin `id`. It allows to easily identify the logs of each plugin and differentiate them from other internal Mocks Server components logs. Read the [`core.logger`](api-mocks-server-api.md) docs to know how to use it, but take into account that in plugins you will receive a logger namespace instead of the root logger object.

### Example

Here you have an example of how a plugin should be defined. Read the [Mocks Server API chapter](api-mocks-server-api.md) for further info about Mocks Server `core` methods.

```javascript
class Plugin {
  static get id() {
    return "logMocks";
  }

  constructor(core) {
    this._core = core;
    this._enabledOption = core.config.addOption({
      name: "enabled",
      type: "boolean",
      description: "Log mocks changes",
      default: true
    });

    this._onChangeMocks = this._onChangeMocks.bind(this);
  }

  init() {
    this._enabled = this._enabledOption.value;
    this._removeChangeMocksListener = this._core.onChangeMocks(this._onChangeMocks);
    this._enabledOption.onChange(this._onChangeOption.bind(this));
    this._core.logger.debug(`enabled option initial value is ${this._enabled}`);
  }

  logMocks() {
    if (this._enabled && this._started) {
      this._core.logger.info(`There are ${this._core.mocks.plainMocks.length} mocks available`);
    }
  }

  start(core) {
    this._started = true;
    core.logger.debug("logMocks plugin started");
    this.logMocks();
  }

  stop(core) {
    this._started = false;
    core.logger.debug("logMocks plugin stopped");
  }

  _onChangeOption(newValue) {
    this._enabled = newValue;
  }

  _onChangeMocks() {
    this.logMocks();
  }
}

module.exports = Plugin;
```
## Plugin scaffold

Next example shows an empty plugin scaffold that you can use as a starting point:

```javascript
export default class Plugin {
  static get id() {
    return "myPluginId";
  }

  constructor(core) {
    // Do your register stuff here
  }  

  register(core) {
    // You should omit this method if you already did your register stuff in the constructor
  }

  init(core) {
    // Do your initialization stuff here
  }

  start(core) {
    // Do your start stuff here
  }

  stop(core) {
    // Do your stop stuff here
  }
}
```

:::warning
If the plugin has not an `id` static property, it will not receive the `config` and `alerts` core API objects, because they must be namespaced using the plugin `id`. Due to backward compatibility, it will still pass those methods to the `register`, `init`, `start` and `stop` methods if the plugin instance has an `id` property, but this behavior will be removed in next major versions. So, it is strongly recommended that the plugin id is defined in a static property.
:::

## Installing plugins

Plugins can be added [programmatically](api-programmatic-usage.md) before the initialization of the server, or using the [configuration file](configuration-methods.md). Read the [installing plugins chapter](plugins-adding-plugins.md) for further info.
