---
id: advanced-developing-plugins
title: Developing plugins
---

## Plugins

You can develop your own plugins for the Mocks Server to provide more interfaces, add [more ways of defining fixtures](advanced-custom-fixtures-handlers), etc.

### Naming plugins

It is recommended that plugins are published with the "mocks-server-plugin-[name]" name format in order to facilitate the search. Plugins should also contain the "mocks-server-plugin" tag in the `package.json`.

## Plugins lifecycle

Plugins should contain __four main methods__, which will receive the instance of the Mocks Server core and a second argument with __extra methods explicitly created for each different plugin__. Please read the [programmatic usage chapter](advanced-programmatic-usage.md) to know how to interact with the core.

#### `register(core, pluginMethods)`

This method will be called for registering the plugin during the Mocks Server initialization, before `options` have been initialized.

Here you should register your own custom `options` using the `core.addSetting` method, register your own custom express routers using the `core.addRouter` method, etc.

You should never access here to the `core.settings` methods, are they are not still ready in this phase, which was defined with the intention of letting the plugins to add their own settings.

> If you define your plugin as a Class, the `constructor` will be equivalent to defining a `register` method. If you define your plugin as a function, it will be called during the plugins registration, so you could also omit the `register` method.

#### `init(core, pluginMethods)`

This method will be called when Mocks Server settings are ready. Here you already can access to the `core.settings` to get the user options, and act in consequence. Here you should also add your listeners to the core events, such as `core.onChangeSettings`, `core.onChangeMocks`, etc.

#### `start(core, pluginMethods)`

When this method is called, the Mocks Server is already started and listening to requests, and the files watcher is observing for changes too.

#### `stop(core, pluginMethods)`

This method will be called when the Mocks Server stop method is called. Here you should stop all the plugin processes.

> Plugins should also contain a `displayName` property or getter, which will be used by the core for debugging purposes.

## Plugin methods

Apart of the `core` instance containing all methods and getters described in the [programmatic usage chapter](advanced-programmatic-usage.md), plugins will receive methods explicitly created for each plugin instance as a second argument. This object contains next methods:

* `loadMocks(definitions)` - Load "behaviors" and "fixtures" definitions. Each time this method is called, __all previously loaded behaviors and fixtures will be replaced by the new ones, but definitions loaded by the core or by other plugins will remain__.
  * definitions - `<Array>` Array containing fixtures or behaviors defined as described in the ["fixtures"](get-started-fixtures) and ["behaviors"](get-started-behaviors) chapters.

### Example

Here you have an example of how a plugin is defined. Consult the [Mocks Server programmatic usage chapter](advanced-programmatic-usage.md) for further info:

```javascript
const { Core } = require("@mocks-server/core");

class Plugin {
  constructor(core) {
    core.addSetting({
      name: "traceBehaviors",
      type: "boolean",
      description: "Trace behaviors changes",
      default: true
    });

    this._core = core;
    this._onChangeMocks = this._onChangeMocks.bind(this);
    this._onChangeSettings = this._onChangeSettings.bind(this);
  }

  get displayName() {
    return "trace-behaviors";
  }

  init(core) {
    this._enabled = core.settings.get("traceBehaviors");
    this._removeChangeMocksListener = core.onChangeMocks(this.onChangeMocks);
    this._removeChangeSettingsListener = core.onChangeSettings(this.onChangeSettings);
    core.tracer.debug(`traceBehaviors initial value is ${core.settings.get("traceBehaviors")}`);
  }

  start(core) {
    this._started = true;
    core.tracer.debug("traceBehaviors plugin started");
  }

  stop(core) {
    this._started = false;
    core.tracer.debug("traceBehaviors plugin stopped");
  }

  _onChangeSettings(settings) {
    if (settings.hasOwnProperty("traceBehaviors")) {
      this._enabled = settings.traceBehaviors;
    }
  }

  _onChangeMocks() {
    if (this._enabled && this._started) {
      this._core.tracer.info(
        `Mocks have been reloaded, now there are ${this._core.behaviors.count} available`
      );
    }
  }
}

const server = new Core({
  onlyProgrammaticOptions: false,
  plugins: [Plugin]
});

server
  .init({
    log: "debug"
  })
  .then(server.start);
```

## Plugins formats

The methods can be defined in a plain `object`, as methods of a `Class` or even using a `function` returning an object containing them.

Next examples show how each format should be defined:

### Plugin as a `Class`

```javascript
export default class Plugin {
  constructor(core) {
    // Do your register stuff here
  }

  get displayName() {
    return "foo-plugin-name"
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

### Plugin as a `function`

```javascript
const plugin = core => {
  // Do your register stuff here
  return {
    displayName: "foo-plugin-name",
    register: core => {
      // You should omit this method if you already did your register stuff
    },
    init: core => {
      // Do your initialization stuff here
    },
    start: core => {
      // Do your start stuff here
    },
    stop: core => {
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
  register: core => {
    // Do your register stuff here
  },
  init: core => {
    // Do your initialization stuff here
  },
  start: core => {
    // Do your start stuff here
  },
  stop: core => {
    // Do your stop stuff here
  }
};

export default plugin;
```

> By the moment, plugins [can be added to the server only programmatically](advanced-programmatic-usage). In next releases this can be done easier through a configuration file in the root folder of the project.
