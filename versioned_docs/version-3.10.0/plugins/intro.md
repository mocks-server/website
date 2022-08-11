---
id: intro
title: Plugins
description: Mocks Server plugins
keywords:
  - mocks server
  - mock server
  - customization
  - plugins
  - overview
  - get started
---

## Preface

Plugins enable you to tap into, modify, or extend the Mocks Server internal behavior. In fact, some of the features described in these docs are provided by plugins preinstalled in the [Mocks Server main distribution](https://github.com/mocks-server/main/tree/master/packages/main).

Having access to the whole core API, a plugin is able to do almost anything on Mocks Server, for example:

* Adding routes and collections programmatically
* Adding new [Variant Handlers](../variant-handlers/intro.md)
* Adding custom `Express` routers to the server.
* Creating new integration tools, interfaces, etc.

## Installing plugins

Plugins can be installed using the configuration file or programmatically.

:::tip
Read the [plugins installation chapter](./installation.md) for further info.
:::

## Creating plugins

A plugin basically consist on a JavaScript `Class` containing some standardized methods. The Mocks Server core is at charge of creating the plugin instance using the provided `Class` and calling to each method on each specific time of the Mocks Server lifecycle. The `constructor` and the other methods will always receive an instance of the [Mocks Server core](../api/javascript.md), so it can be used to tap into, modify, or extend its internal behavior.

:::tip
Read the [plugins development chapter](./development.md) for further info.
:::
