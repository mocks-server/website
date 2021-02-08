---
id: plugins-adding-plugins
title: Adding plugins
description: How to develop your own Mocks Server plugins
keywords:
  - mocks server
  - customization
  - plugin
---

## Plugins

Plugins are a way of extending the functionality of Mocks Server.

Some things that can be made with a plugin are:

- Load "behaviors" or "fixtures".
- Listen to Mocks Server events and act in consequence.
- Add custom express routers to the server.
- Add new options, accessible even through command line arguments.
- Change settings while the server is running.
- Add new formats of defining "fixtures". _(Using ["custom fixtures handlers"](advanced-custom-route-handlers.md))_

## Find plugins

Use the "mocks-server-plugin" tag to [search Mocks Server plugins in NPM](https://www.npmjs.com/search?q=mocks-server-plugin).

## Add plugins

### Configuration file

Use the [configuration file](configuration-file.md) for adding plugins:

```javascript
// mocks-server.config.js
const FooPlugin = require("mocks-server-plugin-foo");

module.exports = {
  addPlugins: [FooPlugin],
  options: {
    behavior: "foo-behavior"
  }
};
```

> Note the usage of the `addPlugins` property, not the `plugins` one. This is because the main distribution of the Mocks Server _([@mocks-server/main](https://www.npmjs.com/package/@mocks-server/main))_ already includes some plugins to improve the user experience. If you use `plugins` instead of `addPlugins`, you will remove those ones added by default.

### Programmatically

If you are using the _[@mocks-server/core package](https://www.npmjs.com/package/@mocks-server/core)_ to initialize the mocks-server programmatically, you can define the plugins to use as described in the [programmatic usage chapter](advanced-programmatic-usage.md).
