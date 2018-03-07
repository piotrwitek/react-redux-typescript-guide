# React & Redux in TypeScript - Static Typing Guide

_"This guide is a **living compendium** documenting the most important patterns and recipes on how to use **React** (and it's Ecosystem) in a **functional style with TypeScript** and to make your code **completely type-safe** while focusing on a **conciseness of type annotations** so it's a minimal effort to write and to maintain types in the long run."_

To provide the best experience we focus on the symbiosis of type-safe complementary libraries and learning the concepts like [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html), [Control flow analysis](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#control-flow-based-type-analysis), [Generics](https://www.typescriptlang.org/docs/handbook/generics.html) and some [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html).

(_Compatible with **TypeScript v2.7.2**_)

[![Join the chat at https://gitter.im/react-redux-typescript-guide/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/react-redux-typescript-guide/Lobby)  

> #### _Found it usefull? Want more updates?_ [**Give it a :star2:**](https://github.com/piotrwitek/react-redux-typescript-patterns/stargazers)  

### Goals
- Complete type safety (with [`--strict`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) flag) without loosing type information downstream through all the layers of our application (e.g. no type assertions or hacking with `any` type)
- Make type annotations concise by eliminating redudancy in types using advanced TypeScript Language features like **Type Inference** and **Control flow analysis**
- Reduce repetition and complexity of types with TypeScript focused [complementary libraries](#complementary-libraries)

### Playground Project
[![Codeship Status for piotrwitek/react-redux-typescript-guide](https://app.codeship.com/projects/11eb8c10-d117-0135-6c51-26e28af241d2/status?branch=master)](https://app.codeship.com/projects/262359)

You should check Playground Project located in the `/playground` folder. It is a source of all the code examples found in the guide. They are all tested with the most recent version of TypeScript and 3rd party type definitions (like `@types/react` or `@types/react-redux`) to ensure the examples are up-to-date and not broken with updated definitions.
> Playground was created is such a way, that you can simply clone the repository locally and immediately play around on your own to learn all the examples from this guide in a real project environment without the need to create some complicated environment setup by yourself.
