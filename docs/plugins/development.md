---
id: development
title: Developing plugins
description: How to develop Mocks Server plugins
keywords:
  - mocks server
  - mock server
  - customization
  - plugins
  - development
  - guide
---

## Preface

In the previous chapters [we saw what Plugins are](plugins/intro.md), and [how to install them](plugins/installation.md). Now we are going to see how to create them, so you can extend Mocks Server with your own features easily 🙂.

As mentioned in the plugins intro:

> A plugin basically consist on a JavaScript `Class` containing some standardized methods. The Mocks Server core is at charge of creating the plugin instance using the provided `Class` and calling to each method on each specific time of the Mocks Server lifecycle. The `constructor` and the `Class` methods will always receive an instance of the [Mocks Server core API](api/core.md), so it can be used to tap into, modify, or extend its internal behavior.

## Lifecycle

Plugins should contain __four main methods__, which will receive an argument containing the instance of [Mocks Server core API](api/core.md) with some __methods explicitly modified for each different plugin__. Please read the [API chapter to know how to use the `core API`](api/core.md).

### `constructor(core)`

This method is executed for registering the plugin during the Mocks Server initialization, before the `configuration` has been initialized.

Here you should register your own custom `options` using the `core.config` object, register your own custom Express routers using the `core.server.addRouter` method, add custom Variant Handlers using `core.routes.registerHandler`, etc.

:::caution
You should never read the configuration values in the `constructor`, because the configuration object is not still ready in this phase. Here you should only define your own options.
:::

### `init(core)`

This method is called when Mocks Server configuration is loaded and ready. Here you can already use the `core.config` object to read the user options, and act in consequence, and you can also access to the whole configuration object using `core.config.root`. Here you should also add your listeners to the `core` events, such as `core.onChangeMocks`, etc.

### `start(core)`

When this method is called, Mocks Server is already started and listening to HTTP requests, and the files watcher is observing for changes too. Here you should start the plugin processes in case there are.

### `stop(core)`

This method is executed when the Mocks Server `stop` method is called. Here you should stop all the plugin processes that you started in the `start` method.

## Plugin id

Plugins must also have an `id` static property (usually the plugin name), which is used by Mocks Server in order to provide them some namespaced objects (such as the `config`, `logger` and `alerts`). It is also used for other information purposes.

:::info
It is recommended to use `camelCase` when defining the plugin id.
:::

## Scaffold

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

## Parameters

All __plugins methods receive a whole [`core` instance](api/core.md)__, but with some methods specifically scoped for the plugin. The core API docs also give details about the methods that are modified when the core is passed to a plugin, but here you have also a __summary of the modified methods__:

* __`core.alerts`__: This property contains a scoped `alerts` instance using the plugin `id`. It allows to add or remove alerts or alerts namespaces without having conflicts with other plugins or other Mocks Server core elements. Read the [`core.alertsApi`](api/core.md) docs to know how to use it, but take into account that in plugins you will receive an alerts subcollection instead of the root alerts object.
* __`core.config`__: A configuration namespace created specifically for the plugin, using its `id`. Read the [`core.config`](api/core.md) docs to know how to use it, but take into account that in plugins you will receive a configuration namespace instead of the root configuration object.
* __`core.logger`__: A namespaced logger using the plugin `id`. It allows to easily identify the logs of each plugin and differentiate them from other internal Mocks Server components logs. Read the [`core.logger`](api/core.md) docs to know how to use it, but take into account that in plugins you will receive a logger namespace instead of the root logger object.

### Example

Here you have an example of how a plugin could be defined. It logs the available collections each time they change and allows the user to disable it using an option.

```javascript
class Plugin {
  static get id() {
    return "logCollections";
  }

  constructor(core) {
    this._core = core;
    this._enabledOption = core.config.addOption({
      name: "enabled",
      type: "boolean",
      description: "Log collections changes",
      default: true
    });

    this._onChangeCollections = this._onChangeCollections.bind(this);
  }

  init() {
    this._enabled = this._enabledOption.value;
    this._removeChangeMocksListener = this._core.onChangeCollections(this._onChangeCollections);
    this._enabledOption.onChange(this._onChangeOption.bind(this));
    this._core.logger.debug(`enabled option initial value is ${this._enabled}`);
  }

  logCollections() {
    if (this._enabled && this._started) {
      this._core.logger.info(`There are ${this._core.routes.collections.plain.length} collections available`);
    }
  }

  start(core) {
    this._started = true;
    core.logger.debug("logCollections plugin started");
    this.logCollections();
  }

  stop(core) {
    this._started = false;
    core.logger.debug("logCollections plugin stopped");
  }

  _onChangeOption(newValue) {
    this._enabled = newValue;
  }

  _onChangeCollections() {
    this.logCollections();
  }
}

module.exports = Plugin;
```

:::tip
Read the [API chapter](api/core.md) for further info about all available Mocks Server `core` methods.
:::
