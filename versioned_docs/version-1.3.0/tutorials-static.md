---
id: tutorials-static
title: Adding static fixtures
---

## Installation

Follow the [installation example in the intro](get-started-intro.md#installation) in order to install and configure an npm script for starting the Mocks Server in your project.

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

> You can create as many "behaviors" files as you want in the `mocks` folder. The Mocks Server will load all of them automatically, but never create fixtures at first folder level, as it will try to interpret them also as "behaviors".

## Create an users fixture

Now we are going to add a fixture to the `/mocks/fixtures/users.js` file, which will be used when GET requests are received in the `/api/users` path or our "api mock":

```javascript
//mocks/fixtures/users.js

const getUsers = {
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

Import your recently created `getUsers` fixture in the `/mocks/behaviors.js` file and create an "standard" behavior containing it:

```javascript
//mocks/behaviors.js

const { Behavior } = require("@mocks-server/main");

const { getUsers } = require("./fixtures/users");

const standard = new Behavior([
  getUsers
]);

module.exports = {
  standard
};
```

## Start the Mocks Server

```bash
npm run mocks-server
```

The interactive CLI will be started:

![Interactive CLI](assets/tutorials-static-01.png)

Browse to [http://localhost:3100/api/users](http://localhost:3100/api/users) to check that Mocks Server is serving your users collection fixture at the expected url. You should see the response in your browser:

```json
[{"id":1,"name":"John Doe"},{"id":2,"name":"Jane Doe"}]
```

## Add fixture for getting an specific user

Now we have the mocked the response for the "users" collection. Let's add the fixture for getting an specific user:

```javascript
//mocks/fixtures/users.js

//...

const getUser = {
  url: "/api/users/:id",
  method: "GET",
  response: {
    status: 200,
    body: {
      id: 1,
      name: "John Doe"
    }
  }
}

module.exports = {
  getUsers,
  getUser
};
```

Add the fixture to the "standard" behavior:

```javascript
//mocks/behaviors.js

const { Behavior } = require("@mocks-server/main");

const { getUsers, getUser } = require("./fixtures/users");

const standard = new Behavior([
  getUsers,
  getUser
]);

module.exports = {
  standard
};
```

> The Mocks Server is watching for file changes, so your fixtures should have been refreshed automatically.

Browse to [http://localhost:3100/api/users/1](http://localhost:3100/api/users/1). You should see the response in your browser:

```json
{"id":1,"name":"John Doe"}
```

But... even when you change the user id in the request, ([http://localhost:3100/api/users/2](http://localhost:3100/api/users/2)) obviously the response will be still the same:

```json
{"id":1,"name":"John Doe"}
```

Well, this is the expected behavior of a mocks server, but you can add a new mocks "behavior" to change the response:

## Add another behavior

Let's add another "GET user" fixture, but now it will be always responded with the second user:

```javascript
//mocks/fixtures/users.js

//....

const getUser2 = {
  url: "/api/users/:id",
  method: "GET",
  response: {
    status: 200,
    body: {
      id: 2,
      name: "Jane Doe"
    }
  }
}

module.exports = {
  getUsers,
  getUser,
  getUser2
};
```

And let's add a new Behavior extending the standard one:

```javascript
//mocks/behaviors.js

const { Behavior } = require("@mocks-server/main");

const { getUsers, getUser, getUser2 } = require("./fixtures/users");

const standard = new Behavior([
  getUsers,
  getUser
]);

// Extends the standard behavior adding "getUser2" fixture.
const user2 = standard.extend([getUser2]);

module.exports = {
  standard,
  user2
};
```

Now the Mocks Server CLI indicates that it has two behaviors available.

![Available behaviors](assets/tutorials-static-02.png)

## Change current behavior

Use the CLI to change current behavior:

![Available behaviors](assets/tutorials-static-03.gif)

Browse to [http://localhost:3100/api/users/2](http://localhost:3100/api/users/2). You should now see the second user:

```json
{"id":2,"name":"Jane Doe"}
```

Browse to [http://localhost:3100/api/users](http://localhost:3100/api/users). Users collection is also available:

```json
[{"id":1,"name":"John Doe"},{"id":2,"name":"Jane Doe"}]
```

## Add multiple fixtures and behaviors

Now you've seen what Mocks Server can do, you can add as much fixtures you need for your development or end-to-end tests, (such as error responses cases, "users" with very long name, another special cases, etc.)

You can __combine all your fixtures in as much behaviors as you need__, extending them or creating them from scratch.

And, very important, you can easily change the current behavior using the [interactive CLI](configuration-interactive-cli.md) or the [REST API](configuration-rest-api.md), which will make your __development or acceptance tests environments very much agile and flexible, and not api dependant.__




