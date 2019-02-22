## React & Redux in TypeScript - Static Typing Guide

_"This guide is a **living compendium** documenting the most important patterns and recipes on how to use **React** (and its Ecosystem) in a **functional style** using **TypeScript**. It will help you make your code **completely type-safe** while focusing on **inferring the types from implementation** so there is less noise coming from excessive type annotations and it's easier to write and maintain correct types in the long run."_

[![Join the chat at https://gitter.im/react-redux-typescript-guide/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/react-redux-typescript-guide/Lobby)  
> #### _Found it useful? Want more updates?_ [**Show your support by giving a :star:**](https://github.com/piotrwitek/react-redux-typescript-guide/stargazers)  

:tada: _Now updated to be compatible with **TypeScript v3.1.6**_ :tada:  

:computer: _Reference implementation of Todo-App with `typesafe-actions`: https://codesandbox.io/s/github/piotrwitek/typesafe-actions-todo-app_ :computer:  

### Goals
- Complete type safety (with [`--strict`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) flag) without losing type information downstream through all the layers of our application (e.g. no type assertions or hacking with `any` type)
- Make type annotations concise by eliminating redundancy in types using advanced TypeScript Language features like **Type Inference** and **Control flow analysis**
- Reduce repetition and complexity of types with TypeScript focused [complementary libraries](#complementary-libraries)

### Complementary Libraries
- [utility-types](https://github.com/piotrwitek/utility-types) - Collection of generic types for TypeScript, complementing built-in mapped types and aliases - think lodash for reusable types.  
- [typesafe-actions](https://github.com/piotrwitek/typesafe-actions) - Typesafe utilities for "action-creators" in Redux / Flux Architecture  

### Playground Project
[![Build Status](https://semaphoreci.com/api/v1/piotrekwitek/react-redux-typescript-guide/branches/master/shields_badge.svg)](https://semaphoreci.com/piotrekwitek/react-redux-typescript-guide)

You should check out Playground Project located in the `/playground` folder. It is a source of all the code examples found in the guide. They are all tested with the most recent version of TypeScript and 3rd party type-definitions (like `@types/react` or `@types/react-redux`) to ensure the examples are up-to-date and not broken with updated definitions.
> Playground was created in such a way that you can simply clone the repository locally and immediately play around on your own. It will help you to learn all the examples from this guide in a real project environment without the need to create some complicated environment setup by yourself.

## Contributing Guide
We are open for contributions. If you're planning to contribute please make sure to read the contributing guide: [CONTRIBUTING.md](/CONTRIBUTING.md)

## Sponsor
This is an independent open-source project created by people investing their free time for the benefit of our community.

If you are using it please consider donating as this will guarantee the project will be updated and maintained in the long run.

Issues can be funded by anyone and the money will be transparently distributed to the contributors handling a particular issue.

[![Let's fund issues in this repository](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/76996763)

---

## Table of Contents
- [Introduction](#introduction)
- [React - Type-Definitions Cheatsheet](#react---type-definitions-cheatsheet)
- [React - Typing Patterns](#react---typing-patterns)
  - [Function Components - FC](#function-components---fc)
  - [Class Components ](#class-components)
  - [Generic Components](#generic-components)
  - [Render Props](#render-props)
  - [Higher-Order Components](#higher-order-components)
  - [Redux Connected Components](#redux-connected-components)
  - [Context](#context) 🌟 __NEW__
  - [Hooks](#hooks) 🌟 __NEW__
- [Redux - Typing Patterns](#redux---typing-patterns)
  - [Store Configuration](#store-configuration)
  - [Action Creators](#action-creators)
  - [Reducers](#reducers)
    - [State with Type-level Immutability](#state-with-type-level-immutability)
    - [Typing reducer](#typing-reducer)
    - [Testing reducer](#testing-reducer)
  - [Async Flow with `redux-observable`](#async-flow-with-redux-observable)
    - [Typing Epics](#typing-epics)
    - [Testing Epics](#testing-epics) 🌟 __NEW__
  - [Selectors](#selectors)
  - [Typing connect](#typing-connect)
- [Tools](#tools)
  - [TSLint](#tslint)
  - [Jest](#jest)
  - [Living Style Guide](#living-style-guide)
  - [Common Npm Scripts](#common-npm-scripts)
- [Recipes](#recipes)
  - [Baseline tsconfig.json](#baseline-tsconfigjson)
  - [General Tips](#general-tips)
  - [Ambient Modules Tips](#ambient-modules-tips)
  - [Type-Definitions Tips](#type-definitions-tips)
  - [Type Augmentation Tips](#type-augmentation-tips)
- [Tutorials & Articles](#tutorials--articles)
- [Contributors](#contributors)

---

# Introduction

### Type-Definitions for React & Redux
```
npm i -D @types/react @types/react-dom @types/react-redux
```

"react" - `@types/react`  
"react-dom" - `@types/react-dom`  
"redux" - (types included with npm package)*  
"react-redux" - `@types/react-redux`  

> *NB: Guide is based on types for Redux >= v4.x.x. To make it work with Redux v3.x.x please refer to [this config](https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/playground/tsconfig.json#L5))  

[⇧ back to top](#table-of-contents)

---

# React - Type-Definitions Cheatsheet

#### `React.FunctionComponent<P>` or `React.FC<P>`
Type representing a functional component
```tsx
const MyComponent: React.FC<Props> = ...
```

#### `React.Component<P, S>`
Type representing a class component
```tsx
class MyComponent extends React.Component<Props, State> { ...
```

#### `React.ComponentProps<typeof Component>`
Gets type of Component Props, so you don't need to export Props from your component ever! (Works for both FC and Class components)
```tsx
type MyComponentProps = React.ComponentProps<typeof MyComponent>;
```

#### `React.ComponentType<P>`
Type representing union type of (React.FC | React.Component)
```tsx
const withState = <P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P>,
) => { ...
```

#### `React.ReactElement<P>` or `JSX.Element`
Type representing a concept of React Element - representation of a native DOM component (e.g. `<div />`), or a user-defined composite component (e.g. `<MyComponent />`)
```tsx
const elementOnly: React.ReactElement = <div /> || <MyComponent />;
```

#### `React.ReactNode`
Type representing any possible type of React node (basically ReactElement (including Fragments and Portals) + primitive JS types)
```tsx
const elementOrPrimitive: React.ReactNode = 'string' || 0 || false || null || undefined || <div /> || <MyComponent />;
const Component = ({ children: React.ReactNode }) => ...
```

#### `React.CSSProperties`
Type representing style object in JSX (usefull for css-in-js styles)
```tsx
const styles: React.CSSProperties = { flexDirection: 'row', ...
const element = <div style={styles} ...
```

#### `React.ReactEventHandler<E>`
Type representing generic event handler
```tsx
const handleChange: React.ReactEventHandler<HTMLInputElement> = (ev) => { ... } 

<input onChange={handleChange} ... />
```

#### `React.MouseEvent<E>` | `React.KeyboardEvent<E>` | `React.TouchEvent<E>` etc...
Type representing more specific event handler
```tsx
const handleChange = (ev: React.MouseEvent<HTMLDivElement>) => { ... }

<div onMouseMove={handleChange} ... />
```

[⇧ back to top](#table-of-contents)

---

# React - Typing Patterns

## Function Components - FC

#### - FC counter

::codeblock='playground/src/components/fc-counter.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#fccounter)

[⇧ back to top](#table-of-contents)

#### - spread attributes [link](https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes)

::codeblock='playground/src/components/fc-spread-attributes.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#fcspreadattributes)

[⇧ back to top](#table-of-contents)

---

## Class Components

#### - class counter

::codeblock='playground/src/components/class-counter.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#classcounter)

[⇧ back to top](#table-of-contents)

#### - with default props

::codeblock='playground/src/components/class-counter-with-default-props.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#classcounterwithdefaultprops)

[⇧ back to top](#table-of-contents)

---

## Generic Components
- easily create typed component variations and reuse common logic
- common use case is a generic list components

#### - generic list

::codeblock='playground/src/components/generic-list.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#genericlist)

[⇧ back to top](#table-of-contents)

---

## Render Props
> https://reactjs.org/docs/render-props.html

#### - name provider
> simple component using children as a render prop

::codeblock='playground/src/components/name-provider.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#nameprovider)

[⇧ back to top](#table-of-contents)

#### - mouse provider
> `Mouse` component found in [Render Props React Docs](https://reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns)

::codeblock='playground/src/components/mouse-provider.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#mouseprovider)

[⇧ back to top](#table-of-contents)

---

## Higher-Order Components
> https://reactjs.org/docs/higher-order-components.html

#### - withState
Adds state to a stateless counter

::codeblock='playground/src/hoc/with-state.tsx'::
::expander='playground/src/hoc/with-state.usage.tsx'::

[⇧ back to top](#table-of-contents)

#### - withErrorBoundary
Adds error handling using componentDidCatch to any component

::codeblock='playground/src/hoc/with-error-boundary.tsx'::
::expander='playground/src/hoc/with-error-boundary.usage.tsx'::

[⇧ back to top](#table-of-contents)

---

## Redux Connected Components

### Caveat with `bindActionCreators`
**If you try to use `connect` or `bindActionCreators` explicitly and want to type your component callback props as `() => void` this will raise compiler errors. It happens because `bindActionCreators` typings will not map the return type of action creators to `void`, due to a current TypeScript limitations.**

A decent alternative I can recommend is to use `() => any` type, it will work just fine in all possible scenarios and should not cause any typing problems whatsoever. All the code examples in the Guide with `connect` are also using this pattern.

> If there is any progress or fix in regard to the above caveat I'll update the guide and make an announcement on my twitter/medium (There are a few existing proposals already).

> There is alternative way to retain type soundness but it requires an explicit wrapping with `dispatch` and will be very tedious for the long run. See example below:
```ts
const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  onIncrement: () => dispatch(actions.increment()),
});
```

#### - redux connected counter

::codeblock='playground/src/connected/fc-counter-connected.tsx'::
::expander='playground/src/connected/fc-counter-connected.usage.tsx'::

[⇧ back to top](#table-of-contents)

#### - redux connected counter (verbose)

::codeblock='playground/src/connected/fc-counter-connected-verbose.tsx'::
::expander='playground/src/connected/fc-counter-connected-verbose.usage.tsx'::

[⇧ back to top](#table-of-contents)

#### - with own props

::codeblock='playground/src/connected/fc-counter-connected-extended.tsx'::
::expander='playground/src/connected/fc-counter-connected-extended.usage.tsx'::

[⇧ back to top](#table-of-contents)

## Context

> https://reactjs.org/docs/context.html

#### ThemeContext

::codeblock='playground/src/context/theme-context.ts'::

[⇧ back to top](#table-of-contents)

#### ThemeProvider

::codeblock='playground/src/context/theme-provider.tsx'::

[⇧ back to top](#table-of-contents)

#### ThemeConsumer

::codeblock='playground/src/context/theme-consumer.tsx'::

#### ThemeConsumer in class component

::codeblock='playground/src/context/theme-consumer-class.tsx'::

[Implementation with Hooks](#--usecontext)

[⇧ back to top](#table-of-contents)

## Hooks

> https://reactjs.org/docs/hooks-intro.html

#### - useState

> https://reactjs.org/docs/hooks-reference.html#usestate

::codeblock='playground/src/hooks/use-state.tsx'::

[⇧ back to top](#table-of-contents)

#### - useReducer
Hook for state management like Redux in a function component.

::codeblock='playground/src/hooks/use-reducer.tsx'::

[⇧ back to top](#table-of-contents)

#### - useContext

> https://reactjs.org/docs/hooks-reference.html#usecontext

::codeblock='playground/src/hooks/use-theme-context.tsx'::

[⇧ back to top](#table-of-contents)

---

# Redux - Typing Patterns

## Store Configuration

### Create Global RootState and RootAction Types

#### `RootState` - type representing root state-tree
Can be imported in connected components to provide type-safety to Redux `connect` function

#### `RootAction` - type representing union type of all action objects
Can be imported in various layers receiving or sending redux actions like: reducers, sagas or redux-observables epics

::codeblock='playground/src/store/types.d.ts'::

[⇧ back to top](#table-of-contents)

### Create Store

When creating a store instance we don't need to provide any additional types. It will set-up a **type-safe Store instance** using type inference.
> The resulting store instance methods like `getState` or `dispatch` will be type checked and will expose all type errors

::codeblock='playground/src/store/index.ts'::

---

## Action Creators

> We'll be using a battle-tested library [![NPM Downloads](https://img.shields.io/npm/dm/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
 that automates and simplify maintenace of **type annotations in Redux Architectures** [`typesafe-actions`](https://github.com/piotrwitek/typesafe-actions#typesafe-actions)

### For more examples and in-depth tutorial you should check [The Mighty Tutorial](https://github.com/piotrwitek/typesafe-actions#behold-the-mighty-tutorial)!

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

#### Caveat: Readonly is not recursive
This means that the `readonly` modifier doesn't propagate immutability down the nested structure of objects. You'll need to mark each property on each level explicitly.

To fix this we can use [`DeepReadonly`](https://github.com/piotrwitek/utility-types#deepreadonlyt) type (available in `utility-types` npm library - collection of reusable types extending the collection of **standard-lib** in TypeScript.

Check the example below:
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

#### Best-practices for nested immutability
> use `Readonly` or `ReadonlyArray` [Mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

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

[⇧ back to top](#table-of-contents)

### Typing reducer

> to understand following section make sure to learn about [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html), [Control flow analysis](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#control-flow-based-type-analysis) and [Tagged union types](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#tagged-union-types)

::codeblock='playground/src/features/todos/reducer.ts'::

[⇧ back to top](#table-of-contents)

### Testing reducer

::codeblock='playground/src/features/todos/reducer.spec.ts'::

[⇧ back to top](#table-of-contents)

---

## Async Flow with `redux-observable`

### For more examples and in-depth tutorial you should check [The Mighty Tutorial](https://github.com/piotrwitek/typesafe-actions#behold-the-mighty-tutorial)!

### Typing epics

::codeblock='playground/src/features/todos/epics.ts'::

[⇧ back to top](#table-of-contents)

### Testing epics

::codeblock='playground/src/features/todos/epics.spec.ts'::

[⇧ back to top](#table-of-contents)

---

## Selectors

### "reselect"

::codeblock='playground/src/features/todos/selectors.ts'::

[⇧ back to top](#table-of-contents)

---

## Typing connect

Below snippet can be find in the `playground/` folder, you can checkout the repo and follow all dependencies to understand the bigger picture.
`playground/src/connected/fc-counter-connected-verbose.tsx`

```tsx
import Types from 'Types';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { countersActions } from '../features/counters';
import { FCCounter } from '../components';

// `state` parameter needs a type annotation to type-check the correct shape of a state object but also it'll be used by "type inference" to infer the type of returned props
const mapStateToProps = (state: Types.RootState, ownProps: FCCounterProps) => ({
  count: state.counters.reduxCounter,
});

// `dispatch` parameter needs a type annotation to type-check the correct shape of an action object when using dispatch function
const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) => bindActionCreators({
  onIncrement: countersActions.increment,
  // without using action creators, this will be validated using your RootAction union type
  // onIncrement: () => dispatch({ type: "counters/INCREMENT" }),
}, dispatch);

// NOTE: We don't need to pass generic type arguments to neither connect nor mapping functions because type inference will do all this work automatically. So there's really no reason to increase the noise ratio in your codebase!
export const FCCounterConnectedVerbose =
  connect(mapStateToProps, mapDispatchToProps)(FCCounter);
```

[⇧ back to top](#table-of-contents)

---

# Tools

## TSLint

> Installation  
`npm i -D tslint`

#### tslint.json
- Recommended setup is to extend build-in preset `tslint:recommended` (use `tslint:all` to enable all rules)  
- Add additional `react` specific rules: `npm i -D tslint-react` https://github.com/palantir/tslint-react  
- Overwritten some defaults for more flexibility  

::expander='playground/tslint.json'::

[⇧ back to top](#table-of-contents)

## Jest

> Installation  
`npm i -D jest ts-jest @types/jest`

#### jest.config.json
::expander='playground/jest.config.json'::

#### jest.stubs.js
::expander='playground/jest.stubs.js'::

[⇧ back to top](#table-of-contents)

## Living Style Guide
### ["react-styleguidist"](https://github.com/styleguidist/react-styleguidist)

[⟩⟩⟩ styleguide.config.js](/playground/styleguide.config.js)  

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/)

[⇧ back to top](#table-of-contents)

## Common Npm Scripts
> Common TS-related npm scripts shared across projects
```
"lint": "tslint -p ./",
"tsc": "tsc -p ./ --noEmit",
"tsc:watch": "tsc -p ./ --noEmit -w",
"pretest": "npm run lint & npm run tsc",
"test": "jest --config jest.config.json",
"test:watch": "jest --config jest.config.json --watch",
"test:update": "jest --config jest.config.json -u",
```

[⇧ back to top](#table-of-contents)

---

# Recipes

### Baseline tsconfig.json

- Recommended baseline config carefully optimized for strict type-checking and optimal webpack workflow  
- Install [`tslib`](https://www.npmjs.com/package/tslib) to cut on bundle size, by using external runtime helpers instead of adding them inline: `npm i tslib`  
- Example "paths" setup for baseUrl relative imports with Webpack  

::expander='playground/tsconfig.json'::

[⇧ back to top](#table-of-contents)

### General Tips

#### - should I still use React.PropTypes in TS?
No. With TypeScript, using PropTypes is an unnecessary overhead. When declaring Props and State interfaces, you will get complete intellisense and design-time safety with static type checking. This way you'll be safe from runtime errors and you will save a lot of time on debugging. Additional benefit is an elegant and standardized method of documenting your component public API in the source code.  

[⇧ back to top](#table-of-contents)

#### - when to use `interface` declarations and when `type` aliases?
From practical side, using `interface` declaration will create an identity (interface name) in compiler errors, on the contrary `type` aliases doesn't create an identity and will be unwinded to show all the properties and nested types it consists of.  
Although I prefer to use `type` most of the time there are some places this can become too noisy when reading compiler errors and that's why I like to leverage this distinction to hide some of not so important type details in errors using interfaces identity.
Related `ts-lint` rule: https://palantir.github.io/tslint/rules/interface-over-type-literal/  

[⇧ back to top](#table-of-contents)

#### - what's better default or named exports?
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

#### - how to best initialize class instance or static properties?
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

#### - how to best declare component handler functions?
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

### Ambient Modules Tips

#### Imports in ambient modules
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

When creating 3rd party type-definitions all the imports should be kept inside the module decleration, otherwise it will be treated as augmentation and show error

```ts
declare module "react-custom-scrollbars" {
    import * as React from "react";
    export interface positionValues {
    ...
```

[⇧ back to top](#table-of-contents)

### Type-Definitions Tips

#### Missing type-definitions error
if you cannot find types for a third-party module you can provide your own types or disable type-checking for this module using [Shorthand Ambient Modules](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Modules.md#shorthand-ambient-modules)

::codeblock='playground/typings/modules.d.ts'::

#### Using custom `d.ts` files for npm modules
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

### Type Augmentation Tips
Strategies to fix issues coming from external type-definitions files (*.d.ts)

#### Augmenting library internal declarations - using relative import

```ts
// added missing autoFocus Prop on Input component in "antd@2.10.0" npm package
declare module '../node_modules/antd/lib/input/Input' {
  export interface InputProps {
    autoFocus?: boolean;
  }
}
```

#### Augmenting library public declarations - using node_modules import

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

---

## Tutorials & Articles
> Curated list of relevant in-depth tutorials

Higher-Order Components:
- https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb

[⇧ back to top](#table-of-contents)

---


## Contributors

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

Copyright (c) 2017 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
