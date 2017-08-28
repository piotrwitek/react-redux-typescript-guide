# React & Redux in TypeScript - Static Typing Guide
This guide is **NOT** about _"How to write type declarations for every possible variable and expression to have 100% type covered code and waste a lot of time"_.  
This guide is about **_"How to write type declarations to only the minimum necessary amount of JavaScript code and still get all the benefits of Static Typing"_**.

> found it usefull, want some more? [give it a :star:](https://github.com/piotrwitek/react-redux-typescript-patterns/stargazers)  

#### Announcements
- Examples from react section already updated to TypeScript v2.5 - working on the remaining sections!  [TypeScript Changelog](https://github.com/Microsoft/TypeScript/wiki/Roadmap)  

### Introduction
This guide is aimed to use [`--strict`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) flag of TypeScript compiler to provide the best static-typing experience.  

Benefits of this setup and static-typing in general include:
- when making changes in your code, precise insight of the impact on the entire codebase (by showing all the references in the codebase for any given piece of code)  
- when implementing new features compiler validate all props passed to components or injected by connect from redux store, validation of action creator params, payload objects structure and state/action objects passed to a reducer - showing all possible JavaScript errors)  

Additionally static-typing will make processes of improving your codebase and refactoring much easier and give you a confidence that you will not break your production code.

### Playground:
Code examples are generated from the source code in `playground` folder. They are tested with TypeScript compiler with the most recent version of TypeScript and relevant type definitions (like `@types/react` or `@types/react-redux`) to ensure they are still working with recent definitions.
Moreover playground is created is such way, that you can easily clone repository, install `npm` dependencies and play around with all the examples from this guide in real project environment without any extra setup.

### Goals:
- Complete type safety with strict null checking, without failing to `any` type
- Minimize amount of manually writing type declarations by leveraging [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)
- Reduce redux boilerplate code with [simple utility functions](https://github.com/piotrwitek/react-redux-typescript) using [Generics](https://www.typescriptlang.org/docs/handbook/generics.html) and [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) features
