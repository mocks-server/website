---
id: api-mocks-server-api
title: mocksServer API
description: mocksServer API
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

Mocks Server provides the `mocksServer` instance to plugins, middlewares and other system pieces. The `mocksServer` instance is the Mocks Server core itself, and it contains methods allowing to configure, start or stop it, getters returning information, etc.

You could also create your own `mocksServer` instance programmatically. Read the [programmatic usage chapter](api-programmatic-usage.md) for further info.

## API

### Initialization methods

* __`init([programmaticOptions])`__: Register plugins, initialize options and prepare all other internal dependencies needed to start the server. Returns a promise. Accepts next arguments:
  * `programmaticOptions` _(Object)_: All [Mocks Server main options](configuration-options.md#main-options) or [plugins options](configuration-options.md#plugins-options). Command line arguments and configuration file options will override the values defined here. Options are internally called `settings` once they are initialized.
* __`start()`__: Start the server and plugins. Returns a promise.
* __`stop()`__: Stop the server and plugins. Returns a promise.
* __`restartServer()`__: Restart the server.

### Event listeners methods

* __`onChangeMocks(callback)`__: Add a callback to be executed when mocks or routes changes. Returns a function for removing the added callback.
  * `callback()` (Function): Function to be executed on change mocks.
* __`onChangeSettings(callback)`__: Add a callback to be executed when settings are changed. Returns a function for removing the added callback.
  * `callback([changedSettings])` (Function): Function to be executed on change settings.
    * `changedSettings` _(Object)_: Settings properties that have changed, with new values.
* __`onChangeAlerts(callback)`__: Add a callback to be executed when alerts change. Returns a function for removing the added callback.
  * `callback([currentAlerts])` (Function): Function to be executed on change alerts.
    * `currentAlerts` _(Array)_: Current alerts.

### Customization methods

* __`addSetting(customSetting)`__: Register a new setting (which will be available also as an `option` during initialization). Has to be called before the `mocksServer.init` method is called. (It should be usually used by Plugins in their `register` method)
  * `customSetting` _(Object)_: containing next properties:
    * `name` _(String)_: Name of the new option.
    * `type` _(String)_: One of `string`, `number`, `boolean`. Defines the type of the new option.
    * `description` _(String)_: Used for giving help to the user in command line arguments, for example.
    * `default`_(Any)_: Default value for the new option.
    * `parse` _(Function)_ Custom parser for the option when it is defined using command line arguments.
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
* __`settings`__: Contains methods for interacting with the Mocks Server settings. Settings are equivalent to `options`, but another name is used because they are already initialized and contains definitive values, taking into account command line arguments or other configuration methods. Available methods are:
  * __`set(key, value)`__: Changes the value of a setting.
    * `key` _(String)_: The name of the setting to be changed. Equivalent to [option](configuration-options.md#main-options) name.
    * `value` _(Any)_: New value for the specific setting to be set.
  * __`get(key)`__: Returns current value of an specific setting.
    * `key` _(String)_: The name of the setting to be returned. Equivalent to [option](configuration-options.md#main-options) name.
  * __`all`__: Getter returning all current settings. Never modify returned object if you want to change settings, as it will have no effect. Use the `settings.set` method instead.
  * __`getValidOptionName(optionName)`__: Returns valid option name if it exists, or new option name if it is deprecated but is still supported, and `null` if it does not exist.
    * `optionName` _(String)_: Option name to check.
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
