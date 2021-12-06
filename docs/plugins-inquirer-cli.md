---
id: plugins-inquirer-cli
title: Inquirer CLI
description: How to administrate Mocks Server using the interactive CLI
keywords:
  - mocks server
  - configuration
  - administration
  - plugin
  - command line interface
  - inquirer
  - settings
  - options
---

## plugin-inquirer-cli

__The Mocks Server main distribution includes the [inquirer-cli plugin](https://www.npmjs.com/package/@mocks-server/plugin-inquirer-cli) preinstalled__. It provides an interactive CLI that allows to change the server settings while it is running, displays server logs, etc.

## Usage

If you are using this plugin _(enabled by default)_, you don't need to provide all your desired options using the [configuration file](configuration-file.md) or [command line arguments](configuration-command-line-arguments.md) when starting the server. The CLI allows to change settings while the server is running.

```bash
npm run mocks
```

![Interactive CLI](assets/inquirer-cli.gif)

## Options

* `cli`: `<String>` Start interactive CLI or not. Default is `true`. Use `false` to disable it.

## Alerts

The plugin will display `mocks-server` alerts on the top of the screen. This is very useful when you are changing [`routes`](get-started-routes.md) or [`mocks`](get-started-mocks.md) files and any file contains an error.

Alerts are displayed as:

![Interactive CLI alerts](assets/inquirer-cli-alerts.png)

:::info
As Mocks Server includes hot reloading, the alert will automatically disappear when the error is fixed.
:::

## Support

The [Inquirer][inquirer-url] library is used for displaying the interactive CLI. You can [consult its OS Terminals support here][inquirer-support].

[inquirer-url]: https://www.npmjs.com/package/inquirer
[inquirer-support]: https://www.npmjs.com/package/inquirer#support-os-terminals