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

<hr/><br/>

</div>

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

[![Build Status](https://semaphoreci.com/api/v1/piotrekwitek/react-redux-typescript-guide/branches/master/shields_badge.svg)](https://semaphoreci.com/piotrekwitek/react-redux-typescript-guide)

Check out our Playground Project located in the `/playground` folder. It contains all source files of the code examples found in the guide. They are all tested with the most recent version of TypeScript and 3rd party type-definitions (like `@types/react` or `@types/react-redux`) to ensure the examples are up-to-date and not broken with updated definitions (It's based on `create-react-app --typescript`).
> Playground project was created so that you can simply clone the repository locally and immediately play around with all the component patterns found in the guide. It will help you to learn all the examples from this guide in a real project environment without the need to create complicated environment setup by yourself.

## Contributing Guide

You can help make this project better by contributing. If you're planning to contribute please make sure to check our contributing guide: [CONTRIBUTING.md](/CONTRIBUTING.md)

## Funding

You can also help by funding issues.
Issues like bug fixes or feature requests can be very quickly resolved when funded through the IssueHunt platform.

I highly recommend to add a bounty to the issue that you're waiting for to increase priority and attract contributors willing to work on it.

[![Let's fund issues in this repository](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/76996763)

---

🌟 - _New or updated section_

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


  - [React Types Cheatsheet](#react-types-cheatsheet)
    - [`React.FC<Props>` | `React.FunctionComponent<Props>`](#reactfcprops--reactfunctioncomponentprops)
    - [`React.Component<Props, State>`](#reactcomponentprops-state)
    - [`React.ComponentType<Props>`](#reactcomponenttypeprops)
    - [`React.ComponentProps<typeof XXX>`](#reactcomponentpropstypeof-xxx)
    - [`React.ReactElement` | `JSX.Element`](#reactreactelement--jsxelement)
    - [`React.ReactNode`](#reactreactnode)
    - [`React.CSSProperties`](#reactcssproperties)
    - [`React.XXXHTMLAttributes<HTMLXXXElement>`](#reactxxxhtmlattributeshtmlxxxelement)
    - [`React.ReactEventHandler<HTMLXXXElement>`](#reactreacteventhandlerhtmlxxxelement)
    - [`React.XXXEvent<HTMLXXXElement>`](#reactxxxeventhtmlxxxelement)
- [React](#react)
  - [Function Components - FC](#function-components---fc)
    - [- Counter Component](#--counter-component)
    - [- Counter Component with default props](#--counter-component-with-default-props)
    - [- Spreading attributes in Component](#--spreading-attributes-in-component)
  - [Class Components](#class-components)
    - [- Class Counter Component](#--class-counter-component)
    - [- Class Component with default props](#--class-component-with-default-props)
  - [Generic Components](#generic-components)
    - [- Generic List Component](#--generic-list-component)
  - [Hooks](#hooks)
    - [- useState](#--usestate)
    - [- useContext](#--usecontext)
    - [- useReducer](#--usereducer)
  - [Render Props](#render-props)
    - [- Name Provider Component](#--name-provider-component)
    - [- Mouse Provider Component](#--mouse-provider-component)
  - [Higher-Order Components](#higher-order-components)
    - [- HOC wrapping a component](#--hoc-wrapping-a-component)
    - [- HOC wrapping a component and injecting props](#--hoc-wrapping-a-component-and-injecting-props)
    - [- Nested HOC - wrapping a component, injecting props and connecting to redux 🌟](#--nested-hoc---wrapping-a-component-injecting-props-and-connecting-to-redux-)
  - [Redux Connected Components](#redux-connected-components)
    - [- Redux connected counter](#--redux-connected-counter)
    - [- Redux connected counter with own props](#--redux-connected-counter-with-own-props)
    - [- Redux connected counter via hooks](#--redux-connected-counter-via-hooks)
    - [- Redux connected counter with `redux-thunk` integration](#--redux-connected-counter-with-redux-thunk-integration)
  - [Context](#context)
    - [ThemeContext](#themecontext)
    - [ThemeProvider](#themeprovider)
    - [ThemeConsumer](#themeconsumer)
    - [ThemeConsumer in class component](#themeconsumer-in-class-component)
- [Redux](#redux)
  - [Store Configuration](#store-configuration)
    - [Create Global Store Types](#create-global-store-types)
    - [Create Store](#create-store)
  - [Action Creators 🌟](#action-creators-)
  - [Reducers](#reducers)
    - [State with Type-level Immutability](#state-with-type-level-immutability)
    - [Typing reducer](#typing-reducer)
    - [Typing reducer with `typesafe-actions`](#typing-reducer-with-typesafe-actions)
    - [Testing reducer](#testing-reducer)
  - [Async Flow with `redux-observable`](#async-flow-with-redux-observable)
    - [Typing epics](#typing-epics)
    - [Testing epics](#testing-epics)
  - [Selectors with `reselect`](#selectors-with-reselect)
  - [Connect with `react-redux`](#connect-with-react-redux)
    - [Typing connected component](#typing-connected-component)
    - [Typing `useSelector` and `useDispatch`](#typing-useselector-and-usedispatch)
    - [Typing connected component with `redux-thunk` integration](#typing-connected-component-with-redux-thunk-integration)
- [Configuration & Dev Tools](#configuration--dev-tools)
  - [Common Npm Scripts](#common-npm-scripts)
  - [tsconfig.json](#tsconfigjson)
  - [TSLib](#tslib)
  - [ESLint](#eslint)
    - [.eslintrc.js](#eslintrcjs)
  - [Jest](#jest)
    - [jest.config.json](#jestconfigjson)
    - [jest.stubs.js](#jeststubsjs)
  - [Style Guides](#style-guides)
    - [react-styleguidist](#react-styleguidist)
- [FAQ](#faq)
  - [Ambient Modules](#ambient-modules)
    - [Imports in ambient modules](#imports-in-ambient-modules)
  - [Type-Definitions](#type-definitions)
    - [Missing type-definitions error](#missing-type-definitions-error)
    - [Using custom `d.ts` files for npm modules](#using-custom-dts-files-for-npm-modules)
  - [Type Augmentation](#type-augmentation)
    - [Augmenting library internal declarations - using relative import](#augmenting-library-internal-declarations---using-relative-import)
    - [Augmenting library public declarations - using node_modules import](#augmenting-library-public-declarations---using-node_modules-import)
  - [Misc](#misc)
    - [- should I still use React.PropTypes in TS?](#--should-i-still-use-reactproptypes-in-ts)
    - [- when to use `interface` declarations and when `type` aliases?](#--when-to-use-interface-declarations-and-when-type-aliases)
    - [- what's better default or named exports?](#--whats-better-default-or-named-exports)
    - [- how to best initialize class instance or static properties?](#--how-to-best-initialize-class-instance-or-static-properties)
    - [- how to best declare component handler functions?](#--how-to-best-declare-component-handler-functions)
- [Tutorials & Articles](#tutorials--articles)
- [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---

# Installation

## Types for React & Redux

```
npm i -D @types/react @types/react-dom @types/react-redux
```

"react" - `@types/react`  
"react-dom" - `@types/react-dom`  
"redux" - (types included with npm package)*  
"react-redux" - `@types/react-redux`  

> *NB: Guide is based on types for Redux >= v4.x.x.

[⇧ back to top](#table-of-contents)

---

## React Types Cheatsheet

### `React.FC<Props>` | `React.FunctionComponent<Props>`

Type representing a functional component

```tsx
const MyComponent: React.FC<Props> = ...
```

### `React.Component<Props, State>`

Type representing a class component

```tsx
class MyComponent extends React.Component<Props, State> { ...
```

### `React.ComponentType<Props>`

Type representing union of (`React.FC<Props> | React.Component<Props>`) - used in HOC

```tsx
const withState = <P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P>,
) => { ...
```

### `React.ComponentProps<typeof XXX>`

Gets Props type of a specified component XXX (WARNING: does not work with statically declared default props and generic props)

```tsx
type MyComponentProps = React.ComponentProps<typeof MyComponent>;
```

### `React.ReactElement` | `JSX.Element`

Type representing a concept of React Element - representation of a native DOM component (e.g. `<div />`), or a user-defined composite component (e.g. `<MyComponent />`)

```tsx
const elementOnly: React.ReactElement = <div /> || <MyComponent />;
```

### `React.ReactNode`

Type representing any possible type of React node (basically ReactElement (including Fragments and Portals) + primitive JS types)

```tsx
const elementOrPrimitive: React.ReactNode = 'string' || 0 || false || null || undefined || <div /> || <MyComponent />;
const Component = ({ children: React.ReactNode }) => ...
```

### `React.CSSProperties`

Type representing style object in JSX - for css-in-js styles

```tsx
const styles: React.CSSProperties = { flexDirection: 'row', ...
const element = <div style={styles} ...
```

### `React.XXXHTMLAttributes<HTMLXXXElement>`

Type representing HTML attributes of specified HTML Element - for extending HTML Elements

```tsx
const Input: React.FC<Props & React.InputHTMLAttributes<HTMLInputElement>> = props => { ... }

<Input about={...} accept={...} alt={...} ... />
```

### `React.ReactEventHandler<HTMLXXXElement>`

Type representing generic event handler - for declaring event handlers

```tsx
const handleChange: React.ReactEventHandler<HTMLInputElement> = (ev) => { ... } 

<input onChange={handleChange} ... />
```

### `React.XXXEvent<HTMLXXXElement>`

Type representing more specific event. Some common event examples: `ChangeEvent, FormEvent, FocusEvent, KeyboardEvent, MouseEvent, DragEvent, PointerEvent, WheelEvent, TouchEvent`.

```tsx
const handleChange = (ev: React.MouseEvent<HTMLDivElement>) => { ... }

<div onMouseMove={handleChange} ... />
```

In code above `React.MouseEvent<HTMLDivElement>` is type of mouse event, and this event happened on `HTMLDivElement`

[⇧ back to top](#table-of-contents)

---

# React

## Function Components - FC

### - Counter Component

::codeblock='playground/src/components/fc-counter.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#fccounter)

[⇧ back to top](#table-of-contents)

### - Counter Component with default props

::codeblock='playground/src/components/fc-counter-with-default-props.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#fccounterwithdefaultprops)

[⇧ back to top](#table-of-contents)

### - [Spreading attributes](https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes) in Component

::codeblock='playground/src/components/fc-spread-attributes.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#fcspreadattributes)

[⇧ back to top](#table-of-contents)

---

## Class Components

### - Class Counter Component

::codeblock='playground/src/components/class-counter.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#classcounter)

[⇧ back to top](#table-of-contents)

### - Class Component with default props

::codeblock='playground/src/components/class-counter-with-default-props.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#classcounterwithdefaultprops)

[⇧ back to top](#table-of-contents)

---

## Generic Components

- easily create typed component variations and reuse common logic
- common use case is a generic list components

### - Generic List Component

::codeblock='playground/src/components/generic-list.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#genericlist)

[⇧ back to top](#table-of-contents)

---

## Hooks

> <https://reactjs.org/docs/hooks-intro.html>

### - useState

> <https://reactjs.org/docs/hooks-reference.html#usestate>

::codeblock='playground/src/hooks/use-state.tsx'::

[⇧ back to top](#table-of-contents)

### - useContext

> <https://reactjs.org/docs/hooks-reference.html#usecontext>

::codeblock='playground/src/hooks/use-theme-context.tsx'::

[⇧ back to top](#table-of-contents)

### - useReducer

> <https://reactjs.org/docs/hooks-reference.html#usereducer>

::codeblock='playground/src/hooks/use-reducer.tsx'::

[⇧ back to top](#table-of-contents)

---

## Render Props

> <https://reactjs.org/docs/render-props.html>

### - Name Provider Component

Simple component using children as a render prop

::codeblock='playground/src/components/name-provider.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#nameprovider)

[⇧ back to top](#table-of-contents)

### - Mouse Provider Component

`Mouse` component found in [Render Props React Docs](https://reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns)

::codeblock='playground/src/components/mouse-provider.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#mouseprovider)

[⇧ back to top](#table-of-contents)

---

## Higher-Order Components

> <https://reactjs.org/docs/higher-order-components.html>

### - HOC wrapping a component

Adds state to a stateless counter

::codeblock='playground/src/hoc/with-state.tsx'::
::expander='playground/src/hoc/with-state.usage.tsx'::

[⇧ back to top](#table-of-contents)

### - HOC wrapping a component and injecting props

Adds error handling using componentDidCatch to any component

::codeblock='playground/src/hoc/with-error-boundary.tsx'::
::expander='playground/src/hoc/with-error-boundary.usage.tsx'::

[⇧ back to top](#table-of-contents)

### - Nested HOC - wrapping a component, injecting props and connecting to redux 🌟

Adds error handling using componentDidCatch to any component

::codeblock='playground/src/hoc/with-connected-count.tsx'::
::expander='playground/src/hoc/with-connected-count.usage.tsx'::

[⇧ back to top](#table-of-contents)

---

## Redux Connected Components

### - Redux connected counter

::codeblock='playground/src/connected/fc-counter-connected.tsx'::
::expander='playground/src/connected/fc-counter-connected.usage.tsx'::

[⇧ back to top](#table-of-contents)

### - Redux connected counter with own props

::codeblock='playground/src/connected/fc-counter-connected-own-props.tsx'::
::expander='playground/src/connected/fc-counter-connected-own-props.usage.tsx'::

[⇧ back to top](#table-of-contents)

### - Redux connected counter via hooks

::codeblock='playground/src/hooks/react-redux-hooks.tsx'::

[⇧ back to top](#table-of-contents)

### - Redux connected counter with `redux-thunk` integration

::codeblock='playground/src/connected/fc-counter-connected-bind-action-creators.tsx'::
::expander='playground/src/connected/fc-counter-connected-bind-action-creators.usage.tsx'::

[⇧ back to top](#table-of-contents)

## Context

> <https://reactjs.org/docs/context.html>

### ThemeContext

::codeblock='playground/src/context/theme-context.ts'::

[⇧ back to top](#table-of-contents)

### ThemeProvider

::codeblock='playground/src/context/theme-provider.tsx'::

[⇧ back to top](#table-of-contents)

### ThemeConsumer

::codeblock='playground/src/context/theme-consumer.tsx'::

### ThemeConsumer in class component

::codeblock='playground/src/context/theme-consumer-class.tsx'::

[Implementation with Hooks](#--usecontext)

[⇧ back to top](#table-of-contents)


---

# Redux

## Store Configuration

### Create Global Store Types

#### `RootState` - type representing root state-tree

Can be imported in connected components to provide type-safety to Redux `connect` function

#### `RootAction` - type representing union type of all action objects

Can be imported in various layers receiving or sending redux actions like: reducers, sagas or redux-observables epics

::codeblock='playground/src/store/types.d.ts'::

[⇧ back to top](#table-of-contents)

### Create Store

When creating a store instance we don't need to provide any additional types. It will set-up a **type-safe Store instance** using type inference.
> The resulting store instance methods like `getState` or `dispatch` will be type checked and will expose all type errors

::codeblock='playground/src/store/store.ts'::

---

## Action Creators 🌟

> We'll be using a battle-tested helper library [`typesafe-actions`](https://github.com/piotrwitek/typesafe-actions#typesafe-actions) [![Latest Stable Version](https://img.shields.io/npm/v/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions) [![NPM Downloads](https://img.shields.io/npm/dt/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions) that's designed to make it easy and fun working with **Redux** in **TypeScript**.

> To learn more please check this in-depth tutorial: [Typesafe-Actions - Tutorial](https://github.com/piotrwitek/typesafe-actions#tutorial)!

A solution below is using a simple factory function to automate the creation of type-safe action creators. The goal is to decrease maintenance effort and reduce code repetition of type annotations for actions and creators. The result is completely typesafe action-creators and their actions.

::codeblock='playground/src/features/counters/actions.ts'::
::expander='playground/src/features/counters/actions.usage.ts'::

[⇧ back to top](#table-of-contents)

---

## Reducers

### State with Type-level Immutability

Declare reducer `State` type with `readonly` modifier to get compile time immutability

```ts
export type State = {
  readonly counter: number;
  readonly todos: ReadonlyArray<string>;
};
```

Readonly modifier allow initialization, but will not allow reassignment by highlighting compiler errors

```ts
export const initialState: State = {
  counter: 0,
}; // OK

initialState.counter = 3; // TS Error: cannot be mutated
```

It's great for **Arrays in JS** because it will error when using mutator methods like (`push`, `pop`, `splice`, ...), but it'll still allow immutable methods like (`concat`, `map`, `slice`,...).

```ts
state.todos.push('Learn about tagged union types') // TS Error: Property 'push' does not exist on type 'ReadonlyArray<string>'
const newTodos = state.todos.concat('Learn about tagged union types') // OK
```

#### Caveat - `Readonly` is not recursive

This means that the `readonly` modifier doesn't propagate immutability down the nested structure of objects. You'll need to mark each property on each level explicitly.

> **TIP:** use `Readonly` or `ReadonlyArray` [Mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

```ts
export type State = Readonly<{
  counterPairs: ReadonlyArray<Readonly<{
    immutableCounter1: number,
    immutableCounter2: number,
  }>>,
}>;

state.counterPairs[0] = { immutableCounter1: 1, immutableCounter2: 1 }; // TS Error: cannot be mutated
state.counterPairs[0].immutableCounter1 = 1; // TS Error: cannot be mutated
state.counterPairs[0].immutableCounter2 = 1; // TS Error: cannot be mutated
```

#### Solution - recursive `Readonly` is called `DeepReadonly`

To fix this we can use [`DeepReadonly`](https://github.com/piotrwitek/utility-types#deepreadonlyt) type (available from `utility-types`).

```ts
import { DeepReadonly } from 'utility-types';

export type State = DeepReadonly<{
  containerObject: {
    innerValue: number,
    numbers: number[],
  }
}>;

state.containerObject = { innerValue: 1 }; // TS Error: cannot be mutated
state.containerObject.innerValue = 1; // TS Error: cannot be mutated
state.containerObject.numbers.push(1); // TS Error: cannot use mutator methods
```

[⇧ back to top](#table-of-contents)

### Typing reducer

> to understand following section make sure to learn about [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html), [Control flow analysis](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#control-flow-based-type-analysis) and [Tagged union types](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#tagged-union-types)

::codeblock='playground/src/features/todos/reducer.ts'::

[⇧ back to top](#table-of-contents)

### Typing reducer with `typesafe-actions`

> Notice we are not required to use any generic type parameter in the API. Try to compare it with regular reducer as they are equivalent.

::codeblock='playground/src/features/todos/reducer-ta.ts'::

[⇧ back to top](#table-of-contents)

### Testing reducer

::codeblock='playground/src/features/todos/reducer.spec.ts'::

[⇧ back to top](#table-of-contents)

---

## Async Flow with `redux-observable`

### Typing epics

::codeblock='playground/src/features/todos/epics.ts'::

[⇧ back to top](#table-of-contents)

### Testing epics

::codeblock='playground/src/features/todos/epics.spec.ts'::

[⇧ back to top](#table-of-contents)

---

## Selectors with `reselect`

::codeblock='playground/src/features/todos/selectors.ts'::

[⇧ back to top](#table-of-contents)

---

## Connect with `react-redux`

### Typing connected component

_**NOTE**: Below you'll find a short explanation of concepts behind using `connect` with TypeScript. For more detailed examples please check [Redux Connected Components](#redux-connected-components) section._

```tsx
import MyTypes from 'MyTypes';

import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';

import { countersActions } from '../features/counters';
import { FCCounter } from '../components';

// Type annotation for "state" argument is mandatory to check 
// the correct shape of state object and injected props you can also
// extend connected component Props interface by annotating `ownProps` argument
const mapStateToProps = (state: MyTypes.RootState, ownProps: FCCounterProps) => ({
  count: state.counters.reduxCounter,
});

// "dispatch" argument needs an annotation to check the correct shape
//  of an action object when using dispatch function
const mapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) =>
  bindActionCreators({
    onIncrement: countersActions.increment,
  }, dispatch);

// shorter alternative is to use an object instead of mapDispatchToProps function
const dispatchToProps = {
    onIncrement: countersActions.increment,
};

// Notice we don't need to pass any generic type parameters to neither
// the connect function below nor map functions declared above
// because type inference will infer types from arguments annotations automatically
// This is much cleaner and idiomatic approach
export const FCCounterConnected =
  connect(mapStateToProps, mapDispatchToProps)(FCCounter);

// You can add extra layer of validation of your action creators
// by using bindActionCreators generic type parameter and RootAction type
const mapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) =>
  bindActionCreators<ActionCreatorsMapObject<Types.RootAction>>({
    invalidActionCreator: () => 1, // Error: Type 'number' is not assignable to type '{ type: "todos/ADD"; payload: Todo; } | { ... }
  }, dispatch);

```

[⇧ back to top](#table-of-contents)

### Typing `useSelector` and `useDispatch`

::codeblock='playground/src/store/hooks.ts'::

[⇧ back to top](#table-of-contents)

### Typing connected component with `redux-thunk` integration

_**NOTE**: When using thunk action creators you need to use `bindActionCreators`. Only this way you can get corrected dispatch props type signature like below.*_

_**WARNING**: As of now (Apr 2019) `bindActionCreators` signature of the latest `redux-thunk` release will not work as below, you need to use our modified type definitions that you can find here [`/playground/typings/redux-thunk/index.d.ts`](./playground/typings/redux-thunk/index.d.ts) and then add `paths` overload in your tsconfig like this: [`"paths":{"redux-thunk":["typings/redux-thunk"]}`](./playground/tsconfig.json)._

```tsx
const thunkAsyncAction = () => async (dispatch: Dispatch): Promise<void> => {
  // dispatch actions, return Promise, etc.
}

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) =>
  bindActionCreators(
    {
      thunkAsyncAction,
    },
    dispatch
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
// { thunkAsyncAction: () => Promise<void>; }

/* Without "bindActionCreators" fix signature will be the same as the original "unbound" thunk function: */
// { thunkAsyncAction: () => (dispatch: Dispatch<AnyAction>) => Promise<void>; }
```

[⇧ back to top](#table-of-contents)

---

# Configuration & Dev Tools

## Common Npm Scripts

> Common TS-related npm scripts shared across projects

```json
"prettier": "prettier --list-different 'src/**/*.ts' || (echo '\nPlease fix code formatting by running:\nnpm run prettier:fix\n'; exit 1)",
"prettier:fix": "prettier --write 'src/**/*.ts'",
"lint": "eslint ./src --ext .js,.jsx,.ts,.tsx",
"tsc": "tsc -p ./ --noEmit",
"tsc:watch": "tsc -p ./ --noEmit -w",
"test": "jest --config jest.config.json",
"test:watch": "jest --config jest.config.json --watch",
"test:update": "jest --config jest.config.json -u"
"ci-check": "npm run prettier && npm run lint && npm run tsc && npm run test",
```

[⇧ back to top](#table-of-contents)

## tsconfig.json

We have recommended `tsconfig.json` that you can easily add to your project thanks to [`react-redux-typescript-scripts`](https://github.com/piotrwitek/react-redux-typescript-scripts) package.

::expander='playground/tsconfig.json'::

[⇧ back to top](#table-of-contents)

## TSLib

This library will cut down on your bundle size, thanks to using external runtime helpers instead of adding them per each file.

> <https://www.npmjs.com/package/tslib>

> Installation  
`npm i tslib`


Then add this to your `tsconfig.json`:

```ts
"compilerOptions": {
  "importHelpers": true
}
```

[⇧ back to top](#table-of-contents)

## ESLint

We have recommended config that will automatically add a parser & plugin for TypeScript thanks to [`react-redux-typescript-scripts`](https://github.com/piotrwitek/react-redux-typescript-scripts) package.

> <https://typescript-eslint.io>

> Installation
`npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`


### .eslintrc.js

::expander='playground/.eslintrc.js'::

[⇧ back to top](#table-of-contents)

## Jest

> <https://jestjs.io/>

> Installation  
`npm i -D jest ts-jest @types/jest`

### jest.config.json

::expander='configs/jest.config.json'::

### jest.stubs.js

::expander='configs/jest.stubs.js'::

[⇧ back to top](#table-of-contents)

## Style Guides

### [react-styleguidist](https://github.com/styleguidist/react-styleguidist)

[⟩⟩⟩ styleguide.config.js](/playground/styleguide.config.js)  

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/)

[⇧ back to top](#table-of-contents)

---

# FAQ


## Ambient Modules

### Imports in ambient modules

For type augmentation imports should stay outside of module declaration.

```ts
import { Operator } from 'rxjs/Operator';
import { Observable } from 'rxjs/Observable';

declare module 'rxjs/Subject' {
  interface Subject<T> {
    lift<R>(operator: Operator<T, R>): Observable<R>;
  }
}
```

When creating 3rd party type-definitions all the imports should be kept inside the module declaration, otherwise it will be treated as augmentation and show error

```ts
declare module "react-custom-scrollbars" {
    import * as React from "react";
    export interface positionValues {
    ...
```

[⇧ back to top](#table-of-contents)

## Type-Definitions

### Missing type-definitions error

if you cannot find types for a third-party module you can provide your own types or disable type-checking for this module using [Shorthand Ambient Modules](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Modules.md#shorthand-ambient-modules)

::codeblock='playground/typings/modules.d.ts'::

### Using custom `d.ts` files for npm modules

If you want to use an alternative (customized) type-definitions for some npm module (that usually comes with it's own type-definitions), you can do it by adding an override in `paths` compiler option.

```ts
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "redux": ["typings/redux"], // use an alternative type-definitions instead of the included one
      ...
    },
    ...,
  }
}
```

[⇧ back to top](#table-of-contents)

## Type Augmentation

Strategies to fix issues coming from external type-definitions files (*.d.ts)

### Augmenting library internal declarations - using relative import

```ts
// added missing autoFocus Prop on Input component in "antd@2.10.0" npm package
declare module '../node_modules/antd/lib/input/Input' {
  export interface InputProps {
    autoFocus?: boolean;
  }
}
```

### Augmenting library public declarations - using node_modules import

```ts
// fixed broken public type-definitions in "rxjs@5.4.1" npm package
import { Operator } from 'rxjs/Operator';
import { Observable } from 'rxjs/Observable';

declare module 'rxjs/Subject' {
  interface Subject<T> {
    lift<R>(operator: Operator<T, R>): Observable<R>;
  }
}
```

> More advanced scenarios for working with vendor type-definitions can be found here [Official TypeScript Docs](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Modules.md#working-with-other-javascript-libraries)

[⇧ back to top](#table-of-contents)

## Misc

### - should I still use React.PropTypes in TS?

No. With TypeScript, using PropTypes is an unnecessary overhead. When declaring Props and State interfaces, you will get complete intellisense and design-time safety with static type checking. This way you'll be safe from runtime errors and you will save a lot of time on debugging. Additional benefit is an elegant and standardized method of documenting your component public API in the source code.  

[⇧ back to top](#table-of-contents)

### - when to use `interface` declarations and when `type` aliases?

From practical side, using `interface` declaration will create an identity (interface name) in compiler errors, on the contrary `type` aliases doesn't create an identity and will be unwinded to show all the properties and nested types it consists of.  
Although I prefer to use `type` most of the time there are some places this can become too noisy when reading compiler errors and that's why I like to leverage this distinction to hide some of not so important type details in errors using interfaces identity.
Related `ts-lint` rule: <https://palantir.github.io/tslint/rules/interface-over-type-literal/>  

[⇧ back to top](#table-of-contents)

### - what's better default or named exports?

A common flexible solution is to use module folder pattern, because you can leverage both named and default import when you see fit.  
With this solution you'll achieve better encapsulation and be able to safely refactor internal naming and folders structure without breaking your consumer code:

```ts
// 1. create your component files (`select.tsx`) using default export in some folder:

// components/select.tsx
const Select: React.FC<Props> = (props) => {
...
export default Select;

// 2. in this folder create an `index.ts` file that will re-export components with named exports:

// components/index.ts
export { default as Select } from './select';
...

// 3. now you can import your components in both ways, with named export (better encapsulation) or using default export (internal access):

// containers/container.tsx
import { Select } from '@src/components';
or
import Select from '@src/components/select';
...
```

[⇧ back to top](#table-of-contents)

### - how to best initialize class instance or static properties?

Prefered modern syntax is to use class Property Initializers  

```tsx
class ClassCounterWithInitialCount extends React.Component<Props, State> {
  // default props using Property Initializers
  static defaultProps: DefaultProps = {
    className: 'default-class',
    initialCount: 0,
  };
  
  // initial state using Property Initializers
  state: State = {
    count: this.props.initialCount,
  };
  ...
}
```

[⇧ back to top](#table-of-contents)

### - how to best declare component handler functions?

Prefered modern syntax is to use Class Fields with arrow functions  

```tsx
class ClassCounter extends React.Component<Props, State> {
// handlers using Class Fields with arrow functions
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };
  ...
}
```

[⇧ back to top](#table-of-contents)

---

# Tutorials & Articles

> Curated list of relevant in-depth tutorials

Higher-Order Components:

- <https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb>

[⇧ back to top](#table-of-contents)

---

# Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/739075?v=4" width="100px;"/><br /><sub><b>Piotrek Witek</b></sub>](https://github.com/piotrwitek)<br />[💻](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=piotrwitek "Code") [📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=piotrwitek "Documentation") [🤔](#ideas-piotrwitek "Ideas, Planning, & Feedback") [👀](#review-piotrwitek "Reviewed Pull Requests") [💬](#question-piotrwitek "Answering Questions") | [<img src="https://avatars3.githubusercontent.com/u/8602615?v=4" width="100px;"/><br /><sub><b>Kazz Yokomizo</b></sub>](https://github.com/kazup01)<br />[💵](#financial-kazup01 "Financial") [🔍](#fundingFinding-kazup01 "Funding Finding") | [<img src="https://avatars1.githubusercontent.com/u/366438?v=4" width="100px;"/><br /><sub><b>Jake Boone</b></sub>](https://github.com/jakeboone02)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=jakeboone02 "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/9748762?v=4" width="100px;"/><br /><sub><b>Amit Dahan</b></sub>](https://github.com/amitdahan)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=amitdahan "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/98167?v=4" width="100px;"/><br /><sub><b>gulderov</b></sub>](https://github.com/gulderov)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=gulderov "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/1964212?v=4" width="100px;"/><br /><sub><b>Erik Pearson</b></sub>](https://github.com/emp823)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=emp823 "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/5342677?v=4" width="100px;"/><br /><sub><b>Bryan Mason</b></sub>](https://github.com/flymason)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=flymason "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/119451?v=4" width="100px;"/><br /><sub><b>Jakub Chodorowicz</b></sub>](http://www.jakub.chodorowicz.pl/)<br />[💻](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=chodorowicz "Code") | [<img src="https://avatars1.githubusercontent.com/u/7266431?v=4" width="100px;"/><br /><sub><b>Oleg Maslov</b></sub>](https://github.com/mleg)<br />[🐛](https://github.com/piotrwitek/react-redux-typescript-guide/issues?q=author%3Amleg "Bug reports") | [<img src="https://avatars0.githubusercontent.com/u/3393293?v=4" width="100px;"/><br /><sub><b>Aaron Westbrook</b></sub>](https://github.com/awestbro)<br />[🐛](https://github.com/piotrwitek/react-redux-typescript-guide/issues?q=author%3Aawestbro "Bug reports") | [<img src="https://avatars3.githubusercontent.com/u/14539?v=4" width="100px;"/><br /><sub><b>Peter Blazejewicz</b></sub>](http://www.linkedin.com/in/peterblazejewicz)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=peterblazejewicz "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/1642?v=4" width="100px;"/><br /><sub><b>Solomon White</b></sub>](https://github.com/rubysolo)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=rubysolo "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/8838006?v=4" width="100px;"/><br /><sub><b>Levi Rocha</b></sub>](https://github.com/pino)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=pino "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/41281835?v=4" width="100px;"/><br /><sub><b>Sudachi-kun</b></sub>](http://cloudnative.co.jp)<br />[💵](#financial-loadbalance-sudachi-kun "Financial") |
| [<img src="https://avatars1.githubusercontent.com/u/14838850?v=4" width="100px;"/><br /><sub><b>Sosuke Suzuki</b></sub>](http://sosukesuzuki.github.io)<br />[💻](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=sosukesuzuki "Code") | [<img src="https://avatars0.githubusercontent.com/u/74433?v=4" width="100px;"/><br /><sub><b>Tom Rathbone</b></sub>](https://github.com/chillitom)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=chillitom "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/4654382?v=4" width="100px;"/><br /><sub><b>Arshad Kazmi</b></sub>](https://arshadkazmi42.github.io/)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=arshadkazmi42 "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/8815362?v=4" width="100px;"/><br /><sub><b>JeongUkJae</b></sub>](https://jeongukjae.github.io)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=JeongUkJae "Documentation") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

---

MIT License

Copyright (c) 2017 Piotr Witek <piotrek.witek@gmail.com> (<https://piotrwitek.github.io>)
