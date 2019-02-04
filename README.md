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

You should check out Playground Project located in the `/playground` folder. It is a source of all the code examples found in the guide. They are all tested with the most recent version of TypeScript and 3rd party type definitions (like `@types/react` or `@types/react-redux`) to ensure the examples are up-to-date and not broken with updated definitions.
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
  - [Action Creators](#action-creators)
  - [Reducers](#reducers)
    - [State with Type-level Immutability](#state-with-type-level-immutability)
    - [Typing reducer](#typing-reducer)
    - [Testing reducer](#testing-reducer)
  - [Store Configuration](#store-configuration)
  - [Async Flow](#async-flow)
  - [Selectors](#selectors)
  - [Typing connect](#typing-connect)
- [Tools](#tools)
  - [TSLint](#tslint)
  - [Jest](#jest)
  - [Living Style Guide](#living-style-guide)
  - [Common Npm Scripts](#common-npm-scripts)
- [Recipes](#recipes)
  - [Baseline tsconfig.json](#baseline-tsconfigjson)
  - [Default and Named Module Exports](#default-and-named-module-exports)
  - [Imports in Module Decleration](#imports-in-module-decleration)
  - [Type Augmentation for npm libraries](#type-augmentation-for-npm-libraries)
  - [Override type-definitions for npm libraries](#override-type-definitions-for-npm-libraries)
- [FAQ](#faq)
- [Tutorials](#tutorials)
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

```tsx
import * as React from 'react';

type Props = {
  label: string;
  count: number;
  onIncrement: () => any;
};

export const FCCounter: React.FC<Props> = props => {
  const { label, count, onIncrement } = props;

  const handleIncrement = () => {
    onIncrement();
  };

  return (
    <div>
      <span>
        {label}: {count}
      </span>
      <button type="button" onClick={handleIncrement}>
        {`Increment`}
      </button>
    </div>
  );
};

```

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#fccounter)

[⇧ back to top](#table-of-contents)

#### - spread attributes [link](https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes)

```tsx
import * as React from 'react';

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export const FCSpreadAttributes: React.FC<Props> = props => {
  const { children, ...restProps } = props;

  return <div {...restProps}>{children}</div>;
};

```

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#fcspreadattributes)

[⇧ back to top](#table-of-contents)

---

## Class Components

#### - class counter

```tsx
import * as React from 'react';

type Props = {
  label: string;
};

type State = {
  count: number;
};

export class ClassCounter extends React.Component<Props, State> {
  readonly state: State = {
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
        <span>
          {label}: {count}
        </span>
        <button type="button" onClick={handleIncrement}>
          {`Increment`}
        </button>
      </div>
    );
  }
}

```

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#classcounter)

[⇧ back to top](#table-of-contents)

#### - with default props

```tsx
import * as React from 'react';

type Props = {
  label: string;
  initialCount: number;
};

type State = {
  count: number;
};

export class ClassCounterWithDefaultProps extends React.Component<
  Props,
  State
> {
  static defaultProps = {
    initialCount: 0,
  };

  readonly state: State = {
    count: this.props.initialCount,
  };

  componentWillReceiveProps({ initialCount }: Props) {
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
        <span>
          {label}: {count}
        </span>
        <button type="button" onClick={handleIncrement}>
          {`Increment`}
        </button>
      </div>
    );
  }
}

```

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#classcounterwithdefaultprops)

[⇧ back to top](#table-of-contents)

---

## Generic Components
- easily create typed component variations and reuse common logic
- common use case is a generic list components

#### - generic list

```tsx
import * as React from 'react';

export interface GenericListProps<T> {
  items: T[];
  itemRenderer: (item: T) => JSX.Element;
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

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#genericlist)

[⇧ back to top](#table-of-contents)

---

## Render Props
> https://reactjs.org/docs/render-props.html

#### - name provider
> simple component using children as a render prop

```tsx
import * as React from 'react';

interface NameProviderProps {
  children: (state: NameProviderState) => React.ReactNode;
}

interface NameProviderState {
  readonly name: string;
}

export class NameProvider extends React.Component<NameProviderProps, NameProviderState> {
  readonly state: NameProviderState = { name: 'Piotr' };

  render() {
    return this.props.children(this.state);
  }
}

```

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#nameprovider)

[⇧ back to top](#table-of-contents)

#### - mouse provider
> `Mouse` component found in [Render Props React Docs](https://reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns)

```tsx
import * as React from 'react';

export interface MouseProviderProps {
  render: (state: MouseProviderState) => React.ReactNode;
}

interface MouseProviderState {
  readonly x: number;
  readonly y: number;
}

export class MouseProvider extends React.Component<MouseProviderProps, MouseProviderState> {
  readonly state: MouseProviderState = { x: 0, y: 0 };

  handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

```

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#mouseprovider)

[⇧ back to top](#table-of-contents)

---

## Higher-Order Components
> https://reactjs.org/docs/higher-order-components.html

#### - withState
Adds state to a stateless counter

```tsx
import * as React from 'react';
import { Subtract } from 'utility-types';

// These props will be subtracted from original component type
interface InjectedProps {
  count: number;
  onIncrement: () => any;
}

export const withState = <WrappedProps extends InjectedProps>(
  WrappedComponent: React.ComponentType<WrappedProps>
) => {
  // These props will be added to original component type
  type HocProps = Subtract<WrappedProps, InjectedProps> & {
    // here you can extend hoc props
    initialCount?: number;
  };
  type HocState = {
    readonly count: number;
  };

  return class WithState extends React.Component<HocProps, HocState> {
    // Enhance component name for debugging and React-Dev-Tools
    static displayName = `withState(${WrappedComponent.name})`;
    // reference to original wrapped component
    static readonly WrappedComponent = WrappedComponent;

    readonly state: HocState = {
      count: Number(this.props.initialCount) || 0,
    };

    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    };

    render() {
      const { ...restProps } = this.props as {};
      const { count } = this.state;

      return (
        <WrappedComponent
          {...restProps}
          count={count} // injected
          onIncrement={this.handleIncrement} // injected
        />
      );
    }
  };
};

```
<details><summary><i>Click to expand</i></summary><p>

```tsx
import * as React from 'react';

import { withState } from '../hoc';
import { FCCounter } from '../components';

const FCCounterWithState = withState(FCCounter);

export default () => <FCCounterWithState label={'FCCounterWithState'} />;

```
</p></details>

[⇧ back to top](#table-of-contents)

#### - withErrorBoundary
Adds error handling using componentDidCatch to any component

```tsx
import * as React from 'react';
import { Subtract } from 'utility-types';

const MISSING_ERROR = 'Error was swallowed during propagation.';

interface InjectedProps {
  onReset: () => any;
}

export const withErrorBoundary = <WrappedProps extends InjectedProps>(
  WrappedComponent: React.ComponentType<WrappedProps>
) => {
  type HocProps = Subtract<WrappedProps, InjectedProps> & {
    // here you can extend hoc props
  };
  type HocState = {
    readonly error: Error | null | undefined;
  };

  return class WithErrorBoundary extends React.Component<HocProps, HocState> {
    static displayName = `withErrorBoundary(${WrappedComponent.name})`;

    readonly state: HocState = {
      error: undefined,
    };

    componentDidCatch(error: Error | null, info: object) {
      this.setState({ error: error || new Error(MISSING_ERROR) });
      this.logErrorToCloud(error, info);
    }

    logErrorToCloud = (error: Error | null, info: object) => {
      // TODO: send error report to cloud
    };

    handleReset = () => {
      this.setState({ error: undefined });
    };

    render() {
      const { children, ...restProps } = this.props as {
        children: React.ReactNode;
      };
      const { error } = this.state;

      if (error) {
        return (
          <WrappedComponent
            {...restProps}
            onReset={this.handleReset} // injected
          />
        );
      }

      return children;
    }
  };
};

```
<details><summary><i>Click to expand</i></summary><p>

```tsx
import * as React from 'react';

import { withErrorBoundary } from '../hoc';
import { ErrorMessage } from '../components';

const ErrorMessageWithErrorBoundary =
  withErrorBoundary(ErrorMessage);

const BrokenButton = () => (
  <button type="button" onClick={() => { throw new Error(`Catch me!`); }}>
    {`Throw nasty error`}
  </button >
);

export default () => (
  <ErrorMessageWithErrorBoundary>
    <BrokenButton />
  </ErrorMessageWithErrorBoundary>
);

```
</p></details>

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

```tsx
import Types from 'Types';
import { connect } from 'react-redux';

import { countersActions, countersSelectors } from '../features/counters';
import { FCCounter } from '../components';

const mapStateToProps = (state: Types.RootState) => ({
  count: countersSelectors.getReduxCounter(state.counters),
});

export const FCCounterConnected = connect(
  mapStateToProps,
  {
    onIncrement: countersActions.increment,
  }
)(FCCounter);

```
<details><summary><i>Click to expand</i></summary><p>

```tsx
import * as React from 'react';

import { FCCounterConnected } from '.';

export default () => <FCCounterConnected label={'FCCounterConnected'} />;

```
</p></details>

[⇧ back to top](#table-of-contents)

#### - redux connected counter (verbose)

```tsx
import Types from 'Types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { countersActions } from '../features/counters';
import { FCCounter } from '../components';

const mapStateToProps = (state: Types.RootState) => ({
  count: state.counters.reduxCounter,
});

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) =>
  bindActionCreators(
    {
      onIncrement: countersActions.increment,
    },
    dispatch
  );

export const FCCounterConnectedVerbose = connect(
  mapStateToProps,
  mapDispatchToProps
)(FCCounter);

```
<details><summary><i>Click to expand</i></summary><p>

```tsx
import * as React from 'react';

import { FCCounterConnectedVerbose } from '.';

export default () => (
  <FCCounterConnectedVerbose label={'FCCounterConnectedVerbose'} />
);

```
</p></details>

[⇧ back to top](#table-of-contents)

#### - with own props

```tsx
import Types from 'Types';
import { connect } from 'react-redux';

import { countersActions, countersSelectors } from '../features/counters';
import { FCCounter } from '../components';

type OwnProps = {
  initialCount?: number;
};

const mapStateToProps = (state: Types.RootState, ownProps: OwnProps) => ({
  count:
    countersSelectors.getReduxCounter(state.counters) +
    (ownProps.initialCount || 0),
});

export const FCCounterConnectedExtended = connect(
  mapStateToProps,
  {
    onIncrement: countersActions.increment,
  }
)(FCCounter);

```
<details><summary><i>Click to expand</i></summary><p>

```tsx
import * as React from 'react';

import { FCCounterConnectedExtended } from '.';

export default () => (
  <FCCounterConnectedExtended
    label={'FCCounterConnectedExtended'}
    initialCount={10}
  />
);

```
</p></details>

[⇧ back to top](#table-of-contents)

## Context

> https://reactjs.org/docs/context.html

#### ThemeContext

```tsx
import * as React from 'react';

export type Theme = React.CSSProperties;

type Themes = {
  dark: Theme;
  light: Theme;
};

export const themes: Themes = {
  dark: {
    color: 'black',
    backgroundColor: 'white',
  },
  light: {
    color: 'white',
    backgroundColor: 'black',
  },
};

export type ThemeContextProps = { theme: Theme; toggleTheme?: () => void };
const ThemeContext = React.createContext<ThemeContextProps>({ theme: themes.light });

export default ThemeContext;

```

[⇧ back to top](#table-of-contents)

#### ThemeProvider

```tsx
import React from 'react';
import ThemeContext, { themes, Theme } from './theme-context';
import ToggleThemeButton from './theme-consumer';

interface State {
  theme: Theme;
}
export class ThemeProvider extends React.Component<{}, State> {
  readonly state: State = { theme: themes.light };

  toggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.light ? themes.dark : themes.light,
    }));
  }

  render() {
    const { theme } = this.state;
    const { toggleTheme } = this;
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ToggleThemeButton />
      </ThemeContext.Provider>
    );
  }
}

```

[⇧ back to top](#table-of-contents)

#### ThemeConsumer

```tsx
import * as React from 'react';
import ThemeContext from './theme-context';

type Props = {};

export default function ToggleThemeButton(props: Props) {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => <button style={theme} onClick={toggleTheme} {...props} />}
    </ThemeContext.Consumer>
  );
}

```

[Implementation with Hooks](#--usecontext)

[⇧ back to top](#table-of-contents)

## Hooks

> https://reactjs.org/docs/hooks-intro.html

#### - useState

> https://reactjs.org/docs/hooks-reference.html#usestate

```tsx
import * as React from 'react';

type Props = { initialCount: number };

export default function Counter({initialCount}: Props) {
  const [count, setCount] = React.useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
    </>
  );
}

```

[⇧ back to top](#table-of-contents)

#### - useReducer
Hook for state management like Redux in a function component.

```tsx
import * as React from 'react';

interface State {
  count: number;
}

type Action  =
  | { type: 'reset' }
  | { type: 'increment' }
  | { type: 'decrement' };

const initialState: State = {
  count: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

interface CounterProps {
  initialCount: number;
}

function Counter({ initialCount }: CounterProps) {
  const [state, dispatch] = React.useReducer<State, Action>(reducer, {
    count: initialCount,
  });
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}

export default Counter;

```

[⇧ back to top](#table-of-contents)

#### - useContext

> https://reactjs.org/docs/hooks-reference.html#usecontext

```tsx
import * as React from 'react';
import ThemeContext from '../context/theme-context';

type Props = {};

export default function ThemeToggleButton(props: Props) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <button onClick={toggleTheme} style={theme} >
      Toggle Theme
    </button>
  );
}

```

[⇧ back to top](#table-of-contents)

---

# Redux - Typing Patterns

## Action Creators

> We'll be using a battle-tested library [![NPM Downloads](https://img.shields.io/npm/dm/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
 that automates and simplify maintenace of **type annotations in Redux Architectures** [`typesafe-actions`](https://github.com/piotrwitek/typesafe-actions#typesafe-actions)

### You should read [The Mighty Tutorial](https://github.com/piotrwitek/typesafe-actions#behold-the-mighty-tutorial) to learn it all the easy way!

A solution below is using a simple factory function to automate the creation of type-safe action creators. The goal is to decrease maintenance effort and reduce code repetition of type annotations for actions and creators. The result is completely typesafe action-creators and their actions.

```tsx
import { action } from 'typesafe-actions';

import { ADD, INCREMENT } from './constants';

// CLASSIC API
export const increment = () => action(INCREMENT);
export const add = (amount: number) => action(ADD, amount);

// ALTERNATIVE API - allow to use reference to "action-creator" function instead of "type constant"
// e.g. case getType(increment): return { ... }
// This will allow to completely eliminate need for "constants" in your application, more info here:
// https://github.com/piotrwitek/typesafe-actions#behold-the-mighty-tutorial

// OPTION 1 (with generics):
// import { createStandardAction } from 'typesafe-actions';
// export const increment = createStandardAction(INCREMENT)<void>();
// export const add = createStandardAction(ADD)<number>();

// OPTION 2 (with resolve callback):
// import { createAction } from 'typesafe-actions';
// export const increment = createAction(INCREMENT);
// export const add = createAction(ADD, resolve => {
//   return (amount: number) => resolve(amount);
// });

```
<details><summary><i>Click to expand</i></summary><p>

```tsx
import store from '../../store';
import { countersActions as counter } from '../counters';

// store.dispatch(counter.increment(1)); // Error: Expected 0 arguments, but got 1.
store.dispatch(counter.increment()); // OK

// store.dispatch(counter.add()); // Error: Expected 1 arguments, but got 0.
store.dispatch(counter.add(1)); // OK

```
</p></details>

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

```tsx
import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';

import { Todo, TodosFilter } from './models';
import * as actions from './actions';
import { ADD, CHANGE_FILTER, TOGGLE } from './constants';

export type TodosState = {
  readonly todos: Todo[];
  readonly todosFilter: TodosFilter;
};

export type TodosAction = ActionType<typeof actions>;

export default combineReducers<TodosState, TodosAction>({
  todos: (state = [], action) => {
    switch (action.type) {
      case ADD:
        return [...state, action.payload];

      case TOGGLE:
        return state.map(
          item =>
            item.id === action.payload
              ? { ...item, completed: !item.completed }
              : item
        );

      default:
        return state;
    }
  },
  todosFilter: (state = TodosFilter.All, action) => {
    switch (action.type) {
      case CHANGE_FILTER:
        return action.payload;

      default:
        return state;
    }
  },
});

```

[⇧ back to top](#table-of-contents)

### Testing reducer

```tsx
import {
  todosReducer as reducer,
  todosActions as actions,
  TodosState,
} from './';

/**
 * FIXTURES
 */
const getInitialState = (initial?: Partial<TodosState>) =>
  reducer(initial as TodosState, {} as any);

/**
 * STORIES
 */
describe('Todos Stories', () => {
  describe('initial state', () => {
    it('should match a snapshot', () => {
      const initialState = getInitialState();
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('adding todos', () => {
    it('should add a new todo as the first element', () => {
      const initialState = getInitialState();
      expect(initialState.todos).toHaveLength(0);
      const state = reducer(initialState, actions.add('new todo'));
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].title).toEqual('new todo');
    });
  });

  describe('toggling completion state', () => {
    it('should mark active todo as complete', () => {
      const activeTodo = { id: '1', completed: false, title: 'active todo' };
      const initialState = getInitialState({ todos: [activeTodo] });
      expect(initialState.todos[0].completed).toBeFalsy();
      const state1 = reducer(initialState, actions.toggle(activeTodo.id));
      expect(state1.todos[0].completed).toBeTruthy();
    });
  });
});

```

[⇧ back to top](#table-of-contents)

---

## Store Configuration

### Create Global RootState and RootAction Types

#### `RootState` - type representing root state-tree
Can be imported in connected components to provide type-safety to Redux `connect` function

#### `RootAction` - type representing union type of all action objects
Can be imported in various layers receiving or sending redux actions like: reducers, sagas or redux-observables epics

```tsx
import { StateType } from 'typesafe-actions';
import { RouterAction, LocationChangeAction } from 'react-router-redux';
type ReactRouterAction = RouterAction | LocationChangeAction;
import { CountersAction } from '../features/counters';
import rootReducer from './root-reducer';

declare module 'Types' {
  export type RootState = StateType<typeof rootReducer>;
  export type RootAction = ReactRouterAction | CountersAction;
}

```

[⇧ back to top](#table-of-contents)

### Create Store

When creating a store instance we don't need to provide any additional types. It will set-up a **type-safe Store instance** using type inference.
> The resulting store instance methods like `getState` or `dispatch` will be type checked and will expose all type errors

```tsx
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { composeEnhancers } from './utils';
import rootReducer from './root-reducer';
import rootEpic from './root-epic';
import services from '../services';

export const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: services,
});

function configureStore(initialState?: object) {
  // configure middlewares
  const middlewares = [epicMiddleware];
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // create store
  return createStore(rootReducer, initialState!, enhancer);
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;

```

---

## Async Flow

### "redux-observable"

### For more examples and in-depth explanation you should read [The Mighty Tutorial](https://github.com/piotrwitek/typesafe-actions#behold-the-mighty-tutorial) to learn it all the easy way!

```tsx
import Types from 'Types';
import { combineEpics, Epic } from 'redux-observable';
import { tap, ignoreElements, filter } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import { todosConstants, TodosAction } from '../todos';

// contrived example!!!
const logAddAction: Epic<TodosAction, Types.RootState, Types.Services> = (
  action$,
  store,
  { logger }
) =>
  action$.pipe(
    filter(isOfType(todosConstants.ADD)), // action is narrowed to: { type: "ADD_TODO"; payload: string; }
    tap(action => {
      logger.log(
        `action type must be equal: ${todosConstants.ADD} === ${action.type}`
      );
    }),
    ignoreElements()
  );

export default combineEpics(logAddAction);

```

[⇧ back to top](#table-of-contents)

---

## Selectors

### "reselect"

```tsx
import { createSelector } from 'reselect';

import { TodosState } from './reducer';

export const getTodos = (state: TodosState) => state.todos;

export const getTodosFilter = (state: TodosState) => state.todosFilter;

export const getFilteredTodos = createSelector(getTodos, getTodosFilter, (todos, todosFilter) => {
  switch (todosFilter) {
    case 'completed':
      return todos.filter(t => t.completed);
    case 'active':
      return todos.filter(t => !t.completed);

    default:
      return todos;
  }
});

```

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

<details><summary><i>Click to expand</i></summary><p>

```tsx
{
  "extends": ["tslint:recommended", "tslint-react"],
  "rules": {
    "arrow-parens": false,
    "arrow-return-shorthand": [false],
    "comment-format": [true, "check-space"],
    "import-blacklist": [true],
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
    "no-namespace": false,
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
    "semicolon": [true, "always", "ignore-bound-class-methods"],
    "trailing-comma": [
      true,
      {
        "singleline": "never",
        "multiline": {
          "objects": "always",
          "arrays": "always",
          "functions": "ignore",
          "typeLiterals": "ignore"
        },
        "esSpecCompliant": true
      }
    ],
    "triple-equals": [true, "allow-null-check"],
    "type-literal-delimiter": true,
    "typedef": [true, "parameter", "property-declaration"],
    "variable-name": [
      true,
      "ban-keywords",
      "check-format",
      "allow-pascal-case",
      "allow-leading-underscore"
    ],
    // tslint-react
    "jsx-no-multiline-js": false,
    "jsx-no-lambda": false
  }
}

```
</p></details>

[⇧ back to top](#table-of-contents)

## Jest

> Installation  
`npm i -D jest ts-jest @types/jest`

#### jest.config.json
<details><summary><i>Click to expand</i></summary><p>

```tsx
{
  "verbose": true,
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  "testRegex": "(/spec/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "moduleFileExtensions": ["ts", "tsx", "js"],
  "moduleNameMapper": {
    "^Components/(.*)": "./src/components/$1"
  },
  "globals": {
    "window": {},
    "ts-jest": {
      "tsConfig": "./tsconfig.json"
    }
  },
  "setupFiles": ["./jest.stubs.js"],
  "testURL": "http://localhost/"
}

```
</p></details>

#### jest.stubs.js
<details><summary><i>Click to expand</i></summary><p>

```tsx
// Global/Window object Stubs for Jest
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { },
  };
};

window.requestAnimationFrame = function (callback) {
  setTimeout(callback);
};

window.localStorage = {
  getItem: function () { },
  setItem: function () { },
};

Object.values = () => [];

```
</p></details>

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

<details><summary><i>Click to expand</i></summary><p>

```tsx
{
  "compilerOptions": {
    "baseUrl": "./", // relative paths base
    "paths": {
      // "@src/*": ["src/*"] // will enable import aliases -> import { ... } from '@src/components'
      // WARNING: Require to add this to your webpack config -> resolve: { alias: { '@src': PATH_TO_SRC } }
      // "redux": ["typings/redux"], // override library types with your alternative type-definitions in typings folder
    },
    "outDir": "dist/", // target for compiled files
    "allowSyntheticDefaultImports": true, // no errors with commonjs modules interop
    "esModuleInterop": true, // enable to do "import React ..." instead of "import * as React ..."
    "allowJs": true, // include js files
    "checkJs": true, // typecheck js files
    "declaration": false, // don't emit declarations
    "emitDecoratorMetadata": true, // include only if using decorators
    "experimentalDecorators": true, // include only if using decorators
    "forceConsistentCasingInFileNames": true,
    "importHelpers": true, // importing transpilation helpers from tslib
    "noEmitHelpers": true, // disable inline transpilation helpers in each file
    "jsx": "react", // transform JSX
    "lib": ["dom", "es2017"], // you will need to include polyfills for es2017 manually
    "types": ["jest"], // which global types to use
    "target": "es5", // "es2015" for ES6+ engines
    "module": "es2015", // "es2015" for tree-shaking
    "moduleResolution": "node",
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "strict": true,
    "pretty": true,
    "removeComments": true,
    "sourceMap": true
  },
  "include": ["src", "typings"]
}

```
</p></details>

[⇧ back to top](#table-of-contents)

### Default and Named Module Exports
> Most flexible solution is to use module folder pattern, because you can leverage both named and default import when you see fit.  
Using this solution you'll achieve better encapsulation for internal structure/naming refactoring without breaking your consumer code:  
```ts
// 1. in `components/` folder create component file (`select.tsx`) with default export:

// components/select.tsx
const Select: React.FC<Props> = (props) => {
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

### Imports in Module Decleration
> When creating 3rd party modules declarations all the imports should be put inside the module decleration, otherwise it will be treated as augmentation and show error
```ts
declare module "react-custom-scrollbars" {
    import * as React from "react";
    export interface positionValues {
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

```tsx
// typings/modules.d.ts
declare module 'Types';
declare module 'react-test-renderer';

```

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
> Prefered modern style is to use Class Fields with arrow functions  
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
