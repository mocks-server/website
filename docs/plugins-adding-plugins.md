---
id: plugins-adding-plugins
title: Installing plugins
description: How to install Mocks Server plugins
keywords:
  - mocks server
  - customization
  - plugin
  - install
  - register
  - addons
  - configuration
---

## Plugins

Plugins are a way of extending the functionality of Mocks Server.

Some things that can be made with a plugin are:

- Load [`mocks`](get-started-mocks.md) or [`routes`](get-started-routes.md).
- Listen to Mocks Server events and act in consequence.
- Add custom express routers to the server.
- Add new options, accessible even through command line arguments.
- Change settings while the server is running.
- Add new formats of defining `route variants`. _(Using [custom routes handlers](api-routes-handler.md))_

## How to install plugins

### Configuration file

Use the [configuration file](configuration-file.md) for installing plugins:

```javascript
// mocks.config.js
const FooPlugin = require("mocks-server-plugin-foo");

module.exports = {
  addPlugins: [FooPlugin],
  options: {
    mock: "foo-mock"
  }
};
```

:::note
Note the usage of the `addPlugins` property, not the `plugins` one. This is because the main distribution of Mocks Server _([@mocks-server/main](https://www.npmjs.com/package/@mocks-server/main))_ already includes some plugins to improve the user experience. If you use `plugins` instead of `addPlugins`, all other plugins would be removed.
:::

### Programmatically

If you are using the _[@mocks-server/core package](https://www.npmjs.com/package/@mocks-server/core)_ to start Mocks Server programmatically, you can define the plugins to use as described in the [programmatic usage chapter](api-programmatic-usage.md).

## Find plugins

Use the "mocks-server-plugin" tag to [search Mocks Server plugins in NPM](https://www.npmjs.com/search?q=mocks-server-plugin).
