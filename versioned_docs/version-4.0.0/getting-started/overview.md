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

Node.js mock server running live, interactive mocks in place of real APIs. __It makes able to define many different responses for a same route__, so, you can change the whole mocked API behavior by simply changing the response of one or many routes while the server is running.

## Why a mock server?

Controlling the responses of the API will improve the development workflow, avoiding early dependencies with the team developing the API. It also improves the testing of error cases or another cases that are commonly hard to reproduce with a real API.

Defining the API responses during the earliest phases of development will improve the communication among team members and align their expectations.

```mdx-code-block
<DocsImage src={ApiMocksWorkflow} alt="Api mock workflow" note={<a href="https://www.freepik.com/vectors/computer-work" target="_blank" rel="noopener noreferrer">Vectors created by jcomp and vectorjuice - www.freepik.com</a>} />
```

## Why "Mocks" in plural?

As explained, Mocks Server is able to handle different responses for each route, and store different sets of responses in order to simulate different API states. So, there is only one mock server running, but __it can contain and switch between many different predefined API state simulations, like each one of them was a different mock__.

## Features summary

### Routes

* Makes able to define different responses or behaviors for the same route. The user can choose which one has to be used by each route on each particular moment. Out of the box, a route can:
  * Send a JSON response
  * Send a text response
  * Send a response with an empty body
  * Proxy the request to another host, allowing to modify both the request and the response
  * Serve static files
  * Execute a Express middleware, and send a response or let the next matching route to be executed
  * Send a file content as response, setting the Content-Type header automatically based on the file extension

### Collections
* Allows to create collections defining the specific "responses" to be used by each different route. The user can choose which collection has to be used on each particular moment
* Collections can be created extending other collections. This makes able to store many different collections without too much maintenance and change the whole API behavior by simply changing the current one.

### Protocols

* Supports HTTP and HTTPS protocols

### Defining routes and collections

* Routes and collections can be defined in files:
  * Supports YAML, JSON, JavaScript or TypeScript files
  * Using Babel is supported
  * Async is supported. Files can export a function returning a promise
  * The server loads them automatically and watches for changes
* Routes and collections can also be defined programmatically using the JavaScript API

### OpenAPI

* Routes and collections can be generated automatically from OpenAPI documents

### Easy to start and flexible

* Provides a binary in an NPM package
* Provides a JavaScript Class, allowing to create server instances from scratch
* Provides a JavaScript method, allowing to start an instance with some presets, optimized for a programmatic usage
* Provides Docker images

### Easy to configure

* Supports YAML, JSON or JavaScript configuration file
* Environment variables or arguments can be used to change configuration
* Configuration can also be changed using the JavaScript API

### Easy to integrate

Can be controlled using:

* JavaScript API
* Administration REST API
* Interactive command line interface
* Cypress commands

### Very extensible

* More route behaviors can be added
* Plugins enable to tap into, modify, or extend the Mocks Server internal behavior
* Custom Express routers can be added to the mock

## Installation

Mocks Server is essentially a set of NPM packages, so it should be added as an NPM dependency of your project.

```sh
npm i --D @mocks-server/main
```

:::note
Read [installation](./installation.md) for further details.
:::

## Execution

It can be started simply running an NPM script:

```json
{
  "scripts": {
    // highlight-next-line
    "mocks" : "mocks-server"
  }
}
```

```sh
npm run mocks
```

Or programmatically using JavaScript:

```js
const { createServer } = require("@mocks-server/main");

const server = createServer();
server.start();
```

:::tip
__The [quick start](./quick-start.md) chapter will help you to take your first steps with Mocks Server.__
:::

## Usage

Define your mocked API routes in JSON, YAML, JavaScript or TypeScript files. Mocks Server loads them automatically and watches for changes. Defining routes using any of the available APIs is also possible.

__Each route can contain many different variants defining different responses, and you can choose which variant has to be used by each route on each particular moment.__

Depending on the variant type, variants can be defined in many ways, from [plain objects](../usage/variants/json.md) to [plain text](../usage/variants/text.md), or even [Express middlewares](../usage/variants/middleware.md), and they act in different ways also, from sending a response to [proxy the request to another host](../usage/variants/proxy.md).

For example, variant types included in the main distribution are:

* __[`json`](../usage/variants/json.md)__: Defines the JSON body and the status code to be sent when the route is requested.
* __[`text`](../usage/variants/text.md)__: Defines the text body and the status code to be sent when the route is requested.
* __[`status`](../usage/variants/status.md)__: Defines a status code to be sent without body when the route is requested. 
* __[`middleware`](../usage/variants/middleware.md)__: Defines an [Express middleware](https://expressjs.com/en/guide/using-middleware.html) to be executed when the request is received. It is completely on your hand to send a response, or to pass the request to the next route, etc.
* __[`static`](../usage/variants/static.md)__: Defines a folder from which to serve static assets.
* __[`file`](../usage/variants/file.md)__: Defines a file to transfer when the route is requested.
* __[`proxy`](../usage/variants/proxy.md)__: Defines a host to proxy the request when it is received. You can modify the request and/or the response also.


:::tip
Read the [usage chapter](../usage/basics.md) in 5 minutes ⏱ to fully understand the Mocks Server main concepts: Routes, Variants and Collections.
:::

## Configuration

Configure the server simply [modifying the configuration file at the root folder of your project, or use command line arguments, or even environment variables](../configuration/how-to-change-settings.md).

For changing [options](../configuration/how-to-change-settings.md) while it is running, you can also use any of the available integrations tools that enable live interactions with Mocks Server.

## Integrations

Providing a [Javascript API](../integrations/javascript.md), an [interactive command line interface](../integrations/command-line.md) and a [REST API](../integrations/cypress.md) for __changing the responses of the mocked API while it is running, it is easy to use both for development and testing__.

Tools providing integrations with other ecosystems are also available, such as [Cypress commands](../integrations/cypress.md) or [Docker image](../integrations/docker.md).

## Customization

Mocks Server provides many ways for you to make it fit your requirements, giving you the possibility of extend it with any new amazing feature you want:

* Add new formats for defining routes using [custom variant handlers](../variant-handlers/intro.md).
* [Plugins](../plugins/intro.md) enable you to tap into, modify, or extend its internal behavior.
* Add custom Express routers using the [JavaScript API](../api/javascript.md).
