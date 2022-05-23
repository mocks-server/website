---
id: guides-using-babel
title: Using Babel
description: How to define mocks and routes using Babel
keywords:
  - mocks server
  - tutorial
  - guide
  - babel
  - typescript
  - ecmascript
  - esm
  - compiler
  - syntax
  - compatibility
---

## Preface

From Mocks Server v2.2.0 it is possible to use [Babel compiler](https://babeljs.io/) when loading mocks and routes files. This means that Mocks Server is able to load JavaScript files using new Js syntax and even TypeScript files.

## Babel Configuration

Use the [configuration option](configuration-options.md) `files.babelRegister.enabled` to enable Babel compilation:

```js
module.exports = {
  mocks: {
    selected: "base",
  },
  files: {
    babelRegister: {
      enabled: true
    },
  },
};
```

Note that enabling Babel only enables Babel registration, but its configuration still depends on you. Babel  will read the `babel.config.js` file from your project's directory, and Babel presets and other dependencies must be installed by yourself. You could also use the `files.babelRegister.options` configuration property to configure Babel without a `babel.config.js` file.

### Basic example

Install [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env):

```bash
npm i --save-dev @babel/preset-env
```

And create a `babel.config.js` file in the project's root folder:

```js
module.exports = {
  presets: ["@babel/env"],
};
```

Now, you can create files with extensions supported by default by [`@babel/register`](https://babeljs.io/docs/en/babel-register): `.es6`, `.es`, `.jsx`, `.mjs` and `.js`, and use syntax supported by [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env).

```
project-root/
├── mocks/
│   ├── routes/
│   │   ├── middlewares.es
│   │   └── users.es
│   └── mocks.es
└── mocks.config.js
```

:::caution
If you import any file located outside of the `mocks` folder, Babel will not compile it. Read bellow to know how to configure Babel to process extra folders.
:::

### Advanced configuration

Use the [configuration option](configuration-options.md) `files.babelRegister.options` to configure [`@babel/register`](https://babeljs.io/docs/en/babel-register), which is used under the hood to compile files. All properties in this option are passed to Babel as options, so [you can refer to its documentation](https://babeljs.io/docs/en/babel-register), but here are some examples that might be useful.

#### Custom file extensions

You can define your own supported file extensions, for example. When custom extensions are defined, Mocks Server will also try to load all files with those extensions in the `mocks/routes` folder, and will support defining the `mocks.js` file using any of those extensions also. It will always support `.js` and `.json` extensions as well _(but Babel will only compile files with extensions from this option)_.

```js
module.exports = {
  mocks: {
    selected: "base",
  },
  files: {
    babelRegister: {
      enabled: true,
      options: {
        extensions: [".ts"],
      },
    },
  },
};
```

#### Compile files from other folders

By default, Mocks Server configures Babel to compile only files inside the `mocks` folder, and this may be a problem if you are importing external files from your routes or mocks definitions. In that case, you can use the `only` option to include another folders:

```js
module.exports = {
  mocks: {
    selected: "base",
  },
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

## TypeScript example

Here is an example of how to configure Babel to compile [TypeScript](https://www.typescriptlang.org/) files in the mocks folder.

Enable the `files.babelRegister.enabled` option in the [`mocks.config.js` file](configuration-methods.md):

```js
module.exports = {
  mocks: {
    selected: "base",
  },
  files: {
    babelRegister: {
      enabled: true,
    },
  },
};
```

Install [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) and [`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript).

```bash
npm i --save-dev @babel/preset-env @babel/preset-typescript
```

Create a `babel.config.js` file in the project's root folder:

```js
module.exports = {
  presets: ["@babel/env", "@babel/preset-typescript"],
};
```

You don't need to specify `.ts` extensions in the [babel advanced configuration](#advanced-configuration), because Mocks Server adds it by default when enabling `babelRegister`.

That's all, now you can use `.ts` files in the mocks folder:

```
project-root/
├── mocks/
│   ├── routes/
│   │   ├── middlewares.ts
│   │   └── users.ts
│   └── mocks.ts
└── mocks.config.js
```
