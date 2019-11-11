---
id: get-started-intro
title: Intro
---

## The concept

This project provides a server that simulates API behaviors.

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

Add an start script to your `package.json` file, specifying the path containing your fixtures and behaviors:

```json
"scripts": {
  "mocks-server" : "mocks-server --behaviors=./mocks"
}
```

## Usage

Now, you can start the mocks server CLI with the command:

```bash
npm run mocks-server
```

![Interactive CLI](assets/cli_animation.gif)
