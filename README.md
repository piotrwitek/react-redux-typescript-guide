# React & Redux in TypeScript - Static Typing Guide
This guide is **NOT** about _"How to write type declarations for every possible variable and expression to have 100% type covered code and waste a lot of time"_.  
This guide is about **_"How to write type declarations to only the minimum necessary amount of JavaScript code and still get all the benefits of Static Typing"_**.

> found it usefull, want some more? [give it a :star:](https://github.com/piotrwitek/react-redux-typescript-patterns/stargazers)  

#### Announcements
- All the examples ported to TypeScript v2.5 and using recent type definitions for `react` & `redux`  [TypeScript Changelog](https://github.com/Microsoft/TypeScript/wiki/Roadmap)  
- create more strict type definitions for redux  
- extend HOC section with more advanced examples [#5](/issues/5)  
- investigate typing patterns for component children [#7](/issues/7)  

### Introduction
This guide is aimed to use [`--strict`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) flag of TypeScript compiler to provide the best static-typing experience.  

Benefits of this setup and static-typing in general include:
- when making changes in your code, precise insight of the impact on the entire codebase (by showing all the references in the codebase for any given piece of code)  
- when implementing new features compiler validate all props passed to components or injected by connect from redux store, validation of action creator params, payload objects structure and state/action objects passed to a reducer - showing all possible JavaScript errors)  

Additionally static-typing will make processes of improving your codebase and refactoring much easier and give you a confidence that you will not break your production code.

### Playground
Code examples are generated from the source code in `playground` folder. They are tested with TypeScript compiler with the most recent version of TypeScript and relevant type definitions (like `@types/react` or `@types/react-redux`) to ensure they are still working with recent definitions.
Moreover playground is created is such way, that you can easily clone repository, install `npm` dependencies and play around with all the examples from this guide in real project environment without any extra setup.

### Goals
- Complete type safety with strict null checking, without failing to `any` type
- Minimize amount of manually writing type declarations by leveraging [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)
- Reduce redux boilerplate code with [simple utility functions](https://github.com/piotrwitek/react-redux-typescript) using [Generics](https://www.typescriptlang.org/docs/handbook/generics.html) and [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) features

---

### Table of Contents
- [React](#react)
  - [Stateless Components - SFC](#stateless-components---sfc)
  - [Stateful Components - Class](#stateful-components---class)
  - [Generic Components](#generic-components)
  - [Connected Components](#connected-components)
  - [Higher-Order Components](#higher-order-components)
- [Redux](#redux)
  - [Actions](#actions)
  - [Reducers](#reducers)
  - [Store types](#store-types)
  - [Create Store](#create-store)
- [Ecosystem](#ecosystem)
  - [Async Flow with "redux-observable"](#async-flow-with-redux-observable)
  - [Selectors with "reselect"](#selectors-with-reselect)
  - Forms with "formstate" WIP
  - Styles with "typestyle" WIP
- [Extras](#extras)
  - [tsconfig.json](#tsconfigjson)
  - [tslint.json](#tslintjson)
  - [Default and Named Module Exports](#default-and-named-module-exports)
  - [Fixing Vendor Type Issues](#fixing-vendor-type-issues)
- [FAQ](#faq)
- [Project Examples](#project-examples)

---

# React

## Stateless Components - SFC
- convenient alias: `React.SFC<Props> === React.StatelessComponent<Props>`

### stateless counter example

```tsx
import * as React from 'react';

export interface SFCCounterProps {
  label: string,
  count: number,
  onIncrement: () => any,
}

export const SFCCounter: React.SFC<SFCCounterProps> = (props) => {
  const { label, count, onIncrement } = props;

  const handleIncrement = () => { onIncrement(); };

  return (
    <div>
      {label}: {count}
      <button type="button" onClick={handleIncrement}>
        {`Increment`}
      </button>
    </div>
  );
};

```

<details><summary>SHOW USAGE</summary><p>

```tsx
import * as React from 'react';

import { SFCCounter } from '@src/components';

let count = 0;
const incrementCount = () => count++;

export default () => (
  <SFCCounter
    label={'SFCCounter'}
    count={count}
    onIncrement={incrementCount}
  />
);

```
</p></details>

---

### [spread attributes](https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes) example

```tsx
import * as React from 'react';

export interface SFCSpreadAttributesProps {
  className?: string,
  style?: React.CSSProperties,
}

export const SFCSpreadAttributes: React.SFC<SFCSpreadAttributesProps> = (props) => {
  const { children, ...restProps } = props;

  return (
    <div {...restProps}>
      {children}
    </div>
  );
};

```

<details><summary>SHOW USAGE</summary><p>

```tsx
import * as React from 'react';

import { SFCSpreadAttributes } from '@src/components';

export default () => (
  <SFCSpreadAttributes
    style={{ backgroundColor: 'lightcyan' }}
  />
);

```
</p></details>

---

## Stateful Components - Class

### stateful counter example

```tsx
import * as React from 'react';

export interface StatefulCounterProps {
  label: string,
}

type State = {
  count: number,
};

export class StatefulCounter extends React.Component<StatefulCounterProps, State> {
  state: State = {
    count: 0,
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    const { handleIncrement } = this;
    const { label } = this.props;
    const { count } = this.state;

    return (
      <div>
        {label}: {count}
        <button type="button" onClick={handleIncrement}>
          {`Increment`}
        </button>
      </div>
    );
  }
}

```

<details><summary>SHOW USAGE</summary><p>

```tsx
import * as React from 'react';

import { StatefulCounter } from '@src/components';

export default () => (
  <StatefulCounter
    label={'StatefulCounter'}
  />
);

```
</p></details>

---

### stateful counter with default props example

```tsx
import * as React from 'react';

export interface StatefulCounterWithInitialCountProps {
  label: string,
  initialCount?: number,
}

interface DefaultProps {
  initialCount: number,
}

type PropsWithDefaults = StatefulCounterWithInitialCountProps & DefaultProps;

interface State {
  count: number,
}

export const StatefulCounterWithInitialCount: React.ComponentClass<StatefulCounterWithInitialCountProps> =
  class extends React.Component<PropsWithDefaults, State> {
    // to make defaultProps strictly typed we need to explicitly declare their type
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
    static defaultProps: DefaultProps = {
      initialCount: 0,
    };

    state: State = {
      count: this.props.initialCount,
    };

    componentWillReceiveProps({ initialCount }: PropsWithDefaults) {
      if (initialCount != null && initialCount !== this.props.initialCount) {
        this.setState({ count: initialCount });
      }
    }

    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    };

    render() {
      const { handleIncrement } = this;
      const { label } = this.props;
      const { count } = this.state;

      return (
        <div>
          {label}: {count}
          <button type="button" onClick={handleIncrement}>
            {`Increment`}
          </button>
        </div>
      );
    }
  };

```

<details><summary>SHOW USAGE</summary><p>

```tsx
import * as React from 'react';

import { StatefulCounterWithInitialCount } from '@src/components';

export default () => (
  <StatefulCounterWithInitialCount
    label={'StatefulCounter'}
    initialCount={10}
  />
);

```
</p></details>

---

## Generic Components
- easily create typed component variations and reuse common logic
- especially useful to create typed list components

### generic list component example

```tsx
import * as React from 'react';

export interface GenericListProps<T> {
  items: T[],
  itemRenderer: (item: T) => JSX.Element,
}

export class GenericList<T> extends React.Component<GenericListProps<T>, {}> {
  render() {
    const { items, itemRenderer } = this.props;

    return (
      <div>
        {items.map(itemRenderer)}
      </div>
    );
  }
}

```

<details><summary>SHOW USAGE</summary><p>

```tsx
import * as React from 'react';

import { IUser } from '@src/models';
import { GenericList } from '@src/components';

export const UserList = class extends GenericList<IUser> { };

export default ({ users }: { users: IUser[] }) => (
  <UserList
    items={users}
    itemRenderer={(item) => <div key={item.id}>{item.fullName}</div>}
  />
);

```
</p></details>

---

## Connected Components

### connected counter example - concise

```tsx
import { connect } from 'react-redux';

import { RootState } from '@src/redux';
import { actionCreators } from '@src/redux/counters';
import { SFCCounter } from '@src/components';

const mapStateToProps = (state: RootState) => ({
  count: state.counters.sfcCounter,
});

export const SFCCounterConnected = connect(mapStateToProps, {
  onIncrement: actionCreators.incrementSfc,
})(SFCCounter);

```

<details><summary>SHOW USAGE</summary><p>

```tsx
import * as React from 'react';

import { SFCCounterConnected } from '@src/connected';

export default () => (
  <SFCCounterConnected
    label={'SFCCounterConnected'}
  />
);

```
</p></details>

---

### connected counter example - verbose

```tsx
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RootState, Dispatch } from '@src/redux';
import { actionCreators } from '@src/redux/counters';
import { SFCCounter } from '@src/components';

const mapStateToProps = (state: RootState) => ({
  count: state.counters.sfcCounter,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onIncrement: actionCreators.incrementSfc,
}, dispatch);

export const SFCCounterConnectedVerbose =
  connect(mapStateToProps, mapDispatchToProps)(SFCCounter);

```

<details><summary>SHOW USAGE</summary><p>

```tsx
import * as React from 'react';

import { SFCCounterConnectedVerbose } from '@src/connected';

export default () => (
  <SFCCounterConnectedVerbose
    label={'SFCCounterConnectedVerbose'}
  />
);

```
</p></details>

---

### connected counter example - with own props

```tsx
import { connect } from 'react-redux';

import { RootState } from '@src/redux';
import { actionCreators } from '@src/redux/counters';
import { SFCCounter } from '@src/components';

export interface SFCCounterConnectedExtended {
  initialCount: number,
}

const mapStateToProps = (state: RootState, ownProps: SFCCounterConnectedExtended) => ({
  count: state.counters.sfcCounter,
});

export const SFCCounterConnectedExtended = connect(mapStateToProps, {
  onIncrement: actionCreators.incrementSfc,
})(SFCCounter);

```

<details><summary>SHOW USAGE</summary><p>

```tsx
import * as React from 'react';

import { SFCCounterConnectedExtended } from '@src/connected';

export default () => (
  <SFCCounterConnectedExtended
    label={'SFCCounterConnectedExtended'}
    initialCount={10}
  />
);

```
</p></details>

---

## Higher-Order Components
- function that takes a component and returns a new component
- a new component will infer Props interface from wrapped Component extended with Props of HOC
- will filter out props specific to HOC, and the rest will be passed through to wrapped component

### basic hoc: enhance stateless counter with state

```tsx
import * as React from 'react';

import { Omit } from '@src/types/react-redux-typescript';

interface RequiredProps {
  count: number,
  onIncrement: () => any,
}

type Props<T extends RequiredProps> = Omit<T, keyof RequiredProps>;

interface State {
  count: number,
}

export function withState<WrappedComponentProps extends RequiredProps>(
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
) {
  const HOC = class extends React.Component<Props<WrappedComponentProps>, State> {

    state: State = {
      count: 0,
    };

    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    };

    render() {
      const { handleIncrement } = this;
      const { count } = this.state;

      return (
        <WrappedComponent
          count={count}
          onIncrement={handleIncrement}
        />
      );
    }
  };

  return HOC;
}

```

<details><summary>SHOW USAGE</summary><p>

```tsx
import * as React from 'react';

import { withState } from '@src/hoc';
import { SFCCounter } from '@src/components';

const SFCCounterWithState =
  withState(SFCCounter);

export default (
  ({ children }) => (
    <SFCCounterWithState label={'SFCCounterWithState'} />
  )
) as React.SFC<{}>;

```
</p></details>

---

### advanced hoc: add error handling with componentDidCatch to view component

```tsx
import * as React from 'react';

const MISSING_ERROR = 'Error was swallowed during propagation.';

interface Props {
}

interface State {
  error: Error | null | undefined,
}

interface WrappedComponentProps {
  onReset: () => any,
}

export function withErrorBoundary(
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
) {
  const HOC = class extends React.Component<Props, State> {

    state: State = {
      error: undefined,
    };

    componentDidCatch(error: Error | null, info: object) {
      this.setState({ error: error || new Error(MISSING_ERROR) });
      this.logErrorToCloud(error, info);
    }

    logErrorToCloud = (error: Error | null, info: object) => {
      // TODO: send error report to cloud
    }

    handleReset = () => {
      this.setState({ error: undefined });
    }

    render() {
      const { children } = this.props;
      const { error } = this.state;

      if (error) {
        return (
          <WrappedComponent onReset={this.handleReset} />
        );
      }

      return children as any;
    }
  };

  return HOC;
}

```

<details><summary>SHOW USAGE</summary><p>

```tsx
import * as React from 'react';

import { withErrorBoundary } from '@src/hoc';
import { ErrorMessage } from '@src/components';

const ErrorMessageWithErrorBoundary =
  withErrorBoundary(ErrorMessage);

export default (
  ({ children }) => (
    <ErrorMessageWithErrorBoundary>
      {children}
    </ErrorMessageWithErrorBoundary>
  )
) as React.SFC<{}>;

```
</p></details>

---

# Redux

## Actions

### KISS Style
This pattern is focused on a KISS principle - to stay clear of complex proprietary abstractions and follow simple and familiar JavaScript const based types:

- classic const based types
- very close to standard JS usage
- standard amount of boilerplate
- need to export action types and action creators to re-use in other places, e.g. `redux-saga` or `redux-observable`

```tsx
export const INCREMENT_SFC = 'INCREMENT_SFC';
export const DECREMENT_SFC = 'DECREMENT_SFC';

export type Actions = {
  INCREMENT_SFC: {
    type: typeof INCREMENT_SFC,
  },
  DECREMENT_SFC: {
    type: typeof DECREMENT_SFC,
  },
};

// Action Creators
export const actionCreators = {
  incrementSfc: (): Actions[typeof INCREMENT_SFC] => ({
    type: INCREMENT_SFC,
  }),
  decrementSfc: (): Actions[typeof DECREMENT_SFC] => ({
    type: DECREMENT_SFC,
  }),
};

```
<details><summary>SHOW USAGE</summary><p>

```tsx
import store from '@src/store';
import { actionCreators } from '@src/redux/counters';

// store.dispatch(actionCreators.incrementSfc(1)); // Error: Expected 0 arguments, but got 1.
store.dispatch(actionCreators.incrementSfc()); // OK => { type: "INCREMENT_SFC" }

```
</p></details>

### DRY Style
A more DRY approach, introducing a simple factory function to automate the creation of typed action creators. The advantage here is that we can reduce boilerplate and code repetition. It is also easier to re-use action creators in other places because of `type` property on action creator containing type constant:

- using factory function to automate creation of typed action creators - (source code to be revealed)
- less boilerplate and code repetition than KISS Style
- action creators have readonly `type` property (this make using `type constants` redundant and easier to re-use in other places e.g. `redux-saga` or `redux-observable`)

```ts
import { createActionCreator } from 'react-redux-typescript';

type Severity = 'info' | 'success' | 'warning' | 'error';

// Action Creators
export const actionCreators = {
  incrementCounter: createActionCreator('INCREMENT_COUNTER'),
  showNotification: createActionCreator(
    'SHOW_NOTIFICATION', (message: string, severity?: Severity) => ({ message, severity }),
  ),
};

// Examples
store.dispatch(actionCreators.incrementCounter(4)); // Error: Expected 0 arguments, but got 1.
store.dispatch(actionCreators.incrementCounter()); // OK: { type: "INCREMENT_COUNTER" }
actionCreators.incrementCounter.type === "INCREMENT_COUNTER" // true

store.dispatch(actionCreators.showNotification()); // Error: Supplied parameters do not match any signature of call target.
store.dispatch(actionCreators.showNotification('Hello!')); // OK: { type: "SHOW_NOTIFICATION", payload: { message: 'Hello!' } }
store.dispatch(actionCreators.showNotification('Hello!', 'info')); // OK: { type: "SHOW_NOTIFICATION", payload: { message: 'Hello!', severity: 'info } }
actionCreators.showNotification.type === "SHOW_NOTIFICATION" // true
```

---

## Reducers
Relevant TypeScript Docs references:  
- [Discriminated Union types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [Mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) e.g. `Readonly` & `Partial`  

### Reducer State
Declare reducer `State` type definition with readonly modifier for `type level` immutability
```ts
export type State = {
  readonly counter: number,
};
```

Readonly modifier allow initialization, but will not allow rassignment highlighting an error
```ts
export const initialState: State = {
  counter: 0,
}; // OK

initialState.counter = 3; // Error, cannot be mutated
```

#### Caveat: Readonly does not provide recursive immutability on objects
> This means that readonly modifier does not propagate immutability on nested properties of objects or arrays of objects. You'll need to set it explicitly on each nested property.

```ts
export type State = {
  readonly counterContainer: {
    readonly readonlyCounter: number,
    mutableCounter: number,
  }
};

state.counterContainer = { mutableCounter: 1 }; // Error, cannot be mutated
state.counterContainer.readonlyCounter = 1; // Error, cannot be mutated

state.counterContainer.mutableCounter = 1; // No error, can be mutated
```

> There are few utilities to help you achieve nested immutability. e.g. you can do it quite easily by using convenient `Readonly` or `ReadonlyArray` mapped types.

```ts
export type State = Readonly<{
  countersCollection: ReadonlyArray<Readonly<{
    readonlyCounter1: number,
    readonlyCounter2: number,
  }>>,
}>;

state.countersCollection[0] = { readonlyCounter1: 1, readonlyCounter2: 1 }; // Error, cannot be mutated
state.countersCollection[0].readonlyCounter1 = 1; // Error, cannot be mutated
state.countersCollection[0].readonlyCounter2 = 1; // Error, cannot be mutated
```

> _There are some experiments in the community to make a `ReadonlyRecursive` mapped type, but I'll need to investigate if they really works_

### Reducer with classic `const types`

```tsx
import { combineReducers } from 'redux';

import { RootAction } from '@src/redux';

import {
  INCREMENT_SFC,
  DECREMENT_SFC,
} from './';

export type State = {
  readonly sfcCounter: number,
};

export const reducer = combineReducers<State, RootAction>({
  sfcCounter: (state = 0, action) => {
    switch (action.type) {
      case INCREMENT_SFC:
        return state + 1;

      case DECREMENT_SFC:
        return state + 1;

      default:
        return state;
    }
  },
});

```

### Reducer with static `type` property from helper factory function - `createActionCreator`
```ts
export const reducer: Reducer<State> =
  (state = 0, action: RootAction) => {
    switch (action.type) {
      case actionCreators.increment.type:
        return state + 1;
        
      case actionCreators.decrement.type:
        return state - 1;

      default: return state;
    }
  };
```

---

## Store Types

- ### `RootAction` - statically typed global action types
- should be imported in layers dealing with redux actions like: reducers, redux-sagas, redux-observables

```tsx
// RootActions
import { RouterAction, LocationChangeAction } from 'react-router-redux';

import { Actions as CountersActions } from '@src/redux/counters';
import { Actions as TodosActions } from '@src/redux/todos';
import { Actions as ToastsActions } from '@src/redux/toasts';

type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | ReactRouterAction
  | CountersActions[keyof CountersActions]
  | TodosActions[keyof TodosActions]
  | ToastsActions[keyof ToastsActions];

```

- ### `RootState` - statically typed global state tree
- should be imported in connected components providing type safety to Redux `connect` function

```tsx
import { combineReducers } from 'redux';
import { routerReducer as router, RouterState } from 'react-router-redux';

import { reducer as counters, State as CountersState } from '@src/redux/counters';
import { reducer as todos, State as TodosState } from '@src/redux/todos';

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
  router: RouterState,
  counters: CountersState,
  todos: TodosState,
}

import { RootAction } from '@src/redux';
export const rootReducer = combineReducers<RootState, RootAction>({
  router,
  counters,
  todos,
});

```

---

## Create Store

- creating store - use `RootState` (in `combineReducers` and when providing preloaded state object) to set-up **state object type guard** to leverage strongly typed Store instance

```tsx
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic, RootState } from '@src/redux';

const composeEnhancers = (
  process.env.NODE_ENV === 'development' &&
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

function configureStore(initialState?: RootState) {
  // configure middlewares
  const middlewares = [
    createEpicMiddleware(rootEpic),
  ];
  // compose enhancers
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
  );
  // create store
  return createStore<RootState>(
    rootReducer,
    initialState!,
    enhancer,
  );
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;

```

---

# Ecosystem

---

## Async Flow with "redux-observable"

```ts
// import rxjs operators somewhere...
import { combineEpics, Epic } from 'redux-observable';

import { RootAction, RootState } from '@src/redux';
import { saveState } from '@src/services/local-storage-service';

const SAVING_DELAY = 1000;

// persist state in local storage every 1s
const saveStateInLocalStorage: Epic<RootAction, RootState> = (action$, store) => action$
  .debounceTime(SAVING_DELAY)
  .do((action: RootAction) => {
    // handle side-effects
    saveState(store.getState());
  })
  .ignoreElements();

export const epics = combineEpics(
  saveStateInLocalStorage,
);
```

---

## Selectors with "reselect"

```ts
import { createSelector } from 'reselect';

import { RootState } from '@src/redux';

export const getTodos =
  (state: RootState) => state.todos.todos;

export const getTodosFilter =
  (state: RootState) => state.todos.todosFilter;

export const getFilteredTodos = createSelector(
  getTodos, getTodosFilter,
  (todos, todosFilter) => {
    switch (todosFilter) {
      case 'completed':
        return todos.filter((t) => t.completed);
      case 'active':
        return todos.filter((t) => !t.completed);

      default:
        return todos;
    }
  },
);
```

---

# Extras

### tsconfig.json
> - Recommended setup for best benefits from type-checking, with support for JSX and ES2016 features  
> - Add [`tslib`](https://www.npmjs.com/package/tslib) to minimize bundle size: `npm i tslib` -  this will externalize helper functions generated by transpiler and otherwise inlined in your modules  
> - Include absolute imports config working with Webpack  

```js
{
  "compilerOptions": {
    "baseUrl": "./", // enables absolute path imports
    "paths": { // define absolute path mappings
      "@src/*": ["src/*"] // will enable -> import { ... } from '@src/components'
      // in webpack you need to add -> resolve: { alias: { '@src': PATH_TO_SRC } }
    },
    "outDir": "dist/", // target for compiled files
    "allowSyntheticDefaultImports": true, // no errors on commonjs default import
    "allowJs": true, // include js files
    "checkJs": true, // typecheck js files
    "declaration": false, // don't emit declarations
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true,
    "importHelpers": true, // importing helper functions from tslib
    "noEmitHelpers": true, // disable emitting inline helper functions
    "jsx": "react", // process JSX
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
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "strictNullChecks": true,
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

### tslint.json
> - Recommended setup is to extend build-in preset `tslint:latest` (for all rules use `tslint:all`)  
> - Add tslint react rules: `npm i -D tslint-react` https://github.com/palantir/tslint-react  
> - Amended some extended defaults for more flexibility  

```json
{
  "extends": ["tslint:latest", "tslint-react"],
  "rules": {
    "arrow-parens": false,
    "arrow-return-shorthand": [false],
    "comment-format": [true, "check-space"],
    "import-blacklist": [true, "rxjs"],
    "interface-over-type-literal": false,
    "max-line-length": [true, 120],
    "member-access": false,
    "member-ordering": [true, {
      "order": "fields-first"
    }],
    "newline-before-return": false,
    "no-any": false,
    "no-empty-interface": false,
    "no-inferrable-types": [true, "ignore-params", "ignore-properties"],
    "no-invalid-this": [true, "check-function-in-method"],
    "no-null-keyword": false,
    "no-require-imports": false,
    "no-switch-case-fall-through": true,
    "no-trailing-whitespace": true,
    "no-this-assignment": [true, {
      "allow-destructuring": true
    }],
    "no-unused-variable": [true, "react"],
    "object-literal-sort-keys": false,
    "object-literal-shorthand": false,
    "one-variable-per-declaration": [false],
    "only-arrow-functions": [true, "allow-declarations"],
    "ordered-imports": [false],
    "prefer-method-signature": false,
    "prefer-template": [true, "allow-single-concat"],
    "semicolon": [true, "ignore-interfaces"],
    "quotemark": [true, "single", "jsx-double"],
    "triple-equals": [true, "allow-null-check"],
    "typedef": [true,"parameter", "property-declaration"],
    "variable-name": [true, "ban-keywords", "check-format", "allow-pascal-case", "allow-leading-underscore"]
  }
}
```

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

// 3. now you can import your components in both ways named (internal) or default (public):

// containers/container.tsx
import { Select } from '@src/components';
or
import Select from '@src/components/select';
...
```

### Fixing Vendor Type Issues
> Strategies to fix various issues coming from broken vendor type declaration files (*.d.ts)

- Augumenting library internal type declarations - using relative import resolution 
```ts
// added missing autoFocus Prop on Input component in "antd@2.10.0" npm package
declare module '../node_modules/antd/lib/input/Input' {
  export interface InputProps {
    autoFocus?: boolean;
  }
}
```

- Augumenting library public type declarations - using node module import resolution
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

---

# FAQ

### - how to install react & redux types?
```
// react
npm i -D @types/react @types/react-dom @types/react-redux

// redux has types included in it's npm package - don't install from @types
```

### - should I still use React.PropTypes in TS?
> No. When using TypeScript it is an unnecessary overhead, when declaring IProps and IState interfaces, you will get complete intellisense and compile-time safety with static type checking, this way you'll be safe from runtime errors and you will save a lot of time on debugging. Additional benefit is an elegant and standarized method of documenting your component external API in the source code.  

### - when to use `interface` declarations and when `type` aliases?
> From practical side, using `interface` declaration will display identity (interface name) in compiler errors, on the contrary `type` aliases will be unwinded to show all the properties and nested types it consists of. This can be a bit noisy when reading compiler errors and I like to leverage this distinction to hide some of not so important type details in errors  
Related `ts-lint` rule: https://palantir.github.io/tslint/rules/interface-over-type-literal/  

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

---

# Project Examples

https://github.com/piotrwitek/react-redux-typescript-starter-kit  
https://github.com/piotrwitek/react-redux-typescript-webpack-starter  
