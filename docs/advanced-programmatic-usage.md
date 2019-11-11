---
id: advanced-programmatic-usage
title: Programmatic usage
---

## Server

The server can be instantiated and started programmatically:

```js
const { Server } = require("@mocks-server/main");

const server = new Server(path.resolve(__dirname, "mocks"), {
  port: 3200,
  log: "debug",
  watch: false
});

server.start().then(serverInstance => {
  console.log("Server started", serverInstance);
});
```

### Server API

#### `Server` (behaviorsFolder \[,options\])

First argument is mandatory, and has to be a path to a folder containing "behaviors" and "fixtures".

Second argument define the server options, please [read the options](configuration-command-line-arguments.md) chapter of this documentation.

Available methods of an instance are:

- `start`(). Starts the server. Resolves the server instance.
- `stop`(). Stops the server.
- `restart`(). Stops the server, initializes it again (reloading behaviors files), and starts it again. Returns the server instance.
- `switchWatch`(state `<Boolean>`). Enable or disable behaviors files watch, depending of the received "state" value.

Available getters are:

- `behaviors`. Returns loaded behaviors object.
- `watchEnabled`. Current state of the behaviors files watcher.
- `error`. When server has returned an error, or an error ocurred loading behaviors, it is available in this property.
- `events`. Returns server events object. A "watch-reload" event is emitted when the files watcher detects changes in any behaviors or fixtures file, and restarts the server.

## CLI

The interactive CLI can be instantiated and started programmatically:

```js
const { Cli } = require("@mocks-server/main");

const cli = new Cli({
  port: 3200,
  log: "debug",
  watch: false
});

cli.start().catch(err => {
  console.log("Error starting CLI", err);
});
```

### CLI API

#### `Cli` (\[options\])

First argument defines the server options, please [read the options](configuration-command-line-arguments.md) chapter of this documentation.

Available methods of an instance are:

- `start`()
Inits the server in case it was stopped, adds the watch listeners, and renders main menu.
- `initServer`()
Inits the server in case it was stopped, adds the watch listeners.
- `stopListeningServerWatch`()
When files watcher is active, the main menu will be displayed always on file changes. This behavior can be deactivated using this method. This is useful when this the CLI is loaded as a submenu of another CLI, for example.
