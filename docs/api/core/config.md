---
id: config
title: core.config
description: Methods of the core.config JavaScript API
keywords:
  - mocks server
  - programmatic
  - api
  - core
  - methods
  - properties
  - getters
  - advanced usage
  - JavaScript
  - js
  - node
  - nodejs
  - logger
---

```mdx-code-block
import ExampleDetails from '@site/src/components/ExampleDetails';
```

## Preface

The `core.config` object provides methods for reading configuration and for creating new options. It allows to create namespaces, so each namespaced config is isolated from the other namespaces.

:::info
Here is described the `config` API partially. For further information about the whole API, please [read the `@mocks-server/config` docs](https://github.com/mocks-server/main/tree/master/packages/config/README.md).
:::

## API

:::caution
When the core is passed to a plugin as a parameter, the `config` object is a `config` namespace instead of the root `config` instance. The `config` namespace is labeled with the plugin id, so each plugin owns its own namespace in the global configuration object.
:::

### addNamespace()

__`core.config.addNamespace(name)`__: Add namespace to the root. Returns a [namespace instance](#namespace-instance-api).
* `name` _(String)_: Name for the namespace.

### addOption()

__`core.config.addOption(optionProperties)`__: Equivalent to the `addOption` method in namespaces, but it add the option to the root. Returns an [option instance](#option-instance-api).
* `optionProperties` _(Object)_: Properties defining the option. See the `addOption` method in namespaces for further info.

### addOptions()

__`core.config.addOptions(optionsProperties)`__: Add many options. Returns an array of [option instances](#option-instance-api).
* `optionsProperties` _(Array)_: Array of `optionProperties`.

### namespace()

__`core.config.namespace(name)`__: Returns the [namespace instance](#namespace-instance-api) in the root config with name equal to `name`.

### option()

__`core.config.option(optionName)`__: Returns the [option instances](#option-instance-api) in the root config with name equal to `optionName`.

### set()

__`core.config.set(configuration)`__: Set configuration properties to each correspondent namespace and options.
* `configuration` _(Object)_: Object with programmatic configuration. Levels in the object correspond to namespaces names, and last level keys correspond to option names.

### validate()

__`core.config.validate(configuration, options)`__: Allows to pre-validate a configuration before setting it, for example. It returns an object with `valid` and `errors` properties. See [AJV docs for further info](https://ajv.js.org/guide/getting-started.html#basic-data-validation).
* `configuration` _(Object)_: Object with configuration. Levels in the object correspond to namespaces names, and last level keys correspond to option names.
* `options` _(Object)_: Object with extra options for validation:
  * `allowAdditionalProperties` _(Boolean)_: _Default `false`_. If true, additional properties in the configuration would not produce validation errors.

### namespaces

__`core.config.namespaces`__: Getter returning array with all root namespaces.

### options
__`core.config.options`__: Getter returning array with all root options.

### value

__`core.config.value`__: Getter returning the current values from all namespaces and options as an object. Levels in the object correspond to namespaces names, and last level keys correspond to option names. It can be also used as setter as an alias of the `set` method, with default options.

### loadedFile
__`core.config.loadedFile`__: Getter returning the file path of the loaded configuration file. It returns `null` if no configuration file was loaded.


## Namespace instance API

:::info
A `configNamespace` instance is returned when using the root `core.config.namespace(name)` method, or when executing `configNamespace.namespace(name)` in a namespace. So, any amount of config nested namespace levels can be created.
:::

### addNamespace()

__`configNamespace.addNamespace(name)`__: Add another namespace to the current namespace. Returns a [namespace instance](#namespace-instance-api).
* `name` _(String)_: Name for the namespace.

### addOption()

__`configNamespace.addOption(optionProperties)`__: Adds an option to the namespace. Returns an [option instance](#option-instance-api).
* `optionProperties` _(Object)_: Properties defining the option.
  * `name` _(String)_: Name for the option.
  * `description` _(String)_: _Optional_. Used in help, traces, etc.
  * `type` _(String)_. One of _`string`_, _`boolean`_, _`number`_, _`array`_ or _`object`_. Used to apply type validation when loading configuration and in `option.value` setter.
  * `itemsType` _(String)_. Can be defined only when `type` is `array`. It must be one of _`string`_, _`boolean`_, _`number`_ or _`object`_.
  * `default` - _Optional_. Default value. Its type depends on the `type` option.
  * `extraData` - _(Object)_. _Optional_. Useful to store any extra data you want in the option. Mocks Server supported `extraData` options are:
    * `scaffold` - _(Object)_.
      * `omit` - _(Boolean)_. Determines whether the option should be included in the config scaffold or not. Default is `false`.
      * `commented` - _(Boolean)_. Determines whether the option should be commented in the config scaffold or not. Default is `false`.
      * `value` - _(Any)_. Provides a specific value to be set for this option when the config scaffold is created.

### addOptions()

__`configNamespace.addOptions(optionsProperties)`__: Add many options. Returns an array of [option instances](#option-instance-api).
* `optionsProperties` _(Array)_: Array of `optionProperties`.

### namespace()

__`configNamespace.namespace(name)`__: Returns the [namespace instance](#namespace-instance-api) in this namespace with name equal to `name`.

### option()

__`configNamespace.option(optionName)`__: Returns the [option instances](#option-instance-api) in this namespace with name equal to `optionName`.

### set()

__`configNamespace.set(configuration)`__: Set configuration properties to each correspondent child namespace and options.
* `configuration` _(Object)_: Object with configuration. Levels in the object correspond to child namespaces names, and last level keys correspond to option names.

### namespaces

__`configNamespace.namespaces`__: Getter returning an array with children namespaces.

### options

__`configNamespace.options`__: Getter returning an array object with children options.

### value

__`configNamespace.value`__: Getter returning the current values from all child namespaces and options as an object. Levels in the object correspond to namespaces names, and last level keys correspond to option names. It can be also used as setter as an alias of the `set` method, with default options.

### name

__`configNamespace.name`__: Getter returning the namespace name.

### root

__`configNamespace.root`__: Getter returning the root configuration instance. It is useful when trying to access to the root Mocks Server configuration from a plugin, but use it with caution because you will be accessing to all of the elements configuration, not only to the plugin's one.

## Option instance API

:::info
An `option` instance is returned when using the `config.addOption` or `config.option` methods.
:::

### set()

__`option.set(value, [options])`__: Sets option value. Allows to pass options when setting the value.
* `value` : `<Any>`. Depending on the option type, the value type may be different.
* `options` : `<Object>`.
  * `merge` : `<Boolean>`. Define wheter the value should be merged with the previous value in case it is an Object or an Array. Default is `false`.

### onChange()

__`option.onChange(callback)`__: Allows to add a listener that will be executed whenever the value changes. It only emit events after calling to the `config.start` method. __It returns a function that removes the listener once executed__.
* `callback(value)` _(Function)_: Callback to be executed whenever the option value changes. It receives the new value as first argument.

### value

__`option.value`__: Getter or setter of the current value.

### name

__`option.name`__: Getter returning the option name.

### type

__`option.type`__: Getter returning the option type.

### description

__`option.description`__: Getter returning the option description.

### extraData

__`option.extraData`__: Getter returning the option extra data.

### default

__`option.default`__: Getter returning the option default value.
