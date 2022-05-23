---
id: configuration-options
title: Options
description: Mocks Server options
keywords:
  - mocks server
  - configuration
  - options
  - settings
  - configure
  - path
  - port
  - cors
  - host
  - log level
  - files watch
  - delay
  - babel
  - typescript
---

## Options

Here are described the Mocks Server core options. To know how to define them using different methods, please [read the previous chapter](configuration-methods.md).

* __`config.allowUnknownArguments`__ _(Boolean)_: If `true`, it allows to define unknown command line arguments. Default is `false`. This option can be defined only programmatically, using configuration file or environment variables.
* __`config.fileSearchPlaces`__ _(Array of Strings)_: Paths to search for the configuration file. Default is described in the [configuration methods chapter](configuration-methods.md). This option can be defined only programmatically or using environment variables.
* __`config.readArguments`__ _(Boolean)_: If `false`, it disables the ability of defining options using command line arguments. Default is `true`. This option can be defined only programmatically, using configuration file or environment variables.
* __`config.readEnvironment`__ _(Boolean)_: If `false`, it disables the ability of defining options using environment variables. Default is `true`. This option can be defined only programmatically.
* __`config.readFile`__ _(Boolean)_: If `false`, it disables the ability of reading configuration file. Default is `true`. This option can be defined only programmatically, using configuration file or environment variables.
* __`files.path`__ _(String)_: Path to the folder containing mocks and routes to be used by the server. Default is `/mocks`
* __`files.watch`__ _(Boolean)_: Watch mocks folder and restart server on changes. Default is `true`.
* __`files.babelRegister.enabled`__ _(Boolean)_: Enables [Babel compilation](guides-using-babel.md) for files inside the mocks folder.
* __`files.babelRegister.options`__ _(Object)_: Options for [`@babel/register`](https://babeljs.io/docs/en/babel-register) when `babelRegister` is enabled. Properties in this object are passed directly to `@babel/register` as options, so refer to [its documentation](https://babeljs.io/docs/en/babel-register) for further info. You can also see some usage examples in the ["using Babel"](guides-using-babel.md) section of this docs.
* __`log`__ _(String)_: Logs level. Can be one of `silly`, `debug`, `verbose`, `info`, `warn` or `error`.
* __`mocks.delay`__ _(Number)_: Responses delay time in milliseconds. This is a global setting that can be overridden for specific routes or route variants using [their options](get-started-routes.md).
* __`mocks.selected`__ _(String)_: Mock to use when the server is started.
* __`plugins.register`__: _(Array of `Plugin`)_: Array of Plugins, defined as described in the [plugins chapter](plugins-developing-plugins.md).
* __`routesHandlers`__ _(Array of `RouteHandler`)_: Array of [`RouteHandler`](api-routes-handler.md) to be added.
* __`server.cors.enabled`__ _(Boolean)_: Built-in [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) middleware. Default is `true`.  Use `false` to disable it.
* __`server.cors.options`__ _(Object)_: Options for the built-in [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) middleware. By default, it sets the `preflightContinue` property as `false`, which means that Mocks Server will respond to all `OPTIONS` requests with a 204 status and correspondent CORS headers. If you want to [handle OPTIONS requests by yourself](get-started-routes.md#how-to-use-the-options-method), you should set that property to `true`.
* __`server.host`__ _(String)_: Host for the server. Default is `0.0.0.0` (Listen to any local host).
* __`server.jsonBodyParser.enabled`__ _(Boolean)_: If `false`, it disables the [`json` `body-parser` built-in Express middleware](https://github.com/expressjs/body-parser). Default is `true`.
* __`server.jsonBodyParser.options`__ _(Object)_: Options for the [`json` `body-parser` built-in Express middleware](https://github.com/expressjs/body-parser).
* __`server.port`__ _(Number)_: Port number for Mocks Server to be listening at. Default is `3100`.
* __`server.urlEncodedBodyParser.enabled`__ _(Boolean)_: If `false`, it disables the [`urlencoded` `body-parser` built-in Express middleware](https://github.com/expressjs/body-parser). Default is `true`.
* __`server.urlEncodedBodyParser.options`__ _(Object)_: Options for the [`urlencoded` `body-parser` built-in Express middleware](https://github.com/expressjs/body-parser).

## Plugins options

Each plugin can add its own options when it is installed. These options can also be defined and changed using [the same methods as the core options](configuration-methods.md). Note that all plugins options must be defined under the `plugins` namespace, and each plugin options must be defined under its own plugin id namespace (`plugins.[plugin-id].[option]`)

* __`plugins.inquirerCli.enabled`__ _(Boolean)_: Start interactive CLI plugin or not. Default is `true`.
* __`plugins.inquirerCli.emojis`__ _(Boolean)_: Defines wheter the inquirer CLI uses emojis or not. Default is `true`.
* __`plugins.adminApi.path`__ _(String)_: Path for the administration REST API. Default is `/admin`. You should change it only in case there is any conflict with the API you are mocking.

:::note
These extra options are added by the [@mocks-server/plugin-admin-api](https://www.npmjs.com/package/@mocks-server/plugin-admin-api) and the [@mocks-server/plugin-inquirer-cli](https://www.npmjs.com/package/@mocks-server/plugin-inquirer-cli) plugins, which are both included in the Mocks Server main distribution.

For another plugins options, please refer to their own documentation.
:::

