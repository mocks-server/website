---
id: get-started-intro
title: Intro
description: Get started with Mocks Server
keywords:
  - mocks server
  - intro
---

## The project

This project provides a mock server that can simulate and store multiple API behaviors. It can be added as a dependency of your project, and started simply running an NPM command.

### Main features

* __Multiple api behaviors__: It allows to define different responses for the same route, and group them into different behaviors.
* __Multiple formats__: Responses can be defined using `json` files or Javascript files. Definitions can be plain objects, and even Express middlewares can be used to send dynamic responses.
* __Multiple interfaces__: Settings can be changed using the [interactive CLI](plugins-inquirer-cli) or the [admin REST API](plugins-admin-api). The CLI is perfect for development, and the API can be used in other scenarios, as the [Cypress plugin does.](integrations-cypress)

## Installation

Add it to your dependencies using NPM:

```bash
npm i @mocks-server/main --save-dev
```

Add next script to your `package.json` file:

```json
{
  "scripts": {
    "mocks" : "mocks-server"
  }
}
```

## Usage

Now, you can start the Mocks Server with the command:

```bash
npm run mocks
```

![Interactive CLI](assets/interactive-cli-animation.gif)

## Configuration

Configure the server simply [creating a file at the root folder of your project](configuration-file.md).

For changing [settings](configuration-options.md) (such as current behavior, delay time, etc.) while it is running, you can use:
* [Interactive command line interface](plugins-inquirer-cli.md), which is very useful in local environments for development.
* [REST API](plugins-admin-api.md) which is very useful to change behaviors from E2E tests, for example, as the [Cypress plugin does.](integrations-cypress)

## How does it work?

As input, it needs ["fixtures"](get-started-fixtures.md), which are handlers for specific requests, and ["behaviors"](get-started-behaviors.md), which are sets of ["fixtures"](get-started-fixtures.md).

You can simulate all the api behaviors you need for your development or tests environments simply [extending behaviors](get-started-behaviors.md#extending-behaviors) to change the response of some specific uris, even when the received request is exactly the same.

You can easily [change the current behavior while the server is running](#configuration), which will make your __development or acceptance tests environments very much agile and flexible, and not api dependant.__

## Why a mock server?

Controlling the responses of the api will improve the front-end development workflow, avoiding early dependencies with back-end. It also improves the testing and development of error cases or another cases that are commonly hard to reproduce with a real api.

Defining the api responses during the earliest phases of development will improve the communication among team members and align their expectations.

Working with Node.js, it integrates better in front-end projects as any other NPM dependency, and it will be easier for front-end developers to maintain the mocks.

## Why "Mocks" in plural?

As explained, the mocks-server can simulate multiple api behaviors and send different responses to the same request, so it is like we have different mock servers that we can change while running at our convenience.

## Customization

The mocks-server is very customizable, and gives you the possibility of extend it with every new amazing feature you want:

- [Start it programmatically](advanced-programmatic-usage) and use his multiple methods and events to manage it from your program.
- Add new options and features [adding plugins](plugins-adding-plugins.md), or [developing your owns](advanced-developing-plugins).
- Add new [fixtures handlers](advanced-custom-fixtures-handlers), which allows to customize the format in which fixtures are defined.
