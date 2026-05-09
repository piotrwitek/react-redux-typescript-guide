# React & Redux in TypeScript - Complete Guide

A comprehensive guide to **static typing** in **React & Redux** apps using **TypeScript**.
> This guide is a living compendium documenting the most important patterns and recipes on how to use React (and its ecosystem) in a functional style with TypeScript. It will help you and your team maintain a consistent coding style and reduce cognitive overhead when working on larger codebases.

[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/react-redux-typescript-guide)

_Found it useful? Want more updates?_

[![Star on GitHub](https://img.shields.io/github/stars/piotrwitek/react-redux-typescript-guide.svg?style=social)](https://github.com/piotrwitek/react-redux-typescript-guide/stargazers)

:tada: _Now updated to support **TypeScript v3.7**, **React v16.9** and **Redux v4.x**_ :tada:

---

## Motivation

While trying to use TypeScript and React together, many developers encounter challenges:

- **What TypeScript types should I use for React components, hooks, events?**
- **How do I type Redux actions, reducers, and selectors?**
- **What are the best practices to avoid common pitfalls?**

This guide is here to answer exactly those questions. It is **not**:
- ❌ A boilerplate or starter project
- ❌ A new library or framework
- ❌ A replacement for official React or TypeScript documentation

It **is**:
- ✅ A collection of **recipes and patterns** for using React + Redux with TypeScript
- ✅ A reference for the **type definitions** provided by `@types/react` and `@types/redux` (e.g. `React.FC<P>`, `React.ComponentType<P>`, etc. — these are types shipped by the community, not invented here)
- ✅ A guide to help you write **type-safe, maintainable** frontend code
- ✅ Useful for **beginners** wanting to understand how TypeScript fits into the React ecosystem, and for **experienced developers** looking for patterns they might have missed

---

## How to Use This Guide

> **Prerequisite knowledge:** Basic familiarity with React and TypeScript syntax is helpful but not strictly required. If you are completely new to React, consider reading the [official React docs](https://reactjs.org/docs/getting-started.html) first. If you are new to TypeScript, check out the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html).

This guide is organized into sections. You don't need to read it top to bottom — jump to whatever section is relevant to what you're building:

1. **React** — How to type functional components, class components, hooks, events, refs, context, and more. All the type annotations (like `React.FC<Props>`, `React.ChangeEvent<HTMLInputElement>`) come from the `@types/react` package and are explained here with practical examples.

2. **Redux** — How to type actions, reducers, and the store in a Redux application.

3. **Recipes** — Common patterns and solutions to problems you'll encounter day-to-day.

Each section shows a **code snippet** with annotations. If you see a type like `React.FC<P>`:
- It is **not** something invented by this guide
- It **comes from** the `@types/react` npm package (community-maintained TypeScript definitions for React)
- This guide shows you **when and how** to use it

### Try It Yourself

A **playground** is included in this repo under the [`/playground`](./playground) folder. It is a Create React App project with TypeScript preconfigured. You can clone this repo and run it locally to experiment with all the patterns shown in the guide:

