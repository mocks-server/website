---
title: Introducing plugins
author: Javier Brea
authorURL: https://github.com/javierbrea
authorImageURL: https://avatars3.githubusercontent.com/u/983381?s=460&v=4
---

## Introducing plugins

During last weeks I have been refactoring the project in a way that will make it very customizable.

The "core" functionalities _(as management of plugins, server initialization, files load and watch, etc.)_ have been moved to an independant repository, and the different interfaces, such as the administration api and the interactive command line interface have been __converted into plugins and migrated to their own repositories__.

Even the piece at charge of "handling" the fixtures _(reading fixtures properties and act in consequence when a request is received)_ has been isolated, and a method has been exposed in order to allow defining customized handlers. So, __even the way and format in which the "fixtures" are defined can now be customized__. This opens a lot of possibilities, for example, it will be possible to give to this project compatibility with other awesome mock server projects. Custom fixtures handlers could be added allowing to load fixtures defined in the "Mountebank" way, for example.

This new approach will facilitate to develop faster all the new features that are in the backlog, and makes the project very much powerful and adaptable to any project requirements. Now any user could distribute his own version of this project, with his own selection of plugins.

I will __continue working in this line__, trying to make easier the way that plugins are defined and loaded, and improving also the way that the project is configured and mocks are defined.

At the same time, lots of new plugins are in my mind for providing new interfaces, such as Browser extensions, etc. The main target is to __provide a great development environment to developers when they are working with "mocks"__.

Old interfaces have been maintained, ensuring backward compatibility, and new interfaces have been implemented, always oriented to facilitate the development of plugins. Lots of end-to-end tests are still checking the old interfaces, and new tests have been added to check the new features.

All this effort have delayed the release of the next big feature, which was expected to be the web user interface, but I hope the wait will be worth it.

[facebook-open-source]: https://opensource.facebook.com/
[docusaurus-url]: https://docusaurus.io/