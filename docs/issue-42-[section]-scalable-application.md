# Scalable Application Structure

Creating a scalable application structure is crucial for maintaining large-scale React and Redux applications. This section outlines a feature-based architecture that promotes modularity, reusability, and easy maintenance.

## Goals

- **Files grouped by features**: Organize code around business capabilities rather than technical roles.
- **Easy to add/remove features**: Features should be self-contained modules that can be added or removed without affecting the rest of the application.
- **Enable/disable feature on demand**: Support runtime feature toggling and lazy loading.
- **Reusable and pluggable features**: Design features to be independent and reusable across different Redux applications.

## Feature-Based Architecture

Instead of organizing files by type (e.g., all actions in one folder, all reducers in another), organize by feature:

```
src/
├── features/
│   ├── user/
│   │   ├── UserActions.ts
│   │   ├── UserReducer.ts
│   │   ├── UserSelectors.ts
│   │   ├── UserSagas.ts
│   │   ├── UserTypes.ts
│   │   ├── UserComponent.tsx
│   │   └── index.ts
│   ├── products/
│   │   ├── ProductActions.ts
│   │   ├── ProductReducer.ts
│   │   ├── ProductSelectors.ts
│   │   ├── ProductSagas.ts
│   │   ├── ProductTypes.ts
│   │   ├── ProductComponent.tsx
│   │   └── index.ts
│   └── auth/
│       ├── AuthActions.ts
│       ├── AuthReducer.ts
│       ├── AuthSelectors.ts
│       ├── AuthSagas.ts
│       ├── AuthTypes.ts
│       ├── AuthComponent.tsx
│       └── index.ts
├── store/
│   ├── index.ts
│   └── configureStore.ts
├── App.tsx
└── index.tsx
```

## Feature Module Structure

Each feature should be a self-contained module with its own:

- **Types**: Define TypeScript interfaces and types specific to the feature.
- **Actions**: Action creators and action types.
- **Reducer**: State management logic for the feature.
- **Selectors**: Derived state selectors.
- **Sagas/Effects**: Side effects and async logic.
- **Components**: UI components related to the feature.
- **Index file**: Public API for the feature.

### Example: User Feature Module

**UserTypes.ts**
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export const USER_ACTIONS = {
  FETCH_USER: 'user/fetchUser',
  FETCH_USER_SUCCESS: 'user/fetchUserSuccess',
  FETCH_USER_FAILURE: 'user/fetchUserFailure',
  LOGOUT: 'user/logout',
} as const;
```

**UserActions.ts**
```typescript
import { USER_ACTIONS } from './UserTypes';

export const fetchUser = () => ({
  type: USER_ACTIONS.FETCH_USER,
});

export const fetchUserSuccess = (user: User) => ({
  type: USER_ACTIONS.FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error: string) => ({
  type: USER_ACTIONS.FETCH_USER_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: USER_ACTIONS.LOGOUT,
});
```

**UserReducer.ts**
```typescript
import { UserState, USER_ACTIONS } from './UserTypes';

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case USER_ACTIONS.FETCH_USER:
      return { ...state, loading: true, error: null };
    case USER_ACTIONS.FETCH_USER_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload };
    case USER_ACTIONS.FETCH_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case USER_ACTIONS.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
```

**UserSelectors.ts**
```typescript
import { RootState } from '../../store';

export const selectUserState = (state: RootState) => state.user;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
```

**UserSagas.ts**
```typescript
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUser, fetchUserSuccess, fetchUserFailure } from './UserActions';
import { USER_ACTIONS } from './UserTypes';
import { apiFetchUser } from './api';

function* fetchUserSaga() {
  try {
    const user = yield call(apiFetchUser);
    yield put(fetchUserSuccess(user));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

export function* userSaga() {
  yield takeLatest(USER_ACTIONS.FETCH_USER, fetchUserSaga);
}
```

**index.ts**
```typescript
export * from './UserTypes';
export * from './UserActions';
export * from './UserReducer';
export * from './UserSelectors';
export * from './UserSagas';
export { default as UserComponent } from './UserComponent';
```

## Configuring the Store

Combine feature reducers and sagas in the store configuration:

**store/configureStore.ts**
```typescript
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { userReducer } from '../features/user';
import { productReducer } from '../features/products';
import { authReducer } from '../features/auth';
import { userSaga } from '../features/user';
import { productSaga } from '../features/products';
import { authSaga } from '../features/auth';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(userSaga);
sagaMiddleware.run(productSaga);
sagaMiddleware.run(authSaga);

export type RootState = ReturnType<typeof rootReducer>;
```

## Enabling/Disabling Features

### Runtime Feature Toggles

Use feature flags to enable/disable features at runtime:

```typescript
// features/featureFlags.ts
export const FEATURE_FLAGS = {
  USER_FEATURE: true,
  PRODUCT_FEATURE: false,
  AUTH_FEATURE: true,
};

// store/configureStore.ts
import { FEATURE_FLAGS } from '../features/featureFlags';

const rootReducer = combineReducers({
  ...(FEATURE_FLAGS.USER_FEATURE && { user: userReducer }),
  ...(FEATURE_FLAGS.PRODUCT_FEATURE && { products: productReducer }),
  ...(FEATURE_FLAGS.AUTH_FEATURE && { auth: authReducer }),
});
```

### Lazy Loading Features

Use dynamic imports to load features on demand:

```typescript
// App.tsx
import { lazy, Suspense } from 'react';

const UserComponent = lazy(() => import('./features/user/UserComponent'));
const ProductComponent = lazy(() => import('./features/products/ProductComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {FEATURE_FLAGS.USER_FEATURE && <UserComponent />}
      {FEATURE_FLAGS.PRODUCT_FEATURE && <ProductComponent />}
    </Suspense>
  );
}
```

## Making Features Reusable and Pluggable

### Dependency Injection

Design features to accept dependencies through props or context:

```typescript
// features/user/UserComponent.tsx
interface UserComponentProps {
  apiService: {
    fetchUser: () => Promise<User>;
  };
  onUserLoaded: (user: User) => void;
}

export const UserComponent: React.FC<UserComponentProps> = ({ apiService, onUserLoaded }) => {
  // Component logic using injected dependencies
};
```

### Feature Contracts

Define clear interfaces for feature interactions:

```typescript
// features/types.ts
export interface FeatureModule {
  name: string;
  reducer: Reducer;
  saga: () => Saga;
  selectors: Record<string, Selector>;
  actions: Record<string, ActionCreator>;
}

// features/user/index.ts
export const userFeature: FeatureModule = {
  name: 'user',
  reducer: userReducer,
  saga: userSaga,
  selectors: {
    selectCurrentUser,
    selectUserLoading,
    selectUserError,
  },
  actions: {
    fetchUser,
    fetchUserSuccess,
    fetchUserFailure,
    logout