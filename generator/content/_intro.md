# React & Redux in TypeScript - Static Typing Guide
This guide is **NOT** about _"How to write type declarations for every possible variable and expression to have 100% type covered code and waste a lot of time"_.  
This guide is about **_"How to write type declarations to only the minimum necessary amount of JavaScript code and still get all the benefits of Static Typing"_**.

> found it usefull, want some more? [give it a :star:](https://github.com/piotrwitek/react-redux-typescript-patterns/stargazers)  

> Code examples are generated from the source code in `examples` folder, and they are tested with TypeScript compiler with the most recent version of TypeScript and `react`/`react-redux` type definitions to ensure they are still working with updated definitions  

#### Announcements
- Examples from react section already updated to TypeScript v2.5 - working on the remaining sections!  [TypeScript Changelog](https://github.com/Microsoft/TypeScript/wiki/Roadmap)  

### Introduction
This guide is aimed to use [`--strict`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) flag of TypeScript compiler to provide the best static-typing experience. Additionally we want to spent a minimal amount of effort to write explicit type annotations to our JavaScript code and whenever possible leverage smart [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html).

Benefits of this setup and static-typing in general:
- refactoring capabilities with the power equal to strongly typed languages (not "stringly" typed like Webstorm IDE)  
- when making changes in your code, precise insight of the impact on the entire codebase (by showing all the references in the codebase for any given piece of code)  
- minimal surface area for errors when implementing new features (compiler validate all props injected to connected components, action creator params, payload object structure and state/action objects passed to a reducer - showing all possible JavaScript errors)  

The power of static-typing will make processes of improving your codebase, refactorings, and cleaning dead code much simpler, and give you a confidence that you will not break your working production code.

>**NB:** This setup is very beneficial for rapidly changing projects, expecting a lot of refactorings, who is mostly skipping writing unit tests (because of the additinal costs of updating them). This setup ensure zero production exceptions, with only possible source of exception coming from network and I/O operations, but you can handle them in a typed manner as well (e.g. by providing `interface` declarations describing your API contracts you'll be safe from all possible `null` / `undefined` exceptions coming from API responses). 


### Goals:
- Complete type safety with strict null checking, without failing to `any` type
- Minimize amount of manually writing type declarations by leveraging [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)
- Reduce boilerplate with [simple utility functions](https://github.com/piotrwitek/react-redux-typescript) using [Generics](https://www.typescriptlang.org/docs/handbook/generics.html) and [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) features
