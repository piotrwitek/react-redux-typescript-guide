# React & Redux in TypeScript - Complete Guide

_"This guide is a **living compendium** documenting the most important patterns and recipes on how to use **React** (and its Ecosystem) in a **functional style** using **TypeScript**. It will help you make your code **completely type-safe** while focusing on **inferring the types from implementation** so there is less noise from excessive type annotations and it's easier to write and maintain correct types in the long run."_

[![Join the chat at https://gitter.im/react-redux-typescript-guide/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/react-redux-typescript-guide/Lobby)

> #### Consider support us on [OpenCollective](https://opencollective.com/react-redux-typescript-guide) 🙌

:tada: _Now updated to support **TypeScript v3.x**_ :tada:

> #### Check what's new in [CHANGELOG](CHANGELOG.md)

---

## Motivation

When using **React with TypeScript**, getting started can be confusing. There are many ways to type React components and Redux, and it's not always clear which approach is best or most idiomatic.

This guide exists to answer the following questions:
- How do I type my React components, props, and state correctly?
- How do I type Redux actions, reducers, and the store?
- How do I avoid excessive, noisy type annotations while still being type-safe?
- What are the best patterns and recipes the community has converged on?

This is **not a boilerplate** — you won't find a project template here to clone and run. Instead, this is a **reference guide and cheatsheet** with curated patterns and code examples for common use cases when building React & Redux apps with TypeScript.

---

## How to use this guide

This guide is organized into sections covering different parts of your React + Redux + TypeScript stack. Each section contains:

1. **Code examples** — showing the recommended pattern for a given use case
2. **Explanations** — clarifying why the pattern is used
3. **Expandable sections** — with additional details, click _"Click to expand"_ to see more

### Who is this for?

This guide is aimed at developers who:
- Have basic familiarity with **React** and **Redux** concepts
- Are either starting to use **TypeScript** with React/Redux, or want to improve their current typing approach
- Want to write more type-safe code without drowning in verbose type annotations

> If you are completely new to React, it is recommended to first go through the [official React documentation](https://reactjs.org/docs/getting-started.html) before using this guide.

### Prerequisites

- Basic understanding of [React](https://reactjs.org/) (components, props, state, lifecycle)
- Basic understanding of [Redux](https://redux.js.org/) (actions, reducers, store, middleware)
- Basic understanding of [TypeScript](https://www.typescriptlang.org/docs/handbook/basic-types.html) (types, interfaces, generics)

### What comes from `@types/react` and `@types/redux`?

Many of the types you'll see in this guide — like `React.FC<P>`, `React.Component<P, S>`, `React.ReactNode`, etc. — are **not** invented by this guide. They come from the official TypeScript type definitions provided by the community packages:
- [`@types/react`](https://www.npmjs.com/package/@types/react) — Type definitions for React
- [`@types/react-dom`](https://www.npmjs.com/package/@types/react-dom) — Type definitions for ReactDOM
- [`@types/react-redux`](https://www.npmjs.com/package/@types/react-redux) — Type definitions for React-Redux

This guide shows you **how and when to use** these existing types effectively, as well as patterns for writing your own types for actions, reducers, and component props.

### Playground

You can try out the code examples locally by cloning the companion playground project:

> [react-redux-typescript-guide Playground](https://github.com/piotrwitek/react-redux-typescript-guide)

---

## Goals

- Complete type safety (with [`--strict`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) flag) without losing type information downstream through all the layers of the application
- Making type annotations concise by **inferring types from implementation** wherever possible
- Reduce repetition and complexity of types with (automated) **type inference**
- Derive and re-use types across your codebase from a single source of truth

## Complementary Projects

- [Advent of TypeScript](https://github.com/piotrwitek/typesafe-actions) - TypeScript challenges
- [typesafe-actions](https://github.com/piotrwitek/typesafe-actions) - Typesafe utilities for "action-creators" in Redux / Flux Architecture
- [utility-types](https://github.com/piotrwitek/utility-types) - Collection of utility types, complementing TypeScript build-in mapped types and aliases

## Funding

You can also help by funding issues. Issues like bug reports, feature requests, or documentation improvements can be funded by anyone to prioritize their resolution.

_Please check out_ **[issuehunt.io](https://issuehunt.io/r/piotrwitek/react-redux-typescript-guide)**

---

## Table of Contents

- [Section 1: React - Type-Definitions Cheatsheet](#section-1-react---type-definitions-cheatsheet)
- [Section 2: React - Typing Patterns](#section-2-react---typing-patterns)
- [Section 3: React-Redux - Typing Patterns](#section-3-react-redux---typing-patterns)
- [Section 4: Redux - Typing Patterns](#section-4-redux---typing-patterns)
- [Section 5: Tools & Integration](#section-5-tools--integration)
- [Section 6: Extras](#section-6-extras)

---

# Section 1: React - Type-Definitions Cheatsheet

> This section is a quick reference for the most useful types available in `@types/react`. These are types you'll use regularly when building React components in TypeScript.

::codeblock='playground/src/type-definitions-cheatsheet.md'::

---

# Section 2: React - Typing Patterns

::codeblock='playground/src/typing-patterns.md'::

---

# Section 3: React-Redux - Typing Patterns

::codeblock='playground/src/redux-typing-patterns.md'::

---

# Section 4: Redux - Typing Patterns

::codeblock='playground/src/redux-typing-patterns-2.md'::

---

# Section 5: Tools & Integration

::codeblock='playground/src/tools-and-integration.md'::

---

# Section 6: Extras

::codeblock='playground/src/extras.md'::

---

MIT License

Copyright (c) 2017 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
