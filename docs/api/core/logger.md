---
id: logger
title: core.logger
description: Methods of the core.logger JavaScript API
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
  - logger
---

```mdx-code-block
import ExampleDetails from '@site/src/components/ExampleDetails';
```

## Preface

The `core.logger` object provides methods for printing and storing logs. It allows to create namespaces, so each namespaced logger provides information about its label. Each namespace log level can be set separately and each one contains also a separated logs store.

## API

:::caution
When the core is passed to a plugin as a parameter, the `logger` object is a `logger` namespace instead of the root `logger` instance. The `logger` namespace is labeled with the plugin id, so it is easy to trace where the logs come from.
:::

### error()

__`core.logger.error(message)`__: Log a message with `error` level. The message will be logged always except if the current `level` is `silent`.

### warn()

__`core.logger.warn(message)`__: Log a message with `warn` level. The message will be logged always except if the current `level` is `error` or `silent`.

### info()

__`core.logger.info(message`__: Log a message with `info` level. The message will be logged whenever the current `level` is not `error`, `warn` or `silent`.

### verbose()

__`core.logger.verbose(message)`__: Log a message with `verbose` level. The message will be logged whenever the current `level` is upper or equal than `verbose`.

### debug()
__`core.logger.debug(message)`__: Log a message with `debug` level. The message will be logged whenever the current `level` is upper or equal than `debug`.

### silly()
__`core.logger.silly(message)`__: Log a message with `silly` level. The message will be logged whenever the current `level` is upper or equal than `silly`.

### setLevel()

__`core.logger.setLevel(level, [options])`__: Set the logger current log level for the current namespace and all children namespaces recursively. 
* `level` _(String)_: Level can be one of `silent`, `error`, `warn`, `info`, `verbose`, `debug` or `silly`.
* `options` _(Object)_:
  * `transport` _(String)_: The `Winston` transport in which the level has to be set. Can be one of `console` or `store`. If not provided, the level is set to all transports. In the root logger, changes in the `store` transport will be applied also to the `globalStore` transport.
  * `propagate` _(Boolean)_: Propagates the level change to all children namespaces recursively or not. Default is `true`.
  * `pinned` _(Boolean)_: When `true`, next level changes coming from propagations will be ignored and the transport/transports will keep the defined `level`. Default is `false`.
  * `forcePropagation` _(Boolean)_: When `true`, the propagation will ignore `pinned` levels and will always override them.

:::caution
This method should not be used directly until you know well what you are doing. Use the [config API](api/core/config.md) to set the global log level instead (`core.config.option("log").value="x"`).
:::

### namespace()

__`core.logger.namespace(label)`__: Create and return a new child namespace or returns an already existent one when the `label` already exists. The returned namespace has the same `Logger` methods described here. The created namespace will inherit the current namespace level.
* `label` _(String)_: Label for the new namespace. It will be displayed as part of the log `[label]`, appended to parent namespaces labels.

### cleanStore()

__`core.logger.cleanStore()`__ Empties the namespace store array.

### onChangeStore()

__`core.logger.onChangeStore(callback)`__: Allows to add a listener that will be executed whenever a log is added to the current namespace store. __It returns a function that removes the listener once executed__.
* `callback()` _(Function)_: Callback to be executed.

### onChangeGlobalStore()

__`core.logger.onChangeGlobalStore(callback)`__: Allows to add a listener that will be executed whenever a log is added to the global store. __It returns a function that removes the listener once executed__.
* `callback()` _(Function)_: Callback to be executed.

### store

__`core.logger.store`__: Returns an array with logs stored in the current namespace.

### globalStore

__`core.logger.globalStore`__: Returns an array with logs stored in all namespaces, including those from the ancestors. There is only one global namespace for each `Logger` instance, no matter the amount of namespaces it has.

### label

__`core.logger.label`__: Getter returning the namespace label.

### level

__`core.logger.level`__: Getter returning the current namespace level.

### root

__`core.logger.root`__: Getter returning the root logger instance.

