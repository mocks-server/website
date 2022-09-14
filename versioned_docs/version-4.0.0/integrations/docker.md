---
id: docker
title: Docker image
description: Running Mocks Server as a Docker container
keywords:
  - mocks server
  - mock server
  - REST API
  - integration
  - Docker
  - container
  - image
  - tutorial
  - guide
  - how to
  - usage
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Preface

Mocks Server can be also executed as a Docker container easily using the available public images. Docker images __contain all of the needed dependencies and automatically start Mocks Server__ when executed.

## Prerequisites

* You must have [Docker](https://www.docker.com/) installed

## Docker images

| Image | Docker Hub | Notes |
|---|---|---|
| main | [mocksserver/main](https://hub.docker.com/repository/docker/mocksserver/main) | Includes the `@mocks-server/main` distribution, with all official plugins installed |

:::info
For information about how images are versioned, you can read the [Releases docs](../releases/intro.md#docker-images-versioning)
:::

## Quick start

You can start a `mocksserver/main` Docker container by running:

```sh
docker run -ti -p 3100:3100 -p 3110:3110 mocksserver/main
```

This will start Mocks Server, and, as no [`/mocks` folder](../guides/organizing-files.md) nor the [configuration file](../configuration/how-to-change-settings.md) were provided, it will create a scaffold. If you hit the next URLs you'll see:

* [http://localhost:3100/api/users](http://localhost:3100/api/users) - An example route response contained in the scaffold.
* [http://localhost:3110](http://localhost:3110) - The Swagger UI of the [administration REST API](./rest-api.md).

## Providing routes, collections and config file

The Mocks Server application in the Docker container is pre-configured to search for the `mocks` folder (which contains routes and collections) and the configuration file in the `/input` folder. So, you can follow all of the [guidelines about organizing files](../guides/organizing-files.md) described in these docs, and __simply mount the same structure in the `/input` folder of the Docker container__.

Let's assume that you have the next file tree:

```
project/
├── mocks/
│   ├── routes/ <- DEFINE YOUR ROUTES HERE
│   │   ├── common.js
│   │   └── users.js
│   └── collections.json <- DEFINE YOUR COLLECTIONS HERE
└── mocks.config.js <- DEFINE YOUR CONFIGURATION HERE
```

Then, you can mount your `/project` folder as `/input` folder in the container:

```sh
docker run -ti -p 3100:3100 -p 3110:3110 \
  // highlight-next-line
  -v /Users/foo/project:/input \
  mocksserver/main
```

Now, Mocks Server will find your routes, collections and configuration file, and it will start your mock server!

## Configuration

As described in the [How to change settings docs page](../configuration/how-to-change-settings.md), environment variables can be used to change the Mocks Server configuration. So, simply pass the corresponding environment variables to the container:

```sh
docker run -ti -p 3100:3100 -p 3110:3110 \
  -v /Users/foo/project:/input \
  // highlight-next-line
  -e MOCKS_LOG=debug
  mocksserver/main
```

The Docker image includes some pre-configuration to make easier to use the app through Docker, but you can change these options using environment variables as well in case you want to customize your container:

* `MOCKS_PLUGINS_INQUIRER_CLI_ENABLED=false`. The [interactive CLI](./command-line.md) is disabled by default
* `MOCKS_FILES_PATH=/input/mocks`. The files path is set as `/input/mocks` by default.
* `MOCKS_CONFIG_FILE_SEARCH_FROM=/input`. The configuration file is expected to be in the `/input` folder.

:::caution
When setting paths in your configuration, take into account that the application in the container is running in the `/usr/app` folder, so, that is the `process.cwd` used for resolving relative paths. So, using absolute paths when defining custom configuration is recommended.
:::

## Building a self-contained image

You can also build a self-contained image, containing both the Mocks Server app and your routes, collections and configuration files. This makes your mock portable to wherever Docker runs.

Let's assume the following file structure:

```
project/
├── mocks/
│   ├── routes/ <- DEFINE YOUR ROUTES HERE
│   │   ├── common.js
│   │   └── users.js
│   └── collections.json <- DEFINE YOUR COLLECTIONS HERE
├── Dockerfile
└── mocks.config.js <- DEFINE YOUR CONFIGURATION HERE
```

The Dockerfile should contain:

```
FROM mocksserver/main
COPY ./mocks /input/mocks/
COPY ./mocks.config.js /input/mocks.config.js
```

Now, you could build your container image as follows:

```sh
docker build -t mock:test .
```

The created container image contains both the Mocks Server app, your `mocks` folder, and your `mocks.config.js` file.

Run the container:

```sh
docker run -ti -p 3100:3100 -p 3110:3110 mock:test
```

Now your API mock is available at [http://localhost:3100](http://localhost:3100), and the [administration REST API](./rest-api.md) is running at [http://localhost:3110](http://localhost:3110). 🎉
