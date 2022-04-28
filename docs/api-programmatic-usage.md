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

const mocksServer = new Core({
  onlyProgrammaticOptions: false,
  plugins: [AdminApi, InquirerCli]
});

mocksServer
  .init({
    port: 3500,
    delay: 1000,
    log: "debug"
  })
  .then(server.start);
```

## Core API

#### `new Core([config])` 

##### Arguments

* `config` _(Object)_: Object containing configuration properties and options as described in the [configuration file chapter](configuration-file.md).

## Core instance API

Please read the `mocksServer` API chapter to know all available methods and getters in the `mocksServer` instance that the `Core` class returns.
