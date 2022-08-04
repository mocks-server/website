---
id: installation
title: Plugins installation
description: How to install Mocks Server plugins
keywords:
  - mocks server
  - mock server
  - customization
  - plugin
  - install
  - register
  - addons
  - configuration
---

### NPM installation

In order to install a plugin, first you have to install the correspondent NPM dependency:

```sh
npm i --save-dev mocks-server-plugin-foo
```

### Configuration file

Once installed, you have to register it in the Mocks Server configuration. You can do it using the [configuration file](../configuration/how-to-change-settings.md):

```js
const FooPlugin = require("mocks-server-plugin-foo");

module.exports = {
  ...config,
  plugins: {
    // highlight-next-line
    register: [FooPlugin],
  }
};
```

### Using JavaScript

If you are going to start Mocks Server using the [Javascript API](../integrations/javascript.md), you can also use the [programmatic configuration](../configuration/how-to-change-settings.md) to register your own plugins:

```js
const Core = require("@mocks-server/core");

const MyPlugin = require("./MyPlugin");

const server = new Core(
  {
    plugins: {
      // highlight-next-line
      register: [MyPlugin],
    },
  },
);

server.start();
```
