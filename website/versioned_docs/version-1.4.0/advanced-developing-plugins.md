---
id: version-1.4.0-advanced-developing-plugins
title: Developing plugins
original_id: advanced-developing-plugins
---

## Plugins

You can develop your own plugins for the mocks server to provide more interfaces, ~~add more ways of defining fixtures or behaviors~~ _(not yet available)_, etc.

### Naming plugins

It is recommended that plugins are published with the "mocks-server-plugin-[name]" name format in order to facilitate the search. Plugins should also contain the "mocks-server-plugin" tag in the `package.json`.

### Plugins lifecycle

Plugins should contain __three main methods__, which will receive the instance of the Mocks Server core. Please read the [programmatic usage chapter](advanced-programmatic-usage.md) to know how to interact with the core.

#### `register(core)`

This method will be called for registering the plugin during the Mocks Server initialization, before `options` have been initialized.

Here you should register your own custom `options` using the `core.addCustomSetting` method, register your own custom express routers using the `core.addCustomRouter` method, etc.

You should never access here to the `core.settings` methods, are they are not still ready in this phase, which was defined with the intention of letting the plugins to add their own settings.

> If you define your plugin as a Class, the `constructor` will be equivalent to defining a `register` method. If you define your plugin as a function, it will be called during the plugins registration, so you could also omit the `register` method.

#### `init(core)`

This method will be called when mocks server settings are ready. Here you already can access to the `core.settings` to get the user options, and act in consequence. Here you should also add your listeners to the core events, such as `core.onChangeSettings`, `core.onLoadMocks`, etc.

#### `start(core)`

When this method is called, the mocks server is already started and listening to requests, and the files watcher is observing for changes too.

### Example

Here you have an example of how a plugin is defined. Consult the [Mocks Server programmatic usage chapter](advanced-programmatic-usage.md) for further info:

```javascript
const { Core } = require("@mocks-server/core");

class Plugin {
  constructor(core) {
    core.addCustomSetting({
      name: "traceBehaviors",
      type: "boolean",
      description: "Trace behaviors changes",
      default: true
    });

    this._core = core;
    this._onLoadMocks = this._onLoadMocks.bind(this);
    this._onChangeSettings = this._onChangeSettings.bind(this);
  }

  init(core) {
    this._enabled = core.settings.get("traceBehaviors");
    this._removeLoadMocksListener = core.onLoadMocks(this.onLoadMocks);
    this._removeChangeSettingsListener = core.onLoadMocks(this.onChangeSettings);
    core.tracer.debug(`traceBehaviors initial value is ${core.settings.get("traceBehaviors")}`);
  }

  start(core) {
    this._started = true;
    core.tracer.debug("traceBehaviors plugin started");
  }

  _onChangeSettings(settings) {
    if (settings.hasOwnProperty("traceBehaviors")) {
      this._enabled = settings.traceBehaviors;
    }
  }

  _onLoadMocks() {
    if (this._enabled && this._started) {
      this._core.tracer.info(
        `Mocks have been reloaded, now are ${this._core.behaviors.count} available`
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

### Plugins formats

The methods can be defined in a plain `object`, as methods of a `Class` or even using a `function` returning an object containing them.

Next examples show how each format should be defined:

#### Plugin as a `Class`

```javascript
export default class Plugin {
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
}
```

#### Plugin as a `function`

```javascript
const plugin = core => {
  // Do your register stuff here
  return {
    register: core => {
      // You should omit this method if you already did your register stuff
    },
    init: core => {
      // Do your initialization stuff here
    },
    start: core => {
      // Do your start stuff here
    }
  };
};

export default plugin;
```

#### Plugin as an `object`

```javascript
const plugin = {
  register: core => {
    // Do your register stuff here
  },
  init: core => {
    // Do your initialization stuff here
  },
  start: core => {
    // Do your start stuff here
  }
};

export default plugin;
```