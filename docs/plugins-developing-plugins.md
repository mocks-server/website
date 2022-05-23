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

Plugins should contain __four main methods__, which will receive an argument containing the instance of `mocksServer` and some __extra methods explicitly created for each different plugin__. Please read the [API chapter](api-mocks-server-api.md) to know how to use `mocksServer`.

#### `register(pluginApi)`

This method will be called for registering the plugin during the Mocks Server initialization, before `options` have been initialized.

Here you should register your own custom `options` using the `core.config` object, register your own custom express routers using the `core.addRouter` method, add custom Route Handlers using `core.addRoutesHandler`, etc.

You should never access here to configuration values, because it is not still ready in this phase, which was designed with the intention of letting the plugins to add their own options.

> If you define your plugin as a Class, the `constructor` will be equivalent to defining a `register` method. If you define your plugin as a function, it will be called during the plugins registration, so you could also omit the `register` method.

#### `init(pluginApi)`

This method will be called when Mocks Server settings are ready. Here you can already use the `core.config` object to get the user options, and act in consequence. Here you should also add your listeners to the `core` events, such as `core.onChangeMocks`, etc.

#### `start(pluginApi)`

When this method is called, Mocks Server is already started and listening to requests, and the files watcher is observing for changes too. Here you should start the plugin processes in case there are.

#### `stop(pluginApi)`

This method will be called when the Mocks Server `stop` method is called. Here you should stop all the plugin processes.

:::warning
Plugins must also contain an `id` property, which will be used by Mocks Server for providing to them a namespaced configuration API and for information purposes. In the case of plugins defined as classes, it must be an static property. It is recommended to use `camelCase` when defining the plugin id.
:::

## Plugins API

Apart of the `core` instance containing all methods and getters described in the [API chapter](api-mocks-server-api.md), plugins will receive methods explicitly created for each plugin instance. This object contains next methods:

* __`core`__: The Mocks Server core instance. Read the [API chapter](api-mocks-server-api.md) for further information.
* __`loadMocks(mocks)`__: Load `mocks` definitions. Each time this method is called, __all previously loaded mocks will be replaced by the new ones, but only those added by this plugin__. Mocks loaded by the core or by other plugins will remain.
  * __mocks__ _(Array)_: Array containing mocks defined as described in the [`mocks`](get-started-mocks.md) chapter.
* __`loadRoutes(routes)`__: Load `routes` definitions. Each time this method is called, __all previously loaded routes will be replaced by the new ones, but only those added by this plugin__. Routes loaded by the core or by other plugins will remain.
  * __routes__ _(Array)_: Array containing routes defined as described in the [`routes`](get-started-routes.md) chapter.
* __`addAlert(context, message, error)`__: Add an alert, so Mocks Server and other plugins can know about it. Use alerts to inform the user about deprecated methods or other warning messages, or about current errors. For example, when an error happens loading files, `mocks-server` adds automatically an alert in order to let the user know about the error.
  * __`context`__ _(String)_: Use context to inform about different alerts contexts. Alerts are unique for each different context, so if you add another alert using the same context, the previous one will be removed. You can define different context levels _(it is recommended to separate levels using `:`)_, as in `deprecated:method`, which is useful when using the `removeAlerts` method.
  * __`message`__ _(String)_: Message for the alert.
  * __`error`__ _(Error)_: Optional. Error causing the alert.
* __`removeAlerts([context])`__: Remove alerts previously added by the plugin.
  * __`context`__ _(String)_: Optional. All alerts starting by this context will be removed. If no `context` is provided all alerts previously added by the plugin will be removed.
