---
id: configuration-interactive-cli
title: Interactive CLI
original_id: configuration-interactive-cli
---
## Usage

If you are using the interactive CLI _(enabled by default)_, you don't need to provide all your desired options using [command line arguments](configuration-command-line-arguments.md) when starting the server. The CLI allows you to change settings while server is running:

```bash

npm run mocks-server

```

![Interactive CLI](/img/cli_animation.gif)

## Support

[Inquirer][inquirer-url] is used for displaying the interactive CLI. You can [consult his OS Terminals support here][inquirer-support].

[inquirer-url]: https://www.npmjs.com/package/inquirer#support-os-terminals

[inquirer-support]: https://www.npmjs.com/package/inquirer#support-os-terminals
