---
id: how-to-fix-ajv-errors-installation
title: How to fix ajv-errors installation
description: How to fix ajv-errors installation
keywords:
  - installation
  - bug
  - error
  - ajv-errors
  - npm
  - peerDependencies
  - validation
---

## The bug

Mocks Server relies on `ajv` and `ajv-errors` for making validations. This may produce a bug in some projects when using npm 6.x due to a wrong installation of `peerDependencies`. In that case, Mocks Server will still work, but validations will be disabled.

The error is produced because `ajv-errors@3.x` has a `peerDependency` with `ajv@8.x`, and it doesn't work with lower `ajv` versions. Well, `mocks-server` declares both dependencies, but `npm` sometimes doesn't take this into account and provides wrong versions of the packages to `mocks-server`, which produces an error. This is an [npm issue](https://github.com/npm/npm/issues/19877) in versions lower than `7.x`.

## Workarounds

There are some workarounds to fix the error and make Mocks Server validations work properly if you face this issue in your project.

Try one of next possible workarounds:

* Install `ajv@8.x` in your project's `peerDependencies`:

```
npm i --save-dev ajv@8.x
```

* Upgrade to npm version 7 if you can

```
npm install -g npm@latest
```

* Use `yarn` rather than `npm`
* Modify manually your `package-lock.json` file and move the `ajv` and `ajv-errors` dependencies under the `mocks-server` dependencies property:

```jsonc
{
  "dependencies": {
    //...search for `ajv@8.x` and `ajv-errors@3.x` properties
    "ajv-errors": {
      "version": "3.0.0",
      //...
    },
    "ajv": {
      "version": "8.5.0",
      //...
    },
    "mocks-server": {
      //...
      "dependencies": {
        // Copy here both "ajv@8.x" and "ajv-errors@3.x" dependencies blocks
      }
    }
  }
}
```