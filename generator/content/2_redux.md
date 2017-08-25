# Redux

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
