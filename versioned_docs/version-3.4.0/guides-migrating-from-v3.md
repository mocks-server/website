---
id: guides-migrating-from-v3
title: Preparing for v4
description: How to prepare migration from v3.x to v4.x
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

:::warning
If you are already using Mocks Server v2.x you should [migrate first from v2.x to v3.x](guides-migrating-from-v2.md), and then read this chapter to prepare migration to v4.x.
:::

## Preface

Even when v4 release is still not published, we are deprecating some things in v3 that will be removed in v4. While v4 is not released, every change in v3.x will be completely backward compatible, but __users upgrading to next minor versions would probably receive alerts about usage of deprecated methods, etc__.

So, every time you upgrade a minor version and receive a deprecation alert, you can come to this page and see how to adapt your code for the next major version, so you'll be able to prepare to it progressively and finally update to v4 without breaking changes.


## Changes summary

The main breaking changes in v4.x will be:

* __Some core API methods will be removed__. Read [core API](#core-api) below for further info.
* __Legacy alerts object will be removed__. Read [alerts](#alerts) for further info.
* __Arguments received by the plugins__. Read [plugins](#plugins) below for further info.
* __Remove support for defining plugins as objects or functions__. Read [plugins](#plugins) below for further info.

## Core API

* __`core.tracer`__: The `tracer` object will be completely removed and using it from v3.2 produces an alert. You must use `core.logger` instead, which is already namespaced when passed to plugins and route middlewares. [Read the logger API docs](api-mocks-server-api.md#logger) for further info.

## Alerts

* The __`core.alerts`__ getter in the core when created programmatically was different to the `core.alerts` property received in the plugins from v3.2 due to backward compatibility reasons. In v4 it will return an `alerts` instance in the first case too. In the first case, it was returning a plain alerts collection. So, if you are using a programmatic root core, you should start using `core.alertsApi.customFlat` to get the same values, because that alias will be maintained in v4. Note that, in the case of plugins, you should continue using the `alerts` property, which will not change in v4.
* The __`addAlert`__ and __`removeAlerts`__ methods that were being passed to plugins were deprecated in v3.1, and they will be removed in v4. Plugins were receiving an `alerts` property in the core to be used instead, which was also available in the root programmatic core using `core.alertsApi`. [Read the alerts API docs](api-mocks-server-api.md#alerts) for further info.


## Plugins

### Core property

In version 3.1 a `core` property was added to the argument passed to the plugins. From `v3.2`, the whole core API was passed as first argument, but with some methods specifically scoped for the plugin. The `core` property was also maintained for backward compatibility but using it produced an alert. So, in v4 the `core` property will be definitively removed.

V3 example:

```js
class Plugin {
  constructor({ logger, loadMocks, loadRoutes, core, addAlert, removeAlerts }) {
    // core property was almost an alias containing again all of the rest of properties received
  }
}
```
V4 example:
```js
class Plugin {
  constructor({ logger, loadMocks, loadRoutes }) {
    // core property is no longer received
  }
}
```

### Formats

From version 3.4, loading any plugin created as a function or as a plain object will produce an alert. In v4.x, plugins will have to be defined only as classes. So, it is strongly recommended that [any other format of plugin is converted into a class](plugins-developing-plugins.md).
