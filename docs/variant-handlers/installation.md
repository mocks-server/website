---
id: installation
title: Variant Handlers installation
description: How to install Mocks Server Variant Handlers
keywords:
  - mocks server
  - mock server
  - customization
  - variant handler
  - variant
  - route
  - install
  - register
  - addons
  - configuration
---

### NPM installation

In order to install a Variant Handler from NPM, first you have to install the correspondent NPM dependency:

```sh
npm i --save-dev foo-variant-handler
```

### Configuration file

Once installed, you have to register it in the Mocks Server configuration. You can do it using the [configuration file](configuration/how-to-change-settings.md):

```js
const FooVariantHandler = require("foo-variant-handler");

module.exports = {
  ...config,
  variantHandlers: {
    // highlight-next-line
    register: [FooVariantHandler]
  },
};
```

### Using JavaScript config

If you are going to start Mocks Server using the [Javascript API](integrations/javascript.md), you can also use the [programmatic configuration](configuration/how-to-change-settings.md) to register your own Variant Handlers:

```js
const Core = require("@mocks-server/core");

const FooVariantHandler = require("./FooVariantHandler");

const server = new Core(
  {
    variantHandlers: {
      // highlight-next-line
      register: [FooVariantHandler]
    },
  },
);

server.start();
```

### Using JavaScript API

You can also use the [Javascript API](api/javascript/variant-handlers.md) to register your own Variant Handlers from plugins, etc.

```js
core.variantHandlers.register([FooVariantHandler]);
```
