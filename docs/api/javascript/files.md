---
id: files
title: core.files
description: Methods of the core.files JavaScript API
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
  - files
  - load
---

```mdx-code-block
import ExampleDetails from '@site/src/components/ExampleDetails';
```

## Preface

The `core.files` object provides access to methods related to the files contained in the `/mocks` folder. You can use this API to force a reload of the files contents, or to get the content of any file in that folder, for example.

by yourself whitout the need to take care of parsing contents or reload them when there is any change, because Mocks Server already does that work for you. 

:::caution
Use only the API methods described in this docs. Use other methods under your own risk, and take into account that they may change in minor versions without considering it as a breaking change.
:::

## API

### reload()

__`core.files.reload()`__: Force a reload of all files in the `/mocks` folder, where usually the routes and collections are defined. It returns a Promise, resolved whenever all file contents are processed by the registered `fileLoaders` (Read [`createLoader`](#createloader) for further info). Possible errors reading or processing files are handled internally, so the Promise will be never rejected.

```mdx-code-block
<ExampleDetails>
```

```js
// highlight-next-line
await core.files.reload();
```

```mdx-code-block
</ExampleDetails>
```

### stop()

__`core.files.stop()`__: Stop the files watch. It has no effect if the option `files.enabled` is `false`.

```mdx-code-block
<ExampleDetails>
```

```js
// highlight-next-line
core.files.stop();
// Now changes in the `/mocks` folder will be ignored
```

```mdx-code-block
</ExampleDetails>
```

### start()

__`core.files.start()`__: Start the files watch. It has no effect if the option `files.enabled` is `false`.

```mdx-code-block
<ExampleDetails>
```

```js
// highlight-next-line
core.files.start();
// Now changes in the `/mocks` folder will produce a reload
```

```mdx-code-block
</ExampleDetails>
```

### createLoader()

__`core.files.createLoader(fileLoaderOptions)`__: Allows to get contents of files in the `/mocks` folder. The method returns a loader object (read [`loaders`](#loaders) for further info).

* `fileLoaderOptions` _`<Object>`_ : Object containing next options:
  * `id` _`<String>`_: ID for the new loader. It is used afterwards in traces, and it can also be used to access to the loader object through the `files.loaders` getter.
  * `src` _`<String> or <Array> of <Strings>`_ : Globbing pattern/s matching the file paths to be read. The pattern should be relative to the `/mocks` folder, and __it should omit the file extension, because it is added afterwards based on the Mocks Server supported file types__.
  * `onLoad(filesContents, filesErrors, coreTools)` - _`<Function>`_ Function that will be executed whenever any file matching the `src` pattern changes. If it returns a Promise, the `files.reload`  method will wait for it to have finished before resolving its own returned promise. It receives next arguments:
    * `filesContents` _`<Array> of {path, content}`_ - Array of objects with `path` and `content` properties containing the content of each file. The contents are already parsed when the file is of type YAML or JSON, and, about Javascript files, its default export is received as content.
    * `filesErrors` _`<Array> of {path, error}`_ - Array of objects with `path` and `error` properties containing errors produced when reading or parsing files.
    * `coreTools` _`<Object>`_ - Object containing next core tools:
      * `alerts` - Namespaced `alerts` API created explicitly for this loader. Read the [alerts API docs](./alerts.md) for further info.
      * `logger` - Namespaced `logger` API created explicitly for this loader. Read the [logger API docs](./logger.md) for further info.

```mdx-code-block
<ExampleDetails>
```

Next example shows how to create a files loader to load routes defined in any file the `custom-routes` folder:

```js
// Create a routes loader using the mock API
const { loadRoutes } = core.mock.createLoaders();

// highlight-start
const loader = core.files.createLoader({
  id: "custom-routes", // loader ID
  src: `custom-routes/**/*`, // Globule pattern matching any file in the `/mocks/custom-routes` folder and subfolders
  onLoad: (filesContents, _errors, { logger }) => {
    // Get the property `content` of every filesContents, and create a flat array with all contents.
    const routes = filesContents
      .map((fileDetails) => {
        return fileDetails.content;
      }).flat();

    // Load routes
    loadRoutes(routes);

    // Use the loader logger to trace
    logger.verbose(`Loaded routes from folder "${core.files.path}/custom-routes"`);
  },
});
// highlight-end
```

```mdx-code-block
</ExampleDetails>
```

### path

__`core.files.path`__: Returns the current absolute path of the files folder, usually `/mocks` until it is changed using the `files.path` option.

```mdx-code-block
<ExampleDetails>
```

```js
// highlight-next-line
console.log(core.files.path);
// -> `/~/projects/foo-project/mocks`
```

```mdx-code-block
</ExampleDetails>
```

### loaders

__`core.files.loaders`__: Returns an object containing all currently registered loaders created with the [`createLoader` method](#createloader). Object keys correspond with loaders IDs, and each loader contains next properties:
* `id` - Loader's ID
* `src` - Globbing pattern/s matching the file paths read by this loader
* `logger` - Loader's namespaced [logger API](./logger.md)
* `alerts` - Loader's namespaced [alerts API](./alerts.md)

```mdx-code-block
<ExampleDetails>
```

```js
// highlight-next-line
const loaders = core.files.loaders;

Object.keys(loaders).forEach((loaderID) => {
  console.log(`Found files loader with ID '${loaderID}'`);
});
```

```mdx-code-block
</ExampleDetails>
```
