---
id: guides-defining-fixtures
title: Defining fixtures and behaviors
---
## Installation

Follow the [installation example in the intro](get-started-intro.md#installation) in order to install and configure an npm script for starting the Mocks Server in your project.

## Files structure

Create a `/mocks` folder in your project root, containing a `behaviors.json` file, and a `fixtures/users.json` file:

```

/your/awesome/project
|-- node_modules
|-- src
|-- mocks
|   |-- behaviors.json
|   |-- fixtures
|   |   |-- users.json
|-- package.json

```

&gt; You can create as many files as you want in the `mocks` folder, no matter if they contain "behaviors", "fixtures" or both. The Mocks Server will load all of them automatically wherever they are. This structure is only a suggestion.

## Create an users fixture

Now we are going to add a fixture to the `/mocks/fixtures/users.json` file, which will be used when GET requests are received in the `/api/users` path or our "api mock":

```json

// mocks/fixtures/users.json
{
  "id": "get-users",
  "url": "/api/users",
  "method": "GET",
  "response": {
    "status": 200,
    "body": [
      {
        "id": 1,
        "name": "John Doe"
      },
      {
        "id": 2,
        "name": "Jane Doe"
      }
    ]
  }
}

```

## Export a default behavior

Create an "standard" behavior in the `mocks/behaviors.json` file, containing the recently created "users" fixture.

```json

// mocks/behaviors.json
{
  "id": "standard",
  "fixtures": ["get-users"]
}

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

Convert the object in `` into an array, and add the new "get-user" fixture to it:

```json



```

Add the fixture to the "standard" behavior:

```json



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

```json



```

And let's add a new Behavior extending the standard one:

```json



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

## Add multiple fixtures and behaviors

Now you've seen what Mocks Server can do, you can add as much fixtures you need for your development or end-to-end tests, (such as error responses cases, "users" with very long name, another special cases, etc.)

You can **combine all your fixtures in as much behaviors as you need**, extending them or creating them from scratch.

And, very important, you can easily change the current behavior using the [interactive CLI](plugins-inquirer-cli.md) or the [REST API](plugins-admin-api.md) while the server is running, which will make your **development or tests environments very much agile and flexible, and not api dependant.**
