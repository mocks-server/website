---
id: variant-handlers
title: core.variantHandlers
description: Methods of the core.variantHandlers JavaScript API
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
  - variant
  - handler
  - variantHandlers
---

```mdx-code-block
import ExampleDetails from '@site/src/components/ExampleDetails';
```

## Preface

The `core.variantHandlers` object provides methods related to [Variant Handlers](variant-handlers/intro.md)

:::caution
Use only the API methods described in this docs. Use other methods under your own risk, and take into account that they may change in minor versions without considering it as a breaking change.
:::

## API

### register()

__`core.variantHandlers.register(VariantHandler)`__: Register a [Variant Handler](variant-handlers/intro.md).
* `VariantHandler`: `<Class>` Custom Variant handler. Read the [creating Variant Handlers chapter](variant-handlers/development.md) for further info.

```mdx-code-block
<ExampleDetails>
```

```js
import MyVariantHandler from "./MyVariantHandler";

// highlight-next-line
core.variantHandlers.register(MyVariantHandler);
```

```mdx-code-block
</ExampleDetails>
```
