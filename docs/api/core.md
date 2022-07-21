---
id: core
title: JavaScript API
description: Mocks Server JavaScript API
keywords:
  - mocks server
  - programmatic
  - api
  - core
  - methods
  - properties
  - getters
  - advanced usage
  - JavaScript
  - js
  - node
  - nodejs
---

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';
```

## Preface

Mocks Server provides its `core` instance to plugins, middlewares and other system pieces. It contains methods allowing to configure it, start or stop it, listen to its events, etc. Using it also enables to tap into, modify, or extend its internal behavior.

:::caution
Use only the API methods described in this docs. Use other methods under your own risk, and take into account that they may change in minor versions without considering it as a breaking change.
:::

## Constructor

__`new Core([config], [advancedOptions])`__: Creates a new Mocks Server core instance. Read the [Javascript integrations](../integrations/javascript.md) for further info.
  * `config` _(Object)_: Any of [Mocks Server core options](../configuration/options.md#core-options) or [plugins options](../configuration/options.md#plugin-options). Command line arguments, environment variables and configuration file options would override the values defined here.
  * `advancedOptions` _(Object)_:
    * `pkg` _(Object)_: Useful when creating custom distributions. It allows to define a different package name and version to check for updates. For example, the `@mocks-server/main` distribution provides its name and version to the core using this parameter, so when the core checks for updates, it uses these properties instead of its own.
      * `name` _(String)_: Package name
      * `version` _(String)_: Current package version

### Other ways of obtaining a core instance

Apart from creating your own `core` instance programmatically, you can also use it from other system elements, because it is passed as an argument to them. Some elements to which the core instance is passed are:

* __Plugins__: A plugin receives the core instance on its constructor and in all of its standardized methods. Read [plugins development](../plugins/development.md) for further info.
* __Variant handlers__: A variant handler receives the core instance on its constructor. Read [variant handlers development](../variant-handlers/development.md) for further info.
  * __middleware variants__: The core is passed from the `middleware` variant handler to the middleware functions defined in that type of variants. So, it can be used directly in Express middlewares. Read the [middleware variant chapter](../usage/variants/middleware.md) for further info.

## API

### init()

__`core.init([config])`__: Register plugins, initialize options and prepare all other internal dependencies needed to start the server. Returns a promise. Accepts next arguments:
  * `config` _(Object)_: Any of [Mocks Server options](../configuration/options.md#core-options) or [plugin options](../configuration/options.md#plugin-options). If provided, the config passed in the [constructor](#constructor) would be merged with this one. Command line arguments, environment variables and configuration file options would override the values defined here. Options are internally available using the [`core.config` API](./core/config.md) once they are initialized.

### start()

__`core.start()`__: Start the server and plugins. Returns a promise. It calls to the `init` method internally if it was not done before.

### stop()

__`core.stop()`__: Stop the server and plugins. Returns a promise.


## Example
```js
const Core = require("@mocks-server/main");

const core = new Core();

// highlight-next-line
core.init({
  server: {
    port: 3500
  },
}).then(async () => {
  // highlight-start
  await core.start();
  await core.stop();
  // highlight-end
});
```

## Children objects APIs

```mdx-code-block
<DocCardList items={useCurrentSidebarCategory().items}/>
```