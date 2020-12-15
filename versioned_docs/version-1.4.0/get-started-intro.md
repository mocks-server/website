---
id: get-started-intro
title: Intro
---

## The project

This project provides a server that simulates API behaviors. It can be added as a dependency of your project, and started simply running an NPM command.

## Why a mocks server?

Controlling the responses of the api will improve the front-end development workflow, avoiding early dependencies with back-end. It also improves the testing and development of error cases or another cases that are commonly hard to reproduce in the real api.

Defining the api responses during the earliest phases of development will improve the communication among team members and align their expectations.

Working with Node.js, it integrates better in front-end projects as any other NPM dependency, and it will be easier for front-end developers to maintain the mocks.

## How does it work?

As input, it needs ["fixtures"](get-started-fixtures.md), which are responses for specific uris, and ["behaviors"](get-started-behaviors.md), which are sets of ["fixtures"](get-started-fixtures.md).

You can simulate all the api behaviors you need for your local development or acceptance tests environments simply [extending behaviors](get-started-behaviors.md#extending-behaviors) to change the response of some specific uris.

You can easily change the current behavior, which will make your __development or acceptance tests environments very much agile and flexible, and not api dependant.__

For changing [settings](configuration-command-line-arguments.md) (such as current behavior, delay time, etc.) while it is running, it provides:
* an [interactive command line interface](configuration-interactive-cli.md), which is very useful in local environments.
* a [REST API](configuration-rest-api.md) which is very useful to change behaviors from end-to-end tests, for example.

## Installation

Add it to your dependencies using NPM:

```bash
npm i @mocks-server/main --save-dev
```

Add next script to your `package.json` file:

```json
{
  "scripts": {
    "mocks-server" : "mocks-server"
  }
}
```

## Usage

Now, you can start the Mocks Server CLI with the command:

```bash
npm run mocks-server
```

![Interactive CLI](assets/cli_animation.gif)
