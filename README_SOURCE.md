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

> Sponsors are listed in the contributors section at the bottom. If you want to be removed please contact me at: piotrek.witek@gmail.com

[![issuehunt-image](https://github.com/BoostIO/issuehunt-materials/blob/master/issuehunt-badge@1x.png?raw=true)](https://issuehunt.io/repos/76996763)

---

## Table of Contents
- [Type Definitions & Complementary Libraries](#type-definitions--complementary-libraries)
- [React Types Cheatsheet](#react-types-cheatsheet) 🌟 __NEW__
- [Component Typing Patterns](#component-typing-patterns)
  - [Stateless Components - SFC](#stateless-components---sfc)
  - [Stateful Components - Class](#stateful-components---class) 📝 __UPDATED__
  - [Generic Components](#generic-components)
  - [Render Props](#render-props) 🌟 __NEW__
  - [Higher-Order Components](#higher-order-components) 📝 __UPDATED__
  - [Redux Connected Components](#redux-connected-components)
  - [Hooks](#hooks)
- [Redux](#redux)
  - [Action Creators](#action-creators) 📝 __UPDATED__
  - [Reducers](#reducers) 📝 __UPDATED__
    - [State with Type-level Immutability](#state-with-type-level-immutability)
    - [Typing reducer](#typing-reducer)
    - [Testing reducer](#testing-reducer)
  - [Store Configuration](#store-configuration) 📝 __UPDATED__
  - [Async Flow](#async-flow) 📝 __UPDATED__
  - [Selectors](#selectors)
  - [Typing connect](#typing-connect) 🌟 __NEW__
- [Tools](#tools)
  - [TSLint](#tslint)
  - [Jest](#jest)
  - [Enzyme](#enzyme)
  - [Living Style Guide](#living-style-guide) 🌟 __NEW__
  - [Common Npm Scripts](#common-npm-scripts)
- [Recipes](#recipes)
  - [Baseline tsconfig.json](#baseline-tsconfigjson)
  - [Default and Named Module Exports](#default-and-named-module-exports)
  - [Type Augmentation for npm libraries](#type-augmentation-for-npm-libraries)
  - [Override type-definitions for npm libraries](#override-type-definitions-for-npm-libraries)
- [FAQ](#faq)
- [Tutorials](#tutorials)
- [Contributors](#contributors)

---

# Type Definitions & Complementary Libraries

### Type Definitions for React & Redux
```
npm i -D @types/react @types/react-dom @types/react-redux
```

"react" - `@types/react`  
"react-dom" - `@types/react-dom`  
"redux" - (types included with npm package)*  
"react-redux" - `@types/react-redux`  

> *NB: Guide is based on types from Redux v4.x.x (Beta). To make it work with Redux v3.x.x please refer to [this config](https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/playground/tsconfig.json#L5))  

### Complementary Libraries
> Utility libraries **with focus on type-safety** providing a light functional abstractions for common use-cases

- ["utility-types"](https://github.com/piotrwitek/utility-types) - Utility Types for TypeScript (think lodash for types, moreover provides migration from Flow's Utility Types)  
- ["typesafe-actions"](https://github.com/piotrwitek/typesafe-actions) - Typesafe Action Creators for Redux / Flux Architectures (in TypeScript)  

[⇧ back to top](#table-of-contents)

---

# React Types Cheatsheet

#### `React.StatelessComponent<P>` or `React.SFC<P>`
Type representing stateless functional component
```tsx
const MyComponent: React.SFC<MyComponentProps> = ...
```
[⇧ back to top](#table-of-contents)

#### `React.Component<P, S>`
Type representing stateful class component
```tsx
class MyComponent extends React.Component<MyComponentProps, State> { ...
```
[⇧ back to top](#table-of-contents)

#### `React.ComponentType<P>`
Type representing union type of (SFC | Component)
```tsx
const withState = <P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P>,
) => { ...
```
[⇧ back to top](#table-of-contents)

#### `React.ReactElement<P>` or `JSX.Element`
Type representing a concept of React Element - representation of a native DOM component (e.g. `<div />`), or a user-defined composite component (e.g. `<MyComponent />`)
```tsx
const elementOnly: React.ReactElement = <div /> || <MyComponent />;
```
[⇧ back to top](#table-of-contents)

#### `React.ReactNode`
Type representing any possible type of React node (basically ReactElement (including Fragments and Portals) + primitive JS types)
```tsx
const elementOrPrimitive: React.ReactNode = 'string' || 0 || false || null || undefined || <div /> || <MyComponent />;
const Component = ({ children: React.ReactNode }) => ...
```
[⇧ back to top](#table-of-contents)

#### `React.CSSProperties`
Type representing style object in JSX (usefull for css-in-js styles)
```tsx
const styles: React.CSSProperties = { flexDirection: 'row', ...
const element = <div style={styles} ...
```
[⇧ back to top](#table-of-contents)

#### `React.ReactEventHandler<E>`
Type representing generic event handler
```tsx
const handleChange: React.ReactEventHandler<HTMLInputElement> = (ev) => { ... } 

<input onChange={handleChange} ... />
```
[⇧ back to top](#table-of-contents)

#### `React.MouseEvent<E>` | `React.KeyboardEvent<E>` | `React.TouchEvent<E>` etc...
Type representing more specific event handler
```tsx
const handleChange = (ev: React.MouseEvent<HTMLDivElement>) => { ... }

<div onMouseMove={handleChange} ... />
```
[⇧ back to top](#table-of-contents)

---

# Component Typing Patterns

## Stateless Components - SFC

#### - stateless counter

::example='/playground/src/components/sfc-counter.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#sfccounter)

[⇧ back to top](#table-of-contents)

#### - spread attributes [link](https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes)

::example='/playground/src/components/sfc-spread-attributes.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#sfcspreadattributes)

[⇧ back to top](#table-of-contents)

---

## Stateful Components - Class

#### - stateful counter

::example='/playground/src/components/stateful-counter.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#statefulcounter)

[⇧ back to top](#table-of-contents)

#### - with default props

::example='/playground/src/components/stateful-counter-with-default.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#statefulcounterwithdefault)

[⇧ back to top](#table-of-contents)

---

## Generic Components
- easily create typed component variations and reuse common logic
- common use case is a generic list components

#### - generic list

::example='/playground/src/components/generic-list.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#genericlist)

[⇧ back to top](#table-of-contents)

---

## Render Props
> https://reactjs.org/docs/render-props.html

#### - name provider
> simple component using children as a render prop

::example='/playground/src/components/name-provider.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#nameprovider)

[⇧ back to top](#table-of-contents)

#### - mouse provider
> `Mouse` component found in [Render Props React Docs](https://reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns)

::example='/playground/src/components/mouse-provider.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#mouseprovider)

[⇧ back to top](#table-of-contents)

---

## Higher-Order Components
> https://reactjs.org/docs/higher-order-components.html

#### - withState
Adds state to a stateless counter

::example='/playground/src/hoc/with-state.tsx'::
::usage='/playground/src/hoc/with-state.usage.tsx'::

[⇧ back to top](#table-of-contents)

#### - withErrorBoundary
Adds error handling using componentDidCatch to any component

::example='/playground/src/hoc/with-error-boundary.tsx'::
::usage='/playground/src/hoc/with-error-boundary.usage.tsx'::

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

::example='/playground/src/connected/sfc-counter-connected.tsx'::
::usage='/playground/src/connected/sfc-counter-connected.usage.tsx'::

[⇧ back to top](#table-of-contents)

#### - redux connected counter (verbose)

::example='/playground/src/connected/sfc-counter-connected-verbose.tsx'::
::usage='/playground/src/connected/sfc-counter-connected-verbose.usage.tsx'::

[⇧ back to top](#table-of-contents)

#### - with own props

::example='/playground/src/connected/sfc-counter-connected-extended.tsx'::
::usage='/playground/src/connected/sfc-counter-connected-extended.usage.tsx'::

[⇧ back to top](#table-of-contents)

## Hooks

> https://reactjs.org/docs/hooks-intro.html

#### - useReducer
Hook for state management like Redux in a function component.

::example='/playground/src/hooks/use-reducer.tsx'::

[⇧ back to top](#table-of-contents)

---

# Redux

## Action Creators

> We'll be using a battle-tested library [![NPM Downloads](https://img.shields.io/npm/dm/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
 that automates and simplify maintenace of **type annotations in Redux Architectures** [`typesafe-actions`](https://github.com/piotrwitek/typesafe-actions#typesafe-actions)

### You should read [The Mighty Tutorial](https://github.com/piotrwitek/typesafe-actions#behold-the-mighty-tutorial) to learn it all the easy way!

A solution below is using a simple factory function to automate the creation of type-safe action creators. The goal is to decrease maintenance effort and reduce code repetition of type annotations for actions and creators. The result is completely typesafe action-creators and their actions.

::example='/playground/src/features/counters/actions.ts'::
::usage='/playground/src/features/counters/actions.usage.ts'::

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

::example='/playground/src/features/todos/reducer.ts'::

[⇧ back to top](#table-of-contents)

### Testing reducer

::example='/playground/src/features/todos/reducer.spec.ts'::

[⇧ back to top](#table-of-contents)

---

## Store Configuration

### Create Global RootState and RootAction Types

#### `RootState` - type representing root state-tree
Can be imported in connected components to provide type-safety to Redux `connect` function

#### `RootAction` - type representing union type of all action objects
Can be imported in various layers receiving or sending redux actions like: reducers, sagas or redux-observables epics

::example='/playground/src/store/types.d.ts'::

[⇧ back to top](#table-of-contents)

### Create Store

When creating a store instance we don't need to provide any additional types. It will set-up a **type-safe Store instance** using type inference.
> The resulting store instance methods like `getState` or `dispatch` will be type checked and will expose all type errors

::example='/playground/src/store/store.ts'::

---

## Async Flow

### "redux-observable"

### For more examples and in-depth explanation you should read [The Mighty Tutorial](https://github.com/piotrwitek/typesafe-actions#behold-the-mighty-tutorial) to learn it all the easy way!

::example='/playground/src/features/todos/epics.ts'::

[⇧ back to top](#table-of-contents)

---

## Selectors

### "reselect"

::example='/playground/src/features/todos/selectors.ts'::

[⇧ back to top](#table-of-contents)

---

## Typing connect

Below snippet can be find in the `playground/` folder, you can checkout the repo and follow all dependencies to understand the bigger picture.
`playground/src/connected/sfc-counter-connected-verbose.tsx`

```tsx
import Types from 'Types';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { countersActions } from '../features/counters';
import { SFCCounter, SFCCounterProps } from '../components';

// `state` parameter needs a type annotation to type-check the correct shape of a state object but also it'll be used by "type inference" to infer the type of returned props
const mapStateToProps = (state: Types.RootState, ownProps: SFCCounterProps) => ({
  count: state.counters.reduxCounter,
});

// `dispatch` parameter needs a type annotation to type-check the correct shape of an action object when using dispatch function
const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) => bindActionCreators({
  onIncrement: countersActions.increment,
  // without using action creators, this will be validated using your RootAction union type
  // onIncrement: () => dispatch({ type: "counters/INCREMENT" }),
}, dispatch);

// NOTE: We don't need to pass generic type arguments to neither connect nor mapping functions because type inference will do all this work automatically. So there's really no reason to increase the noise ratio in your codebase!
export const SFCCounterConnectedVerbose =
  connect(mapStateToProps, mapDispatchToProps)(SFCCounter);
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

```js
{
  "extends": ["tslint:recommended", "tslint-react"],
  "rules": {
    "arrow-parens": false,
    "arrow-return-shorthand": [false],
    "comment-format": [true, "check-space"],
    "import-blacklist": [true, "rxjs"],
    "interface-over-type-literal": false,
    "interface-name": false,
    "max-line-length": [true, 120],
    "member-access": false,
    "member-ordering": [true, { "order": "fields-first" }],
    "newline-before-return": false,
    "no-any": false,
    "no-empty-interface": false,
    "no-import-side-effect": [true],
    "no-inferrable-types": [true, "ignore-params", "ignore-properties"],
    "no-invalid-this": [true, "check-function-in-method"],
    "no-null-keyword": false,
    "no-require-imports": false,
    "no-submodule-imports": [true, "@src", "rxjs"],
    "no-this-assignment": [true, { "allow-destructuring": true }],
    "no-trailing-whitespace": true,
    "object-literal-sort-keys": false,
    "object-literal-shorthand": false,
    "one-variable-per-declaration": [false],
    "only-arrow-functions": [true, "allow-declarations"],
    "ordered-imports": [false],
    "prefer-method-signature": false,
    "prefer-template": [true, "allow-single-concat"],
    "quotemark": [true, "single", "jsx-double"],
    "semicolon": [true, "always"],
    "trailing-comma": [true, {
      "singleline": "never",
      "multiline": {
        "objects": "always",
        "arrays": "always",
        "functions": "never",
        "typeLiterals": "ignore"
      },
      "esSpecCompliant": true
    }],
    "triple-equals": [true, "allow-null-check"],
    "type-literal-delimiter": true,
    "typedef": [true,"parameter", "property-declaration"],
    "variable-name": [true, "ban-keywords", "check-format", "allow-pascal-case", "allow-leading-underscore"],
    // tslint-react
    "jsx-no-lambda": false
  }
}
```

[⇧ back to top](#table-of-contents)

## Jest

> Installation  
`npm i -D jest ts-jest @types/jest`

#### jest.config.json
```json
{
  "verbose": true,
  "transform": {
    ".(ts|tsx)": "./node_modules/ts-jest/preprocessor.js"
  },
  "testRegex": "(/spec/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "moduleFileExtensions": ["ts", "tsx", "js"],
  "moduleNameMapper": {
    "^Components/(.*)": "./src/components/$1"
  },
  "globals": {
    "window": {},
    "ts-jest": {
      "tsConfigFile": "./tsconfig.json"
    }
  },
  "setupFiles": [
    "./jest.stubs.js"
  ],
  "setupTestFrameworkScriptFile": "./jest.tests.js"
}
```

#### jest.stubs.js
```js
// Global/Window object Stubs for Jest
window.requestAnimationFrame = function (callback) {
  setTimeout(callback);
};

window.localStorage = {
  getItem: function () { },
  setItem: function () { },
};

Object.values = () => [];
```

[⇧ back to top](#table-of-contents)

## Enzyme

> Installation  
`npm i -D enzyme enzyme-adapter-react-16 @types/enzyme`

#### jest.tests.js
```js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

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

```js
{
  "compilerOptions": {
    "baseUrl": "./", // enables project relative paths config
    "paths": { // define paths mappings
      "@src/*": ["src/*"] // will enable import aliases -> import { ... } from '@src/components'
      // WARNING: Add this to your webpack config -> resolve: { alias: { '@src': PATH_TO_SRC } }
      // "redux": ["typings/redux"], // use an alternative type-definitions instead of the included one
    },
    "outDir": "dist/", // target for compiled files
    "allowSyntheticDefaultImports": true, // no errors with commonjs modules interop
    "esModuleInterop": true, // enable to do "import React ..." instead of "import * as React ..."
    "allowJs": true, // include js files
    "checkJs": true, // typecheck js files
    "declaration": false, // don't emit declarations
    "emitDecoratorMetadata": true, // only if using decorators
    "experimentalDecorators": true, // only if using decorators
    "forceConsistentCasingInFileNames": true,
    "importHelpers": true, // importing transpilation helpers from tslib
    "noEmitHelpers": true, // disable inline transpilation helpers in each file
    "jsx": "react", // translate JSX
    "lib": [
      "dom",
      "es2016",
      "es2017.object"
    ],
    "target": "es5", // "es2015" for ES6+ engines
    "module": "commonjs", // "es2015" for tree-shaking
    "moduleResolution": "node",
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "strict": true,
    "pretty": true,
    "removeComments": true,
    "sourceMap": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "src/**/*.spec.*"
  ]
}
```

[⇧ back to top](#table-of-contents)

### Default and Named Module Exports
> Most flexible solution is to use module folder pattern, because you can leverage both named and default import when you see fit.  
Using this solution you'll achieve better encapsulation for internal structure/naming refactoring without breaking your consumer code:  
```ts
// 1. in `components/` folder create component file (`select.tsx`) with default export:

// components/select.tsx
const Select: React.SFC<Props> = (props) => {
...
export default Select;

// 2. in `components/` folder create `index.ts` file handling named imports:

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

### Type Augmentation for npm libraries
Strategies to fix issues coming from external type-definitions files (*.d.ts)

#### Augmenting library internal definitions - using relative import resolution
```ts
// added missing autoFocus Prop on Input component in "antd@2.10.0" npm package
declare module '../node_modules/antd/lib/input/Input' {
  export interface InputProps {
    autoFocus?: boolean;
  }
}
```

#### Augmenting library public definitions - using node module import resolution
```ts
// fixed broken public type declaration in "rxjs@5.4.1" npm package
import { Operator } from 'rxjs/Operator';
import { Observable } from 'rxjs/Observable';

declare module 'rxjs/Subject' {
  interface Subject<T> {
    lift<R>(operator: Operator<T, R>): Observable<R>;
  }
}
```

#### To quick-fix missing type-definitions for vendor modules you can "assert" a module type with `any` using [Shorthand Ambient Modules](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Modules.md#shorthand-ambient-modules)

::example='/playground/typings/modules.d.ts'::

> More advanced scenarios for working with vendor type-definitions can be found here [Official TypeScript Docs](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Modules.md#working-with-other-javascript-libraries)

[⇧ back to top](#table-of-contents)

### Override type-definitions for npm libraries
If you want to use an alternative (customized) type-definitions for some npm library (that usually comes with it's own type definitions), you can do it by adding an override in `paths` compiler option.

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

---

# FAQ

### - should I still use React.PropTypes in TS?
> No. With TypeScript, using PropTypes is an unnecessary overhead. When declaring IProps and IState interfaces, you will get complete intellisense and compile-time safety with static type checking. This way you'll be safe from runtime errors and you will save a lot of time on debugging. Additional benefit is an elegant and standardized method of documenting your component external API in the source code.  

[⇧ back to top](#table-of-contents)

### - when to use `interface` declarations and when `type` aliases?
> From practical side, using `interface` declaration will display identity (interface name) in compiler errors, on the contrary `type` aliases will be unwinded to show all the properties and nested types it consists of. This can be a bit noisy when reading compiler errors and I like to leverage this distinction to hide some of not so important type details in errors  
Related `ts-lint` rule: https://palantir.github.io/tslint/rules/interface-over-type-literal/  

[⇧ back to top](#table-of-contents)

### - how to best initialize class instance or static properties?
> Prefered modern style is to use class Property Initializers  
```tsx
class StatefulCounterWithInitialCount extends React.Component<Props, State> {
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
> Prefered modern style is to use Class Fields with arrow functions  
```tsx
class StatefulCounter extends React.Component<Props, State> {
// handlers using Class Fields with arrow functions
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };
  ...
}
```

[⇧ back to top](#table-of-contents)

---

## Tutorials
> Curated list of relevant in-depth tutorials

Higher-Order Components:
- https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb

[⇧ back to top](#table-of-contents)

---


## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/739075?v=4" width="100px;"/><br /><sub><b>Piotrek Witek</b></sub>](https://github.com/piotrwitek)<br />[💻](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=piotrwitek "Code") [📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=piotrwitek "Documentation") [🤔](#ideas-piotrwitek "Ideas, Planning, & Feedback") [👀](#review-piotrwitek "Reviewed Pull Requests") [💡](#example-piotrwitek "Examples") [💬](#question-piotrwitek "Answering Questions") | [<img src="https://avatars3.githubusercontent.com/u/8602615?v=4" width="100px;"/><br /><sub><b>Kazz Yokomizo</b></sub>](https://github.com/kazup01)<br />[💵](#financial-kazup01 "Financial") [🔍](#fundingFinding-kazup01 "Funding Finding") | [<img src="https://avatars1.githubusercontent.com/u/366438?v=4" width="100px;"/><br /><sub><b>Jake Boone</b></sub>](https://github.com/jakeboone02)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=jakeboone02 "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/9748762?v=4" width="100px;"/><br /><sub><b>Amit Dahan</b></sub>](https://github.com/amitdahan)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=amitdahan "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/98167?v=4" width="100px;"/><br /><sub><b>gulderov</b></sub>](https://github.com/gulderov)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=gulderov "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/1964212?v=4" width="100px;"/><br /><sub><b>Erik Pearson</b></sub>](https://github.com/emp823)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=emp823 "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/5342677?v=4" width="100px;"/><br /><sub><b>Bryan Mason</b></sub>](https://github.com/flymason)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=flymason "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/119451?v=4" width="100px;"/><br /><sub><b>Jakub Chodorowicz</b></sub>](http://www.jakub.chodorowicz.pl/)<br />[💡](#example-chodorowicz "Examples") | [<img src="https://avatars1.githubusercontent.com/u/7266431?v=4" width="100px;"/><br /><sub><b>Oleg Maslov</b></sub>](https://github.com/mleg)<br />[🐛](https://github.com/piotrwitek/react-redux-typescript-guide/issues?q=author%3Amleg "Bug reports") | [<img src="https://avatars0.githubusercontent.com/u/3393293?v=4" width="100px;"/><br /><sub><b>Aaron Westbrook</b></sub>](https://github.com/awestbro)<br />[🐛](https://github.com/piotrwitek/react-redux-typescript-guide/issues?q=author%3Aawestbro "Bug reports") | [<img src="https://avatars3.githubusercontent.com/u/14539?v=4" width="100px;"/><br /><sub><b>Peter Blazejewicz</b></sub>](http://www.linkedin.com/in/peterblazejewicz)<br />[💡](#example-peterblazejewicz "Examples") | [<img src="https://avatars3.githubusercontent.com/u/1642?v=4" width="100px;"/><br /><sub><b>Solomon White</b></sub>](https://github.com/rubysolo)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=rubysolo "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/8838006?v=4" width="100px;"/><br /><sub><b>Levi Rocha</b></sub>](https://github.com/pino)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=pino "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/41281835?v=4" width="100px;"/><br /><sub><b>Sudachi-kun</b></sub>](http://cloudnative.co.jp)<br />[💵](#financial-loadbalance-sudachi-kun "Financial") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

---

MIT License

Copyright (c) 2017 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
