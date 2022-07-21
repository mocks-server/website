---
id: directory
title: Variant handlers directory
description: List of Mocks Server Variant Handlers
keywords:
  - mocks server
  - customization
  - variant
  - type
  - variant types
  - handler
  - format
  - list
  - directory
  - packages
---

## Official

Here you have listed the official Variant Handlers included in the [Mocks Server main distribution](https://github.com/mocks-server/main/tree/master/packages/main).

* __[`json`](../usage/variants/json.md)__: Defines the JSON body and the status code to be sent when the route is requested. 
* __[`middleware`](../usage/variants/middleware.md)__: Defines an [Express middleware](https://expressjs.com/en/guide/using-middleware.html) to be executed when the request is received. It is completely on your hand to send a response, or to pass the request to the next middleware, etc.
* __[`proxy`](../usage/variants/proxy.md)__: Defines a host to proxy the request when it is received. You can modify the request and/or the response also.

## Community

:::tip
If you have published your own Variant Handler, please [modify this page in order to add it](https://github.com/mocks-server/website/tree/master/docs/variant-handlers/directory.md), so other users can also take advantage of it 🙂!
:::