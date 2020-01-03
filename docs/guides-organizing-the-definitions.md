---
id: guides-organizing-the-definitions
title: Organizing the definitions
---

## Files structure

Mocks server is very flexible and permissive with the files structure inside the `mocks` folder. It will load any fixture or behavior defined in any `.js` or `.json` file at any folder level.

You can have your fixtures and behaviors definitions separated and organized in as many files and folders as you want.

## Formats

As read in the [fixtures](get-started-fixtures) and [behaviors](get-started-behaviors) chapters, fixtures and behaviors can be defined also using javascript. You can combine both formats, adding some of your definitions using javascript, while other are defined as plain `json` objects.

## Definitions in json files

You can define your fixtures or behaviors in json format, defining one per file, or in an array containing multiple of them, or even all of them _(fixtures and behaviors can also be defined in the same file)_

### One definition per file

```json
{
  "id": "foo-behavior",
  "fixtures": ["foo-fixture"]
}
```

### Multiple definitions per file

```json
[
  {
    "id": "foo-behavior",
    "fixtures": ["foo-fixture"]
  },
  {
    "id": "foo-behavior-2",
    "fixtures": ["foo-fixture-2"]
  }
]
```


## Javascript exportation formats

Javascript files containing fixtures or behaviors can export them as:

### Object

You can use an object to export your definitions. The Mock Server will search at the first level of exported objects and will load any fixture or behavior defined in it.

```javascript
const myFixture = {
  //...
};

const myFixture2 = {
  //...
};

module.exports = {
  myFixture,
  myFixture2
}
```

### Array

The server accepts exports as arrays, and will load any fixture or behavior defined in it.

```javascript
const myFixture = {
  //...
};

const myFixture2 = {
  //...
};

module.exports = [myFixture, myFixture2];
```

### Single export

You can also define one behavior or fixture per file, and export it directly:


```javascript
const myFixture = {
  //...
};

module.exports = myFixture;
```

## Good practices

### Files structure

As a good practice, for a better maintainability, we recommend to use `json` for the definitions while it is possible _(for complex or programmatic definitions you'll prefer to use javascript)_, and maintain all your behavior definitions inside a `behaviors.json` file in the root of the `mocks` folder.

To organize fixtures, a good approach can be to create a folder for each api "domain", containing a different `json` file with all fixtures of a same entity:

```
/your/awesome/project
|-- node_modules
|-- src
|-- mocks
|   |-- behaviors.json
|   |-- customers
|   |   |-- users.json
|   |   |-- tokens.json
|   |-- sales
|       |-- products.json
|-- package.json
```

### Descriptive ids

We strongly encourage to assign very descriptive ids to the "fixtures" and "behaviors", as they will be used afterwards in the CLI, the Api, and all other possible Mocks Server interaction methods.

A goog pattern for assigning an id to a fixture can be `[method]-[entity]-[short-description]`, as in `read-user-success`, `read-user-error`, or `read-user-with-long-name`.

For assigning id to behaviors, we recommend to maintain a base behavior named as `standard`, `base`, or `default`. The rest of behaviors should extend from it _(at least indirectly)_, and their ids should be a short description of the behavior itself, for example:

```json
[
  {
    "id": "standard",
    "fixtures": ["read-users-success", "read-user-success", "create-user-success", "delete-user-success"]
  },
  {
    "id": "error-creating-user",
    "from": "standard",
    "fixtures": ["create-user-error"]
  },
  {
    "id": "users-with-long-name",
    "from": "standard",
    "fixtures": ["read-users-with-long-name", "read-user-with-long-name"]
  }
]
```

