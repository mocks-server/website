---
id: configuration-options
title: Options
description: Mocks Server options
keywords:
  - mocks server
  - configuration
---

## Methods

This chapter describes all available configuration properties and options. There are multiple methods for defining configuration and options.

When same option is defined using multiple methods, the priority is _(from lower to higher)_:

* [Core programmatic options](advanced-programmatic-usage.md)
* [Configuration file](configuration-file.md)
* [Command line arguments](configuration-command-line-arguments.md)

## Main options

This options can be defined using [command line arguments](configuration-command-line-arguments.md) and can be changed while the server is running using [the `settings` methods](advanced-programmatic-usage.md).

* `path`: `Path as <String>` Path to the folder containing behaviors and fixtures to be used by the server. By default is `/mocks`
* `port`: `<Number>` Por number for the Mocks Server to be listening. Default is 3100.
* `host`: `<String>` Host for the server. Default is "0.0.0.0" (Listen to any local host).
* `log`: `<String>` Logs level. Can be one of "silly", "debug", "verbose", "info", "warn", "error".
* `watch`: `<String>` Watch behaviors folder and restart server on changes. Default is `true`.  Use `false` to disable it.
* `behavior`: `<String>` Default selected behavior when server is started.
* `delay`: `<Number>` Responses delay time in milliseconds.

## Low level configuration

This options can't be modified while the server is running, and can be defined only using the [configuration file](configuration-file.md) or [programmaticaly](advanced-programmatic-usage.md) _(if you are using directly the [@mocks-server/core](advanced-programmatic-usage.md) instead of the main distribution)_.

* `plugins`: `<Array of Plugins>` Array of Plugins, defined as described in the [plugins chapter](#advanced-developing-plugins).
* `addPlugins`: `<Array of Plugins>` Array of Plugins to be added. This option does not overwrite previously defined plugins.
* `configFile`: `<String>` Custom path for configuration file. If relative, will be resolved from current working directory. Default is `mocks-server.config.js`
* `onlyProgrammaticOptions`: `<Boolean>` If `true`, disables both [command line arguments](configuration-command-line-arguments.md) and [configuration file](configuration-file.md).
* `disableCommandLineArguments`: `<Boolean>` If `true`, [command line arguments](configuration-command-line-arguments.md) defining options will be ignored.
* `disableConfigFile`: `<Boolean>` If `true`, [configuration file](configuration-file.md) will be ignored.

## Plugins extra options

Each plugin can add his own options when it is registered in the mocks-server. This options can also be defined using command line arguments and changed while the server is running.

* `cli`: `<String>` Start interactive CLI. Default is `true`. Use `false` to disable it.
* `adminApiPath`: `<String>` Path for the administration api. Default is "/admin". You should change it only in case there is any conflict with the api you are mocking.
* `adminApiDeprecatedPaths` - `<Boolean>` Disables deprecated "/mocks" api path, which is still enabled by default. Used as command line argument, you can disable it using `--no-adminApiDeprecatedPaths` (Read the [command-line-arguments chapter](configuration-command-line-arguments) for further info)

> These extra options are added by the [@mocks-server/plugin-admin-api](https://www.npmjs.com/package/@mocks-server/plugin-admin-api) and the [@mocks-server/plugin-inquirer-cli](https://www.npmjs.com/package/@mocks-server/plugin-inquirer-cli) plugins, which are included in the [@mocks-server/main package distribution](https://www.npmjs.com/package/@mocks-server/main).

_If you are starting the server programmatically using the [@mocks-server/core](https://www.npmjs.com/package/@mocks-server/core) without adding any plugin, only "Main options" will be available._

For another plugins options, please refer to their own documentation.

To know how to add your own options when developing a plugin, please refer to the ["programmatic usage"](advanced-programmatic-usage) and ["developing plugins"](advanced-developing-plugins) sections.
