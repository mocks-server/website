---
id: overview
title: Overview
slug: /overview
description: Getting started with Mocks Server
keywords:
  - mocks server
  - mock server
  - nodejs
  - mock
  - server
  - express
  - introduction
  - intro
  - first steps
  - nodejs
  - node
  - npm
  - intro
  - first steps
  - get started
  - overview
---

```mdx-code-block
import DocsImage from '@site/src/components/DocsImage';
import ApiMocksWorkflow from '../assets/api-mock-workflow.jpg';
```

## The project

Node.js mock server running live, interactive mocks in place of real APIs. __It makes able to define many different responses for a same route__, so you can change the whole mocked API behavior by simply changing the response of one or many routes while the server is running.

## Why a mock server?

Controlling the responses of the API will improve the development workflow, avoiding early dependencies with the team developing the API. It also improves the testing of error cases or another cases that are commonly hard to reproduce with a real API.

Defining the API responses during the earliest phases of development will improve the communication among team members and align their expectations.

```mdx-code-block
<DocsImage src={ApiMocksWorkflow} alt="Api mock workflow" note={<a href="https://www.freepik.com/vectors/computer-work" target="_blank" rel="noopener noreferrer">Vectors created by jcomp and vectorjuice - www.freepik.com</a>} />
```

## Why "Mocks" in plural?

As explained, Mocks Server is able to handle different responses for each route, and store different sets of responses in order to simulate different API states. So, there is only one mock server running, but __it can contain and switch between many different predefined API state simulations, like each one of them was a different mock__.

## Installation

Mocks Server is essentially a set of NPM packages, so it should be added as an NPM dependency of your project.

```sh
npm i --D @mocks-server/main
```

:::note
Read [installation](getting-started/installation.md) for further details.
:::

## Execution

It can be started simply running an NPM script:

```sh
npm run mocks
```

Or programmatically using JavaScript:

```js
const Core = require("@mocks-server/main");

const server = new Core();
server.start();
```

:::tip
__The [quick start](getting-started/quick-start.md) chapter will help you to take your first steps with Mocks Server.__
:::

## Usage

Define your mocked API routes in JSON, JavaScript or TypeScript files. Mocks Server loads them automatically and watch for changes. Defining routes using any of the available APIs is also possible.

Routes can be defined in many ways, from plain objects to [Express middlewares](usage/variants/middleware.md), and they can act in different ways also, from sending a response to proxy the request to another host.

:::tip
Read the [usage chapter](usage/basics.md) in 5 minutes ⏱ to fully understand the Mocks Server main concepts: Routes, Variants and Collections.
:::

## Configuration

Configure the server simply [modifying the configuration file at the root folder of your project, or use command line arguments, or even environment variables](configuration/how-to-change-settings.md).

For changing [options](configuration/how-to-change-settings.md) while it is running, you can also use any of the available integrations tools that enable live interactions with Mocks Server.

## Integrations

Providing a [Javascript API](integrations/javascript.md), an [interactive command line interface](integrations/command-line.md) and a [REST API](integrations/cypress.md) for __changing the responses of the mocked API while it is running, it is easy to use both for development and testing__. Tools providing integrations with other ecosystems are also available, such as [Cypress commands](integrations/cypress.md).

## Customization

Mocks Server provides many ways for you to make it fit your requirements, giving you the possibility of extend it with any new amazing feature you want:

* Add new formats for defining routes using [custom variant handlers](variant-handlers/intro.md).
* [Plugins](plugins/intro.md) enable you to tap into, modify, or extend its internal behavior.
* Add custom Express routers using the JavaScript API.
