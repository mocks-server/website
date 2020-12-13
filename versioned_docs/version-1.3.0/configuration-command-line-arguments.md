---
id: configuration-command-line-arguments
title: Command line arguments
original_id: configuration-command-line-arguments
---
## Options

-   `port`: `<Number>` Por number for the Mocks Server to be listening.
-   `host`: `<String>` Host for the server. Default is "0.0.0.0" (Listen to any local host).
-   `log`: `<String>` Logs level. Can be one of "silly", "debug", "verbose", "info", "warn", "error".
-   `watch`: `<Boolean>` Watch behaviors folder and restart server on changes. Default is `true`.
-   `behavior`: `<String>` Default selected behavior when server is started.
-   `delay`: `<Number` Responses delay time in milliseconds.
-   `behaviors`: `Path as <String>` Path to a folder containing behaviors to be used by the server.
-   `recursive`: `<Boolean>` Search for behaviors recursively in subfolders. Watch is not affected by this option, it is always recursive.
-   `cli`: `<Boolean>` Start interactive CLI. Default is `true`.

## How to define options

Supossing you have a `mocks-server` script added to your `package.json` file, as seen in the [get started chapter](get-started-intro.md#installation), you can define options directly in the npm script:

```json

{
  "scripts": {
    "mocks-server" : "mocks-server --behaviors=./mocks --log=verbose --watch=false"
  }
}

```

Or you can pass options when calling to the npm command:

```bash

npm run mocks-server -- --delay=300

```

&gt; Note the usage of two double dashes. Anything after the first double dashes is not an option of npm, but a parameter for the script that npm executes.
