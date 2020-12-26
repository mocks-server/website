---
id: advanced-programmatic-usage
title: Programmatic usage
description: Programmatic usage of Mocks Server
keywords:
  - mocks server
  - programmatic
  - api
---

## Server

The server can be instantiated and started programmatically using the [@mocks-server/core](https://www.npmjs.com/package/@mocks-server/core) package, which does not include plugins.

You can also register your own or another existing plugins, so you could even create your custom distribution with plugins of your choice.

```javascript
const { Core } = require("@mocks-server/core");
const AdminApi = require("@mocks-server/plugin-admin-api");
const InquirerCli = require("@mocks-server/plugin-inquirer-cli");

const server = new Core({
  onlyProgrammaticOptions: false,
  plugins: [AdminApi, InquirerCli]
});

server
  .init({
    port: 3500,
    delay: 1000,
    log: "debug"
  })
  .then(server.start);
```

## Core API

#### `Core` (\[config\])

##### Arguments

* `config`: `<Object>` Containing configuration properties and options as described in the [options chapter](configuration-options.md). The object is expected to have the same format than the one described in the [configuration file chapter](configuration-file.md).

##### Returns a core instance containing:

###### Initialization methods

* `init([options])`. Registers plugins, initialize options and prepare all other internal dependencies needed to start the server. Returns a promise. Accepts next arguments:
  * `options`: `<Object>` All [Mocks Server main options](configuration-options.md#main-options) or Plugins options. Command line arguments and configuration file options will override the values defined here. Options are internally called "settings" once they are initialized.
* `start()`. Starts the mock server and plugins. Returns a promise.
* `stop()`. Stops the mock server and plugins. Returns a promise.
* `restartServer()`. Restarts the mock server.

###### Event listeners methods

* `onChangeMocks(callback)`. Adds a callback to be executed when mocks collections (fixtures or behaviors) changes. Returns a function for removing the added callback.
  * `callback()`: `<Function>`
* `onChangeSettings(callback)`. Adds a callback to be executed when settings are changed. Returns a function for removing the added callback.
  * `callback([changedSettings])`: `<Function>`
    * `changedSettings`: `<Object>` Settings properties that have changed, with new values.
* `onChangeAlerts(callback)`. Adds a callback to be executed when alerts change. Returns a function for removing the added callback.
  * `callback([currentAlerts])`: `<Function>`
    * `currentAlerts`: `<Array>` Current alerts.

###### Customization methods

* `addSetting(customSetting)` Registers a new setting (which will be available also as an "option" during initialization). Has to be called before the `core.init` method is called. (It should be usually used by Plugins in their `register` method)
  * `customSetting`: `<Object>` containing next properties:
    * `name`: `<String>`. Name of the new option.
    * `type`: `<String>`. One of "string", "number", `boolean`. Defines the type of the new option.
    * `description`: `<String>` Used for giving help to the user in command line arguments, for example.
    * `default`: `<Any>` Default value for the new option.
    * `parse`: `<Function>` Custom parser for the option when it is defined using command line arguments.
* `addRouter(path, expressRouter)` Adds a custom [express router](https://expressjs.com/es/guide/routing.html) to the mock server. Custom routers will be added just before the middleware that serves the fixtures, so if a custom router path matches with a fixture path, the first one will have priority.
    * `path`: `<String>` Api path for the custom router
    * `expressRouter`: `<Express Router>` Instance of an [express router](https://expressjs.com/es/guide/routing.html).
* `removeRouter(path, expressRouter)` Removes a custom express router previously added with the `addRouter` method.
    * `path`: `<String>` Api path of the custom router to be removed.
    * `expressRouter`: `<Express Router>` Instance of the express router to be removed.
* `addFixturesHandler(FixturesHandler)` Adds a custom fixtures handler. This allows to add new formats or methods of defining fixtures.
    * `FixturesHandler`: `<Class>` Custom fixtures handler. Read the [adding custom fixtures handlers chapter](advanced-custom-fixtures-handlers.md) for further info.

###### Getters

* `tracer`. Contains methods for using the built-in Mocks Server formatted tracer. Depending of the current `log` setting, the message will be printed or not:
  * `error(message)`
  * `warn(message)`
  * `info(message`
  * `verbose(message)`
  * `debug(message)`
  * `silly(message)`
  * `set(level)` Sets the tracer current log level. Can be one of "silent", "error", "warn", "info", "verbose", "debug" or "silly".
  * `deprecationWarn(oldMethodName, newMethodName)` Calls to `tracer.warn` for giving feedback about a method that is going to be deprecated.
* `settings`. Contains methods for interacting with the Mocks Server settings. Settings are equivalent to "options", but we use another word because they are already initialized and contains definitive values, taking into account command line arguments or other configuration methods. Available methods are:
  * `set(key, value)` Changes the value of a setting.
    * `key`: `<String>` The name of the setting to be changed. Equivalent to [option](configuration-options.md#main-options) name.
    * `value`: `<Any>` New value for the specific setting to be set.
  * `get(key)`. Returns current value of an specific setting.
    * `key`: `<String>`The name of the setting to be returned. Equivalent to [option](configuration-options.md#main-options) name.
  * `all`. Getter returning all current settings. Never modify returned object if you want to change settings, as it will have no effect. Use the `settings.set` method instead.
  * `getValidOptionName(optionName)`. Returns valid option name if it exists, or new option name if it is deprecated but is still supported, and `null` if it does not exist.
    * `optionName`: `<String>` Option name to check.
* `serverError`. If mock http server throws an unexpected error, it is available at this getter.
* `behaviors`. Returns methods and getters related to currently available behaviors.
  * `count`. Getter returning total number of behaviors available.
  * `collection`. Collection of behaviors instances.
  * `ids`. Getter returning an array with all behaviors ids.
  * `current`. Getter returning current active behavior.
  * `currentId`. Getter returning the id of the current active behavior.
* `fixtures`. Returns methods and getters related to currently available fixtures.
  * `count`. Getter returning total number of fixtures available.
  * `collection`. Collection of fixtures instances.
* `alerts`. Returns an array of current alerts.
