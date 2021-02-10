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

Plugins can do a lot of things in Mocks Server. Even some very important built-in internal pieces are, in fact, plugins. So, you could use plugins to provide more interfaces, add [more route handlers](advanced-custom-route-handlers.md), add express routers to the server, etc.

### Naming plugins

It is recommended that plugins are published with the `mocks-server-plugin-[name]` name format in order to facilitate the search. Plugins should also contain the `mocks-server-plugin` tag in the `package.json` `tags` property.

## Plugins lifecycle

Plugins should contain __four main methods__, which will receive the instance of the Mocks Server core and a second argument with __extra methods explicitly created for each different plugin__. Please read the [API chapter](api-core-api.md) to know how to interact with the core.

#### `register(core, pluginMethods)`

This method will be called for registering the plugin during the Mocks Server initialization, before `options` have been initialized.

Here you should register your own custom `options` using the `core.addSetting` method, register your own custom express routers using the `core.addRouter` method, etc.

You should never use here to the `core.settings` methods, are they are not still ready in this phase, which was designed with the intention of letting the plugins to add their own settings.

> If you define your plugin as a Class, the `constructor` will be equivalent to defining a `register` method. If you define your plugin as a function, it will be called during the plugins registration, so you could also omit the `register` method.

#### `init(core, pluginMethods)`

This method will be called when Mocks Server settings are ready. Here you can already use the `core.settings` to get the user options, and act in consequence. Here you should also add your listeners to the core events, such as `core.onChangeSettings`, `core.onChangeMocks`, etc.

#### `start(core, pluginMethods)`

When this method is called, the Mocks Server is already started and listening to requests, and the files watcher is observing for changes too. Here you should start the plugin processes in case there are.

#### `stop(core, pluginMethods)`

This method will be called when the Mocks Server stop method is called. Here you should stop all the plugin processes.

:::note
Plugins should also contain a `displayName` property or getter, which will be used by Mocks Server for debugging and information purposes.
:::

## Plugin methods

Apart of the `core` instance containing all methods and getters described in the [API chapter](api-core-api.md), plugins will receive methods explicitly created for each plugin instance as a second argument. This object contains next methods:

* __`loadMocks(mocks)`__ - Load `mocks` definitions. Each time this method is called, __all previously loaded mocks will be replaced by the new ones, but only those added by this plugin__. Mocks loaded by the core or by other plugins will remain.
  * __mocks__ _(Array)_: Array containing fixtures or behaviors defined as described in the ["fixtures"](get-started-routes.md) and ["behaviors"](get-started-mocks.md) chapters.
* __`addAlert(context, message, error)`__ - Adds an alert, so Mocks Server and other plugins can know about it. Use alerts to inform the user about deprecated methods or other warning messages, or about current errors. For example, when an error happens loading files, `mocks-server` adds automatically an alert in order to let the user know about the error.
  * __`context`__ _(String)_: Use context to inform about different alerts contexts. Alerts are unique for each different context, so if you add another alert using the same context, the previous one will be removed. You can define different context levels _(it is recommended to separate levels using `:`)_, as in `deprecated:method`, which is useful when using the `removeAlerts` method.
  * __`message`__ _(String)_: Message for the alert.
  * __`error`__ _(Error)_: Optional. Error causing the alert.
* __`removeAlerts([context])`__ - Removes alerts.
  * __`context`__ _(String)_: Optional. All alerts starting by this context will be removed. If no `context` is provided all alerts previously added by the plugin will be removed.

### Example

Here you have an example of how a plugin should be defined. Read the [Mocks Server API chapter](api-core-api.md) for further info about `core` methods.

```javascript
class Plugin {
  constructor(core) {
    core.addSetting({
      name: "traceMocks",
      type: "boolean",
      description: "Trace mocks changes",
      default: true
    });

    this._core = core;
    this._onChangeMocks = this._onChangeMocks.bind(this);
    this._onChangeSettings = this._onChangeSettings.bind(this);
  }

  get displayName() {
    return "trace-mocks";
  }

  init(core) {
    this._enabled = core.settings.get("traceMocks");
    this._removeChangeMocksListener = core.onChangeMocks(this._onChangeMocks);
    this._removeChangeSettingsListener = core.onChangeSettings(this._onChangeSettings);
    core.tracer.debug(`traceMocks initial value is ${core.settings.get("traceMocks")}`);
  }

  traceBehaviors() {
    if (this._enabled && this._started) {
      this._core.tracer.info(`There are ${this._core.mocks.plainMocks.length} mocks available`);
    }
  }

  start(core) {
    this._started = true;
    core.tracer.debug("traceMocks plugin started");
    this.traceBehaviors();
  }

  stop(core) {
    this._started = false;
    core.tracer.debug("traceMocks plugin stopped");
  }

  _onChangeSettings(settings) {
    if (settings.hasOwnProperty("traceMocks")) {
      this._enabled = settings.traceMocks;
    }
  }

  _onChangeMocks() {
    this.traceBehaviors();
  }
}

module.exports = Plugin;
```

## Plugins formats

The methods can be defined in a plain `object`, as methods of a `Class` or even using a `function` returning an object containing them.

Next examples show how each format should be defined:

### Plugin as a `Class`

```javascript
export default class Plugin {
  constructor(core, pluginMethods) {
    // Do your register stuff here
  }

  get displayName() {
    return "foo-plugin-name"
  }

  register(core, pluginMethods) {
    // You should omit this method if you already did your register stuff in the constructor
  }

  init(core, pluginMethods) {
    // Do your initialization stuff here
  }

  start(core, pluginMethods) {
    // Do your start stuff here
  }

  stop(core, pluginMethods) {
    // Do your stop stuff here
  }
}
```

### Plugin as a `function`

```javascript
const plugin = core => {
  // Do your register stuff here
  return {
    displayName: "foo-plugin-name",
    register: (core, pluginMethods) => {
      // You should omit this method if you already did your register stuff
    },
    init: (core, pluginMethods) => {
      // Do your initialization stuff here
    },
    start: (core, pluginMethods) => {
      // Do your start stuff here
    },
    stop: (core, pluginMethods) => {
      // Do your stop stuff here
    }
  };
};

export default plugin;
```

### Plugin as an `object`

```javascript
const plugin = {
  displayName: "foo-plugin-name",
  register: (core, pluginMethods) => {
    // Do your register stuff here
  },
  init: (core, pluginMethods) => {
    // Do your initialization stuff here
  },
  start: (core, pluginMethods) => {
    // Do your start stuff here
  },
  stop: (core, pluginMethods) => {
    // Do your stop stuff here
  }
};

export default plugin;
```

## Installing plugins

Plugins can be added [programmatically](api-programmatic-usage.md) before the initialization of the server, or using the [configuration file](configuration-file.md). Read the [installing plugins chapter](plugins-adding-plugins.md) for further info.
