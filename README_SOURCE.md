# React & Redux in TypeScript - Complete Guide

> This guide is a living compendium documenting the most important patterns and recipes on how to use **React** (and its Ecosystem) in a **functional style** using **TypeScript**. It will help you make your code **completely type-safe** while focusing on **inferring the types from implementation** so there is less noise coming from excessive type annotations and it's easier to write and maintain correct types in the long run.

> _This guide is a result of the lessons learned from building [react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide) and extensive research in the TypeScript ecosystem._

---

## Table of Contents

- [React - Type-Checking Patterns](#react---type-checking-patterns)
  - [Function Components](#function-components)
  - [Class Components](#class-components)
  - [Generic Components](#generic-components)
  - [Render Props](#render-props)
  - [Higher-Order Components](#higher-order-components)
  - [Redux Connected Components](#redux-connected-components)
    - [Functional Component Connected to Redux](#functional-component-connected-to-redux)
    - [Class Component Connected to Redux](#class-component-connected-to-redux)
    - [Class Component with @connect Decorator](#class-component-with-connect-decorator)
- [Redux - Typing Patterns](#redux---typing-patterns)
  - [Action Creators](#action-creators)
  - [Reducers](#reducers)
  - [Store Configuration](#store-configuration)
- [Configuration & Developer Experience](#configuration--developer-experience)
  - [Common Compiler Options](#common-compiler-options)

---

## React - Type-Checking Patterns

### Function Components

::codeblock='playground/src/features/func-component/fc-counter.tsx'::

---

### Class Components

::codeblock='playground/src/features/class-component/cc-counter.tsx'::

---

### Redux Connected Components

#### Functional Component Connected to Redux

::codeblock='playground/src/features/connected/fc-counter-connected.tsx'::

---

#### Class Component Connected to Redux

::codeblock='playground/src/features/connected/cc-counter-connected.tsx'::

---

#### Class Component with @connect Decorator

> Requires `"experimentalDecorators": true` in `tsconfig.json`

The `@connect` decorator syntax is an alternative way to connect a class component to Redux. Because TypeScript decorators do not automatically modify the inferred type of the class, we need to cast the exported component to reflect that connected props are injected by Redux and only `OwnProps` are required from the outside.

::codeblock='playground/src/features/connect-decorator/connect-decorator-example.tsx'::

---
