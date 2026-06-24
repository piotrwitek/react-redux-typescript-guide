<div align="center">

# React & Redux in TypeScript - Complete Guide

_"This guide is a **living compendium** documenting the most important patterns and recipes on how to use **React** (and its Ecosystem) in a **functional style** using **TypeScript**. It will help you make your code **completely type-safe** while focusing on **inferring the types from implementation** so there is less noise coming from excessive type annotations and it's easier to write and maintain correct types in the long run."_

[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/react-redux-ts)
[![Join the chat at https://gitter.im/react-redux-typescript-guide/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/react-redux-typescript-guide/Lobby)

_Found it useful? Want more updates?_

[**Show your support by giving a :star:**](https://github.com/piotrwitek/react-redux-typescript-guide/stargazers)

<a href="https://www.buymeacoffee.com/piotrekwitek">
  <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me a Coffee">
</a>
<a href="https://www.patreon.com/piotrekwitek">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" alt="Become a Patron" width="160">
</a>

<br/><hr/>

## **What's new?**

:tada: _Now updated to support **TypeScript v4.6**_ :tada:
:rocket: _Updated to `typesafe-actions@5.x` :rocket:
:rocket: _Updated react-styleguidist demo application to the latest version_ :rocket:

<hr/><br/>

### **Goals**

- Complete type safety (with [`--strict`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) flag) without losing type information downstream through all the layers of our application (e.g. no type assertions or hacking with `any` type)
- Make type annotations concise by eliminating redundancy in types using advanced TypeScript Language features like **Type Inference** and **Control flow analysis**
- Reduce repetition and complexity of types with TypeScript focused [complementary libraries](#react-redux-typescript-ecosystem)

### **React, Redux, Typescript Ecosystem**

- [typesafe-actions](https://github.com/piotrwitek/typesafe-actions) - Typesafe utilities for "action-creators" in Redux / Flux Architecture  
- [utility-types](https://github.com/piotrwitek/utility-types) - Collection of generic types for TypeScript, complementing built-in mapped types and aliases - think lodash for reusable types.  
- [react-redux-typescript-scripts](https://github.com/piotrwitek/react-redux-typescript-scripts) - dev-tools configuration files shared between projects based on this guide  

### **Examples**

- Todo-App playground: [Codesandbox](https://codesandbox.io/s/github/piotrwitek/typesafe-actions/tree/master/codesandbox)
- React, Redux, TypeScript - RealWorld App: [Github](https://github.com/piotrwitek/react-redux-typescript-realworld-app) | [Demo](https://react-redux-typescript-realworld-app.netlify.com/)

### **Playground Project**

[![Build Status](https://semaphoreci.com/api/v1/piotrekwitek/react-redux-typescript-guide/branches/master/badge.svg)](https://semaphoreci.com/piotrekwitek/react-redux-typescript-guide)
[![Maintainability](https://api.codeclimate.com/v1/badges/5f2d6e9a4c5a1d6f6d6d/maintainability)](https://codeclimate.com/github/piotrwitek/react-redux-typescript-guide/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5f2d6e9a4c5a1d6f6d6d/test_coverage)](https://codeclimate.com/github/piotrwitek/react-redux-typescript-guide/test_coverage)