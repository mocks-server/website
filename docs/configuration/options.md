---
id: options
title: Options
description: Mocks Server options
keywords:
  - mocks server
  - configuration
  - options
  - settings
  - configure
  - folder
  - port
  - cors
  - host
  - log level
  - files watch
  - delay
  - babel
  - typescript
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## How to define options

There are multiple methods for defining Mocks Server configuration:

* [Programmatic configuration](configuration/how-to-change-settings.md#programmatic-configuration)
* [Configuration File](configuration/how-to-change-settings.md#configuration-file)
* [Environment variables](configuration/how-to-change-settings.md#environment-variables)
* [Command line arguments](configuration/how-to-change-settings.md#command-line-arguments)

:::tip
Read the [previous chapter](configuration/how-to-change-settings.md) for further info about how to define configuration using different methods.
:::

## Option names

Examples in this page use the "dot notation" to display the option names. But option names may differ depending on the chosen method to set them. Here you have a brief example of how the same option (`mock.delay`) must be defined when using different methods:

```mdx-code-block
<Tabs>
<TabItem value="Programmatic">
```

```js
// Set routes.delay option

const server = new Core({
  mock: {
    delay: 3000,
  },
});
```

:::info
Convert the "dot notation" into an object when setting programmatic configuration.
:::

```mdx-code-block
</TabItem>
<TabItem value="Configuration file">
```

```js
// Set routes.delay option

module.exports = {
  mock: {
    delay: 3000,
  },
};
```

:::info
Convert the "dot notation" into an object when setting configuration using the config file.
:::

```mdx-code-block
</TabItem>
<TabItem value="Environment variable">
```

```sh
MOCKS_MOCK_DELAY=3000 npm run mocks
```

:::info
Convert the "dot notation" into "screaming snake case", adding the `MOCKS` prefix.
:::

```mdx-code-block
</TabItem>
<TabItem value="Command line argument">
```

```sh
npm run mocks -- --mock.delay=3000
```

:::info
Use the same "dot notation".
:::

```mdx-code-block
</TabItem>
</Tabs>
```

## Core options

These options are provided by the core of Mocks Server, so they can be used in any Mocks Server distribution.

* __`config.allowUnknownArguments`__ _(Boolean)_: If `true`, it allows to define unknown command line arguments. Default is `false`. This option can be defined only programmatically, using configuration file or environment variables.
* __`config.fileSearchPlaces`__ _(Array of Strings)_: Paths to search for the configuration file. Default is described in the [configuration methods chapter](configuration/how-to-change-settings.md#configuration-file). This option can be defined only programmatically or using environment variables.
* __`config.readArguments`__ _(Boolean)_: If `false`, it disables the ability of defining options using command line arguments. Default is `true`. This option can be defined only programmatically, using configuration file or environment variables.
* __`config.readEnvironment`__ _(Boolean)_: If `false`, it disables the ability of defining options using environment variables. Default is `true`. This option can be defined only programmatically.
* __`config.readFile`__ _(Boolean)_: If `false`, it disables the ability of reading configuration file. Default is `true`. This option can be defined only programmatically, using configuration file or environment variables.
* __`files.path`__ _(String)_: Path to the folder containing collections and routes to be loaded by the server. Default is `/mocks`
* __`files.watch`__ _(Boolean)_: Watch the `/mocks` folder and restart server on changes. Default is `true`.
* __`files.babelRegister.enabled`__ _(Boolean)_: Enables [Babel compilation](guides/using-babel.md) for files inside the `/mocks` folder.
* __`files.babelRegister.options`__ _(Object)_: Options for [`@babel/register`](https://babeljs.io/docs/en/babel-register) when `babelRegister` is enabled. Properties in this object are passed directly to `@babel/register` as options, so refer to [its documentation](https://babeljs.io/docs/en/babel-register) for further info. You can also see some usage examples in the ["using Babel"](guides/using-babel.md) chapter of this docs.
* __`log`__ _(String)_: Logs level. Can be one of `silly`, `debug`, `verbose`, `info`, `warn` or `error`.
* __`mock.delay`__ _(Number)_: Responses delay time in milliseconds. This is a global setting that can be overridden in specific routes or route variants using [their options](usage/routes.md).
* __`mock.collections.selected`__ _(String)_: Collection to use when the server is started.
* __`plugins.register`__: _(Array of `Plugin`)_: Array of Plugins, defined as described in the [plugins chapter](plugins/intro.md).
* __`server.cors.enabled`__ _(Boolean)_: Built-in [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) middleware. Default is `true`.  Use `false` to disable it.
* __`server.cors.options`__ _(Object)_: Options for the built-in [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) middleware. By default, it sets the `preflightContinue` property as `false`, which means that Mocks Server will respond to all `OPTIONS` requests with a 204 status and correspondent CORS headers. If you want to [handle OPTIONS requests by yourself](guides/using-the-options-method.md), you should set that property to `true`.
* __`server.host`__ _(String)_: Host for the server. Default is `0.0.0.0` (Listen to any local host).
* __`server.jsonBodyParser.enabled`__ _(Boolean)_: If `false`, it disables the [`json` `body-parser` built-in Express middleware](https://github.com/expressjs/body-parser). Default is `true`.
* __`server.jsonBodyParser.options`__ _(Object)_: Options for the [`json` `body-parser` built-in Express middleware](https://github.com/expressjs/body-parser).
* __`server.port`__ _(Number)_: Port number for Mocks Server to be listening at. Default is `3100`.
* __`server.urlEncodedBodyParser.enabled`__ _(Boolean)_: If `false`, it disables the [`urlencoded` `body-parser` built-in Express middleware](https://github.com/expressjs/body-parser). Default is `true`.
* __`server.urlEncodedBodyParser.options`__ _(Object)_: Options for the [`urlencoded` `body-parser` built-in Express middleware](https://github.com/expressjs/body-parser).
* __`variantHandlers.register`__ _(Array of `Variant Handlers`)_: Array of [`Variant Handlers`](variant-handlers/intro.md) to be added. Default variant handlers are not removed.

## Plugins options

Each plugin can add its own options when it is installed. These options can also be defined and changed using [the same methods as the core options](configuration/how-to-change-settings.md). Note that all plugins options must be defined under the `plugins` namespace, and all options of a plugin must be defined under its own plugin id namespace (`plugins.[plugin-id].[option]`)

* __`plugins.inquirerCli.enabled`__ _(Boolean)_: Start interactive CLI plugin or not. Default is `true`.
* __`plugins.inquirerCli.emojis`__ _(Boolean)_: Defines whether the inquirer CLI uses emojis or not. Default is `true`.
* __`plugins.adminApi.path`__ _(String)_: Path for the administration REST API. Default is `/admin`. You should change it only in case there is any conflict with the routes of the API that you are mocking.

:::info
These extra options are added by the [@mocks-server/plugin-admin-api](plugins/directory.md) and the [@mocks-server/plugin-inquirer-cli](plugins/directory.md) plugins, which are both included in the Mocks Server main distribution.

For another plugins options, please refer to their own documentation.
:::
