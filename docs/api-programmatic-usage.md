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

#### `new Core([config])` 

##### Arguments

* `config` _(Object)_: Object containing configuration properties and options as described in the [configuration chapter](configuration-options.md).

## Core instance API

Please read the [`core` API chapter](api-mocks-server-api.md) to know all available methods and getters in the `core` instance that the `Core` class returns.
