---
id: using-babel
title: Using Babel
description: How to configure Babel to process Mocks Server files
keywords:
  - mocks server
  - mock server
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

It is possible to use [Babel compiler](https://babeljs.io/) when loading collection and route files. This means that Mocks Server is able to load JavaScript files using new Js syntax and even TypeScript files.

## Babel Configuration

Use the [configuration option](../configuration/options.md) `files.babelRegister.enabled` to enable Babel compilation:

```js
module.exports = {
  mock: {
    collections: {
      selected: "base",
    },
  },
  // highlight-start
  files: {
    babelRegister: {
      enabled: true
    },
  },
  // highlight-end
};
```

:::info
Enabling Babel only enables Babel registration, but its configuration still depends on you. Babel  will read the `babel.config.js` file from your project's directory, and Babel presets and other dependencies must be installed by yourself. You could also use the `files.babelRegister.options` configuration property to configure Babel without a Babel configuration file. All properties in this option are passed to Babel as options, so, [you can refer to its documentation](https://babeljs.io/docs/en/babel-register) for further info.
:::

## Examples

### Basic

Install [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env):

```bash
npm i --save-dev @babel/preset-env
```

Create a `babel.config.js` file in the project's root folder:

```js
module.exports = {
  presets: ["@babel/env"],
};
```

Now, you can create files with extensions supported by default by [`@babel/register`](https://babeljs.io/docs/en/babel-register): `.es6`, `.es`, `.esm`, `.cjs`, `.jsx`, `.mjs` and `.js`, and use syntax supported by [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env).

```
project-root/
├── mocks/
│   ├── routes/
│   │   ├── middlewares.mjs
│   │   └── users.mjs
│   └── mocks.mjs
└── mocks.config.js
```

:::caution
If you import any file located outside of the `/mocks` folder, Babel will not compile it. Read bellow to know how to configure Babel to process extra folders.
:::

### Compiling files from other folders

By default, Mocks Server configures Babel to compile only files inside the `/mocks` folder, and this may be a problem if you are importing external files from your routes or collection files. In that case, you can use the `only` option to include another folders:

```js
module.exports = {
  files: {
    babelRegister: {
      enabled: true,
      // highlight-start
      options: {
        only: (filePath) => {
          return filePath.includes("/mocks/") || filePath.includes("/my-folder-to-include/");
        },
      },
      // highlight-end
    },
  },
};
```

### TypeScript

Here is an example of how to configure Babel to compile [TypeScript](https://www.typescriptlang.org/) files in the `/mocks` folder.

Enable the `files.babelRegister.enabled` option in the [`mocks.config.js` file](../configuration/how-to-change-settings.md):

```js
module.exports = {
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

You don't need to specify `.ts` extension in the Babel configuration, because Mocks Server adds it by default when enabling `babelRegister`.

And that's all, now you can use TypeScript files in the `/mocks` folder 🥳.

```
project-root/
├── mocks/
│   ├── routes/
│   │   ├── middlewares.ts
│   │   └── users.ts
│   └── mocks.ts
└── mocks.config.js
```
