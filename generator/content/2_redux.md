# Redux

## Actions

### KISS Style
This pattern is focused on a KISS principle - to stay clear of complex proprietary abstractions and follow simple and familiar JavaScript const based types:

- classic const based types
- very close to standard JS usage
- standard amount of boilerplate
- need to export action types and action creators to re-use in other places, e.g. `redux-saga` or `redux-observable`

::example='../../playground/src/redux/counters/actions.ts'::
::usage='../../playground/src/redux/counters/actions.usage.ts'::

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

::example='../../playground/src/redux/counters/reducer.ts'::

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

::example='../../playground/src/redux/root-action.ts'::

- ### `RootState` - statically typed global state tree
- should be imported in connected components providing type safety to Redux `connect` function

::example='../../playground/src/redux/root-reducer.ts'::

---

## Create Store

- creating store - use `RootState` (in `combineReducers` and when providing preloaded state object) to set-up **state object type guard** to leverage strongly typed Store instance

::example='../../playground/src/store.ts'::
