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

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

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
When an option is of type `Object` or `Array`, its final value will be the extension of all different values when they are defined multiple times using different methods. In that case, `Objects` are extended, and `Arrays` are concatenated.
:::

## Programmatic configuration

When [starting the Mocks Server core programmatically](../integrations/javascript.md), you can provide an object with the configuration as first argument.

```js
const server = new Core({
  mock: {
    collections: {
      selected: "foo", // Set collection "foo" as initially selected
    },
  },
});
```

:::tip
In the [examples on the next page](./options.md) you'll see options like `mock.collections.selected`. When provided programmatically, that option would correspond to object properties, like `{ mock: { collections: { selected: "foo" }}}`
:::

## Configuration file

Mocks Server searches for a configuration file in the `process.cwd` by default. [`Cosmiconfig`](https://github.com/davidtheclark/cosmiconfig) is used to provide this feature, so it is compatible with next file names and formats:

* A `mocks` property in a `package.json` file
* A `.mocksrc file with JSON or YAML syntax.`
* A `.mocksrc.json`, `.mocksrc.yaml`, `.mocks.yml`, `.mocksrc.js`, or `.mocksrc.cjs` file.
* A __`mocks.config.js`__ or `mocks.config.cjs` CommonJS module exporting the object.
* A `mocks.config.js` or `mocks.config.cjs` CommonJS module exporting a function. __It receives programmatic configuration as first argument__.
* A `mocks.config.js` or `mocks.config.cjs` CommonJS module exporting an async function. __It receives programmatic configuration as first argument__.

Configuration files can also export a function. In that case, the programmatic configuration will be received as first parameter, so you can modify it and return the new one.

<details>
<summary>
How to search for the configuration file in another folder
</summary>
<div>

By default, Mocks Server searches for any of the mentioned configuration files in the `process.cwd` folder. But you can define a custom folder to start searching for the configuration file using the `config.fileSearchFrom` option.

```sh
mocks-server --config.fileSearchFrom=./configs
```

:::caution
Note that it will search in all parent folders recursively until finding a file or arriving at the `config.fileSearchStop` folder, which by default is also `process.cwd`. So, if you define a `config.fileSearchFrom` folder that is not under the `process.cwd` path, you should also provide the `config.fileSearchStop` folder. Otherwise, it would search recursively until the root path if no config file is found.

```sh
mocks-server --config.fileSearchFrom=../configs --config.fileSearchStop=../configs
```
::: 

</div>
</details>

<details>
<summary>
How to change the possible configuration file names
</summary>
<div>

You can define custom file names to search for using the `config.fileSearchPlaces` argument:

```sh
mocks-server --config.fileSearchPlaces=mocks.config.js --config.fileSearchPlaces=mocks.json
```

And also using the corresponding environment variable:

```sh
MOCKS_CONFIG_FILE_SEARCH_PLACES='["mocks.config.js","mocks.json"]' mocks-server
```

</div>
</details>

<details>
<summary>
How to define a fixed file path for the configuration file
</summary>
<div>

The path of the configuration file can be defined using the `config.fileSearchPlaces` option argument:

```sh
mocks-server --config.fileSearchPlaces=config/some/path/mocks.config.js
```

And also using the corresponding environment variable:

```sh
MOCKS_CONFIG_FILE_SEARCH_PLACES='["config/some/path/mocks.config.js"]' mocks-server
```

:::caution
Note that this option expects an array as input because it is intended to define the names of the files to search for. If you want to use the default file names, but in another folder, use the `config.fileSearchFrom` option instead.
:::

</div>
</details>

```mdx-code-block
<Tabs>
<TabItem value="JS Object">
```

```js
module.exports = {
  mock: {
    collections: {
      selected: "foo", // Set collection "foo" as initially selected
    },
  },
};
```

```mdx-code-block
</TabItem>
<TabItem value="JS function">
```

```js
module.exports = (config) => {
  console.log(config);
  return {
    mock: {
      collections: {
        selected: "foo", // Set collection "foo" as initially selected
      },
    },
  };
};
```

:::note
Note that it is not required to return the whole configuration in the function, because the core itself extends the configuration received from all sources (programmatic, file, arguments, etc.)
:::

```mdx-code-block
</TabItem>
<TabItem value="JS async function">
```

```js
module.exports = async (config) => {
  const selectedCollection = await getSelectedCollection();
  return {
    mock: {
      collections: {
        selected: selectedCollection
      }
    }
  };
};
```

:::note
Note that it is not required to return the whole configuration in the function, because the core itself extends the configuration received from all sources (programmatic, file, arguments, etc.)
:::

```mdx-code-block
</TabItem>
<TabItem value="JSON">
```

```json
{
  "mock": {
    "collections": {
      "selected": "foo"
    }
  }
}
```

```mdx-code-block
</TabItem>
<TabItem value="YAML">
```

```yaml
mock:
  collections:
    selected: "foo" # Set collection "foo" as initially selected
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Environment variables

Options can be also defined using environment variables. In this case, the option name must be provided using "screaming snake case", always with the `MOCKS` prefix. So, an option like `mock.routes.delay`, must be defined using environment variables as `MOCKS_MOCK_ROUTES_DELAY`.

```sh
# mock.routes.delay option

MOCKS_MOCK_ROUTES_DELAY=1000 npm run mocks
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

Options can also be defined using command line arguments. Options must be prefixed with a double dash (`--`) when running NPM commands.

In the [options docs](./options.md) you'll see options like `mock.routes.delay`. When provided using command line arguments, use the same format:

```sh
# mock.routes.delay option:

npm run mocks -- --mock.routes.delay=3000
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
