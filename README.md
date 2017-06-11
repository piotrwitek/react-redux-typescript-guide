# React & Redux in TypeScript - Static Typing Guide
A comprehensive guide to static typing "React & Redux" apps using TypeScript.
> found it usefull, want some more? [give it a :star:](https://github.com/piotrwitek/react-redux-typescript-patterns/stargazers)

### Relevant with TypeScript v2.3 (https://github.com/Microsoft/TypeScript/wiki/Roadmap)

### Introduction
This guide is aimed for strict setup of TypeScript compiler which will provide most complete type safety and best DX.
With a little bit of effort by adding explicit type annotations where necessary and most of the time leveraging smart [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html), what we will get is:
- refactoring capabilities with the power equal to strongly typed languages (not "stringly" typed like Webstorm IDE)  
- precise insight of the impact our changes will have on the entire codebase (by showing all the references in the codebase for any given piece of code)  
- minimal surface area for errors when implementing new features (compiler validate all props injected to connected components, action creator params, payload object structure and state/action objects passed to a reducer - showing all possible JavaScript errors)  
- don't need to master all the JavaScript quirks and "Wat?" operations, compiler will find them all for you!

This power will make the process of improving your codebase by refactoring, minimizing abstractions levels and cleaning unused code much simpler, and give you confidence that you will not break any working production code.

>**NB:** This setup will give the most benefit if you are working on rapidly changing project and cannot afford writing unit tests (because of the cost of updating them constantly). I successfully benefit from this setup without any single unit-tests on a decent size React/Redux SPA Application and zero production exceptions. The only possible exception source is network, (like failed API calls) which are easily handled.  
Furthermore by providing Interface declarations describing your API contracts you'll be safe from all possible `null` / `undefined` exceptions coming from API responses.  

### Goals:
- Complete type safety, without failing to `any` type
- Minimize amount of manually typing annotations by leveraging [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)
- Reduce boilerplate with [simple utility functions](https://github.com/piotrwitek/react-redux-typescript) using [Generics](https://www.typescriptlang.org/docs/handbook/generics.html) and [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) features

### Table of Contents
- [React](#react)
  - [Stateless Component](#stateless-component)
  - [Class Component](#class-component)
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
  counter: number,
};

class MyComponent extends React.Component<Props, State> {
  // default props using Property Initializers
  static defaultProps: Partial<Props> = {
    className: 'default-class',
  };

  // initial state using Property Initializers
  state: State = {
    counter: this.props.initialCount || 0,
  };

  // lifecycle methods should be declared as normal instance methods and it's fine
  componentDidMount() {
    // tslint:disable-next-line:no-console
    console.log('Mounted!');
  }

  // handlers using Class Fields with arrow functions
  increaseCounter = () => { this.setState({ counter: this.state.counter + 1 }); };

  render() {
    const { children, initialCount, ...restProps } = this.props;

    return (
      <div {...restProps} onClick={this.increaseCounter} >
        Clicks: {this.state.counter}
        <hr />
        {children}
      </div>
    );
  }
}

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

type BaseProps = {
};

type HOCProps = FormItemProps & {
  error?: string;
};

type FormItemProps = {
  label?: typeof FormItem.prototype.props.label;
  labelCol?: typeof FormItem.prototype.props.labelCol;
  wrapperCol?: typeof FormItem.prototype.props.wrapperCol;
  required?: typeof FormItem.prototype.props.required;
  help?: typeof FormItem.prototype.props.help;
  validateStatus?: typeof FormItem.prototype.props.validateStatus;
  colon?: typeof FormItem.prototype.props.colon;
};

export function withFormItem<WrappedComponentProps extends BaseProps>(
  WrappedComponent:
    React.StatelessComponent<WrappedComponentProps> | React.ComponentClass<WrappedComponentProps>,
) {
  const HOC: React.StatelessComponent<HOCProps & WrappedComponentProps> =
    (props) => {
      const {
        label, labelCol, wrapperCol, required, help, validateStatus, colon,
        error, ...passThroughProps,
      } = props as HOCProps;

      // filtering out empty decorator props in functional style
      const formItemProps: FormItemProps = Object.entries({
        label, labelCol, wrapperCol, required, help, validateStatus, colon,
      }).reduce((definedProps: any, [key, value]) => {
        if (value !== undefined) { definedProps[key] = value; }
        return definedProps;
      }, {});
      
      // injecting additional props based on condition
      if (error) {
        formItemProps.help = error;
        formItemProps.validateStatus = 'error';
      }

      return (
        <FormItem {...formItemProps} hasFeedback={true} >
          <WrappedComponent {...passThroughProps as any} />
        </FormItem>
      );
    };

  return HOC;
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
// NOTE: be aware that compose function need to have sound type declarations or you'll lose type inference
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

- ### KISS Style
In this approach I focused on a KISS principle, and to stay away of proprietary abstractions like it's commonly found in many TypeScript Redux guides, and to stay as close as possible to a familiar JavaScript usage but still reaping the benefits of static types:

- classic const based types
- very close to standard JS usage
- standard boilerplate
- need to export action types and action creators to re-use in other modules like `redux-saga` or `redux-observable`

**DEMO:** [TypeScript Playground](https://www.typescriptlang.org/play/index.html#src=declare%20const%20store%3A%20any%3B%0D%0A%0D%0A%2F%2F%20Action%20Types%0D%0Aexport%20const%20INCREASE_COUNTER%20%3D%20'INCREASE_COUNTER'%3B%0D%0Aexport%20const%20CHANGE_BASE_CURRENCY%20%3D%20'CHANGE_BASE_CURRENCY'%3B%0D%0A%0D%0A%2F%2F%20Action%20Creators%0D%0Aexport%20const%20actionCreators%20%3D%20%7B%0D%0A%20%20increaseCounter%3A%20()%20%3D%3E%20(%7B%0D%0A%20%20%20%20type%3A%20INCREASE_COUNTER%20as%20typeof%20INCREASE_COUNTER%2C%0D%0A%20%20%7D)%2C%0D%0A%20%20changeBaseCurrency%3A%20(payload%3A%20string)%20%3D%3E%20(%7B%0D%0A%20%20%20%20type%3A%20CHANGE_BASE_CURRENCY%20as%20typeof%20CHANGE_BASE_CURRENCY%2C%20payload%2C%0D%0A%20%20%7D)%2C%0D%0A%7D%0D%0A%0D%0A%2F%2F%20Examples%0D%0Astore.dispatch(actionCreators.increaseCounter(4))%3B%20%2F%2F%20Error%3A%20Supplied%20parameters%20do%20not%20match%20any%20signature%20of%20call%20target.%20%0D%0Astore.dispatch(actionCreators.increaseCounter())%3B%20%2F%2F%20OK%20%3D%3E%20%7B%20type%3A%20%22INCREASE_COUNTER%22%20%7D%0D%0A%0D%0Astore.dispatch(actionCreators.changeBaseCurrency())%3B%20%2F%2F%20Error%3A%20Supplied%20parameters%20do%20not%20match%20any%20signature%20of%20call%20target.%20%0D%0Astore.dispatch(actionCreators.changeBaseCurrency('USD'))%3B%20%2F%2F%20OK%20%3D%3E%20%7B%20type%3A%20%22CHANGE_BASE_CURRENCY%22%2C%20payload%3A%20'USD'%20%7D)

```ts
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

- ### DRY Style
In this an alternative a more DRY approach, I'm introducing a simple helper factory function to automate the creation of typed action creators. The advnatage here is we can reduce some boilerplate and code repetition. It is also easier to re-use action creators in other modules:

- using helper factory function to automate creation of typed action creators - (source code to be revealed)
- less boilerplate and code repetition than KISS Style
- easier to re-use in other modules like `redux-saga` or `redux-observable` (action creators have type property, type constants are redundant)

**DEMO:** WIP

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
store.dispatch(actionCreators.increaseCounter()); // OK: { type: "INCREASE_COUNTER" }
actionCreators.increaseCounter.type === "INCREASE_COUNTER" // true

store.dispatch(actionCreators.changeBaseCurrency()); // Error: Supplied parameters do not match any signature of call target. 
store.dispatch(actionCreators.changeBaseCurrency('USD')); // OK: { type: "CHANGE_BASE_CURRENCY", payload: 'USD' }
actionCreators.changeBaseCurrency.type === "CHANGE_BASE_CURRENCY" // true

store.dispatch(actionCreators.showNotification()); // Error: Supplied parameters do not match any signature of call target.
store.dispatch(actionCreators.showNotification('Hello!')); // OK: { type: "SHOW_NOTIFICATION", payload: 'Hello!' }
store.dispatch(actionCreators.showNotification('Hello!', { type: 'warning' })); // OK: { type: "SHOW_NOTIFICATION", payload: 'Hello!', meta: { type: 'warning' } }
actionCreators.showNotification.type === "SHOW_NOTIFICATION" // true
```

---

## Reducers
Relevant TypeScript Docs references:  
- [Discriminated Union types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [Mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) like `Readonly` & `Partial`

### Declare reducer `State` type to achieve compile-time immutability

**DEMO:** [TypeScript Playground](https://www.typescriptlang.org/play/index.html#src=export%20type%20State%20%3D%20%7B%0D%0A%20%20readonly%20counter%3A%20number%2C%0D%0A%20%20readonly%20baseCurrency%3A%20string%2C%0D%0A%7D%3B%0D%0A%0D%0Aexport%20type%20StateAlternative%20%3D%20Readonly%3C%7B%0D%0A%20%20counter%3A%20number%2C%0D%0A%20%20baseCurrency%3A%20string%2C%0D%0A%7D%3E%3B%0D%0A%0D%0Aexport%20const%20initialState%3A%20State%20%3D%20%7B%0D%0A%20%20counter%3A%200%2C%0D%0A%20%20baseCurrency%3A%20'EUR'%2C%0D%0A%7D%3B%0D%0A%0D%0AinitialState.counter%20%3D%203%3B)

```ts
// 1a. use readonly modifier to mark state props as immutable and guard with compiler against any mutations
export type State = {
  readonly counter: number,
  readonly baseCurrency: string,
};

// 1b. if you prefer you can use `Readonly` mapped type as alternative convention
export type StateAlternative = Readonly<{
  counter: number,
  baseCurrency: string,
}>;

// 2. declare initialState using State -> Note: only initialization is allowed with readonly modifiers
export const initialState: State = {
  counter: 0,
  baseCurrency: 'EUR',
};

initialState.counter = 3; // Error: Cannot assign to 'counter' because it is a constant or a read-only property
```

### switch style reducer
- using classic const based types
- good for single prop updates or simple state objects

**DEMO:** [TypeScript Playground](https://www.typescriptlang.org/play/index.html#src=export%20const%20INCREASE_COUNTER%20%3D%20'INCREASE_COUNTER'%3B%0D%0Aexport%20const%20CHANGE_BASE_CURRENCY%20%3D%20'CHANGE_BASE_CURRENCY'%3B%0D%0A%0D%0Atype%20Action%20%3D%20%7B%20type%3A%20typeof%20INCREASE_COUNTER%20%7D%0D%0A%7C%20%7B%20type%3A%20typeof%20CHANGE_BASE_CURRENCY%2C%20payload%3A%20string%20%7D%3B%0D%0A%0D%0Aexport%20type%20State%20%3D%20%7B%0D%0A%20%20readonly%20counter%3A%20number%2C%0D%0A%20%20readonly%20baseCurrency%3A%20string%2C%0D%0A%7D%3B%0D%0A%0D%0Aexport%20const%20initialState%3A%20State%20%3D%20%7B%0D%0A%20%20counter%3A%200%2C%0D%0A%20%20baseCurrency%3A%20'EUR'%2C%0D%0A%7D%3B%0D%0A%0D%0Aexport%20default%20function%20reducer(state%3A%20State%20%3D%20initialState%2C%20action%3A%20Action)%3A%20State%20%7B%0D%0A%20%20switch%20(action.type)%20%7B%0D%0A%20%20%20%20case%20INCREASE_COUNTER%3A%0D%0A%20%20%20%20%20%20return%20%7B%0D%0A%20%20%20%20%20%20%20%20...state%2C%20counter%3A%20state.counter%20%2B%201%2C%20%2F%2F%20no%20payload%0D%0A%20%20%20%20%20%20%7D%3B%0D%0A%20%20%20%20case%20CHANGE_BASE_CURRENCY%3A%0D%0A%20%20%20%20%20%20return%20%7B%0D%0A%20%20%20%20%20%20%20%20...state%2C%20baseCurrency%3A%20action.payload%2C%20%2F%2F%20payload%3A%20string%0D%0A%20%20%20%20%20%20%7D%3B%0D%0A%0D%0A%20%20%20%20default%3A%20return%20state%3B%0D%0A%20%20%7D%0D%0A%7D)

```ts
import { Action } from '../../types';

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case INCREASE_COUNTER:
      return {
        ...state, counter: state.counter + 1, // no payload
      };
    case CHANGE_BASE_CURRENCY:
      return {
        ...state, baseCurrency: action.payload, // payload: string
      };

    default: return state;
  }
}
```

### if's style reducer
> using optional static `type` property on `actionCreator` from helper factory function
- if's "block scope" give you possibility to use local variables for complex state update logic
- by using optional static `type` property on `actionCreator`, we can get rid of *action types constants*, making it easy to create actions and also reuse them to check action type in reducers, sagas, epics etc.

**DEMO:** WIP

```ts
import { Action } from '../../types';

// Reducer
export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case actionCreators.increaseCounter.type:
      return {
        ...state, counter: state.counter + 1, // no payload
      };
    case actionCreators.changeBaseCurrency.type:
      return {
        ...state, baseCurrency: action.payload, // payload: string
      };

    default: return state;
  }
}
```

### Spread operation with Exact Types check to guard against excess or mismatched props  
By using `partialState` object we can achieve guarded object merge during spread operation - this will ensure that the new state object will not have any excess or mismatched properties and is exactly matched against our `State` interface  

**WARNING:** This solution is obligatory at the moment because during spread operation TypeScript compiler will not guard you against superfluous or mismatched props  

**PS:** There is an [Exact Type proposal](https://github.com/Microsoft/TypeScript/issues/12936) to improve this behaviour  

**DEMO:** [TypeScript Playground](https://www.typescriptlang.org/play/index.html#src=export%20const%20INCREASE_COUNTER%20%3D%20'INCREASE_COUNTER'%3B%0D%0Aexport%20const%20CHANGE_BASE_CURRENCY%20%3D%20'CHANGE_BASE_CURRENCY'%3B%0D%0A%0D%0Atype%20Action%20%3D%20%7B%20type%3A%20typeof%20INCREASE_COUNTER%20%7D%0D%0A%7C%20%7B%20type%3A%20typeof%20CHANGE_BASE_CURRENCY%2C%20payload%3A%20string%20%7D%3B%0D%0A%0D%0Aexport%20type%20State%20%3D%20%7B%0D%0A%20%20readonly%20counter%3A%20number%2C%0D%0A%20%20readonly%20baseCurrency%3A%20string%2C%0D%0A%7D%3B%0D%0A%0D%0Aexport%20const%20initialState%3A%20State%20%3D%20%7B%0D%0A%20%20counter%3A%200%2C%0D%0A%20%20baseCurrency%3A%20'EUR'%2C%0D%0A%7D%3B%0D%0A%0D%0Aexport%20function%20badReducer(state%3A%20State%20%3D%20initialState%2C%20action%3A%20Action)%3A%20State%20%7B%0D%0A%20%20if%20(action.type%20%3D%3D%3D%20INCREASE_COUNTER)%20%7B%0D%0A%20%20%20%20return%20%7B%0D%0A%20%20%20%20%20%20...state%2C%0D%0A%20%20%20%20%20%20counterTypoError%3A%20state.counter%20%2B%201%2C%20%2F%2F%20OK%0D%0A%20%20%20%20%7D%3B%20%2F%2F%20it's%20a%20bug!%20but%20the%20compiler%20will%20not%20find%20it%20%0D%0A%20%20%7D%0D%0A%7D%0D%0A%0D%0Aexport%20function%20goodReducer(state%3A%20State%20%3D%20initialState%2C%20action%3A%20Action)%3A%20State%20%7B%0D%0A%20%20let%20partialState%3A%20Partial%3CState%3E%20%7C%20undefined%3B%0D%0A%0D%0A%20%20if%20(action.type%20%3D%3D%3D%20INCREASE_COUNTER)%20%7B%0D%0A%20%20%20%20partialState%20%3D%20%7B%0D%0A%20%20%20%20%20%20counterTypoError%3A%20state.counter%20%2B%201%2C%20%2F%2F%20Error%3A%20Object%20literal%20may%20only%20specify%20known%20properties%2C%20and%20'counterTypoError'%20does%20not%20exist%20in%20type%20'Partial%3CState%3E'.%20%0D%0A%20%20%20%20%7D%3B%20%2F%2F%20now%20it's%20showing%20a%20typo%20error%20correctly%20%0D%0A%20%20%7D%0D%0A%20%20if%20(action.type%20%3D%3D%3D%20CHANGE_BASE_CURRENCY)%20%7B%0D%0A%20%20%20%20partialState%20%3D%20%7B%20%2F%2F%20Error%3A%20Types%20of%20property%20'baseCurrency'%20are%20incompatible.%20Type%20'number'%20is%20not%20assignable%20to%20type%20'string'.%0D%0A%20%20%20%20%20%20baseCurrency%3A%205%2C%0D%0A%20%20%20%20%7D%3B%20%2F%2F%20type%20errors%20also%20works%20fine%20%0D%0A%20%20%7D%0D%0A%0D%0A%20%20return%20partialState%20!%3D%20null%20%3F%20%7B%20...state%2C%20...partialState%20%7D%20%3A%20state%3B%0D%0A%7D)

```ts
import { Action } from '../../types';

// BAD
export function badReducer(state: State = initialState, action: Action): State {
  if (action.type === INCREASE_COUNTER) {
    return {
      ...state,
      counterTypoError: state.counter + 1, // OK
    }; // it's a bug! but the compiler will not find it 
  }
}

// GOOD
export function goodReducer(state: State = initialState, action: Action): State {
  let partialState: Partial<State> | undefined;

  if (action.type === INCREASE_COUNTER) {
    partialState = {
      counterTypoError: state.counter + 1, // Error: Object literal may only specify known properties, and 'counterTypoError' does not exist in type 'Partial<State>'. 
    }; // now it's showing a typo error correctly 
  }
  if (action.type === CHANGE_BASE_CURRENCY) {
    partialState = { // Error: Types of property 'baseCurrency' are incompatible. Type 'number' is not assignable to type 'string'.
      baseCurrency: 5,
    }; // type errors also works fine 
  }

  return partialState != null ? { ...state, ...partialState } : state;
}
```

---

## Store Types

- ### `Action` - statically typed global action types
- should be imported in layers dealing with redux actions like: reducers, redux-sagas, redux-observables
```ts
import { returntypeof } from 'react-redux-typescript';
import * as actionCreators from './action-creators';
const actions = Object.values(actionCreators).map(returntypeof);

export type Action = typeof actions[number];
```

- ### `RootState` - statically typed global state tree
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

// redux has types included in it's npm package - don't install from @types
```

### - should I still use React.PropTypes in TS?
> No. In TypeScript it is unnecessary, when declaring Props and State types (refer to React components examples) you will get completely free intellisense and compile-time safety with static type checking, this way you'll be safe from runtime errors, not waste time on debugging and get an elegant way of describing component external API in your source code.  

### - how to best initialize class instance or static properties?
> Prefered modern style is to use class Property Initializers  
```tsx
class MyComponent extends React.Component<Props, State> {
  // default props using Property Initializers
  static defaultProps: Props = {
    className: 'default-class',
    initialCount: 0,
  };
  
  // initial state using Property Initializers
  state: State = {
    counter: this.props.initialCount,
  };
  ...
}
```

### - how to best declare component handler functions?
> Prefered modern style is to use Class Fields with arrow functions  
```tsx
class MyComponent extends React.Component<Props, State> {
// handlers using Class Fields with arrow functions
  increaseCounter = () => { this.setState({ counter: this.state.counter + 1}); };
  ...
}
```

### - differences between `interface` declarations and `type` aliases
> From practical point of view `interface` types will use it's identity when showing compiler errors, while `type` aliases will be always unwinded to show all the nested types it consists of. This can be too noisy when reading compiler errors and I like to leverage this distinction to hide some not important type details in reported type errors  
Related `ts-lint` rule: https://palantir.github.io/tslint/rules/interface-over-type-literal/  

---

# Project Examples

https://github.com/piotrwitek/react-redux-typescript-starter-kit  
https://github.com/piotrwitek/react-redux-typescript-webpack-starter  
