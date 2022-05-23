---
id: configuration-methods
title: Methods
description: Mocks Server configuration methods
keywords:
  - mocks server
  - configuration
  - methods
  - settings
  - environment
  - file
  - arguments
  - command line
  - cli
  - options
---

## Configuration methods

There are multiple methods for defining Mocks Server configuration. When the same option is defined using multiple methods, the priority is _(from lower to higher)_:

* [Configuration received programmatically](#programmatic-configuration)
* [Configuration File](#configuration-file)
* [Environment variables](#environment-variables)
* [Command line arguments](#command-line-arguments)

:::info
Most of configuration properties can be changed also while the server is running using [the programmatic API](api-mocks-server-api.md), [the REST API](plugins-admin-api.md), etc.
:::

---

## Programmatic configuration

When [starting the Mocks Server core programmatically](api-programmatic-usage.md), you can provide an object with configuration properties as first argument. In the examples of the options docs page you'll see options like `mocks.selected`. When provided programmatically, that option would correspond to object properties, like `{ mocks: { selected: "foo" }}`:

```js
//mocks.selected option:

new MocksServer({
  mocks: {
    selected: "foo",
  },
});
```

---

## Configuration file

Mocks Server searches for configuration files in `process.cwd()`. [`Cosmiconfig`](https://github.com/davidtheclark/cosmiconfig) is used to provide this feature, so it is compatible with next files formats:
  * A `mocks` property in a `package.json` file
  * A `.mocksrc file with JSON or YAML syntax.`
  * A `.mocksrc.json`, `.mocksrc.yaml`, `.mocks.yml`, `.mocksrc.js`, or `.mocksrc.cjs` file.
  * A __`mocks.config.js`__ or `mocks.config.cjs` CommonJS module exporting the object.
  * A `mocks.config.js` or `mocks.config.cjs` CommonJS module exporting a function. __It receives programmatic configuration as first argument__.
  * A `mocks.config.js` or `mocks.config.cjs` CommonJS module exporting an async function. __It receives programmatic configuration as first argument__.

In the examples of the options docs you'll see options like `mocks.selected`. When provided in configuration files, that option would correspond to object properties, like `{ mocks: { selected: "foo" }}`

```js
//mocks.selected option:

module.exports = {
  mocks: {
    selected: "foo",
  },
};
```

Configuration files can also export a function. In that case, the programmatic configuration will be received as first argument, so you can modify it and return the new one:

```js
const FooPlugin = require("mocks-server-plugin-foo");

module.exports = (config) => {
  return {
    ...config,
    plugins: {
      register: [...config.plugins.register, FooPlugin],
    }
  };
};
```

---

## Environment variables

Options can be also defined using environment variables. In this case, the option name must be provided using "screaming snake case", always with the `MOCKS` prefix. So, an example in the options docs like `server.delay`, must be defined using environment variables as `MOCKS_SERVER_DELAY`.

```sh
#server.delay option

MOCKS_SERVER_DELAY=1000 npm run mocks
```

### Boolean values

When an option is of type `Boolean`, you can define its value using `0`/`1` or `false`/`true`:

```sh
#Disable boolean option `plugins.inquirerCli.enabled`

MOCKS_PLUGINS_INQUIRER_CLI_ENABLED=false npm run mocks
```

### Objects

Values for options of type `Object` can be defined using stringified JSONs: 

```sh
#Provide value for option `server.cors.options`

MOCKS_SERVER_CORS_OPTIONS='{"preflightContinue":false}' npm run mocks
```

### Arrays

Values for options of type `Array` can be defined using stringified JSONs: 

```sh
#Provide value for option `config.fileSearchPlaces`

MOCKS_CONFIG_FILE_SEARCH_PLACES='["myConfigFile.js","myConfigFile.json"]' npm run mocks
```

---

## Command line arguments

Options can also be defined using command line arguments. Options must be prefixed with a double dash (`--`).

In the examples of the options docs you'll see options like `mocks.selected`. When provided using command line arguments, use the same format:

```sh
//mocks.selected option:

npm run mocks -- --mocks.selected=foo
```

:::note
Note the usage of two double dashes in the example. Anything after the first double dashes is not an option of npm, but a parameter for the script that npm executes.
:::

### Boolean values

When an option is of type `Boolean`, if the default value of the option is `true`, then use the `--no-` prefix to set it to `false`:

```sh
#Disable boolean option `plugins.inquirerCli.enabled`

npm run mocks -- --no-plugins.inquirerCli.enabled
```

If the default value of the option is `false`, then use the option name to set it to `true`:

```sh
#Enable boolean option `config.allowUnknownArguments`

npm run mocks -- --config.allowUnknownArguments
```

### Objects

Values for options of type `Object` can be defined using stringified JSONs: 

```sh
#Provide value for option `server.cors.options`

npm run mocks -- --server.cors.options='{"preflightContinue":false}'
```

### Arrays

Values for options of type `Array` can be defined using stringified JSONs: 

```sh
#Provide value for option `config.fileSearchPlaces`

npm run mocks -- --config.fileSearchPlaces='["myConfigFile.js","myConfigFile.json"]'
```

---

## Further reading

The configuration is provided to Mocks Server using the `@mocks-server/config` package. If you want to learn further about how it works, [you can read its own docs](https://github.com/mocks-server/main/tree/master/packages/config/README.md).
