---
id: installation
title: Installation
slug: /installation
description: How to install Mocks Server
keywords:
  - mocks server
  - mock server
  - nodejs
  - npm
  - installation
  - install
  - download
  - setup
  - first steps
  - package
  - script
  - dependency
  - package.json
---

Mocks Server is essentially a set of NPM packages.

:::tip
Read the [usage chapter](usage/basics.md) in 5 minutes ⏱ to fully understand the Mocks Server main concepts: Routes, Variants and Collections.
:::

## Requirements

Node.js version 14.0 or above (which can be checked by running `node -v`). You can use [nvm](https://github.com/nvm-sh/nvm) for managing multiple Node versions on a single machine installed.

For using the interactive CLI may be there some additional requirements. The [Inquirer](https://www.npmjs.com/package/inquirer) library is used for displaying it. You can [check its OS Terminals support here](https://www.npmjs.com/package/inquirer#support-os-terminals).

## NPM installation

Add it to your project dependencies using NPM:

```bash
npm i -D @mocks-server/main
```

:::note
This will install the `@mocks-server/main` package, which contains some preinstalled plugins. This docs usually make reference to this distribution until the contrary is indicated.
:::

## NPM script

Add the next script to the `package.json` file:

```json
{
  "scripts": {
    // highlight-next-line
    "mocks" : "mocks-server"
  }
}
```

This enables to start the server by simply running a command in the project folder.

```bash
npm run mocks
```

:::note
If you are going to use the [JavaScript API](integrations/javascript) to start Mocks Server, this step is not required.
:::


