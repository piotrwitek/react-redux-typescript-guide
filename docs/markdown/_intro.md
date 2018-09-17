## React & Redux in TypeScript - Static Typing Guide

_"This guide is a **living compendium** documenting the most important patterns and recipes on how to use **React** (and its Ecosystem) in a **functional style with TypeScript** and to make your code **completely type-safe** while focusing on a **conciseness of type annotations** so it's a minimal effort to write and to maintain types in the long run."_

[![Join the chat at https://gitter.im/react-redux-typescript-guide/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/react-redux-typescript-guide/Lobby)  

> #### _Found it useful? Want more updates?_ [**Show your support by giving a :star:**](https://github.com/piotrwitek/react-redux-typescript-patterns/stargazers)  

> _[The Mighty Tutorial](https://github.com/piotrwitek/typesafe-actions#behold-the-mighty-tutorial) for completely typesafe Redux Architecture_ :book:  

> _Reference implementation of Todo-App with `typesafe-actions`: https://codesandbox.io/s/github/piotrwitek/typesafe-actions-todo-app_ :computer:  

> _Now compatible with **TypeScript v2.8.3** (rewritten using conditional types)_ :tada:  

### Goals
- Complete type safety (with [`--strict`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) flag) without losing type information downstream through all the layers of our application (e.g. no type assertions or hacking with `any` type)
- Make type annotations concise by eliminating redundancy in types using advanced TypeScript Language features like **Type Inference** and **Control flow analysis**
- Reduce repetition and complexity of types with TypeScript focused [complementary libraries](#complementary-libraries)

### Complementary Projects
- Typesafe Action Creators for Redux / Flux Architectures [typesafe-actions](https://github.com/piotrwitek/typesafe-actions)
- Utility Types for TypeScript: [utility-types](https://github.com/piotrwitek/utility-types)
- Reference implementation of Todo-App: [typesafe-actions-todo-app](https://github.com/piotrwitek/typesafe-actions-todo-app)

### Playground Project
[![Codeship Status for piotrwitek/react-redux-typescript-guide](https://app.codeship.com/projects/11eb8c10-d117-0135-6c51-26e28af241d2/status?branch=master)](https://app.codeship.com/projects/262359)

You should check out Playground Project located in the `/playground` folder. It is a source of all the code examples found in the guide. They are all tested with the most recent version of TypeScript and 3rd party type definitions (like `@types/react` or `@types/react-redux`) to ensure the examples are up-to-date and not broken with updated definitions.
> Playground was created in such a way that you can simply clone the repository locally and immediately play around on your own. It will help you to learn all the examples from this guide in a real project environment without the need to create some complicated environment setup by yourself.

## Contributing Guide
If you're planning to contribute please make sure to read the contributing guide: [CONTRIBUTING.md](/CONTRIBUTING.md)

## Sponsor
If you like what we're doing here, you can help us by funding the work on specific issues that you choose by using IssueHunt.io!

This gives you the power to prioritize our work and support the project contributors. Moreover it'll guarantee the project will be updated and maintained in the long run.

> If you're a sponsor and want your logo to be featured in this repo under the sponsors section, please contact me at: piotrek.witek@gmail.com

[![issuehunt-image](https://github.com/BoostIO/issuehunt-materials/blob/master/issuehunt-badge@1x.png?raw=true)](https://issuehunt.io/repos/76996763)