* __`config`__: A configuration namespace created specifically for the plugin, using its `id`. You can read the [`@mocks-server/config`](https://github.com/mocks-server/main/tree/master/packages/config/README.md) docs to know more about the configuration API. Here you have a summary:
  * __`addNamespace(name)`__: Add another namespace to the current namespace. Returns a configuration [namespace instance](https://github.com/mocks-server/main/tree/master/packages/config/README.md#namespace-instance).
    * `name` _(String)_: Name for the namespace.
  * __`addOption(optionProperties)`__: Adds an option to the namespace. Returns a configuration [option instance](https://github.com/mocks-server/main/tree/master/packages/config/README.md#option-instance).
    * `optionProperties` _(Object)_: Properties defining the option.
      * __`name`__ _(String)_: Name for the option.
      * __`description`__ _(String)_: _Optional_. Used in help, traces, etc.
      * __`type`__  _(String)_. One of _`string`_, _`boolean`_, _`number`_, _`array`_ or _`object`_. Used to apply type validation when loading configuration and in `option.value` setter.
      * __`itemsType`__ _(String)_. Can be defined only when `type` is `array`. It must be one of _`string`_, _`boolean`_, _`number`_ or _`object`_.
      * __`default`__ - _Optional_. Default value. Its type depends on the `type` option.
      * __`extraData`__ - _(Object)_. _Optional_. Useful to store any extra data you want in the option. For example, Mocks Server uses it to define wheter an option must be written when creating the configuration scaffold or not.
  * __`addOptions(optionsProperties)`__: Add many options. Returns an array of configuration [option instances](https://github.com/mocks-server/main/tree/master/packages/config/README.md#option-instance).
    * `optionsProperties` _(Array)_: Array of `optionProperties`.
  * __`value`__: Getter returning the current values from all child namespaces and options as an object. Levels in the object correspond to namespaces names, and last level keys correspond to option names. It can be also used as setter as an alias of the `set` method, with default options.

### Example

Here you have an example of how a plugin should be defined. Read the [Mocks Server API chapter](api-mocks-server-api.md) for further info about Mocks Server `core` methods.

```javascript
class Plugin {
  static get id() {
    return "traceMocks";
  }

  constructor({ core, config }) {
    this._traceMocksOption = config.addOption({
      name: "traceMocks",
      type: "boolean",
      description: "Trace mocks changes",
      default: true
    });

    this._mocksServer = core;
    this._onChangeMocks = this._onChangeMocks.bind(this);
  }

  init() {
    this._enabled = this._traceMocksOption.value;
    this._removeChangeMocksListener = this._mocksServer.onChangeMocks(this._onChangeMocks);
    this._traceMocksOption.onChange(this._onChangeOption.bind(this));
    mocksServer.tracer.debug(`traceMocks initial value is ${this._enabled}`);
  }

  traceMocks() {
    if (this._enabled && this._started) {
      this._mocksServer.tracer.info(`There are ${this._mocksServer.mocks.plainMocks.length} mocks available`);
    }
  }

  start({ core }) {
    this._started = true;
    core.tracer.debug("traceMocks plugin started");
    this.traceMocks();
  }

  stop({ core }) {
    this._started = false;
    core.tracer.debug("traceMocks plugin stopped");
  }

  _onChangeOption(newValue) {
    this._enabled = newValue;
  }

  _onChangeMocks() {
    this.traceMocks();
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
  static get id() {
    return "fooPluginId";
  }

  constructor(pluginApi) {
    // Do your register stuff here
  }  

  register(pluginApi) {
    // You should omit this method if you already did your register stuff in the constructor
  }

  init(pluginApi) {
    // Do your initialization stuff here
  }

  start(pluginApi) {
    // Do your start stuff here
  }

  stop(pluginApi) {
    // Do your stop stuff here
  }
}
```

### Plugin as a `function`

```javascript
const plugin = (pluginApi) => {
  // Do your register stuff here
  return {
    id: "fooPluginId",
    register: (pluginApi) => {
      // You should omit this method if you already did your register stuff
    },
    init: (pluginApi) => {
      // Do your initialization stuff here
    },
    start: (pluginApi) => {
      // Do your start stuff here
    },
    stop: (pluginApi) => {
      // Do your stop stuff here
    }
  };
};

export default plugin;
```

### Plugin as an `object`

```javascript
const plugin = {
  id: "fooPluginId",
  register: (pluginApi) => {
    // Do your register stuff here
  },
  init: (pluginApi) => {
    // Do your initialization stuff here
  },
  start: (pluginApi) => {
    // Do your start stuff here
  },
  stop: (pluginApi) => {
    // Do your stop stuff here
  }
};

export default plugin;
```

## Installing plugins

Plugins can be added [programmatically](api-programmatic-usage.md) before the initialization of the server, or using the [configuration file](configuration-methods.md). Read the [installing plugins chapter](plugins-adding-plugins.md) for further info.
