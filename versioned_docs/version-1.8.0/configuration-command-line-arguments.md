---
id: configuration-command-line-arguments
title: Command line arguments
original_id: configuration-command-line-arguments
---
## How to define options using command line arguments

Supossing you have a `mocks` script added to your `package.json` file, as seen in the [get started chapter](get-started-intro.md#installation), then you can define options directly in the npm script using arguments:

```json

{
  "scripts": {
    "mocks" : "mocks-server --path=./mocks --log=verbose --watch=false"
  }
}

```

Or you can define options when calling to the npm command:

```bash

npm run mocks -- --delay=300

```

&gt; Note the usage of two double dashes. Anything after the first double dashes is not an option of npm, but a parameter for the script that npm executes.

## Plugins options

Options added by registered plugins can be defined also using command line arguments. Supossing you have registered a plugin which add a new option called "language", then you'll be able to run:

```bash

npm run mocks -- --language=Es-es

```

## Boolean options

For `Boolean` options having a `true` default value, use the `--no-`. prefix for disabling them. (Read [commander documentation](https://www.npmjs.com/package/commander) for further info)

```bash

npm run mocks -- --no-adminApiDeprecatedPaths

```
