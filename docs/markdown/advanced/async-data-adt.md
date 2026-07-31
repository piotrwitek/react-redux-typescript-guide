---
title: Modelling Async Data with ADT
---

# Modelling Async Data with Algebraic Data Types

When working with asynchronous data in React and Redux applications, it's common to see state modelled with multiple boolean flags and nullable fields. This approach can lead to invalid states and edge cases that are difficult to handle correctly.

By using **Algebraic Data Types (ADTs)** and discriminated unions, we can model our data structures to make invalid states unrepresentable, forcing our UI components to handle all possible states explicitly.

## The Problem

Consider a typical approach to modelling remote data:

```ts
type State = {
  readonly isFetching: boolean;
  readonly error: string | null;
  readonly users: Array<User>;
};
```

This structure allows for **invalid states**:
- `isFetching: true` with `error: "Network error"` and `users: [...]` — which state is correct?
- `isFetching: false` with `error: null` and `users: []` — is this initial state, success with no data, or an error?

These ambiguities lead to bugs where the UI doesn't know which field to trust.

## The Solution: RemoteData ADT

Model your async data as a discriminated union that represents exactly one state at a time:

```ts
type RemoteData<E, D> =
  | { status: 'INITIAL' }
  | { status: 'LOADING' }
  | { status: 'ERROR'; error: E }
  | { status: 'SUCCESS'; data: D };
```

Now your state is simple and unambiguous:

```ts
type State = RemoteData<Error, Array<User>>;
```

### Benefits

1. **Invalid states are impossible** — you can't have both an error and data simultaneously
2. **Exhaustive checking** — TypeScript forces you to handle all cases
3. **Self-documenting** — the type clearly shows all possible states
4. **Easier testing** — each state is discrete and testable

## Implementation

### Reducer

```ts
import { Reducer } from 'redux';

type User = {
  id: string;
  name: string;
};

type RemoteData<E, D> =
  | { status: 'INITIAL' }
  | { status: 'LOADING' }
  | { status: 'ERROR'; error: E }
  | { status: 'SUCCESS'; data: D };

type UsersState = RemoteData<Error, Array<User>>;

type Action =
  | { type: 'FETCH_USERS_REQUEST' }
  | { type: 'FETCH_USERS_SUCCESS'; payload: Array<User> }
  | { type: 'FETCH_USERS_FAILURE'; payload: Error };

const initialState: UsersState = { status: 'INITIAL' };

const usersReducer: Reducer<UsersState, Action> = (state = initialState, action) => {
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

### Component

```tsx
import * as React from 'react';
import { connect } from 'react-redux';

type User = {
  id: string;
  name: string;
};

type RemoteData<E, D> =
  | { status: 'INITIAL' }
  | { status: 'LOADING' }
  | { status: 'ERROR'; error: E }
  | { status: 'SUCCESS'; data: D };

type Props = {
  usersModel: RemoteData<Error, Array<User>>;
};

const UsersView: React.FC<Props> = ({ usersModel }) => {
  // TypeScript ensures we handle all cases
  switch (usersModel.status) {
    case 'INITIAL':
      return null;
    
    case 'LOADING':
      return <div>Loading users...</div>;
    
    case 'ERROR':
      return (
        <div className="error">
          An error occurred: {usersModel.error.message}
        </div>
      );
    
    case 'SUCCESS':
      return (
        <ul>
          {usersModel.data.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      );
  }
};

type RootState = {
  users: RemoteData<Error, Array<User>>;
};

const mapStateToProps = (state: RootState) => ({
  usersModel: state.users,
});

export default connect(mapStateToProps)(UsersView);
```

## Advanced Patterns

### Reusable Helper Functions

Create utility functions to work with `RemoteData`:

```ts
const isLoading = <E, D>(data: RemoteData<E, D>): boolean =>
  data.status === 'LOADING';

const isSuccess = <E, D>(data: RemoteData<E, D>): data is { status: 'SUCCESS'; data: D } =>
  data.status === 'SUCCESS';

const getData = <E, D>(data: RemoteData<E, D>): D | null =>
  data.status === 'SUCCESS' ? data.data : null;

const mapSuccess = <E, D, R>(
  data: RemoteData<E, D>,
  fn: (data: D) => R
): RemoteData<E, R> => {
  if (data.status === 'SUCCESS') {
    return { status: 'SUCCESS', data: fn(data.data) };
  }
  return data as RemoteData<E, R>;
};
```

### Combining Multiple Remote Data Sources

```ts
type CombinedProps = {
  users: RemoteData<Error, Array<User>>;
  posts: RemoteData<Error, Array<Post>>;
};

const CombinedView: React.FC<CombinedProps> = ({ users, posts }) => {
  // Show loading if either is loading
  if (users.status === 'LOADING' || posts.status === 'LOADING') {
    return <div>Loading...</div>;
  }

  // Show error if either has an error
  if (users.status === 'ERROR') {
    return <div>Error loading users: {users.error.message}</div>;
  }
  if (posts.status === 'ERROR') {
    return <div>Error loading posts: {posts.error.message}</div>;
  }

  // Both must be SUCCESS here (TypeScript knows this)
  if (users.status === 'SUCCESS' && posts.status === 'SUCCESS') {
    return (
      <div>
        <h2>Users: {users.data.length}</h2>
        <h2>Posts: {posts.data.length}</h2>
      </div>
    );
  }

  // Initial state
  return null;
};
```

### With Refetching State

If you need to distinguish between initial loading and refetching:

```ts
type RemoteDataWithRefresh<E, D> =
  | { status: 'INITIAL' }
  | { status: 'LOADING' }
  | { status: 'REFRESHING'; data: D }
  | { status: 'ERROR'; error: E }
  | { status: 'SUCCESS'; data: D };
```

## Comparison with Other Approaches

| Approach | Invalid States | Type Safety | Exhaustiveness |
|----------|----------------|-------------|----------------|
| Multiple booleans | ✗ Many | ✓ Partial | ✗ No |
| Nullable fields | ✗ Some | ✓ Partial | ✗ No |
| **ADT/Union** | **✓ None** | **✓ Full** | **✓ Yes** |

## Summary

By modelling async data with discriminated unions:

- **Invalid states become unrepresentable** at the type level
- **TypeScript enforces exhaustive handling** of all cases
- **Components are more robust** and easier to reason about
- **Bugs are caught at compile time** instead of runtime

This pattern is especially valuable in large applications where async data flows through many components and reducers.
