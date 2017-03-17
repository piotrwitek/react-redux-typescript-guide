# React / Redux / TypeScript - Patterns
Set of guidelines and patterns teaching how to fully leverage TypeScript features when working with React & Redux ecosystem.

### Relevant with TypeScript v2.2 (https://github.com/Microsoft/TypeScript/wiki/Roadmap)
> powered by github :star: - [star it please](https://github.com/piotrwitek/react-redux-typescript-patterns/stargazers) to keep me motivated to maintain this repo with new TypeScript releases

### Goals:
- Complete type safety, without failing to `any` type
- Minimize amount of manually typing declarations by leveraging Type Inference (https://www.typescriptlang.org/docs/handbook/type-inference.html)
- Reduce boilerplate using simple helper functions with generics (https://www.typescriptlang.org/docs/handbook/generics.html)

### Table of Contents
- [React](#react)
  - [Class Component](#class-component)
  - [Stateless Component](#stateless-component)
  - [Higher-Order Component](#higher-order-component)
  - [Redux Connected Component](#redux-connected-component)
- [Redux](#redux)
  - [Actions](#actions)
  - [Reducers](#reducers)
  - [Async Flow](#async-flow)
  - [Reselect Selectors](#reselect-selectors)
  - [Store & RootState](#store--rootstate)
- [Common](#common)
  - [Vendor Types Augumentation](#vendor-types-augmentation)
- [FAQ](#faq)
- [Project Examples](#project-examples)

---

# React
- Don't use React.PropTypes! - in TypeScript ecosystem it is completely unnecessary, you will get much better type checking and intellisense at compile time in your editor with automatic type inference
- Don't use constructor - use Property Initializers
- Don't use instance methods and bind - use Class Fields with arrow functions

---

## Class Component
- class component boilerplate
```tsx
import * as React from 'react';

interface Props {
  className?: string;
  style?: React.CSSProperties
  initialCount?: number;
}
interface State {
  count?: number;
}

class MyComponent extends React.Component<Props, State> {
  // default props using Property Initializers
  static defaultProps: Props = {
    className: 'default-class',
  };
  
  // initial state using Property Initializers
  state: State = {
    count: this.props.initialCount,
  };
  
  // handlers using Class Fields with arrow functions
  handleClick = () => this.setState({ count: this.state.count + 1});
  
  // lifecycle methods are normal instance methods
  componentDidMount() {
    console.log('Mounted!');
  }
  
  render() {
    const { className, style, children } = props;
  
    return (
      <div
        className={className}
        style={style}
        onClick={this.handleClick}
      >
        Clicks: {this.state.count}
        <hr />
        {children}
      </div>
    );
  }
};

export default MyComponent;
```

---

## Stateless Component
- stateless component boilerplate
```tsx
import * as React from 'react';

interface Props {
  className?: string;
  style?: React.CSSProperties
}

const MyComponent: React.StatelessComponent<Props> = (props) => {
  const { className, style, children } = props;
  return (
    <div
      className={className}
      style={style}
    >
      {children}
    </div>
  );
};

export default MyComponent;
```

---

## Higher-Order Component
- decorate or wraps a component into another component
- using Type Inference to automatically calculate Props interface for the resulting component
- demo application: coming soon...

```tsx
// button.tsx
import * as React from 'react';
import { Button } from 'antd';

interface Props {
  className?: string;
  htmlType?: typeof Button.prototype.props.htmlType;
  type?: typeof Button.prototype.props.type;
  autoFocus?: boolean;
}

const ButtonControl: React.StatelessComponent<Props> = (props) => {
  return (
    <Button
      className={props.className}
      htmlType={props.htmlType}
      type={props.type}
      autoFocus={props.autoFocus}
    >
      {props.children}
    </Button>
  );
};

export default ButtonControl;
```

```tsx
// with-form-item-decorator.tsx
import * as React from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;

interface DecoratorProps {
  className?: string;
  label?: string;
  labelCol?: typeof FormItem.prototype.props.labelCol;
  wrapperCol?: typeof FormItem.prototype.props.wrapperCol;
  hasFeedback?: boolean;
}

export function withFormItemDecorator<Props>(
  Component: React.StatelessComponent<Props>,
) {
  const Decorator: React.StatelessComponent<DecoratorProps & Props> = (props) => {
    return (
      <FormItem
        label={props.label}
        labelCol={props.labelCol}
        wrapperCol={props.wrapperCol}
        hasFeedback={props.hasFeedback}
      >
        <Component {...props} />
      </FormItem>
    );
  };
  return Decorator;
}

// improve with filtering passThroughProps - type inference support coming in (v2.3), tracking issue: https://github.com/Microsoft/TypeScript/issues/10727
const { label, labelCol, wrapperCol, hasFeedback, ...passThroughProps } = props;
```

```tsx
// consumer-component.tsx
...
import Button from './button';
import { withFormItemDecorator } from './with-form-item-decorator';

// higher-order component using function composition
const ButtonWithFormItem = withFormItemDecorator(Button);
...
<ButtonWithFormItem type="primary" htmlType="submit" wrapperCol={{ offset: 4, span: 12 }} autoFocus >
  Next Step
</ButtonWithFormItem>
...
```

---

## Redux Connected Component
- This solution uses type inference to get Props types from `mapStateToProps` function
- Minimise manual effort to declare and maintain Props types injected from `connect` helper function
- using `returntypeof()` helper function, because TypeScript does not support this feature yet (https://github.com/piotrwitek/react-redux-typescript#returntypeof-polyfill)
- Real project example: https://github.com/piotrwitek/react-redux-typescript-starter-kit/blob/ef2cf6b5a2e71c55e18ed1e250b8f7cadea8f965/src/containers/currency-converter-container/index.tsx

```tsx
import { returntypeof } from 'react-redux-typescript';

import { RootState } from '../../store';
import { ActionCreators } from '../../store/currency-converter/reducer';
import * as CurrencyRatesSelectors from '../../store/currency-rates/selectors';

const mapStateToProps = (state: RootState) => ({
  counter: state.counter,
  baseCurrency: state.baseCurrency,
  currencies: CurrencyRatesSelectors.getCurrencies(state),
});
const dispatchToProps = {
  increaseCounter: ActionCreators.IncreaseCounter.create,
  changeBaseCurrency: ActionCreators.ChangeBaseCurrency.create,
};

// Props types inferred from mapStateToProps & dispatchToProps
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;
type State = {};

class CurrencyConverterContainer extends React.Component<Props, State> {
  handleInputBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(ev.currentTarget.value, 10); // string -> number
    this.props.increaseCounter(parsedValue); // number
  }
  
  handleSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.changeBaseCurrency(ev.target.value); // string
  }
  
  render() {
    const { counter, baseCurrency, currencies } = this.props; // number, string, string[]
    
    return (
      <section>
        <input
          type="text"
          value={counter}
          onBlur={handleInputBlur}
          ...
        />
        <select
          value={baseCurrency}
          onChange={handleSelectChange}
          ...
        >
          {currencies.map(currency =>
            <option key={currency}>{currency}</option>,
          )}
        </select>
        ...
      </section>
    );
  }
}

export default connect(mapStateToProps, dispatchToProps)(CurrencyConverterContainer);
```


---

# Redux

---

## Actions

### KISS Approach
- more boilerplate
- classic const based types
- close to standard JS usage
- need to export both const type and action creator to use in multiple reducer files or redux-observable modules
- using `returntypeof()` helper function to infer Action types - (https://github.com/piotrwitek/react-redux-typescript#returntypeof-polyfill)

This case is focused on KISS, without introducing any abstractions to be as close as possible to common Redux Pattern used in JS.

```ts
// Action Creators
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const increaseCounter = (payload: number) => ({
  type: INCREASE_COUNTER as typeof INCREASE_COUNTER,
  payload,
});

export const CHANGE_BASE_CURRENCY = 'CHANGE_BASE_CURRENCY';
export const changeBaseCurrency = (payload: string) => ({
  type: CHANGE_BASE_CURRENCY as typeof CHANGE_BASE_CURRENCY,
  payload,
});

store.dispatch(increaseCounter(4)); // { type: "INCREASE_COUNTER", payload: 4 }
store.dispatch(changeBaseCurrency('USD')); // { type: "CHANGE_BASE_CURRENCY", payload: 'USD' }

// Action Types
const ActionTypes = {
  increaseCounter: returntypeof(increaseCounter),
  changeBaseCurrency: returntypeof(changeBaseCurrency),
};
type Action = typeof ActionTypes[keyof typeof ActionTypes];
// { type: "INCREASE_COUNTER", payload: number } | { type: "CHANGE_BASE_CURRENCY", payload: string }

// Reducer                                                           vvvvvv
export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case INCREASE_COUNTER:
      state.counter = action.payload // number
      break;
    case CHANGE_BASE_CURRENCY:
      state.baseCurrency = action.payload // string
      break;
...
```

### DRY Approach
- less boilerplate
- minimize repeated code
- `ActionCreator` helper factory function to create typed instances of actions - (https://github.com/piotrwitek/react-redux-typescript#helpers-v22)
- easier to use in multiple reducer files or `redux-observable` modules (action creators have type property and also create function, no extra type constant)
- very easy to get all of action types

This case is using a helper factory function to create typed actions. With little abstraction we can significally reduce boilerplate and code repetition, also it is easier to re-use action creators in other reducer or redux-observable modules.

```ts
import { ActionCreator } from 'react-redux-typescript';

export const ActionCreators = {
  IncreaseCounter: new ActionCreator<'IncreaseCounter', number>('IncreaseCounter'),
  ChangeBaseCurrency: new ActionCreator<'ChangeBaseCurrency', string>('ChangeBaseCurrency'),
};

store.dispatch(ActionCreators.IncreaseCounter.create(4)); // { type: "IncreaseCounter", payload: 4 }
store.dispatch(ActionCreators.ChangeBaseCurrency.create('USD')); // { type: "ChangeBaseCurrency", payload: 'USD' }

// Action Types
type Action = typeof ActionCreators[keyof typeof ActionCreators];
// { type: "IncreaseCounter", payload: number } | { type: "ChangeBaseCurrency", payload: string }

// Reducer                                                           vvvvvv
export default function reducer(state: State = initialState, action: Action): State {
  if (action.type === ActionCreators.IncreaseCounter.type) {
    state.counter = action.payload; // number
  }
  else if (action.type === ActionCreators.ChangeBaseCurrency.type) {
    state.baseCurrency = action.payload; // string
  }
...
```

---

## Reducers
- leveraging (Discriminated Union types)[https://www.typescriptlang.org/docs/handbook/advanced-types.html]
  - to guard type and get intellisense of Action payload
- using Partial from (Mapped types)[https://www.typescriptlang.org/docs/handbook/advanced-types.html]
  - to guard type of `partialState` and restrict superfluous or mismatched props when merging with State

### Switch Approach
- using classic const based types

```ts
// State
export type State = {
  readonly counter: number;
  readonly baseCurrency: string;
};
export const initialState: State = {
  counter: 0;
  baseCurrency: 'EUR';
};

// Reducer
export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case INCREASE_COUNTER:
      state.counter = action.payload; // number
      break;
    case CHANGE_BASE_CURRENCY:
      state.baseCurrency = action.payload; // string
      break;

    default: return state;
  }
}
```

### If Approach
- using `ActionCreator` helper types

```ts
// State
export type State = {
  readonly counter: number;
  readonly baseCurrency: string;
};
export const initialState: State = {
  counter: 0;
  baseCurrency: 'EUR';
};

// Reducer
export default function reducer(state: State = initialState, action: Action): State {
  let partialState: Partial<State> | undefined;

  if (action.type === ActionCreators.IncreaseCounter.type) {
    partialState = { counter: action.payload }; // number
  }
  if (action.type === ActionCreators.ChangeBaseCurrency.type) {
    partialState = { baseCurrency: action.payload }; // string
  }

  return partialState != null ? { ...state, ...partialState } : state;
}
```

---

## Async Flow
- WIP

```ts

```

---

## Reselect Selectors
- WIP

```ts

```

---

## Store & RootState

`RootState` - to be imported in connected components providing type safety to Redux `connect` function
```ts
import {
  default as currencyRatesReducer, State as CurrencyRatesState,
} from './currency-rates/reducer';
import {
  default as currencyConverterReducer, State as CurrencyConverterState,
} from './currency-converter/reducer';

export type RootState = {
  currencyRates: CurrencyRatesState;
  currencyConverter: CurrencyConverterState;
};
```

Use `RootState` in `combineReducers` function and as rehydrated State object type guard to obtain strongly typed Store instance
```ts
import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers<RootState>({
  currencyRates: currencyRatesReducer,
  currencyConverter: currencyConverterReducer,
});

// rehydrating state on app start: implement here...
const recoverState = (): RootState => ({} as RootState);

export const store = createStore(
  rootReducer,
  recoverState(),
);
```

---

# Common

## Vendor Types Augmentation
- Augmenting missing autoFocus Prop on `Input` and `Button` components in `antd` npm package (https://ant.design/)

```ts
declare module '../node_modules/antd/lib/input/Input' {
  export interface InputProps {
    autoFocus?: boolean;
  }
}

declare module '../node_modules/antd/lib/button/Button' {
  export interface ButtonProps {
    autoFocus?: boolean;
  }
}
```

---

# FAQ

- when to use `interface` and when `type`?
> Use `interface` when extending particular type or when expecting consumer of type to be extending. In every other case it's better to use `type`, to make it clear it is a struct to be used directly as type annotation.

- should I export my components as `default` or as `named` module export?
> Most flexible solution is to use module pattern, then you can have both approaches whenever you wish. Also you have better encapsulation for internal structure/naming refactoring without breaking your consumers:
```ts
// 1. in `components/` folder create component file (`select.tsx`) with default export:

// components/select.tsx
const Select: React.StatelessComponent<Props> = (props) => {
...
export default Select;

// 2. in `components/` folder create `index.ts` file handling named imports:

// components/index.ts
export { default as Select } from './select';
...


// 3. now you can import your components in both ways like this:

// containers/container.tsx
import { Select } from '../components';
or
import Select from '../components/select';
...
```

---

# Project Examples

https://github.com/piotrwitek/react-redux-typescript-starter-kit
