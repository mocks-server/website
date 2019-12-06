---
id: advanced-programmatic-usage
title: Programmatic usage
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

### Core API

#### `Core` (\[coreOptions\])

##### Arguments

* `coreOptions`: `<Object>` Containing options reserved for the Core instantiation. (Do not define here any of all another options, which has to be defined in the `init` method)
	* `onlyProgrammaticOptions`: `<Boolean>` If `true`, options defined through command line arguments will be ignored.
	* `plugins`: `<Array> of Plugins`. Mocks Server Plugins to be used. Will be registered, initializated and started in same order defined here. Read the [Developing Plugins chapter to learn more about plugins](advanced-developing-plugins.md).

##### Returns a core instance containing:

###### Methods

* `init([options])`. Registers plugins, initialize options and prepare all other internal dependencies needed to start the server. Returns a promise. Accepts next arguments:
	* `options`: `<Object>` All [Mocks Server main options](configuration-options.md#main-options) or Plugins options. If command line arguments are not disabled, their values, if present, will override the values defined here. Options are internally called "settings" once they are initialized.
* `start()`. Starts the mocks server and the files watcher. Returns a promise.
* `stop()`. Stops the mocks server and the files watcher. Returns a promise.
* `restart()`. Restarts the mocks server.
* `onLoadFiles(callback)`. Adds a callback to be executed when mocks files are loaded. Returns a function for removing the added calback.
	* `callback([loadedFiles])`: `<Function>`
		* `loadedFiles`: `<Object>` Information about loaded files. Still not processed as "mocks" objects.
* `onLoadMocks(callback)`. Adds a callback to be executed when mocks are loaded. Returns a function for removing the added calback.
	* `callback([loadedMocks])`: `<Function>`
		* `loadedMocks`: `<Object>` Information about loaded mocks. Already processed as "mocks" objects, ready to be served by the mocks server.
* `onChangeSettings(callback)`. Adds a callback to be executed when settings are changed. Returns a function for removing the added calback.
	* `callback([changedSettings])`: `<Function>`
		* `changedSettings`: `<Object>` Settings properties that have changed, with new values.
* `addCustomSetting(customSetting)` Registers a new setting (which will be available also as an "option" during initialization). Has to be called before the `core.init` method is called. (It should be usually used by Plugins in their `register` method)
	* `customSetting`: `<Object>` containing next properties:
		* `name`: `<String>`. Name of the new option.
		* `type`: `<String>`. One of "string", "number", "boolean". Defines the type of the new option.
		* `description`: `<String>` Used for giving help to the user in command line arguments, for example.
		* `default`: `<Any>` Default value for the new option.
		* `parse`: `<Function>` Custom parser for the option when it is defined using command line arguments.
* `addCustomRouter(path, expressRouter)`. Adds a custom [express router](https://expressjs.com/es/guide/routing.html) to the mocks server. Custom routers will be added just before the middleware that serves the fixtures, so if a custom router path matches with a fixture path, the first one will have priority.
		* `path`: `<String>` Api path for the custom router.
		* `expressRouter`: `<Express Router>` Instance of an [express router](https://expressjs.com/es/guide/routing.html).

###### Getters

* `tracer`. Contains methods for using the built-in Mocks Server formatted tracer. Depending of the current `log` setting, the message will be printed or not:
	* `error(message)`
	* `warn(message)`
	* `info(message`
	* `verbose(message)`
	* `debug(message)`
	* `silly(message)`
* `settings`. Contains methods for interacting with the Mocks Server settings. Settings are equivalent to "options", but we use another word because they are already initialized and contains definitive values, taking into account command line arguments or other configuration methods. Available methods are:
	* `set(key, value)` Changes the value of a setting.
		* `key`: `<String>` The name of the setting to be changed. Equivalent to [option](configuration-options.md#main-options) name.
		* `value`: `<Any>` New value for the specific setting to be set.
	* `get(key)`. Returns current value of an specific setting.
		* `key`: `<String>`The name of the setting to be returned. Equivalent to [option](configuration-options.md#main-options) name.
* `serverError`. If mocks server throws an unexpected error, it is available at this getter.
* `behaviors`. Returns methods and getters related to currently available behaviors. We encourage to not use this getter by the moment, as it is still in development and the api will change in next minor releases. Properties that are going to be maintained and can be used without danger are:
	* `count`. Getter returning total number of behaviors available.
	* `names`. Getter returning an array with all behavior names.
