---
id: configuration-file
title: Configuration file
description: Mocks Server configuration file
keywords:
  - mocks server
  - configuration
  - file
  - options
  - settings
  - configure
  - plugins
---

## Options

[Low level configuration](configuration-options.md#low-level-configuration) and [options](configuration-options.md#main-options) can be defined creating a `mocks.config.js` file in the root folder of your project _(a custom file path can be defined using the `configFile` low level configuration property)_.

The first level properties returned by this configuration file will be interpreted as __[low level configuration properties](configuration-options.md#low-level-configuration)__.

Properties returned inside the `options` object will be considered as __[main options](configuration-options.md#main-options)__ or __[plugins extra options](configuration-options.md#plugins-extra-options)__.

## Formats

### Object

The configuration file can export an object containing configuration and options:

```javascript
// mocks.config.js
const FooPlugin = require("mocks-server-plugin-foo");

module.exports = {
  addPlugins: [FooPlugin],
  options: {
    path: "custom-mocks-folder",
    port: 3200,
    mock: "foo-mock",
    cli: false
  }
};
```

### Function

The configuration file can export a function. The function receives previously defined configuration _(from [previous config methods](configuration-options.md))_ that can be modified.

```javascript
// mocks.config.js
const FooPlugin = require("mocks-server-plugin-foo");

module.exports = (config) => {
  config.plugins.push(FooPlugin);
  config.options.behavior = "foo-behavior";
  return config;
};
```

### Async

The configuration file can also export an async function, or a function returning a Promise:

```javascript
// mocks.config.js
const getMockAsyncMethod = require("./getMockAsync");

module.exports = async (config) => {
  config.options.mock = await getMockAsyncMethod();
  return config;
};
```

```javascript
// mocks.config.js
const getAsyncConfig = require("./getAsyncConfig");

module.exports = () => {
  return getAsyncConfig()
    .then(config => {
      console.log(config);
      return config;
    });
};
```

