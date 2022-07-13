---
id: core
title: Mocks Server core API
description: Mocks Server core API
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

:::info
You can also create and start your own Mocks Server core instance programmatically using JavaScript. Read the [Javascript integrations](integrations/javascript.md) for further info.
:::

## API

### init()

__`core.init([programmaticOptions])`__: Register plugins, initialize options and prepare all other internal dependencies needed to start the server. Returns a promise. Accepts next arguments:
  * `programmaticOptions` _(Object)_: All [Mocks Server core options](configuration/options.md#core-options) or [plugins options](configuration/options.md#plugin-options). Command line arguments, environment variables and configuration file options will override the values defined here. Options are internally available using the [`core.config` API](#config) once they are initialized.

### start()

__`core.start()`__: Start the server and plugins. Returns a promise. It calls to `init` internally if it was not done before.

### stop()

__`core.stop()`__: Stop the server and plugins. Returns a promise.


## Example
```js
import Core from "@mocks-server/main";

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

## Children objects

```mdx-code-block
<DocCardList items={useCurrentSidebarCategory().items}/>
```