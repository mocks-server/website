---
id: api-programmatic-usage
title: Programmatic usage
description: Programmatic usage of Mocks Server
keywords:
  - mocks server
  - programmatic
  - api
  - advanced usage
  - customization
---

## Core usage

The server can be instantiated and started programmatically using the [@mocks-server/core](https://www.npmjs.com/package/@mocks-server/core) package, which does not include plugins.

You can also register your own or another existing plugins, so you could even create your custom distribution with plugins of your choice.

### Example

```javascript
const Core = require("@mocks-server/core");
const AdminApi = require("@mocks-server/plugin-admin-api");
const InquirerCli = require("@mocks-server/plugin-inquirer-cli");

const core = new Core({
  config: {
    readFile: false,
    readEnvironment: false,
    readArguments: false,
  },
  plugins: {
    register: [AdminApi, InquirerCli]
  },
});

core.init({
    server: {
      port: 3500
    },
    mocks: {
      delay: 1000
    },
    log: "debug"
  })
  .then(core.start);
```

## Core API

#### `new Core([config][,advancedOptions])` 

##### Arguments

* `config` _(Object)_: Object containing configuration properties and options as described in the [configuration chapter](configuration-options.md).
* `advancedOptions` _(Object)_: Object containing advanced options for creating a core instance. It may contain any of next properties:
  * `pkg` _(Object)_: It allows to change the package name and version that is checked by the update notifier. It is useful when publishing custom Mocks Server distributions, so you can check your package version instead of the default one, which is the current version of `@mocks-server/core`. It must be an object containing next properties:
    * `name` _(String)_ : Name of the package.
    * `version` _(String)_: Installed version of the package.

## Core instance API

Please read the [`core` API chapter](api-mocks-server-api.md) to know all available methods and getters in the `core` instance that the `Core` class returns.
