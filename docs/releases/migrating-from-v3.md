---
id: migrating-from-v3
title: Migrating from v3 to v4
description: How to prepare Mocks Server migration from v3.x to v4.x
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
If you are already using Mocks Server v2.x you should [migrate first from v2.x to v3.x](./migrating-from-v2.md), and then read this chapter to prepare migration to v4.x.
:::

## V4 motivation

A lot of great changes were introduced in v3 minor versions. Those changes were mainly focused on changing the main concepts of the project and modifying the APIs in order to make them more modular and scalable, making easier to implement the oncoming features. Each one of those changes were progressively introduced in v3 minor versions in order to provide backward compatibility mechanisms, allowing users to progressively adapt to the new APIs. Using legacy APIs in v3 produced alerts, so the users could know what things they should change in order to be ready for the v4 version, which definitively __removes the legacy code, reducing the complexity and the amount of tests, and consequently, it allows us to focus on giving the next steps for improving the developer experience and provide new awesome features 😊.__

So, the __v4 mainly removes the legacy code that was progressively deprecated in v3 minor versions__. Then, if you update to v3.12 and follow the [guide to prepare your code from v3 to v4](./preparing-for-v4.md), it would be very easy to update to v4 taking into account some few [breaking changes](#breaking-changes-from-v312).

:::tip
__First update to v3.12, which is mostly compatible with v4.x__. You will receive alerts for each thing you have to change before updating to v4.x. So, you can modify your code progressively until there are no more alerts, and then you'll be able to update to v4 reading the [breaking changes guide in this page](#breaking-changes-from-v312).
:::

## Changes summary

The main breaking changes in v4.x are:

* __Removed legacy properties in collections and variants__. Read [collections](#collections) and [variants](#variants) for further info.
* __Removed legacy options__. Read [options](#options) for further info.
* __Removed legacy methods in the JavaScript API__. Read [JavaScript API](#javascript-api) for further info.
* __Removed legacy Administration REST API path__. Read [Administration REST API path](#administration-rest-api) for further info.
* __Removed legacy formats for defining plugins, and removed legacy plugin parameters__. Read [plugins](#plugins) for further info.
* __Removed legacy format for defining variant handlers__. Read [variant handlers](#variant-handlers) for further info.
* __Removed legacy proxy handler. proxy-v4 handler renamed into proxy.__ Read [proxy handler](#proxy-handler) for further info.

### Changes in other packages related to this release

* __Admin API Client__. The `@mocks-server/admin-api-client` package release 7.0 removes the legacy default API client methods. The `AdminApiClient` class has to be used instead.

## Collections

* In [collection definitions](../usage/collections.md), the properties `routeVariants` and `routesVariants` are not supported any more. The `routes` property must be used instead.

## Variants

* In [route variants definitions](../usage/variants.md), the property `response` is not supported any more. Options for the variant handler must be defined in the variant `options` property.
* Do not support `handler` property in [variants](../usage/variants.md), which was an alias for `type`. From now, only `type` is supported (and required, unless the `disabled` property is true)
* Remove the default route handler. Now the `type` property is mandatory in [variants](../usage/variants.md)

## Options

* Remove legacy `routesHandlers` option
* Remove legacy `mocks.selected` option
* Remove legacy `mocks.delay` option

## JavaScript API

* Remove legacy `core.addRoutesHandler` method
* Remove legacy `core.loadMocks` method
* Remove legacy `core.loadRoutes` method
* Remove legacy `core.onChangeMocks` method
* Remove legacy `core.onChangeAlerts` method
* Remove legacy `core.onChangeLogs` method
* Remove legacy `core.restartServer` method
* Remove legacy `core.addRouter` method
* Remove legacy `core.removeRouter` method
* Remove `context` property from `alerts.flat` collection items
* Remove legacy `core.alertsApi` getter. Now `core.alerts` must be used instead
* Remove legacy `core.mocks` getter
* Remove legacy `core.tracer` getter
* Remove legacy `core.logs` getter
* Remove legacy `core.mock.current` setter
* Remove legacy `core.mock.restoreRoutesVariants` method
* Remove legacy `core.mock.customRoutesVariants` getter
* Remove legacy `core.mock.current` getter
* Remove legacy `core.mock.ids` getter
* Remove legacy `core.mock.plainMocks` getter
* Remove legacy `core.mock.plainRoutes` getter
* Remove legacy `core.mock.plainRoutesVariants` getter
* Remove legacy `core.mock.error` getter
* The `core.alerts` getter now returns the root [alerts API](../api/javascript/alerts.md), not a flat collection of alerts. If you want to get the flat alerts collection, use `core.alerts.flat`

## Administration REST API

* Remove custom router `/admin` from mock server. Admin API is only available at its own server from now.

## Plugins

* Remove support for defining plugins as objects, functions, etc. Now, only classes are supported. If the class has not a static id, the `alerts`, `config` and `logger` properties won’t be available in the core passed to the constructor. If the class has an id getter, those properties will be received in start, stop, init and register methods, but not in the constructor.
* Remove legacy methods passed to the plugins as parameter properties: `loadMocks`, `loadRoutes`, `addAlert`, `removeAlert`, `core`. Now, only the core is passed as argument (with namespaced alerts, logger and config)

## Variant handlers

* Ignore `version` property in variant handlers. From now, all handlers are considered to be defined in “v4” format
* Do not support `plainResponsePreview` getter in variant handlers. Now only `preview` getter is supported

## Proxy handler

* In v3, a new variant handler was released: "proxy-v4". It was named so because the "proxy" one couldn't be modified without producing a breaking change, so, the new handler was provided with a different name. In v4, the old "proxy" has been removed and the "proxy-v4" has been renamed into "proxy".

## Breaking changes from v3.12

Even if you were using v3.12 and you were not receiving any deprecation alert, you still may have to make some changes when updating to v4:

* Change your variants of type "proxy-v4" to type "proxy". Only the type property has to be changed, the options are still compatible.
* The `context` property has been removed from the `alerts.flat` collection of items.
* The `core.alerts` getter now returns the root [alerts API](../api/javascript/alerts.md), not a flat collection of alerts. If you want to get the flat alerts collection, use `core.alerts.flat`
* The `core.alertsApi` getter has been removed. Now you must use `core.alerts` instead.
* The `handler` property in [variants](../usage/variants.md), which was an alias for `type`, is not supported any more. From now, only `type` is supported (and required, unless the `disabled` property is true)
* In [collection definitions](../usage/collections.md), the property `routeVariants` is not supported any more. The `routes` property must be used instead.
