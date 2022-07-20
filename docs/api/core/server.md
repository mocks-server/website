---
id: server
title: core.server
description: Methods of the core.server JavaScript API
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
  - server
---

```mdx-code-block
import ExampleDetails from '@site/src/components/ExampleDetails';
```

## Preface

The `core.server` object provides methods allowing to control the internal HTTP server.

:::caution
Use only the API methods described in this docs. Use other methods under your own risk, and take into account that they may change in minor versions without considering it as a breaking change.
:::

## API

### restart()

__`core.server.restart()`__: Restart the HTTP server.

```mdx-code-block
<ExampleDetails>
```

```js
await core.server.restart();
```

```mdx-code-block
</ExampleDetails>
```

### addRouter()

__`core.server.addRouter(path, expressRouter)`__: Add a custom [express router](https://expressjs.com/es/guide/routing.html) to the server. Custom routers are added just before the middleware that serves the mock [routes](usage/routes.md), so if a custom router path matches with a route path, the first one will have priority.
* `path` _(String)_: Api path for the custom router
* `expressRouter` _(Express Router)_: Instance of an [`Express` router](https://expressjs.com/es/guide/routing.html).

```mdx-code-block
<ExampleDetails>
```

```js
const express = require("express");

const customRouter = express.Router();

// highlight-next-line
core.server.addRouter("/custom-path", customRouter);
```

```mdx-code-block
</ExampleDetails>
```

### removeRouter()

__`core.server.removeRouter(path, expressRouter)`__: Remove a custom Express router previously added with the `core.server.addRouter` method.
* `path`_(String)_: Api path of the custom router to be removed.
* `expressRouter` _(Express Router)_: Instance of the express router to be removed.

```mdx-code-block
<ExampleDetails>
```

```js
const express = require("express");

const customRouter = express.Router();

core.server.addRouter("/custom-path", customRouter);
// highlight-next-line
core.server.removeRouter("/custom-path", customRouter);
```

```mdx-code-block
</ExampleDetails>
```
