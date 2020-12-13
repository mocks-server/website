---
id: tutorials-static
title: Definitions using javascript
---
## Preface

As mentioned, fixtures and behaviors can be also defined using javascript, which gives the possibility of reuse portions of them, or even create them programmatically.

In this chapter we are going to repeat the same steps than in the ["Defining fixtures and behaviors"](guides-defining-fixtures) guide, but now we are going to create all using javascript instead of `json` files.

&gt; Remember that you can combine `json` definitions with `javascript` definitions at your convenience in the `mocks` folder.

## Files structure

Create a `/mocks` folder in your project root, containing a `behaviors.js` file, and a `fixtures/users.js` file:

```

/your/awesome/project
|-- node_modules
|-- src
|-- mocks
|   |-- behaviors.js
|   |-- fixtures
|   |   |-- users.js
|-- package.json

```

&gt; Each file will export many fixtures and behaviors. Read more about the [exportation of fixtures and behaviors in javascript here](guides-organizing-the-definitions).

## Create an users fixture

Now we are going to add a fixture to the `/mocks/fixtures/users.js` file, which will be used when GET requests are received in the `/api/users` path or our "api mock":

```javascript

//mocks/fixtures/users.js

const getUsers = {
  id: "get-users",
  url: "/api/users",
  method: "GET",
  response: {
    status: 200,
    body: [
      {
        id: 1,
        name: "John Doe"
      },
      {
        id: 2,
        name: "Jane Doe"
      }
    ]
  }
};

module.exports = {
  getUsers
};

```

## Export a default behavior

Import your recently created `getUsers` fixture in the `/mocks/behaviors.js` file and create an "standard" behavior containing it. Read more about [how behaviors are defined using javascript here](get-started-behaviors).

```javascript

//mocks/behaviors.js

const { Behavior } = require("@mocks-server/main");

const { getUsers } = require("./fixtures/users");

module.exports = new Behavior([
  getUsers
], {
  id: "standard"
});

```

## Start the Mocks Server

```bash

npm run mocks-server

```

The interactive CLI will be started:

![Interactive CLI](/img/tutorials-static-01.png)

Browse to http: to check that Mocks Server is serving your users collection fixture at the expected url. You should see the response in your browser:

```json



```

## Add fixture for getting an specific user

Now we have the mocked the response for the "users" collection. Let's add the fixture for getting an specific user:

```javascript



```

Add the fixture to the "standard" behavior. Now we will **use the id of the fixture as a reference** instead of providing directly the fixture object itself, which is also supported:

```javascript



```

&gt; The Mocks Server is watching for file changes, so your fixtures should have been refreshed automatically.

Browse to . You should see the response in your browser:

```json



```

But... even when you change the user id in the request, () obviously the response will be still the same:

```json



```

Well, this is the expected behavior of a mock server, but you can add a new "behavior" to change the response:

## Add another behavior

Let's add another "GET user" fixture, but now it will be always responded with the second user:

```javascript



```

And let's add a new Behavior extending the standard one:

```javascript



```

Now the Mocks Server CLI indicates that it has two behaviors available.

![Available behaviors](/img/tutorials-static-02.png)

## Change current behavior

Use the CLI to change current behavior:

![Available behaviors](/img/tutorials-static-03.gif)

Browse to . You should now see the second user:

```json



```

Browse to . Users collection is also available:

```json



```
