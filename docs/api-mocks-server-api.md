---
id: api-mocks-server-api
title: Core API
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
---

## Preface

Mocks Server provides its `core` instance to plugins, middlewares and other system pieces. The `core` instance is the Mocks Server core itself, and it contains methods allowing to configure, start or stop it, getters returning information, etc.

You could also create your own `core` instance programmatically. Read the [programmatic usage chapter](api-programmatic-usage.md) for further info.

## API

### Initialization

* __`core.init([programmaticOptions])`__: Register plugins, initialize options and prepare all other internal dependencies needed to start the server. Returns a promise. Accepts next arguments:
  * `programmaticOptions` _(Object)_: All [Mocks Server main options](configuration-options.md#main-options) or [plugins options](configuration-options.md#plugins-options). Command line arguments, environment variables and configuration file options will override the values defined here. Options are internally available using the `core.config` API once they are initialized.
* __`core.start()`__: Start the server and plugins. Returns a promise.
* __`core.stop()`__: Stop the server and plugins. Returns a promise.
* __`core.restartServer()`__: Restart the server.

### Event listeners

* __`core.onChangeMocks(callback)`__: Add a callback to be executed when mocks or routes changes. Returns a function for removing the added callback.
  * `callback()` (Function): Function to be executed on change mocks.
* __`core.onChangeAlerts(callback)`__: Add a callback to be executed when alerts change. Returns a function for removing the added callback.
  * `callback()` (Function): Function to be executed on change alerts.

### Customization

* __`core.addRouter(path, expressRouter)`__: Add a custom [express router](https://expressjs.com/es/guide/routing.html) to the server. Custom routers will be added just before the middleware that serves the routes, so if a custom router path matches with a route path, the first one will have priority.
    * `path` _(String)_: Api path for the custom router
    * `expressRouter` _(Express Router)_: Instance of an [`express` router](https://expressjs.com/es/guide/routing.html).
* __`core.removeRouter(path, expressRouter)`__: Remove a custom express router previously added with the `addRouter` method.
    * `path`_(String)_: Api path of the custom router to be removed.
    * `expressRouter` _(Express Router)_: Instance of the express router to be removed.
* __`core.addRoutesHandler(RoutesHandler)`__: Add a custom routes handler. This allows to add new formats of defining route variants.
    * `RoutesHandler`: `<Class>` Custom routes handler. Read the [adding custom route handlers chapter](api-routes-handler.md) for further info.

### Logger

The `core.logger` getter returns the root built-in Mocks Server logger instance. It allows to create namespaces, so each log provides information about the namespace label. Each namespace log level can be set separately and each one contains also a separated logs store. It is important to mention that, __when the core API is passed to a plugin or to route handlers, they will receive a `logger` namespace instead of the root instance.__

* __`core.logger.error(message)`__: The message will be logged always except if the current `level` is `silent`.
* __`core.logger.warn(message)`__: The message will be logged always except if the current `level` is `error` or `silent`.
* __`core.logger.info(message`__: The message will be logged whenever the current `level` is not `error`, `warn` or `silent`.
* __`core.logger.verbose(message)`__: The message will be logged whenever the current `level` is upper or equal than `verbose`.
* __`core.logger.debug(message)`__: The message will be logged whenever the current `level` is upper or equal than `debug`.
* __`core.logger.silly(message)`__: The message will be logged whenever the current `level` is upper or equal than `silly`.
* __`core.logger.setLevel(level, [options])`__: Sets the logger current log level for the current namespace and all children namespaces recursively. It should not be used directly until you know well what you are doing. Use `core.config.option("log").value="x"` instead.
  * `level` _(String)_: Level can be one of `silent`, `error`, `warn`, `info`, `verbose`, `debug` or `silly`.
  * `options` _(Object)_:
    * `transport` _(String)_: The `Winston` transport in which the level has to be set. Can be one of `console` or `store`. If not provided, the level is set to all transports. In the root logger, changes in the `store` transport will be applied also to the `globalStore` transport.
    * `propagate` _(Boolean)_: Propagates the level change to all children namespaces recursively or not. Default is `true`.
    * `pinned` _(Boolean)_: When `true`, next level changes coming from propagations will be ignored and the transport/transports will keep the defined `level`. Default is `false`.
    * `forcePropagation` _(Boolean)_: When `true`, the propagation will ignore `pinned` levels and will always override them.
* __`core.logger.namespace(label)`__: Creates and returns a new child namespace or returns an already existent one when the `label` already exists. The returned namespace has the same `Logger` methods described here. The created namespace will inherit the current namespace level.
  * `label` _(String)_: Label for the new namespace. It will be displayed as part of the log `[label]`, appended to parent namespaces labels.
* __`core.logger.cleanStore()`__ Empties the namespace store array.
* __`core.logger.onChangeStore(callback)`__: Allows to add a listener that will be executed whenever a log is added to the current namespace store. __It returns a function that removes the listener once executed__.
  * `callback()` _(Function)_: Callback to be executed.
* __`core.logger.onChangeGlobalStore(callback)`__: Allows to add a listener that will be executed whenever a log is added to the global store. __It returns a function that removes the listener once executed__.
  * `callback()` _(Function)_: Callback to be executed.
* __`core.logger.store`__: Returns an array with logs stored in the current namespace.
* __`core.logger.globalStore`__: Returns an array with logs stored in all namespaces, including those from the ancestors. There is only one global namespace for each `Logger` instance, no matter the amount of namespaces it has.
* __`core.logger.label`__: Getter returning the namespace label.
* __`core.logger.level`__: Getter returning the current namespace level.
* __`core.logger.root`__: Getter returning the root logger instance.

:::info
For further information about the whole logger API, please [read the `@mocks-server/logger` docs](https://github.com/mocks-server/main/tree/master/packages/logger/README.md).
:::

### Config

The core exposes a getter named `config` which returns an instance of the `config` object. It is important to mention that, __when the core API is passed to a plugin, it will receive a [`config` namespace](#config-namespace-instance) instead of the root config instance.__

* __`core.config.addNamespace(name)`__: Add namespace to the root. Returns a [namespace instance](#config-namespace-instance).
  * `name` _(String)_: Name for the namespace.
* __`core.config.addOption(optionProperties)`__: Equivalent to the `addOption` method in namespaces, but it add the option to the root. Returns an [option instance](#config-option-instance).
  * `optionProperties` _(Object)_: Properties defining the option. See the `addOption` method in namespaces for further info.
* __`core.config.addOptions(optionsProperties)`__: Add many options. Returns an array of [option instances](#config-option-instance).
  * `optionsProperties` _(Array)_: Array of `optionProperties`.
* __`core.config.namespace(name)`__: Returns the [namespace instance](#config-namespace-instance) in the root config with name equal to `name`.
* __`core.config.option(optionName)`__: Returns the [option instances](#config-option-instance) in the root config with name equal to `optionName`.
* __`core.config.set(configuration)`__: Set configuration properties to each correspondent namespace and options.
  * `configuration` _(Object)_: Object with programmatic configuration. Levels in the object correspond to namespaces names, and last level keys correspond to option names.
* __`core.config.validate(configuration, options)`__: Allows to pre-validate a configuration before setting it, for example. It returns an object with `valid` and `errors` properties. See [AJV docs for further info](https://ajv.js.org/guide/getting-started.html#basic-data-validation).
  * `configuration` _(Object)_: Object with configuration. Levels in the object correspond to namespaces names, and last level keys correspond to option names.
  * `options` _(Object)_: Object with extra options for validation:
    * `allowAdditionalProperties` _(Boolean)_: _Default `false`_. If true, additional properties in the configuration would not produce validation errors.
* __`core.config.value`__: Getter returning the current values from all namespaces and options as an object. Levels in the object correspond to namespaces names, and last level keys correspond to option names. It can be also used as setter as an alias of the `set` method, with default options.
* __`core.config.loadedFile`__: Getter returning the file path of the loaded configuration file. It returns `null` if no configuration file was loaded.
* __`core.config.namespaces`__: Getter returning array with all root namespaces.
* __`core.config.options`__: Getter returning array with all root options.

#### Config namespace instance

A `configNamespace` instance is returned when using the root `core.config.namespace(name)` method, or when executing `configNamespace.namespace(name)` in a namespace. So, you can create any amount of config namespace levels.

* __`configNamespace.addNamespace(name)`__: Add another namespace to the current namespace. Returns a [namespace instance](#config-namespace-instance).
  * `name` _(String)_: Name for the namespace.
* __`configNamespace.addOption(optionProperties)`__: Adds an option to the namespace. Returns an [option instance](#config-option-instance).
  * `optionProperties` _(Object)_: Properties defining the option.
    * `name` _(String)_: Name for the option.
    * `description` _(String)_: _Optional_. Used in help, traces, etc.
    * `type` _(String)_. One of _`string`_, _`boolean`_, _`number`_, _`array`_ or _`object`_. Used to apply type validation when loading configuration and in `option.value` setter.
    * `itemsType` _(String)_. Can be defined only when `type` is `array`. It must be one of _`string`_, _`boolean`_, _`number`_ or _`object`_.
    * `default` - _Optional_. Default value. Its type depends on the `type` option.
    * `extraData` - _(Object)_. _Optional_. Useful to store any extra data you want in the option. Mocks Server supported `extraData` options are:
      * `scaffold` - _(Object)_.
        * `omit` - _(Boolean)_. Determines whether the option should be included in the config scaffold or not. Default is `false`.
        * `commented` - _(Boolean)_. Determines whether the option should be commented in the config scaffold or not. Default is `false`.
        * `value` - _(Any)_. Provides a specific value to be set for this option when the config scaffold is created.
* __`configNamespace.addOptions(optionsProperties)`__: Add many options. Returns an array of [option instances](#config-option-instance).
  * `optionsProperties` _(Array)_: Array of `optionProperties`.
* __`configNamespace.namespace(name)`__: Returns the [namespace instance](#config-namespace-instance) in this namespace with name equal to `name`.
* __`configNamespace.option(optionName)`__: Returns the [option instances](#config-option-instance) in this namespace with name equal to `optionName`.
* __`configNamespace.name`__: Getter returning the namespace name.
* __`configNamespace.namespaces`__: Getter returning an array with children namespaces.
* __`configNamespace.options`__: Getter returning an array object with children options.
* __`configNamespace.set(configuration)`__: Set configuration properties to each correspondent child namespace and options.
  * `configuration` _(Object)_: Object with configuration. Levels in the object correspond to child namespaces names, and last level keys correspond to option names.
* __`configNamespace.value`__: Getter returning the current values from all child namespaces and options as an object. Levels in the object correspond to namespaces names, and last level keys correspond to option names. It can be also used as setter as an alias of the `set` method, with default options.
* __`configNamespace.root`__: Getter returning the root configuration instance. It is useful when trying to access to the root Mocks Server configuration from a plugin, but use it with caution because you will be accessing to all of the elements configuration, not only to the plugin's one.

#### Config option instance

An `option` instance is returned when using the `config.addOption` or `config.option` methods.

* __`option.value`__: Getter or setter of the current value.
* __`option.set(value, [options])`__: Sets option value. Allows to pass options when setting the value.
  * `options` :
* __`option.onChange(callback)`__: Allows to add a listener that will be executed whenever the value changes. It only emit events after calling to the `config.start` method. __It returns a function that removes the listener once executed__.
  * `callback(value)` _(Function)_: Callback to be executed whenever the option value changes. It receives the new value as first argument.
* __`option.name`__: Getter returning the option name.
* __`option.type`__: Getter returning the option type.
* __`option.description`__: Getter returning the option description.
* __`option.extraData`__: Getter returning the option extra data.
* __`option.default`__: Getter returning the option default value.

:::info
Here was described the config API partially. For further information about this object, please [read the `@mocks-server/config` docs](https://github.com/mocks-server/main/tree/master/packages/config/README.md).
:::

### Mocks

The core exposes a getter named `mocks` which returns an instance of the internal `Mocks` object. It contains methods and getters related to currently available mocks and routes.

* __`core.mocks.useRouteVariant(variantId)`__: Define a route variant to be used by the current mock. The change is stored in memory only, so the original mock route variants are restored whenever the current mock changes.
  * `variantId` _(String)_: Route variant id, with the format `"[routeId]:[variantId]"`.
* __`core.mocks.restoreRoutesVariants()`__: Restore current mock route variants. It removes all variants defined with the `useRouteVariant` method.
* __`core.mocks.customRoutesVariants`__: Getter returning array of currently used routes variants ids.
* __`core.mocks.current`__: Getter returning current `mock` id.
* __`core.mocks.ids`__: Getter returning an array with all mocks ids.
* __`core.mocks.plainMocks`__: Returns an array with current mocks in plain format.
* __`core.mocks.plainRoutes`__: Returns an array with current routes in plain format.
* __`core.mocks.plainRoutesVariants`__: Returns an array with current routes variants in plain format.

It also expose two methods allowing to load mocks and routes programmatically, apart from those loaded from files.

* __`core.loadMocks(mocks)`__: Load `mocks` definitions. Each time this method is called, __all previously loaded mocks will be replaced by the new ones, but only those added using this method__. Mocks loaded by the files loader or other plugins will remain. When the core API is passed to plugins, each plugin receives a different instance of this method too.
  * __mocks__ _(Array)_: Array containing mocks defined as described in the [`mocks`](get-started-mocks.md) chapter.
* __`core.loadRoutes(routes)`__: Load `routes` definitions. Each time this method is called, __all previously loaded routes will be replaced by the new ones, but only those added using this method__. Routes loaded by the files loader or other plugins will remain. When the core API is passed to plugins, each plugin receives a different instance of this method too.

### Alerts

The core exposes an `alertsApi` getter which returns an instance of the `alerts` object containing methods allowing to add alerts, so Mocks Server and other plugins can know about them. Use alerts to inform the user about deprecated methods or other warning messages, or about current errors. For example, when an error happens loading files, `mocks-server` adds automatically an alert in order to let the user know about the error. It is important to mention that, __when the core API is passed to a plugin, it will receive an `alerts` subcollection instead of the root alerts instance.__

:::warning
Due to backward compatibility reasons, in `core` instances created programmatically the `core.alerts` is a getter returning all alerts in plain format, but when it is passed to plugins, then it returns the next described API. So, from plugins or routes you must use `core.alerts`, but from a `core` created programmatically by your own, you must use `core.alertsApi`. This was done to make easier to plugin developers to adapt to the next major version, because they will be able to continue using `core.alerts`, while current programmatic core users don't have a BREAKING change in the current `alerts` property until next major version.
:::

* __`core.alertsApi.set(id, message, error)`__: Adds an alert or modify it.
  * __`id`__ _(String)_: The id for the alert to be added or modified in case it already exists.
  * __`message`__ _(String)_: Message for the alert.
  * __`error`__ _(Error)_: Optional. Error causing the alert.
* __`core.alertsApi.remove(id)`__: Removes an alert.
  * __`id`__ _(String)_: Id of the alert to be removed.
* __`core.alertsApi.clean`__: Removes all alerts, including descendant collections.
* __`core.alertsApi.collection(id)`__: Allows to create a new subcollection of alerts or returns an already existent one. The returned collection will have all of the same methods described for `alerts`. It is useful to group alerts by its type. The `context` of the alerts created in a child collection will include all parent collections ids joined with `:`, so the user can also know about the alerts "group".
* __`core.alertsApi.flat`__: Returns all collection items and descendent collection items in a flat array. It adds a `collection` id to each item. For nested collections, the `id` is built with all parents ids and self id joined with `:`.
* __`core.alertsApi.root`__: Getter returning the root `alerts` object. It is useful when trying to access to the root Mocks Server alerts from a plugin, but use it with caution because you will be accessing to all of the elements alerts, not only to the plugin's one.

:::info
Here are described only some methods of the `alerts` API, for further info please read the [`@mocks-server/nested-collections` docs](https://github.com/mocks-server/main/tree/master/packages/nested-collections/README.md), but note that in Mocks Server alerts the `set` method is extended and supports passing a third `error` argument. 
:::
