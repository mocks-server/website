---
id: guides-migrating-from-v2
title: Migrating from v2 to v3
description: How to migrate from v2.x to v3.x
keywords:
  - mocks server
  - tutorial
  - migration
  - version
  - update
  - legacy
  - guide
  - deprecated
---

## Preface

:::info
If you are already using Mocks Server v1.x you should [migrate first from v1.x to v2.x](guides-migrating-from-v1.md), and then read this chapter to migrate to v3.x.
:::

The main changes from v2.x to v3.x are:

* __Backward compatibility with v1.x has been removed__. All legacy methods and routes have been removed from all packages.
* The `Core` object in the `@mocks-server/core` package now is exported as `default`. __This only affects to users [using the programmatic API](api-programmatic-usage).__

## Importing `@mocks-server/core`

The `Core` object in the `@mocks-server/core` package now is exported as `default`. So, if you were importing v2.x as in:

```js
const { Core } = require("@mocks-server/core"); // Will fail in v3.x
```

Now you should import it like:

```js
const Core = require("@mocks-server/core"); // Works in v3.x
```

## Breaking changes

Next methods were added to v2.x in order to provide easy backward compatibility with v1.x. All of them have been removed in v3.x, so, if you started using v2.x, you may have not used any legacy method, and updating to v3.x won't produce any breaking change.

In case you have not still migrated completely to v2.x, please read the ["Migrating from v1 to v2" guide](guides-migrating-from-v1.md). Once you have migrated to v2.x, next changes won't affect to you. Anyway, here is the complete list of methods removed from all `@mocks-server` packages in v3.x:

### `@mocks-server/core`

* The `Core` object now is export as `default`.
* The `Behavior` object has been removed and it is not exported any more.
* The `addFixturesHandler` and `onChangeLegacyMocks` have been removed from the `Core` API.
* The `behaviors` and `fixtures` getters have been removed from the `Core` API.
* The `pathLegacy`, `behavior` and `watchLegacy` options are not supported any more.
* The `--behavior` command line argument has been removed.
* The `load:mocks:legacy` and `change:mocks:legacy` events are not emitted any more.

### `@mocks-server/main`

* Export `Core` as `default` export.
* The `Behavior` object has been removed and it is not exported any more.

### `@mocks-server/cypress-commands`

* The `mocksSetBehavior` command has been removed.

### `@mocks-server/plugin-inquirer-cli`

* Remove support for v1 legacy mode options.

### `@mocks-server/plugin-admin-api`

* All legacy APIs under the `/legacy` path have been removed.
* The `adminApiDeprecatedPaths` option is not supported any more.

### `@mocks-server/admin-api-paths`

* Removed `LEGACY`, `BEHAVIORS` and `FIXTURES` constants.

### `@mocks-server/admin-api-client-data-provider`

* Removed `behaviors`, `behavior`, `behaviorsModel`, `fixtures`, `fixture`, `fixtureModel` legacy objects and all of its methods.

### `@mocks-server/admin-api-client`

* Removed legacy methods `readBehaviors`, `readBehavior`, `readFixtures` and `readFixture`.
