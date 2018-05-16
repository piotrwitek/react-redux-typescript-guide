# Redux

## Action Creators

> We'll be using a battle-tested library [![NPM Downloads](https://img.shields.io/npm/dm/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions)
 that automates and simplify maintenace of **type annotations in Redux Architectures** [`typesafe-actions`](https://github.com/piotrwitek/typesafe-actions#typesafe-actions)

### You should read [The Mighty Tutorial](https://github.com/piotrwitek/typesafe-actions#behold-the-mighty-tutorial) to learn it all the easy way!

A solution below is using simple factory function to automate the creation of type-safe action creators. The goal is to reduce the maintainability and code repetition of type annotations for actions and creators and the result is completely typesafe action-creators and their actions.

::example='../../playground/src/features/counters/actions.ts'::
::usage='../../playground/src/features/counters/actions.usage.ts'::

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

Readonly modifier allow initialization, but will not allow rassignment by highlighting compiler errors
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

::example='../../playground/src/features/todos/reducer.ts'::

[⇧ back to top](#table-of-contents)

### Testing reducer

::example='../../playground/src/features/todos/reducer.spec.ts'::

[⇧ back to top](#table-of-contents)

---

## Store Configuration

### Create Global RootState and RootAction Types

#### `RootState` - type representing root state-tree
Can be imported in connected components to provide type-safety to Redux `connect` function

#### `RootAction` - type representing union type of all action objects
Can be imported in various layers receiving or sending redux actions like: reducers, sagas or redux-observables epics

::example='../../playground/src/store/types.d.ts'::

[⇧ back to top](#table-of-contents)

### Create Store

When creating a store instance we don't need to provide any additional types. It will set-up a **type-safe Store instance** using type inference.
> The resulting store instance methods like `getState` or `dispatch` will be type checked and will expose all type errors

::example='../../playground/src/store/store.ts'::

---

## Async Flow

### "redux-observable"

### For more examples and in-depth explanation you should read [The Mighty Tutorial](https://github.com/piotrwitek/typesafe-actions#behold-the-mighty-tutorial) to learn it all the easy way!

::example='../../playground/src/features/todos/epics.ts'::

[⇧ back to top](#table-of-contents)

---

## Selectors

### "reselect"

::example='../../playground/src/features/todos/selectors.ts'::

[⇧ back to top](#table-of-contents)
