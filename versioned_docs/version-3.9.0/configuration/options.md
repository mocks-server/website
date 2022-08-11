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
import ExampleDetails from '@site/src/components/ExampleDetails';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## How to define options

There are multiple methods for defining Mocks Server configuration:

* [Programmatic configuration](./how-to-change-settings.md#programmatic-configuration)
* [Configuration File](./how-to-change-settings.md#configuration-file)
* [Environment variables](./how-to-change-settings.md#environment-variables)
* [Command line arguments](./how-to-change-settings.md#command-line-arguments)

:::tip
Read the [previous chapter](./how-to-change-settings.md) for further info about how to define configuration using different methods.
:::

### Option names

The name of the options in this page use the "dot notation". But option names may differ depending on the chosen method to set them. Here you have a brief example of how the same option (`mock.routes.delay`) must be defined when using different methods:

```mdx-code-block
<Tabs>
<TabItem value="Programmatic">
```

```js
// Set mock.routes.delay option

const server = new Core({
  mock: {
    routes: {
      delay: 3000,
    },
  },
});
```

:::info
Convert the "dot notation" into an object when setting programmatic configuration.
:::

```mdx-code-block
</TabItem>
<TabItem value="JS Config file">
```

```js
// Set mock.routes.delay option

module.exports = {
  mock: {
    routes: {
      delay: 3000,
    },
  },
};
```

:::info
Convert the "dot notation" into an object when setting configuration using the config file.
:::

```mdx-code-block
</TabItem>
<TabItem value="YAML Config file">
```

```yaml
mock:
  routes:
    delay: 3000
```

:::info
Convert the "dot notation" into an object when setting configuration using the config file.
:::

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_MOCK_ROUTES_DELAY=3000 npm run mocks
```

:::info
Convert the "dot notation" into "screaming snake case", adding the `MOCKS` prefix.
:::

```mdx-code-block
</TabItem>
<TabItem value="Command line argument">
```

```sh
npm run mocks -- --mock.routes.delay=3000
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

### config.allowUnknownArguments

_(Boolean)_: When set to `true`, it allows to define unknown command line arguments. Default is `false`. It can be defined in any source.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
config:
  allowUnknownArguments: true
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --config.allowUnknownArguments
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_CONFIG_ALLOW_UNKNOWN_ARGUMENTS=true npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  config: {
    allowUnknownArguments: true,
  },
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### config.fileSearchPlaces

_(Array of Strings)_: Paths to search for the configuration file. Default is described in the [configuration methods chapter](./how-to-change-settings.md#configuration-file). It can be defined in any source, except configuration files.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="Arguments">
```

```sh
npm run mocks -- --config.fileSearchPlaces path/to/my-config.js path/to/my-config.yml
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_CONFIG_FILE_SEARCH_PLACES='["path/to/my-config.js","path/to/my-config.yml"]' npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  config: {
    fileSearchPlaces: [
      "path/to/my-config.js",
      "path/to/my-config.yml"
    ],
  },
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### config.readArguments

_(Boolean)_: If `false`, it disables the ability of defining options using command line arguments. Default is `true`. It can be defined only using programmatic configuration.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  config: {
    readArguments: false,
  },
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### config.readEnvironment

_(Boolean)_: If `false`, it disables the ability of defining options using environment variables. Default is `true`. It can be defined using programmatic configuration or command line arguments.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="Argument">
```

```sh
npm run mocks -- --no-config.readEnvironment
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  config: {
    readEnvironment: false,
  },
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### config.readFile

_(Boolean)_: If `false`, it disables the ability of reading configuration file. Default is `true`. Obviously, it would be ignored if it is defined in the configuration file.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="Argument">
```

```sh
npm run mocks -- --no-config.readFile
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_CONFIG_READ_FILE=false npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  config: {
    readFile: false,
  },
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### files.enabled

_(String)_: Allows to disable loading routes and collections from files, which may be useful when used programmatically. Default is `true`.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
files:
  enabled: false
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --no-files.enabled
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_FILES_ENABLED=false npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  files: {
    enabled: false,
  },
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### files.path

_(String)_: Path to the folder containing collections and routes to be loaded by the server. Default is `mocks`. When relative, it is resolved from the current `process.cwd()`.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
files:
  path: custom-folder
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --files.path=custom-folder
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_FILES_PATH=custom-folder npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  files: {
    path: path.resolve(__dirname, "custom-folder"),
  },
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### files.watch

_(Boolean)_: Watch the `/mocks` folder and restart server on changes. Default is `true`.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
files:
  watch: false
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --no-files.watch
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_FILES_WATCH=false npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  files: {
    watch: false,
  },
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### files.babelRegister.enabled

_(Boolean)_: Enables [Babel compilation](../guides/using-babel.md) for files inside the `/mocks` folder.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
files:
  babelRegister:
    enabled: true
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --files.babelRegister.enabled
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_FILES_BABEL_REGISTER_ENABLED=true npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  files: {
    babelRegister: {
      enabled: true,
    },
  },
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### files.babelRegister.options

_(Object)_: Options for [`@babel/register`](https://babeljs.io/docs/en/babel-register) when `babelRegister` is enabled. Properties in this object are passed directly to `@babel/register` as options, so refer to [its documentation](https://babeljs.io/docs/en/babel-register) for further info. You can also see some usage examples in the ["using Babel"](../guides/using-babel.md) chapter of this docs.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="JS config file">
```

```js
module.exports = {
  files: {
    babelRegister: {
      enabled: true,
      options: {
        only: (filePath) => {
          return filePath.includes("/mocks/") || filePath.includes("/my-folder-to-include/");
        },
      },
    },
  },
};
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  files: {
    babelRegister: {
      enabled: true,
      options: {
        only: (filePath) => {
          return filePath.includes("/mocks/") || filePath.includes("/my-folder-to-include/");
        },
      },
    },
  },
});
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --files.babelRegister.options="{\"extensions\":[\".ts\"]}"
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_FILES_BABEL_REGISTER_OPTIONS='{"extensions":[".ts"]}' npm run mocks
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### log

_(String)_: Logs level. Can be one of `silly`, `debug`, `verbose`, `info`, `warn`, `error` or `silent`.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
log: "silly"
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --log=silent
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_LOG=debug npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  log: "verbose"
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### mock.collections.selected

_(String)_: Collection to use when the server is started.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
mock:
  collections:
    selected: "my-collection"
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --mock.collections.selected=my-collection
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_MOCK_COLLECTIONS_SELECTED=my-collection npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  mock: {
    collections: {
      selected: "my-collection"
    }
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### mock.routes.delay

_(Number)_: Responses delay time in milliseconds. This is a global setting that can be overridden in specific routes or route variants using [their options](../usage/routes.md).

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
mock:
  routes:
    delay: 1000
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --mock.routes.delay=1000
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_MOCK_ROUTES_DELAY=1000 npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  mock: {
    routes: {
      delay: 1000
    }
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### plugins.register

_(Array of `Plugin`)_: Array of Plugins, defined as described in the [plugins chapter](../plugins/intro.md).

```mdx-code-block
<ExampleDetails title="Example">
<Tabs>
<TabItem value="Programmatic">
```

```js
import FooPlugin from "./FooPlugin";

const server = new Core({
  plugins: {
    register: [
      FooPlugin,
    ]
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### server.cors.enabled

_(Boolean)_: Built-in [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) middleware. Default is `true`.  Use `false` to disable it.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
server:
  cors:
    enabled: false
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --no-server.cors.enabled
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_SERVER_CORS_ENABLED=false npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  server: {
    cors: {
      enabled: false
    }
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### server.cors.options

_(Object)_: Options for the built-in [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) middleware. By default, it sets the `preflightContinue` property as `false`, which means that Mocks Server will respond to all `OPTIONS` requests with a 204 status and correspondent CORS headers. If you want to [handle OPTIONS requests by yourself](../guides/using-the-options-method.md), you should set that property to `true`.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
server:
  cors:
    options:
      preflightContinue: true
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --server.cors.options="{\"preflightContinue\":true}"
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_SERVER_CORS_OPTIONS='{"preflightContinue":true}' npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  server: {
    cors: {
      options: {
        preflightContinue: true
      }
    }
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### server.host

_(String)_: Host for the server. Default is `0.0.0.0` (Reachable to all IPv4 addresses on the local machine).

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
server:
  host: "192.168.1.100"
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --server.host=192.168.1.100
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_SERVER_HOST=192.168.1.100 npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  server: {
    host: "192.168.1.100"
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### server.jsonBodyParser.enabled

_(Boolean)_: If `false`, it disables the [`json` `body-parser` built-in Express middleware](https://github.com/expressjs/body-parser). Default is `true`.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
server:
  jsonBodyParser:
    enabled: false
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --no-server.jsonBodyParser.enabled
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_SERVER_JSON_BODY_PARSER_ENABLED=false npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  server: {
    jsonBodyParser: {
      enabled: false,
    }
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### server.jsonBodyParser.options

_(Object)_: Options for the [`json` `body-parser` built-in Express middleware](https://github.com/expressjs/body-parser).

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
server:
  jsonBodyParser:
    options:
      limit: "200kb"
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --server.jsonBodyParser.options="{\"limit\":\"200kb\"}"
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_SERVER_JSON_BODY_PARSER_OPTIONS='{"limit":"200kb"}' npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  server: {
    jsonBodyParser: {
      options: {
        limit: "200kb"
      }
    }
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### server.port

_(Number)_: Port number for Mocks Server to be listening at. Default is `3100`.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
server:
  port: 3500
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --server.port=3500
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_SERVER_PORT=3500 npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  server: {
    port: 3500
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```


### server.urlEncodedBodyParser.enabled

_(Boolean)_: If `false`, it disables the [`urlencoded` `body-parser` built-in Express middleware](https://github.com/expressjs/body-parser). Default is `true`.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
server:
  urlEncodedBodyParser:
    enabled: false
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --no-server.urlEncodedBodyParser.enabled
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_SERVER_URL_ENCODED_BODY_PARSER_ENABLED=false npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  server: {
    urlEncodedBodyParser: {
      enabled: false,
    }
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### server.urlEncodedBodyParser.options

_(Object)_: Options for the [`urlencoded` `body-parser` built-in Express middleware](https://github.com/expressjs/body-parser).

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
server:
  urlEncodedBodyParser:
    options:
      limit: "200kb"
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --server.urlEncodedBodyParser.options="{\"limit\":\"200kb\"}"
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_SERVER_URL_ENCODED_BODY_PARSER_OPTIONS='{"limit":"200kb"}' npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  server: {
    urlEncodedBodyParser: {
      options: {
        limit: "200kb"
      }
    }
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```


### variantHandlers.register

_(Array of `Variant Handlers`)_: Array of [`Variant Handlers`](../variant-handlers/intro.md) to be added. Other variant handlers are not removed.

```mdx-code-block
<ExampleDetails title="Example">
<Tabs>
<TabItem value="Programmatic">
```

```js
import FooVariantHandler from "./FooVariantHandler";

const server = new Core({
  variantHandlers: {
    register: [
      FooVariantHandler,
    ]
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

## Plugins options

Each plugin can add its own options when it is installed. These options can also be defined and changed using [the same methods as the core options](./how-to-change-settings.md). Note that all plugins options must be defined under the `plugins` namespace, and all options of a plugin must be defined under its own plugin id namespace (`plugins.[plugin-id].[option]`)

### plugins.inquirerCli.enabled

_(Boolean)_: Start interactive CLI plugin or not. Default is `true`.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
plugins:
  inquirerCli:
    enabled: false
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --no-plugins.inquirerCli.enabled
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_SERVER_PLUGINS_INQUIRER_CLI_ENABLED=false npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  plugins: {
    inquirerCli: {
      enabled: false,
    }
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### plugins.inquirerCli.emojis

_(Boolean)_: Defines whether the inquirer CLI uses emojis or not. Default is `true`.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
plugins:
  inquirerCli:
    emojis: false
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --no-plugins.inquirerCli.emojis
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_SERVER_PLUGINS_INQUIRER_CLI_EMOJIS=false npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  plugins: {
    inquirerCli: {
      emojis: false,
    }
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### plugins.adminApi.port

_(Number)_: Port for the administration REST API. Default is `3110`.

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
plugins:
  adminApi:
    port: 3510
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --plugins.adminApi.port=3510
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_SERVER_PLUGINS_ADMIN_API_PORT=3510 npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  plugins: {
    adminApi: {
      port: 3510,
    }
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

### plugins.adminApi.host

_(String)_: Host for the administration REST API. Default is `0.0.0.0` (Reachable to all IPv4 addresses on the local machine).

```mdx-code-block
<ExampleDetails title="Examples">
<Tabs>
<TabItem value="YAML config file">
```

```yaml
plugins:
  adminApi:
    host: "192.168.1.100"
```

```mdx-code-block
</TabItem>
<TabItem value="Argument">
```

```sh
npm run mocks -- --plugins.adminApi.host=192.168.1.100
```

```mdx-code-block
</TabItem>
<TabItem value="Environment">
```

```sh
MOCKS_SERVER_PLUGINS_ADMIN_API_HOST_=192.168.1.100 npm run mocks
```

```mdx-code-block
</TabItem>
<TabItem value="Programmatic">
```

```js
const server = new Core({
  plugins: {
    adminApi: {
      host: "192.168.1.100",
    }
  }
});
```

```mdx-code-block
</TabItem>
</Tabs>
</ExampleDetails>
```

:::info
These extra options are added by the [@mocks-server/plugin-admin-api](../plugins/directory.md) and the [@mocks-server/plugin-inquirer-cli](../plugins/directory.md) plugins, which are both included in the Mocks Server main distribution.

For another plugins options, please refer to their own documentation.
:::
