---
id: version-1.4.0-configuration-options
title: Options
original_id: configuration-options
---

This chapter describes all available options in the [@mocks-server/main package distribution](https://www.npmjs.com/package/@mocks-server/main), which includes an NPM binary file and plugins for administrating the server using a REST API and an interactive CLI:

## Main options

* `path`: `Path as <String>` Path to the folder containing behaviors and fixtures to be used by the server. By default is `/mocks`
* `port`: `<Number>` Por number for the Mocks Server to be listening. Default is 3100.
* `host`: `<String>` Host for the server. Default is "0.0.0.0" (Listen to any local host).
* `log`: `<String>` Logs level. Can be one of "silly", "debug", "verbose", "info", "warn", "error".
* `watch`: `<Boolean>` Watch behaviors folder and restart server on changes. Default is `true`.
* `behavior`: `<String>` Default selected behavior when server is started.
* `delay`: `<Number` Responses delay time in milliseconds.

## Plugins extra options

* `cli`: `<Boolean>` Start interactive CLI. Default is `true`.

> These extra options are added by the [@mocks-server/plugin-admin-api](https://www.npmjs.com/package/@mocks-server/plugin-admin-api) and the [@mocks-server/plugin-inquirer-cli](https://www.npmjs.com/package/@mocks-server/plugin-inquirer-cli) plugins, which are included in the [@mocks-server/main package distribution](https://www.npmjs.com/package/@mocks-server/main).

Each plugin can add his own options when it is registered in the mocks-server. If you are starting the server programmatically using the [@mocks-server/core](https://www.npmjs.com/package/@mocks-server/core) without adding plugins, only "Main options" will be available.

For another plugins options, please refer to their own documentation.
