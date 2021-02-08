---
id: get-started-intro
title: Intro
description: Get started with Mocks Server
keywords:
  - mock
  - introduction
  - first steps
  - mocks server
  - intro
---

## The project

This project provides a mock server that can store and simulate multiple API behaviors. It can be added as a dependency of your project, and started simply running an NPM command.

Providing an interactive command line user interface and a REST API for changing the responses of the API, it is easy to use both for development and testing.

### Main features

* __Route variants__: Define many responses for a same route.
* __Multiple mocks__: Group different route variants into different mocks. Change the used mock while the server is running using the interactive command line interface or the API.
* __Multiple formats__: Responses can be defined using `json` files or Javascript files.
* __Express middlewares__: Route variants can be defined as `express` middlewares.
* __Multiple interfaces__: Settings can be changed using the [interactive CLI](plugins-inquirer-cli.md) or the [admin REST API](plugins-admin-api). The CLI is perfect for development, and the API can be used from tests, for example.
* __Integrations__: Integrations with other tools are available, as the [Cypress plugin](integrations-cypress.md).
* __Customizable__: You can develop your own plugins, or even route handlers, that allows you to customize the format in which route variants are defined.

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

When started for first time, it will create a scaffold folder named `mocks` in your project, containing next files:

```
mocks/
├── routes/
│   └── users.js
└── mocks.json
```

It contains examples from this documentation providing a simple API with two different mocks and some route variants. You can use the interactive CLI that is also started to change the server settings and see how you can change the responses of the API changing the current mock, changing route variants, etc.

![Interactive CLI](assets/interactive-cli-animation.gif)

## Configuration

Configure the server simply [creating a `mocks-server.config.js` file at the root folder of your project](configuration-file.md).

For changing [settings](configuration-options.md) (such as current mock, delay time, etc.) while it is running, you can use:
* [Interactive command line interface](plugins-inquirer-cli.md), which is very useful in local environments for development.
* [REST API](plugins-admin-api.md) which is very useful to change mock or route variants from E2E tests, for example, as the [Cypress plugin does.](integrations-cypress.md)

## How does it work?

As input, it needs ["routes"](get-started-routes.md), which are handlers for specific requests, and ["mocks"](get-started-mocks.md), which are sets of ["route variants"](get-started-routes.md).

You can easily [change the responses of the API while the server is running](#configuration) changing the current mock, or defining specific route variants. This will make your __development or acceptance tests environments very much agile and flexible, and not api dependant.__

## Why a mock server?

Controlling the responses of the api will improve the front-end development workflow, avoiding early dependencies with back-end. It also improves the testing and development of error cases or another cases that are commonly hard to reproduce with a real api.

Defining the api responses during the earliest phases of development will improve the communication among team members and align their expectations.

Working with Node.js, it integrates better in front-end projects as any other NPM dependency, and it will be easier for front-end developers to maintain the mocks.

## Why "Mocks" in plural?

As explained, the Mocks Server can store different mocks, which are sets of different route variants. So it simulates multiple api behaviors and send different responses to the same request, so it is like having different mock servers that can be changed while running at our convenience.

## Customization

Mocks Server is very customizable, and gives you the possibility of extend it with every new amazing feature you want:

- [Start it programmatically](advanced-programmatic-usage.md) and use his multiple methods and events to manage it from your program.
- Add new options and features [adding plugins](plugins-adding-plugins.md), or [developing your owns](advanced-developing-plugins).
- Add new [route handlers](advanced-custom-route-handlers.md), which allows to customize the format in which route variants are defined.
