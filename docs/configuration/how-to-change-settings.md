---
id: how-to-change-settings
title: How to change settings
description: How to configure Mocks Server
keywords:
  - mocks server
  - mock server
  - configuration
  - config
  - settings
  - how to
  - methods
  - sources
  - environment
  - file
  - arguments
  - command line
  - cli
---

## Methods

There are multiple methods for defining Mocks Server configuration. Apart from changing it while the server is running using any of the available APIs or integration tools, you can set the configuration before starting the server using:

* [Programmatic configuration](#programmatic-configuration)
* [Configuration File](#configuration-file)
* [Environment variables](#environment-variables)
* [Command line arguments](#command-line-arguments)

## Priority

When the same option is defined using multiple methods, the priority is the indicated in the previous list _(from lower to higher)_.

The final configuration applied will be the result of extending all configuration properties defined using any method, with the mentioned priority.

:::info
When an option is of type `Object` or `Array`, its final value will be the extension of all different values when they are defined multiple times using different methods. In that case, `Objects` are extended, and `Arrays` are concated.
:::

## Programmatic configuration

When [starting the Mocks Server core programmatically](integrations/javascript.md), you can provide an object with the configuration as first argument.

```js
const server = new Core({
  routes: {
    collections: {
      selected: "foo", // Set collection "foo" as initially selected
    },
  },
});
```

:::tip
In the [examples on the next page](configuration/options.md) you'll see options like `routes.collections.selected`. When provided programmatically, that option would correspond to object properties, like `{ routes: { collections: { selected: "foo" }}}`
:::

## Configuration file

Mocks Server searches for configuration files in `process.cwd()`. [`Cosmiconfig`](https://github.com/davidtheclark/cosmiconfig) is used to provide this feature, so it is compatible with next files formats:

* A `mocks` property in a `package.json` file
* A `.mocksrc file with JSON or YAML syntax.`
* A `.mocksrc.json`, `.mocksrc.yaml`, `.mocks.yml`, `.mocksrc.js`, or `.mocksrc.cjs` file.
* A __`mocks.config.js`__ or `mocks.config.cjs` CommonJS module exporting the object.
* A `mocks.config.js` or `mocks.config.cjs` CommonJS module exporting a function. __It receives programmatic configuration as first argument__.
* A `mocks.config.js` or `mocks.config.cjs` CommonJS module exporting an async function. __It receives programmatic configuration as first argument__.

```js
module.exports = {
  routes: {
    collections: {
      selected: "foo", // Set collection "foo" as initially selected
    },
  },
};
```

Configuration files can also export a function. In that case, the programmatic configuration will be received as first parameter, so you can modify it and return the new one.

```js
module.exports = (config) => {
  console.log(config);
  return {
    log: "verbose";
  };
};
```

:::note
Note that it is not required to return the whole configuration in the function, because the core itself extends the configuration received from all sources (programmatic, file, arguments, etc.)
:::

## Environment variables

Options can be also defined using environment variables. In this case, the option name must be provided using "screaming snake case", always with the `MOCKS` prefix. So, an option like `server.delay`, must be defined using environment variables as `MOCKS_SERVER_DELAY`.

```sh
# routes.delay option

MOCKS_ROUTES_DELAY=1000 npm run mocks
```

### Boolean values

When an option is of type `Boolean`, you can define its value using `0`/`1` or `false`/`true`:

```sh
# Disable boolean option `plugins.inquirerCli.enabled`

MOCKS_PLUGINS_INQUIRER_CLI_ENABLED=false npm run mocks
```

### Objects

Values for options of type `Object` can be defined using stringified JSONs: 

```sh
# Provide value for option `server.cors.options`

MOCKS_SERVER_CORS_OPTIONS='{"preflightContinue":false}' npm run mocks
```

### Arrays

Values for options of type `Array` can be defined using stringified JSONs: 

```sh
# Provide value for option `config.fileSearchPlaces`

MOCKS_CONFIG_FILE_SEARCH_PLACES='["myConfigFile.js","myConfigFile.json"]' npm run mocks
```

## Command line arguments

Options can also be defined using command line arguments. Options must be prefixed with a double dash (`--`).

In the [options docs](configuration/options.md) you'll see options like `routes.delay`. When provided using command line arguments, use the same format:

```sh
# routes.delay option:

npm run mocks -- --routes.delay=3000
```

:::note
Note the usage of two double dashes in the example. Anything after the first double dashes is not an option of npm, but a parameter for the script that npm executes.
:::

### Boolean values

When an option is of type `Boolean`, if the default value of the option is `true`, then use the `--no-` prefix to set it to `false`:

```sh
# Disable boolean option `plugins.inquirerCli.enabled`

npm run mocks -- --no-plugins.inquirerCli.enabled
```

If the default value of the option is `false`, then use the option name to set it to `true`:

```sh
# Enable boolean option `config.allowUnknownArguments`

npm run mocks -- --config.allowUnknownArguments
```

### Objects

Values for options of type `Object` can be defined using stringified JSONs: 

```sh
# Provide value for option `server.cors.options`

npm run mocks -- --server.cors.options='{"preflightContinue":false}'
```

### Arrays

Values for options of type `Array` can be defined using multiple arguments. A Commander `variadic` option is created under the hood to get the values, so array items have to be defined in separated arguments. Read the [Commander docs for further info](https://github.com/tj/commander.js/#variadic-option).

```sh
# Provide values for option `config.fileSearchPlaces`

npm run mocks -- --config.fileSearchPlaces myConfigFile.js myConfigFile2.js 
```
