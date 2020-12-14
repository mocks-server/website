---
id: plugins-inquirer-cli
title: Inquirer CLI
description: How to administrate Mocks Server using the interactive CLI
keywords:
  - mocks server
  - configuration
  - administration
---

## plugin-inquirer-cli

The main distribution includes the [inquirer-cli plugin](https://www.npmjs.com/package/@mocks-server/plugin-inquirer-cli), which provides an interactive CLI that allows to change the server settings while it is running.

## Usage

If you are using this plugin _(enabled by default)_, you don't need to provide all your desired options using the [configuration file](configuration-file.md) or [command line arguments](configuration-command-line-arguments.md) when starting the server. The CLI allows you to change settings while the server is running:

```bash
npm run mocks-server
```

![Interactive CLI](assets/cli_animation.gif)

## Options

* `cli`: `<String>` Start interactive CLI or not. Default is `true`. Use `false` to disable it.

## Caveats

When the plugin is started, it silents all mocks-server traces until you explicitly select the "Display server logs" option. So, if an error is detected while the server is starting, it will not be displayed. 

> Disable this plugin for a better debugging experience if you are facing some problem while loading fixtures or behaviors definitions. `npm run mocks-server -- --cli=false`

## Support

[Inquirer][inquirer-url] is used for displaying the interactive CLI. You can [consult his OS Terminals support here][inquirer-support].

[inquirer-url]: https://www.npmjs.com/package/inquirer
[inquirer-support]: https://www.npmjs.com/package/inquirer#support-os-terminals