# Scalable Application Structure

Creating a scalable application structure is crucial for maintaining large-scale React and Redux projects. This section outlines a feature-based architecture that promotes modularity, reusability, and ease of maintenance.

## Goals

The proposed structure aims to achieve the following objectives:

- **Feature Grouping**: All files related to a specific feature (components, actions, reducers, selectors, types, tests) are grouped together.
- **Easy Feature Management**: Adding, removing, or modifying features becomes straightforward without affecting unrelated parts of the application.
- **On-Demand Feature Control**: Features can be easily enabled or disabled based on configuration or runtime conditions.
- **Reusability and Pluggability**: Features are designed as self-contained modules that can be reused across different Redux applications.

## Recommended Directory Structure

Adopt a **feature-based** (or **domain-driven**) folder structure instead of grouping by file type.

```text
src/
├── app/                  # App-level configuration, root reducer, store setup
│   ├── store.ts
│   ├── rootReducer.ts
│   └── App.tsx
├── features/             # Feature modules
│   ├── auth/             # Authentication feature
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   ├── slices/       # Redux Toolkit slices (or actions/reducers)
│   │   │   └── authSlice.ts
│   │   ├── selectors.ts
│   │   ├── types.ts
│   │   ├── hooks.ts      # Custom hooks for the feature
│   │   └── index.ts      # Public API for the feature
│   ├── dashboard/        # Dashboard feature
│   │   ├── components/
│   │   ├── slices/
│   │   ├── selectors.ts
│   │   ├── types.ts
│   │   └── index.ts
│   └── settings/         # Settings feature
│       └── ...
├── shared/               # Shared utilities, components, and types
│   ├── components/       # Generic UI components (Button, Modal, etc.)
│   ├── hooks/            # Generic hooks
│   ├── utils/            # Helper functions
│   └── types.ts          # Shared TypeScript types
└── main.tsx              # Entry point
```

## Key Principles

### 1. Feature Modules as Self-Contained Units

Each feature in `features/` should be a self-contained module. It should export a public API via its `index.ts` file, hiding internal implementation details.

**Example: `features/auth/index.ts`**

```typescript
// features/auth/index.ts
export { authSlice, authReducer, authActions } from './slices/authSlice';
export { useAuth, useLogin, useLogout } from './hooks';
export { selectIsAuthenticated, selectUser } from './selectors';
export type { AuthState, User } from './types';
```

Consumers of the feature only import from the feature's root:

```typescript
import { useAuth, selectIsAuthenticated } from '@/features/auth';
```

### 2. Redux Toolkit Slices

Use Redux Toolkit's `createSlice` to encapsulate state, actions, and reducers within each feature. This keeps logic localized and reduces boilerplate.

**Example: `features/auth/slices/authSlice.ts`**

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
```

### 3. Custom Hooks for Feature Logic

Encapsulate feature-specific logic in custom hooks to simplify component usage and promote reusability.

**Example: `features/auth/hooks.ts`**

```typescript
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout } from './slices/authSlice';
import { selectIsAuthenticated, selectUser } from './selectors';
import type { User } from './types';

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      dispatch(loginStart());
      // Simulate API call
      const response = await fakeLoginAPI(credentials);
      dispatch(loginSuccess(response.user));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  const logout = () => {
    dispatch(logout());
  };

  return { login, logout, isAuthenticated, user };
};
```

### 4. Enabling/Disabling Features

To enable or disable features on demand, use conditional rendering or feature flags at the store or component level.

**Example: Conditional Feature Loading**

```typescript
// features/dashboard/index.ts
export const DashboardFeature = () => {
  const isFeatureEnabled = useFeatureFlag('dashboard');

  if (!isFeatureEnabled) return null;

  return <Dashboard />;
};
```

Alternatively, you can conditionally include slices in the root reducer:

```typescript
// app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '@/features/auth';
import { dashboardReducer } from '@/features/dashboard';
import { settingsReducer } from '@/features/settings';

const featureFlags = {
  dashboard: true,
  settings: false,
};

const rootReducer = combineReducers({
  auth: authReducer,
  ...(featureFlags.dashboard && { dashboard: dashboardReducer }),
  ...(featureFlags.settings && { settings: settingsReducer }),
});

export default rootReducer;
```

### 5. Reusability Across Applications

Design features to be independent of the main app's context. Avoid importing from `app/` or other features directly. Instead, use dependency injection or props for external dependencies.

**Example: Making a Feature Reusable**

```typescript
// features/user-profile/components/UserProfile.tsx
interface UserProfileProps {
  userId: string;
  onUserUpdate?: (user: User) => void;
}

export const UserProfile = ({ userId, onUserUpdate }: UserProfileProps) => {
  // Feature logic here
  return <div>User Profile for {userId}</div>;
};
```

This component can be used in any Redux app that provides the necessary props.

## Benefits of This Structure

- **Maintainability**: Changes to a feature are localized, reducing the risk of side effects.
- **Scalability**: New features can be added without restructuring the entire codebase.
- **Testability**: Each feature can be tested in isolation.
- **Collaboration**: Teams can work on different features without merge conflicts.
- **Flexibility**: Features can be toggled, replaced, or reused as needed.

## Conclusion

Adopting a feature-based structure with clear boundaries and public APIs empowers teams to build scalable, maintainable, and flexible React-Redux applications. By treating features as pluggable modules, you ensure that your codebase grows gracefully alongside your product.