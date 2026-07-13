## Modelling Async Data with ADT

### Problem

A common approach to modelling remote/async data in a Redux reducer looks like this:

```ts
type State = {
  readonly isFetching: boolean;
  readonly error: string | null;
  readonly users: Array<User>;
};
```

This representation has several problems:
- It allows **impossible states** (e.g. `isFetching: true` and `error: 'some error'` at the same time)
- Components must handle boolean combinations that may never actually occur
- Nothing in the type system forces UI code to handle all states

---

### Solution: Use a discriminated union (ADT)

Define a generic `RemoteData<E, D>` type that can only ever be in one of four valid states:

```ts
type RemoteData<E, D> =
  | { status: 'INITIAL' }
  | { status: 'LOADING' }
  | { status: 'ERROR'; error: E }
  | { status: 'SUCCESS'; data: D };
```

Now declare your reducer state as simply as:

```ts
type State = RemoteData<Error, Array<User>>;
```

There is no way to accidentally represent an impossible combination.

---

### Reducer example

```ts
import { Reducer } from 'redux';

type User = {
  id: number;
  name: string;
};

type RemoteData<E, D> =
  | { status: 'INITIAL' }
  | { status: 'LOADING' }
  | { status: 'ERROR'; error: E }
  | { status: 'SUCCESS'; data: D };

type State = RemoteData<Error, Array<User>>;

type Action =
  | { type: 'FETCH_USERS_REQUEST' }
  | { type: 'FETCH_USERS_SUCCESS'; payload: Array<User> }
  | { type: 'FETCH_USERS_FAILURE'; payload: Error };

const initialState: State = { status: 'INITIAL' };

const usersReducer: Reducer<State, Action> = (
  state = initialState,
  action
): State => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return { status: 'LOADING' };
    case 'FETCH_USERS_SUCCESS':
      return { status: 'SUCCESS', data: action.payload };
    case 'FETCH_USERS_FAILURE':
      return { status: 'ERROR', error: action.payload };
    default:
      return state;
  }
};
```

---

### React component example

Because `RemoteData` is a discriminated union, TypeScript will narrow the type automatically inside each branch, giving you full type safety:

```tsx
import * as React from 'react';
import { connect } from 'react-redux';

type User = {
  id: number;
  name: string;
};

type RemoteData<E, D> =
  | { status: 'INITIAL' }
  | { status: 'LOADING' }
  | { status: 'ERROR'; error: E }
  | { status: 'SUCCESS'; data: D };

type Props = {
  usersData: RemoteData<Error, Array<User>>;
};

const UserList: React.FC<Props> = ({ usersData }) => {
  if (usersData.status === 'INITIAL') {
    return null;
  }

  if (usersData.status === 'LOADING') {
    return <div>Loading...</div>;
  }

  if (usersData.status === 'ERROR') {
    // TypeScript knows `usersData.error` exists here
    return <div>An error has occurred: {usersData.error.message}</div>;
  }

  // TypeScript knows `usersData.data` exists here
  return (
    <ul>
      {usersData.data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state: RemoteData<Error, Array<User>>) => ({
  usersData: state,
});

export default connect(mapStateToProps)(UserList);
```

---

### Benefits

| Concern | Boolean flags approach | ADT approach |
|---|---|---|
| Impossible states | ✗ Possible | ✓ Impossible |
| Type narrowing in components | ✗ Manual casting | ✓ Automatic |
| Exhaustiveness checking | ✗ None | ✓ Compiler enforced |
| Self-documenting | ✗ Implicit | ✓ Explicit status labels |

> **Tip:** You can reuse `RemoteData<E, D>` across your entire application for any piece of async data, keeping conventions consistent in both reducers and view components.
