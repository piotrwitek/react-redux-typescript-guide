# Redux

## Actions

### KISS Style
This pattern is focused on a KISS principle - to stay clear of complex proprietary abstractions and follow simple and familiar JavaScript const based types:

- classic const based types
- very close to standard JS usage
- standard amount of boilerplate
- need to export action types and action creators to re-use in other places, e.g. `redux-saga` or `redux-observable`

::example='../../examples/src/redux/counters/actions.ts'::
::usage='../../examples/src/redux/counters/actions.usage.ts'::

### DRY Style
A more DRY approach, introducing a simple factory function to automate the creation of typed action creators. The advantage here is that we can reduce boilerplate and code repetition. It is also easier to re-use action creators in other places because of `type` property on action creator containing type constant:

- using factory function to automate creation of typed action creators - (source code to be revealed)
- less boilerplate and code repetition than KISS Style
- action creators have readonly `type` property (this make using `type constants` redundant and easier to re-use in other places e.g. `redux-saga` or `redux-observable`)

```ts
import { createActionCreator } from 'react-redux-typescript';

// Action Creators
export const actionCreators = {
  increaseCounter: createActionCreator('INCREASE_COUNTER'), // { type: "INCREASE_COUNTER" }
  showNotification: createActionCreator('SHOW_NOTIFICATION', (payload: string, meta?: { severity: string }) => payload),
};

// Examples
store.dispatch(actionCreators.increaseCounter(4)); // Error: Expected 0 arguments, but got 1.
store.dispatch(actionCreators.increaseCounter()); // OK: { type: "INCREASE_COUNTER" }
actionCreators.increaseCounter.type === "INCREASE_COUNTER" // true

store.dispatch(actionCreators.showNotification()); // Error: Supplied parameters do not match any signature of call target.
store.dispatch(actionCreators.showNotification('Hello!')); // OK: { type: "SHOW_NOTIFICATION", payload: 'Hello!' }
store.dispatch(actionCreators.showNotification('Hello!', { severity: 'warning' })); // OK: { type: "SHOW_NOTIFICATION", payload: 'Hello!', meta: { type: 'warning' } }
actionCreators.showNotification.type === "SHOW_NOTIFICATION" // true
```

---

## Reducers
Relevant TypeScript Docs references:  
- [Discriminated Union types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [Mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) e.g. `Readonly` & `Partial`  

### Typing Reducer State
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
> This means that readonly modifier will not be propagated on nested properties of objects or arrays of objects.

```ts
export type State = {
  readonly counterContainer: { mutableCounter: number }
};

const state: State = {
  counterContainer: { mutableCounter: 0 },
};

state.counterContainer.mutableCounter = 1; // No error, can be mutated
```

> You can still achieve nested immutability but you'll need to explicitly mark every nested property as readonly. You can do this quite easily by using convenient `Readonly` or `ReadonlyArray` mapped types.

```ts
type State = Readonly<{
    countersCollection: ReadonlyArray<Readonly<{
      readonlyCounter1: number,
      readonlyCounter2: number,
    }>>,
  }>;

  const state: State = {
    countersCollection: [{
      readonlyCounter1: 0,
      readonlyCounter2: 0,
    }],
  };

  state.countersCollection[0] = { readonlyCounter1: 0, readonlyCounter2: 0 }; // Error, cannot be mutated
  state.countersCollection[0].readonlyCounter1 = 1; // Error, cannot be mutated
  state.countersCollection[0].readonlyCounter2 = 1; // Error, cannot be mutated
```

### Reducer with classic `const types`

::example='../../examples/src/redux/counters/reducer.ts'::

### Reducer with static `type` property from helper factory function - `createActionCreator`
```ts
export default function reducer(state = 0, action: RootAction): State {
  switch (action.type) {
    case actionCreators.increment.type:
      return state.counter + 1;
    case actionCreators.decrement.type:
      return state.counter - 1;

    default: return state;
  }
}
```

---

## Store Types

- ### `RootAction` - statically typed global action types
- should be imported in layers dealing with redux actions like: reducers, redux-sagas, redux-observables

::example='../../examples/src/redux/root-action.ts'::

- ### `RootState` - statically typed global state tree
- should be imported in connected components providing type safety to Redux `connect` function

::example='../../examples/src/redux/root-reducer.ts'::

---

## Create Store

- creating store - use `RootState` (in `combineReducers` and when providing preloaded state object) to set-up **state object type guard** to leverage strongly typed Store instance

::example='../../examples/src/store.ts'::
