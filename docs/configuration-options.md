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
---

## Methods

This chapter describes all available configuration properties and options. There are multiple methods for defining configuration and options.

When the same option is defined using multiple methods, the priority is _(from lower to higher)_:

* [Defining options programmatically](api-programmatic-usage.md)
* [Using configuration file](configuration-file.md)
* [Using command line arguments](configuration-command-line-arguments.md)

## Main options

These options can be defined using [command line arguments](configuration-command-line-arguments.md), the [configuration file](configuration-file.md), and can be changed while the server is running using [the `settings` methods](api-mocks-server-api.md).

* __`path`__ _(String)_: Path to the folder containing mocks and routes to be used by the server. Default is `/mocks`
* __`port`__ _(Number)_: Port number for Mocks Server to be listening at. Default is `3100`.
* __`host`__ _(String)_: Host for the server. Default is `0.0.0.0` (Listen to any local host).
* __`log`__ _(String)_: Logs level. Can be one of `silly`, `debug`, `verbose`, `info`, `warn` or `error`.
* __`watch`__ _(String)_: Watch mocks folder and restart server on changes. Default is `true`.  Use `false` to disable it.
* __`mock`__ _(String)_: Mock to use when the server is started.
* __`delay`__ _(Number)_: Responses delay time in milliseconds.

## Plugins extra options

Each plugin can add its own options when it is installed. These options can also be defined and changed using the same methods as the main options.

* __`cli`__ _(String)_: Start interactive CLI. Default is `true`. Use `false` to disable it.
* __`adminApiPath`__ _(String)_: Path for the administration REST API. Default is `/admin`. You should change it only in case there is any conflict with the api you are mocking.

:::note
These extra options are added by the [@mocks-server/plugin-admin-api](https://www.npmjs.com/package/@mocks-server/plugin-admin-api) and the [@mocks-server/plugin-inquirer-cli](https://www.npmjs.com/package/@mocks-server/plugin-inquirer-cli) plugins, which are both included in the Mocks Server main distribution.

For another plugins options, please refer to their own documentation.
:::

## Low level configuration

This options can't be modified while the server is running, and can be defined only using the [configuration file](configuration-file.md) or [programmatically](api-programmatic-usage.md).

* __`plugins`__ _(Array of `Plugin`)_: Array of Plugins, defined as described in the [plugins chapter](plugins-developing-plugins.md).
* __`addPlugins`__ _(Array of `Plugin`)_: Array of Plugins to be added. This option does not overwrite previously defined plugins.
* __`addRoutesHandlers`__ _(Array of `RouteHandler`)_: Array of [`RouteHandler`](api-routes-handler.md) to be added. This option does not overwrite previously defined plugins.
* __`configFile`__ _(String)_: Custom path for the configuration file. If relative, it will be resolved from current working directory. Default is `mocks.config.js`.
* __`onlyProgrammaticOptions`__ _(Boolean)_: If `true`, it disables both [command line arguments](configuration-command-line-arguments.md) and [configuration file](configuration-file.md).
* __`disableCommandLineArguments`__ _(Boolean)_ If `true`, all [command line arguments](configuration-command-line-arguments.md) defining options will be ignored.
* __`disableConfigFile`__ _(Boolean)_: If `true`, the [configuration file](configuration-file.md) will be ignored.
