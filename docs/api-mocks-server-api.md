---
id: api-mocks-server-api
title: mocksServer API
description: mocksServer core API
keywords:
  - mocks server
  - programmatic
  - api
  - core
  - mocksServer
  - methods
  - properties
  - getters
  - advanced usage
---

## Preface

Mocks Server provides the `mocksServer` `core` instance to plugins, middlewares and other system pieces. The `core` instance is the Mocks Server core itself, and it contains methods allowing to configure, start or stop it, getters returning information, etc.

You could also create your own `core` instance programmatically. Read the [programmatic usage chapter](api-programmatic-usage.md) for further info.

## API

### Initialization methods

* __`init([programmaticOptions])`__: Register plugins, initialize options and prepare all other internal dependencies needed to start the server. Returns a promise. Accepts next arguments:
  * `programmaticOptions` _(Object)_: All [Mocks Server main options](configuration-options.md#main-options) or [plugins options](configuration-options.md#plugins-options). Command line arguments, environment variables and configuration file options will override the values defined here. Options are internally available using the `config` API once they are initialized.
* __`start()`__: Start the server and plugins. Returns a promise.
* __`stop()`__: Stop the server and plugins. Returns a promise.
* __`restartServer()`__: Restart the server.

### Event listeners methods

* __`onChangeMocks(callback)`__: Add a callback to be executed when mocks or routes changes. Returns a function for removing the added callback.
  * `callback()` (Function): Function to be executed on change mocks.
* __`onChangeAlerts(callback)`__: Add a callback to be executed when alerts change. Returns a function for removing the added callback.
  * `callback([currentAlerts])` (Function): Function to be executed on change alerts.
    * `currentAlerts` _(Array)_: Current alerts.

### Customization methods

* __`addRouter(path, expressRouter)`__: Add a custom [express router](https://expressjs.com/es/guide/routing.html) to the server. Custom routers will be added just before the middleware that serves the routes, so if a custom router path matches with a route path, the first one will have priority.
    * `path` _(String)_: Api path for the custom router
    * `expressRouter` _(Express Router)_: Instance of an [`express` router](https://expressjs.com/es/guide/routing.html).
* __`removeRouter(path, expressRouter)`__: Remove a custom express router previously added with the `addRouter` method.
    * `path`_(String)_: Api path of the custom router to be removed.
    * `expressRouter` _(Express Router)_: Instance of the express router to be removed.
* __`addRoutesHandler(RoutesHandler)`__: Add a custom routes handler. This allows to add new formats of defining route variants.
    * `RoutesHandler`: `<Class>` Custom routes handler. Read the [adding custom route handlers chapter](api-routes-handler.md) for further info.

### Getters

* __`tracer`__: Contains methods for using the built-in Mocks Server formatted tracer. Depending of the current `log` setting, the message will be printed or not:
  * __`error(message)`__
  * __`warn(message)`__
  * __`info(message`__
  * __`verbose(message)`__
  * __`debug(message)`__
  * __`silly(message)`__
  * __`set(level, [transport])`__: Sets the tracer current log level.
    * `level` _(String)_: Level can be one of `silent`, `error`, `warn`, `info`, `verbose`, `debug` or `silly`.
    * `transport` _(String)_: The tracer transport in which the level has to be set. Can be one of `console`, `store`. Default is `console`.
  * __`store`__: Returns an array with logs _(only last 1000 are stored)_. The level of logs stored can be changed using `tracer.set(level, "store")`.
  * __`deprecationWarn(oldMethodName, newMethodName)`__ Call to `tracer.warn` for giving feedback about a method that is going to be deprecated.
* __`config`__: Returns the core `config` instance. Read [`config`](#config) for further info.
* __`mocks`__: Returns methods and getters related to currently available mocks and routes.
  * __`useRouteVariant(variantId)`__: Define a route variant to be used by the current mock. Route variants are restored whenever the current mock changes.
    * `variantId` _(String)_: Route variant id, with the format `"[routeId]:[variantId]"`.
  * __`restoreRoutesVariants()`__: Restore current mock route variants. It removes all variants defined with the `useRouteVariant` method.
  * __`customRoutesVariants`__: Getter returning array of currently used routes variants ids.
  * __`current`__: Getter returning current `mock` id.
  * __`ids`__: Getter returning an array with all mocks ids.
  * __`plainMocks`__: Returns an array with current mocks in plain format.
  * __`plainRoutes`__: Returns an array with current routes in plain format.
  * __`plainRoutesVariants`__: Returns an array with current routes variants in plain format.
* __`alerts`__: Returns an array of current alerts.

### Config methods

The core exposes a getter named `config` which returns an instance of the `config` object. Here you have described its API partially. For further information about this object, please [read the `@mocks-server/config` docs](https://github.com/mocks-server/main/tree/master/packages/config/README.md).

* __`addNamespace(name)`__: Add namespace to the root. Returns a [namespace instance](#config-namespace-instance).
  * `name` _(String)_: Name for the namespace.
* __`addOption(optionProperties)`__: Equivalent to the `addOption` method in namespaces, but it add the option to the root. Returns an [option instance](#config-option-instance).
  * `optionProperties` _(Object)_: Properties defining the option. See the `addOption` method in namespaces for further info.
* __`addOptions(optionsProperties)`__: Add many options. Returns an array of [option instances](#config-option-instance).
  * `optionsProperties` _(Array)_: Array of `optionProperties`.
* __`namespace(name)`__: Returns the [namespace instance](#config-namespace-instance) in the root config with name equal to `name`.
* __`option(optionName)`__: Returns the [option instances](#config-option-instance) in the root config with name equal to `optionName`.
* __`set(configuration)`__: Set configuration properties to each correspondent namespace and options.
  * `configuration` _(Object)_: Object with programmatic configuration. Levels in the object correspond to namespaces names, and last level keys correspond to option names.
* __`validate(configuration, options)`__: Allows to prevalidate a configuration before setting it, for example. It returns an object with `valid` and `errors` properties. See [AJV docs for further info](https://ajv.js.org/guide/getting-started.html#basic-data-validation).
  * `configuration` _(Object)_: Object with configuration. Levels in the object correspond to namespaces names, and last level keys correspond to option names.
  * `options` _(Object)_: Object with extra options for validation:
    * `allowAdditionalProperties` _(Boolean)_: _Default `false`_. If true, additional properties in the configuration would not produce validation errors.
* __`value`__: Getter returning the current values from all namespaces and options as an object. Levels in the object correspond to namespaces names, and last level keys correspond to option names. It can be also used as setter as an alias of the `set` method, with default options.
* __`loadedFile`__: Getter returning the file path of the loaded configuration file. It returns `null` if no configuration file was loaded.
* __`namespaces`__: Getter returning array with all root namespaces.
* __`options`__: Getter returning array with all root options.

#### Config namespace instance

* __`addNamespace(name)`__: Add another namespace to the current namespace. Returns a [namespace instance](#config-namespace-instance).
  * `name` _(String)_: Name for the namespace.
* __`addOption(optionProperties)`__: Adds an option to the namespace. Returns an [option instance](#config-option-instance).
  * `optionProperties` _(Object)_: Properties defining the option.
    * __`name`__ _(String)_: Name for the option.
    * __`description`__ _(String)_: _Optional_. Used in help, traces, etc.
    * __`type`__  _(String)_. One of _`string`_, _`boolean`_, _`number`_, _`array`_ or _`object`_. Used to apply type validation when loading configuration and in `option.value` setter.
    * __`itemsType`__ _(String)_. Can be defined only when `type` is `array`. It must be one of _`string`_, _`boolean`_, _`number`_ or _`object`_.
    * __`default`__ - _Optional_. Default value. Its type depends on the `type` option.
    * __`extraData`__ - _(Object)_. _Optional_. Useful to store any extra data you want in the option. For example, Mocks Server uses it to define wheter an option must be written when creating the configuration scaffold or not.
* __`addOptions(optionsProperties)`__: Add many options. Returns an array of [option instances](#config-option-instance).
  * `optionsProperties` _(Array)_: Array of `optionProperties`.
* __`namespace(name)`__: Returns the [namespace instance](#config-namespace-instance) in this namespace with name equal to `name`.
* __`option(optionName)`__: Returns the [option instances](#config-option-instance) in this namespace with name equal to `optionName`.
* __`name`__: Getter returning the namespace name.
* __`namespaces`__: Getter returning an array with children namespaces.
* __`options`__: Getter returning an array object with children options.
* __`set(configuration)`__: Set configuration properties to each correspondent child namespace and options.
  * `configuration` _(Object)_: Object with configuration. Levels in the object correspond to child namespaces names, and last level keys correspond to option names.
* __`value`__: Getter returning the current values from all child namespaces and options as an object. Levels in the object correspond to namespaces names, and last level keys correspond to option names. It can be also used as setter as an alias of the `set` method, with default options.

#### Config option instance

* __`value`__: Getter of the current value. It can be also used as setter as an alias of the `set` method, with default options..
* __`set(value)`__: Set value.
* __`onChange(callback)`__: Allows to add a listener that will be executed whenever the value changes. It only emit events after calling to the `config.start` method. __It returns a function that removes the listener once executed__.
  * `callback(value)` _(Function)_: Callback to be executed whenever the option value changes. It receives the new value as first argument.
* __`name`__: Getter returning the option name.
* __`type`__: Getter returning the option type.
* __`description`__: Getter returning the option description.
* __`extraData`__: Getter returning the option extra data.
* __`default`__: Getter returning the option default value.
