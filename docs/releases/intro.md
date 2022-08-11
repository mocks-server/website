---
id: intro
title: Releases
description: Mocks Server releases
keywords:
  - mocks server
  - releases
  - history
  - version
  - update
  - legacy
  - deprecated
---

## Intro

### Packages versioning

This project adheres to [Semantic Versioning 2.0](https://semver.org/) rules.

The project mainly consists on NPM packages published to the NPM registry, and each one its versioned independently following the Semver rules.

In the Github repository, which is a monorepo, the releases are usually tagged following the versions of `@mocks-server/main` package. Releases in other packages that don't affect to the `@mocks-server/main` version are tagged as fixes of the latest version.

### Website versioning

This documentation website does not follow the Semver rules, but it is versioned following the versions of `@mocks-server/main` package. Each minor or major release of that package produces this documentation to be versioned as well. Fixes in that package or releases in other packages that don't affect to the `@mocks-server/main` version, but should be documented, are updated in the current version of this docs.

Usually, we only keep published the first major version and the latest minor version of each major release. Other minor releases docs are removed, except the previous minor release of the current version.

## Major releases

Introducing great __breaking changes is something that we always try to avoid__ on each new major version in order to make as much easy as possible the migration to the users. __Usually, when something is going to be deprecated, a backward compatibility mechanism is provided in minor versions__, so, users can start using the new features while still use some other legacy ones, and progressively migrate and stop using them in favor of the new features. Then, the migration to the next major version can be made with lower effort and progressively.

:::tip
When backward compatibility mechanisms are provided and something is going to be deprecated, you would usually receive alerts in the logs or in the interactive CLI. So, you can know which things should be changed before upgrading to the next major version.
:::

## History

Here you have a brief summary of the main changes of each release. __For a full detailed history of the correspondent versions of each package, please checkout the [Github repository release notes](https://github.com/mocks-server/main/releases)__

<details>
<summary>
NOTE: Release notes prior to the monorepo migration
</summary>
<div>

All packages were migrated to a monorepo from release v2.6.3. Release notes of previous releases in the [mocks-server/main repository](https://github.com/mocks-server/main/releases) don't include details about changes in other packages. So, for details about previous releases of other packages, please refer to each package's CHANGELOG.md file or old repository release notes. Old repositories are maintained as publicly archived repositories in the [mocks-server Github project](https://github.com/mocks-server).

</div>
</details>

### [3.10]

__2022-07-22__

* HTTPS support. Add related options to core and plugin-admin-api

### [3.9]

__2022-08-08__

* YAML support in routes and collections files
* Files JavaScript API

### [3.8]

__2022-08-04__

* Files and Status variant handlers
* Cypress commands supporting multiple Mocks Servers
* Cypress commands logs

### [3.7]

__2022-07-29__

* Static and Text variant handlers
* Add disabled property to variants
* Support method `*` in routes
* Support property `router` in Variant Handlers
* Add default content-type header to json Variant Handler

### [3.6]

__2022-07-22__

* Rename concepts into `collections`, `routes` and `variants`. Adapt website and APIs to the new concepts.
* Publish new `core.mock` API. Deprecate `core.onChangeMocks`, `core.loadMocks`, `core.loadRoutes` and all `core.mocks` methods.
* Add new options `files.enabled`, `mock.routes.delay` and `mock.collections.selected` * Add  option. Deprecate `mocks.delay` and `mocks.selected`
* Support `type` and `options` properties in variants
* Support `routes` and `routeVariants` properties in collections. Deprecate `routesVariants`
* Add `core.version` getter
* Deprecate `core.alerts` when used out of plugins
* Export `createServer` function returning a core instance with preinstalled plugins

### [3.5]

__2022-07-05__

* Add Json and Middleware variant handlers.
* Support `deprecated` property in route handlers. Add an alert whenever any route variant uses a deprecated handler
* Pass only response property from variants to route variant handlers having the `version` property defined as "4". If it has another value, pass the whole variant object (for backward compatibility)

### [3.4]

__2022-07-01__

* Add an alert when plugins are not defined as Classes. Other formats will not be supported in next major version

### [3.3]

__2022-07-01__

* Add update notifier. Display an alert in case package is out of date
* Add `advancedOptions` parameter to Core constructor. Add `pkg` option allowing to determine name and version for update notifier.

### [3.2]

__2022-06-27__

* Add `onChangeLogs` method, allowing to execute a callback whenever logs changes.
* Use new logger. Deprecate tracer in core API. Provide namespaced loggers to plugins.
* Pass custom core to route variant middlewares and route handlers. The alerts and logger properties are namespaced for each different route variant
* Pass new custom core API to plugins. All core methods are available in the first parameter. The core property is still available for backward compatibility, but using it produces an alert

### [3.1]

__2022-06-03__

* Pass new alerts API to plugins. Add an alert if old `addAlert` or `removeAlerts` methods are used. 

### [3.0]

__2022-05-23__

* __BREAKING CHANGE__. Configuration format changed. __All options have been renamed or moved into namespaces__. Please check the docs in the website for further info
* __BREAKING CHANGE__. Change arguments passed to the plugins. Now there is only one argument with an object containing everything.
* __BREAKING CHANGE__. `ajv-errors` is not used any more. Now, `better-ajv-errors` is used to provide better feedback about validations. So `ajv-errors` properties for json schemas are not supported any more.
* __BREAKING CHANGE__. Remove support for legacy "behaviors"
* A namespaced configuration object is passed to plugins if they have an id property.
* Configuration can be defined also in environment variables
* Configuration can be defined in different file formats, using `cosmiconf`
* Add config getter to core

### [2.6]

__2021-12-05__

* Add Proxy route variant

### [2.5]

__2021-12-05__

* Support Node.js 17.x

### [2.4]

__2021-07-07__

* Support `application/x-www-form-urlencoded`

### [2.3]

__2021-05-06__

* Validate routes and collections

### [2.2]

__2021-04-14__

* Babel support

### [2.1]

__2021-03-24__

* Support multiple methods in routes
* Add cors option

### [2.0]

__2021-02-17__

* Rename concepts to routes and mocks. Support using legacy `behaviors` in a different folder at the same time, in order to allow a progressive migration.
* Add new Mocks and Routes handler, and related getters to core
* Add new plugin for loading files with routes and mocks in v2 format

### [1.9]

__2020-12-25__

* Add alerts and display them in the interactive CLI

### [1.8]

__2020-01-06__

* Configuration file
* Node.js v15.x support

### [1.7]

__2020-01-03__

* Support defining behaviors and mocks in JSON

### [1.6]

__2019-12-24__

* Add administration REST API

### [1.5]

__2019-12-22__

* Support custom variant handlers

### [1.4]

__2019-12-07__

* Change "behaviors" option by "path", now it has "mocks" value by default.

### [1.3]

__2019-11-17__

* Plugins approach refactor. First version of the `@mocks-server/core` package

### [1.2]

__2019-11-13__

* Catch `server.listen` error and reject start method promise when occurs

### [1.1]

__2019-11-08__

* Change "feature" concept by "behavior". Maintain old "feature" options and urls as aliases for maintaining compatibility.

### [1.0]

__2019-11-08__

* Project migration. Forked from `xbyorange/mocks-server`. Fixed license. Read NOTICE file for further details