# React & Redux in TypeScript - Static Typing Guide
A comprehensive guide to static typing "React & Redux" apps using TypeScript.
> powered by github :star: - [star it please](https://github.com/piotrwitek/react-redux-typescript-patterns/stargazers) if you think it can be usefull and to keep me motivated to maintain this repo relevant with new TypeScript releases

### Relevant with TypeScript v2.3 (https://github.com/Microsoft/TypeScript/wiki/Roadmap)

### Goals:
- Complete type safety, without failing to `any` type
- Minimize amount of manually typing annotations by leveraging [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)
- Reduce boilerplate with [simple utility functions](https://github.com/piotrwitek/react-redux-typescript) using [Generics](https://www.typescriptlang.org/docs/handbook/generics.html) and [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) features

### Table of Contents
- [React](#react)
  - [Class Component](#class-component)
  - [Stateless Component](#stateless-component)
  - [Higher-Order Component](#higher-order-component)
  - [Redux Connected Component](#redux-connected-component)
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
  - [Vendor Types Augumentation](#vendor-types-augmentation)
- [FAQ](#faq)
- [Project Examples](#project-examples)

---

# React

---

## Class Component
- class component boilerplate
```tsx
import * as React from 'react';

type Props = {
  className?: string,
  style?: React.CSSProperties,
  initialCount?: number,
};

type State = {
  count: number,
};

class MyComponent extends React.Component<Props, State> {
  // default props using Property Initializers
  static defaultProps: Props = {
    className: 'default-class',
    initialCount: 0,
  };
  
  // initial state using Property Initializers
  state: State = {
    count: this.props.initialCount,
  };
  
  // handlers using Class Fields with arrow functions
  handleClick = () => this.setState({ count: this.state.count + 1});
  
  // lifecycle methods should be declared as normal instance methods and it's fine
  componentDidMount() {
    console.log('Mounted!');
  }
  
  render() {
    const { children, initialCount, ...restProps } = this.props;
  
    return (
      <div {...restProps} onClick={this.handleClick} >
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

type Props = {
  className?: string,
  style?: React.CSSProperties,
};

const MyComponent: React.StatelessComponent<Props> = (props) => {
  const { children, ...restProps } = props;
  return (
    <div {...restProps} >
      {children}
    </div>
  );
};

export default MyComponent;
```

---

## Higher-Order Component
- wrap and decorate input Component returning a new Component
- new Component will inherit Props interface through composition from input Component extended with Props of `HOC`
- using Type Inference to automatically calculate resulting Props interface
- filtering out decorator props and passing only the relevant props through to Wrapped Component
- accepting stateless functional or regular component

```tsx
// controls/button.tsx
import * as React from 'react';
import { Button } from 'antd';

type Props = {
  className?: string,
  autoFocus?: boolean,
  htmlType?: typeof Button.prototype.props.htmlType,
  type?: typeof Button.prototype.props.type,
};

const ButtonControl: React.StatelessComponent<Props> = (props) => {
  const { children, ...restProps } = props;

  return (
    <Button {...restProps} >
      {children}
    </Button>
  );
};

export default ButtonControl;
```

```tsx
// decorators/with-form-item.tsx
import * as React from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;

type DecoratorProps = {
  error?: string,
  label?: typeof FormItem.prototype.props.label,
  labelCol?: typeof FormItem.prototype.props.labelCol,
  wrapperCol?: typeof FormItem.prototype.props.wrapperCol,
  required?: typeof FormItem.prototype.props.required,
  help?: typeof FormItem.prototype.props.help,
  validateStatus?: typeof FormItem.prototype.props.validateStatus,
  colon?: typeof FormItem.prototype.props.colon,
};

export function withFormItem<GenericProps>(
  WrappedComponent: React.StatelessComponent<GenericProps> | React.ComponentClass<GenericProps>,
) {
  const Decorator: React.StatelessComponent<DecoratorProps & GenericProps> =
    (props: DecoratorProps) => {
      const {
       label, labelCol, wrapperCol, required, help, validateStatus, colon,
        error, ...passThroughProps,
      } = props;

      // filtering out empty decorator props in functional style
      const decoratorProps: DecoratorProps = Object.entries({
        label, labelCol, wrapperCol, required, help, validateStatus, colon,
      }).reduce((definedDecoratorProps: any, [key, value]) => {
        if (value !== undefined) { definedDecoratorProps[key] = value; }
        return definedDecoratorProps;
      }, {});
      
      // injecting additional props based on condition
      if (error) {
        decoratorProps.help = error;
        decoratorProps.validateStatus = 'error';
      }

      return (
        <FormItem {...decoratorProps} hasFeedback={true} >
          <WrappedComponent {...passThroughProps} />
        </FormItem>
      );
    };

  return Decorator;
}
```

```tsx
// components/consumer-component.tsx
...
import { Button, Input } from '../controls';
import { withFormItem, withFieldState } from '../decorators';

// you can create more specialized components using decorators
const
  ButtonField = withFormItem(Button);

// you can leverage function composition to compose multiple decorators
const
  InputFieldWithState = withFormItem(withFieldState(Input));

// Enhanced Component will inherit Props type from Base Component with all applied HOC's
<ButtonField type="primary" htmlType="submit" wrapperCol={{ offset: 4, span: 12 }} autoFocus={true} >
  Next Step
</ButtonField>
...
<InputFieldWithState {...formFieldLayout} label="Type" required={true} autoFocus={true} 
  fieldState={configurationTypeFieldState} error={configurationTypeFieldState.error}
/>
...

// you could use functional libraries like ramda or lodash to better functional composition like:
const
  InputFieldWithState = compose(withFormItem, withFieldStateInput)(Input);
// NOTE: be aware that compose function need to have sound type declaration or you'll lose type inference 
```

---

## Redux Connected Component
> NOTE: type inference in `connect` function type declaration doesn't provide complete type safety and will not leverage Type Inference to automatically calculate resulting Props interface as in [`Higher-Order Component`](#higher-order-component) example above

> This is something I'm trying to investigate so below solution can be improved even further, please come back later or contribute if have a better solution...

- This solution uses type inference to get Props types from `mapStateToProps` function
- Minimise manual effort to declare and maintain Props types injected from `connect` helper function
- using `returntypeof()` helper function, because TypeScript does not support this feature yet (https://github.com/piotrwitek/react-redux-typescript#returntypeof-polyfill)
- Real project example: https://github.com/piotrwitek/react-redux-typescript-starter-kit/blob/ef2cf6b5a2e71c55e18ed1e250b8f7cadea8f965/src/containers/currency-converter-container/index.tsx

```tsx
import { returntypeof } from 'react-redux-typescript';

import { RootState } from '../../store/types';
import { increaseCounter, changeBaseCurrency } from '../../store/action-creators';
import { getCurrencies } from '../../store/state/currency-rates/selectors';

const mapStateToProps = (rootState: RootState) => ({
  counter: rootState.counter,
  baseCurrency: rootState.baseCurrency,
  currencies: getCurrencies(rootState),
});
const dispatchToProps = {
  increaseCounter: increaseCounter,
  changeBaseCurrency: changeBaseCurrency,
};

// Props types inferred from mapStateToProps & dispatchToProps
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

class CurrencyConverterContainer extends React.Component<Props, {}> {
  handleInputBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    const intValue = parseInt(ev.currentTarget.value, 10);
    this.props.increaseCounter(intValue); // number
  }
  
  handleSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.changeBaseCurrency(ev.target.value); // string
  }
  
  render() {
    const { counter, baseCurrency, currencies } = this.props; // number, string, string[]
    
    return (
      <section>
        <input type="text" value={counter} onBlur={handleInputBlur} ... />
        <select value={baseCurrency} onChange={handleSelectChange} ... >
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

### KISS Solution
This solution is focused on KISS principle, without introducing any abstractions to be as close as possible to common Redux Pattern used in regular JavaScript solutions:

- classic const based types
- very close to standard JS usage
- more boilerplate
- need to export action types and action creators to re-use in other layers like `redux-saga` or `redux-observable` modules
- using `returntypeof()` helper function to infer return type of Action Creators - (https://github.com/piotrwitek/react-redux-typescript#returntypeof-polyfill)

```ts
import { returntypeof } from 'react-redux-typescript';

// Action Types
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const CHANGE_BASE_CURRENCY = 'CHANGE_BASE_CURRENCY';

// Action Creators
export const actionCreators = {
  increaseCounter: () => ({
    type: INCREASE_COUNTER as typeof INCREASE_COUNTER,
  }),
  changeBaseCurrency: (payload: string) => ({
    type: CHANGE_BASE_CURRENCY as typeof CHANGE_BASE_CURRENCY, payload,
  }),
}

// Examples
store.dispatch(actionCreators.increaseCounter(4)); // Error: Supplied parameters do not match any signature of call target. 
store.dispatch(actionCreators.increaseCounter()); // OK => { type: "INCREASE_COUNTER" }

store.dispatch(actionCreators.changeBaseCurrency()); // Error: Supplied parameters do not match any signature of call target. 
store.dispatch(actionCreators.changeBaseCurrency('USD')); // OK => { type: "CHANGE_BASE_CURRENCY", payload: 'USD' }
```

### DRY Solution
This solution is using a simple helper factory function to automate creation of typed action creators. With little abstraction we can  reduce boilerplate and code repetition, also it is easier to re-use action creators in other layers:

- using helper factory function to automate creation of typed action creators - recommended battle-tested `ActionCreator` from (https://github.com/piotrwitek/react-redux-typescript#helpers-v30)
- reduced boilerplate and code repetition
- easier to re-use in other layers like `redux-saga` or `redux-observable` modules (action creators have type property and also create function, no extra type constant)

```ts
import { createActionCreator } from 'react-redux-typescript';

// Action Creators
export const actionCreators = {
  increaseCounter: createActionCreator('INCREASE_COUNTER'), // { type: "INCREASE_COUNTER" }
  changeBaseCurrency: createActionCreator('CHANGE_BASE_CURRENCY', (payload: string) => payload), // { type: "CHANGE_BASE_CURRENCY", payload: string }
  showNotification: createActionCreator('SHOW_NOTIFICATION', (payload: string, meta?: { type: string }) => payload),
};

// Examples
store.dispatch(actionCreators.increaseCounter(4)); // Error: Supplied parameters do not match any signature of call target. 
store.dispatch(actionCreators.increaseCounter()); // OK => { type: "INCREASE_COUNTER" }
actionCreators.increaseCounter.type // "INCREASE_COUNTER"

store.dispatch(actionCreators.changeBaseCurrency()); // Error: Supplied parameters do not match any signature of call target. 
store.dispatch(actionCreators.changeBaseCurrency('USD')); // OK => { type: "CHANGE_BASE_CURRENCY", payload: 'USD' }
actionCreators.changeBaseCurrency.type // "CHANGE_BASE_CURRENCY"

store.dispatch(actionCreators.showNotification()); // Error: Supplied parameters do not match any signature of call target.
store.dispatch(actionCreators.showNotification('Hello!')); // OK => { type: "SHOW_NOTIFICATION", payload: 'Hello!' }
store.dispatch(actionCreators.showNotification('Hello!', { type: 'warning' })); // OK => { type: "SHOW_NOTIFICATION", payload: 'Hello!', meta: { type: 'warning' } }
actionCreators.showNotification.type // "SHOW_NOTIFICATION"
```

---

## Reducers
- leveraging [Discriminated Union types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
  - to guard type and get intellisense of Action payload
- using Partial from [Mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
  - to guard type of `partialState` and restrict superfluous or mismatched props when merging with State

### Switch Style
- using classic const based types
- good for single prop updates or simple state objects

```ts
// State
import { Action } from '../../types';

export type State = {
  readonly counter: number,
  readonly baseCurrency: string,
};
export const initialState: State = {
  counter: 0;
  baseCurrency: 'EUR';
};

// Reducer
export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case INCREASE_COUNTER:
      state.counter = state.counter + 1; // no payload
      return state;
    case CHANGE_BASE_CURRENCY:
      state.baseCurrency = action.payload; // payload: string
      return state;

    default: return state;
  }
}
```

### If Approach
- if's "block scope" give you possibility to use local variables for more complex state update logic
- better for more complex state objects - using partialState object spread for strongly typed multiple props update - it will ensure that action payload is compatible with reducer state contract - this will guard you from nasty bugs
- introducing optional static `type` property on `actionCreator` - advantage is to get rid of action types constants, as you can check type on action creator itself

```ts
import { Action } from '../../types';

// State
export type State = Readonly<{
  counter: number,
  baseCurrency: string,
}>;
export const initialState: State = {
  counter: 0;
  baseCurrency: 'EUR';
};

// Reducer
export default function reducer(state: State = initialState, action: Action): State {
  let partialState: Partial<State> | undefined;

  if (action.type === actionCreators.increaseCounter.type) {
    partialState = { counter: state.counter + 1 }; // no payload
  }
  if (action.type === actionCreators.changeBaseCurrency.type) {
    partialState = { baseCurrency: action.payload }; // payload: string
  }

  return partialState != null ? { ...state, ...partialState } : state;
}
```

---

## Store Types

- statically typed global action types - `Action`
- should be imported in layers dealing with redux actions like: reducers, redux-sagas, redux-observables
```ts
import { returntypeof } from 'react-redux-typescript';
import * as actionCreators from './action-creators';
const actions = Object.values(actionCreators).map(returntypeof);

export type Action = typeof actions[number];
```

- statically typed global state tree - `RootState`
- should be imported in connected components providing type safety to Redux `connect` function
```ts
import {
  reducer as currencyRatesReducer, State as CurrencyRatesState,
} from './state/currency-rates/reducer';
import {
  reducer as currencyConverterReducer, State as CurrencyConverterState,
} from './state/currency-converter/reducer';

export type RootState = {
  currencyRates: CurrencyRatesState;
  currencyConverter: CurrencyConverterState;
};
```

---

## Create Store

- creating store - use `RootState` (in `combineReducers` and when providing preloaded state object) to set-up **state object type guard** to leverage strongly typed Store instance
```ts
import { combineReducers, createStore } from 'redux';
import { RootState } from '../types';

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

- composing enhancers - example of setting up `redux-observable` middleware
```ts
declare var window: Window & { devToolsExtension: any, __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any };
import { createStore, compose, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { epics as currencyConverterEpics } from './currency-converter/epics';

const rootEpic = combineEpics(
  currencyConverterEpics,
);
const epicMiddleware = createEpicMiddleware(rootEpic);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// store singleton instance
export const store = createStore(
  rootReducer,
  recoverState(),
  composeEnhancers(applyMiddleware(epicMiddleware)),
);
```

---

# Ecosystem

---

## Async Flow with "redux-observable"

```ts
import 'rxjs/add/operator/map';
import { combineEpics, Epic } from 'redux-observable';

import { RootState, Action } from '../types'; // check store section
import { actionCreators } from '../reducer';
import { convertValueWithBaseRateToTargetRate } from './utils';
import * as currencyConverterSelectors from './selectors';
import * as currencyRatesSelectors from '../currency-rates/selectors';

const recalculateTargetValueOnCurrencyChange: Epic<Action, RootState> = (action$, store) =>
  action$.ofType(
    actionCreators.changeBaseCurrency.type,
    actionCreators.changeTargetCurrency.type,
  ).map((action: any) => {
    const value = convertValueWithBaseRateToTargetRate(
      currencyConverterSelectors.getBaseValue(store.getState()),
      currencyRatesSelectors.getBaseCurrencyRate(store.getState()),
      currencyRatesSelectors.getTargetCurrencyRate(store.getState()),
    );
    return actionCreators.recalculateTargetValue(value);
  });

const recalculateTargetValueOnBaseValueChange: Epic<Action, RootState> = (action$, store) =>
  action$.ofType(
    actionCreators.changeBaseValue.type,
  ).map((action: any) => {
    const value = convertValueWithBaseRateToTargetRate(
      action.payload,
      currencyRatesSelectors.getBaseCurrencyRate(store.getState()),
      currencyRatesSelectors.getTargetCurrencyRate(store.getState()),
    );
    return actionCreators.recalculateTargetValue(value);
  });

const recalculateBaseValueOnTargetValueChange: Epic<Action, RootState> = (action$, store) =>
  action$.ofType(
    actionCreators.changeTargetValue.type,
  ).map((action: any) => {
    const value = convertValueWithBaseRateToTargetRate(
      action.payload,
      currencyRatesSelectors.getTargetCurrencyRate(store.getState()),
      currencyRatesSelectors.getBaseCurrencyRate(store.getState()),
    );
    return actionCreators.recalculateBaseValue(value);
  });

export const epics = combineEpics(
  recalculateTargetValueOnCurrencyChange,
  recalculateTargetValueOnBaseValueChange,
  recalculateBaseValueOnTargetValueChange,
);
```

---

## Selectors with "reselect"

```ts
import { createSelector } from 'reselect';
import { RootState } from '../types';

const getCurrencyConverter = (state: RootState) => state.currencyConverter;
const getCurrencyRates = (state: RootState) => state.currencyRates;

export const getCurrencies = createSelector(
  getCurrencyRates,
  (currencyRates) => {
    return Object.keys(currencyRates.rates).concat(currencyRates.base);
  },
);

export const getBaseCurrencyRate = createSelector(
  getCurrencyConverter, getCurrencyRates,
  (currencyConverter, currencyRates) => {
    const selectedBase = currencyConverter.baseCurrency;
    return selectedBase === currencyRates.base
      ? 1 : currencyRates.rates[selectedBase];
  },
);

export const getTargetCurrencyRate = createSelector(
  getCurrencyConverter, getCurrencyRates,
  (currencyConverter, currencyRates) => {
    return currencyRates.rates[currencyConverter.targetCurrency];
  },
);
```

---

# Extras

### tsconfig.json
> Recommended setup for best benefits from type-checking, with support for JSX and ES2016 features.  
> Add [`tslib`](https://www.npmjs.com/package/tslib) to minimize bundle size: `npm i tslib` -  this will externalize helper functions generated by transpiler and otherwise inlined in your modules  
```js
{
  "compilerOptions": {
    "baseUrl": "src/", // enables relative imports to root
    "outDir": "out/", // target for compiled files
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
    "target": "es5",
    "module": "es2015",
    "moduleResolution": "node",
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "pretty": true,
    "removeComments": true,
    "sourceMap": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### tslint.json
> Recommended setup is to extend build-in preset `tslint:latest` (for all rules use `tslint:all`).  
> Add tslint react rules: `npm i -D tslint-react` https://github.com/palantir/tslint-react  
> Amended some extended defaults for more flexibility.  
```json
{
  "extends": ["tslint:latest", "tslint-react"],
  "rules": {
    "arrow-parens": false,
    "arrow-return-shorthand": [false],
    "comment-format": [true, "check-space"],
    "import-blacklist": [true, "rxjs"],
    "interface-over-type-literal": false,
    "member-access": false,
    "member-ordering": [true, {"order": "statics-first"}],
    "newline-before-return": false,
    "no-any": false,
    "no-inferrable-types": [true],
    "no-import-side-effect": [true, {"ignore-module": "^rxjs/"}],
    "no-invalid-this": [true, "check-function-in-method"],
    "no-null-keyword": false,
    "no-require-imports": false,
    "no-switch-case-fall-through": true,
    "no-trailing-whitespace": true,
    "no-unused-variable": [true, "react"],
    "object-literal-sort-keys": false,
    "only-arrow-functions": [true, "allow-declarations"],
    "ordered-imports": [false],
    "prefer-method-signature": false,
    "prefer-template": [true, "allow-single-concat"],
    "quotemark": [true, "single", "jsx-double"],
    "triple-equals": [true, "allow-null-check"],
    "typedef": [true,"parameter", "property-declaration", "member-variable-declaration"],
    "variable-name": [true, "ban-keywords", "check-format", "allow-pascal-case"]
  }
}
```

### Default and Named Module Exports
> Most flexible solution is to use module folder pattern, because you can leverage both named and default import when you see fit.  
Using this solution you'll achieve better encapsulation for internal structure/naming refactoring without breaking your consumer code:  
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

### Vendor Types Augmentation
> Augmenting missing autoFocus Prop on `Input` and `Button` components in `antd` npm package (https://ant.design/).  
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

### - how to install react & redux types?
```
// react
npm i -D @types/react @types/react-dom @types/react-redux

// redux has types included in it's npm package, no need to use @types
```

### - when to use `interface` and when `type` to behave consistently?
> Use `type` when declaring simple object literal structs e.g. Component Props, Component State, Redux State, Redux Action.  
In other cases it's more flexible to use `interface` over `type` because interfaces can be implemented, extended and merged.  
Related `ts-lint` rule: https://palantir.github.io/tslint/rules/interface-over-type-literal/  

### - should I use React.PropTypes?
> No. In TypeScript it is completely unnecessary, you will get a much better free type checking and intellisense at compile time when declaring a "generic type" for component: `React.Component<{ myProp: string }, { myState: number}>`, this way you'll never get any runtime errors and get elegant way of describing component external API.  

### - how to best declare component instance properties?
> Don't use old-school React class constructors way, prefer to use Property Initializers (first class support in TypeScript).  
```tsx
class MyComponent extends React.Component<Props, State> {
  // default props using Property Initializers
  static defaultProps: Props = {
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
> Don't use old-school class methods and function bind way, prefer to use Class Fields with arrow functions (first class support in TypeScript)  
```tsx
class MyComponent extends React.Component<Props, State> {
// handlers using Class Fields with arrow functions
  handleClick = () => this.setState({ count: this.state.count + 1});

// an exception are lifecycle methods should be declared as normal instance methods and it's fine, because we are extending React Component
  componentDidMount() {
    console.log('Mounted!');
  }
  ...
}
```
---

# Project Examples

https://github.com/piotrwitek/react-redux-typescript-starter-kit
