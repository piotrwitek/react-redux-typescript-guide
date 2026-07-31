# Scalable Application Structure

## Table of Contents

- [Overview](#overview)
- [Core Principles](#core-principles)
- [Feature-Based Structure](#feature-based-structure)
- [Implementation Guide](#implementation-guide)
- [Feature Module Pattern](#feature-module-pattern)
- [Dynamic Feature Loading](#dynamic-feature-loading)
- [Type Safety](#type-safety)
- [Best Practices](#best-practices)

## Overview

This guide demonstrates how to structure a React + Redux + TypeScript application for scalability, maintainability, and feature reusability. The architecture focuses on:

- **Files grouped by features** - Collocate related code
- **Easy to add/remove features** - Minimal coupling between features
- **Enable/disable features on demand** - Runtime feature toggling
- **Reusable and pluggable features** - Share features across applications

## Core Principles

### 1. Feature Isolation

Each feature is self-contained with its own:
- Components
- Redux slice (actions, reducer, selectors)
- Types
- Utilities
- Tests

### 2. Explicit Dependencies

Features declare their dependencies explicitly, making it clear what they need to function.

### 3. Type-Safe Integration

TypeScript ensures features integrate correctly with the application and each other.

## Feature-Based Structure

```
src/
├── features/
│   ├── auth/
│   │   ├── index.ts                 # Public API
│   │   ├── types.ts                 # Feature types
│   │   ├── slice.ts                 # Redux slice
│   │   ├── selectors.ts             # Selectors
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── UserProfile.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   └── __tests__/
│   │       └── slice.test.ts
│   ├── products/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   ├── slice.ts
│   │   ├── selectors.ts
│   │   ├── components/
│   │   │   ├── ProductList.tsx
│   │   │   └── ProductDetail.tsx
│   │   └── __tests__/
│   │       └── slice.test.ts
│   └── cart/
│       ├── index.ts
│       ├── types.ts
│       ├── slice.ts
│       ├── selectors.ts
│       ├── components/
│       │   └── Cart.tsx
│       └── __tests__/
│           └── slice.test.ts
├── app/
│   ├── store.ts                     # Store configuration
│   ├── rootReducer.ts               # Root reducer
│   └── featureRegistry.ts           # Feature registry
├── shared/
│   ├── components/                  # Shared components
│   ├── hooks/                       # Shared hooks
│   └── utils/                       # Shared utilities
└── types/
    └── global.ts                    # Global types
```

## Implementation Guide

### Step 1: Define Feature Interface

```typescript
// types/global.ts
import { Reducer } from '@reduxjs/toolkit';

export interface FeatureModule<TState = any> {
  name: string;
  reducer: Reducer<TState>;
  enabled?: boolean;
  dependencies?: string[];
}

export interface FeatureConfig {
  [featureName: string]: boolean;
}
```

### Step 2: Create Feature Module

```typescript
// features/auth/types.ts
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

```typescript
// features/auth/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from './types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
```

```typescript
// features/auth/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const selectAuthState = (state: RootState) => state.auth;

export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth?.user ?? null
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth?.isAuthenticated ?? false
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth?.isLoading ?? false
);
```

```typescript
// features/auth/index.ts
import { FeatureModule } from '../../types/global';
import authReducer from './slice';
import { AuthState } from './types';

export * from './types';
export * from './slice';
export * from './selectors';
export { default as LoginForm } from './components/LoginForm';
export { default as UserProfile } from './components/UserProfile';

const authFeature: FeatureModule<AuthState> = {
  name: 'auth',
  reducer: authReducer,
  enabled: true,
};

export default authFeature;
```

### Step 3: Feature Registry

```typescript
// app/featureRegistry.ts
import { FeatureModule, FeatureConfig } from '../types/global';

class FeatureRegistry {
  private features = new Map<string, FeatureModule>();
  private config: FeatureConfig = {};

  register(feature: FeatureModule): void {
    if (this.features.has(feature.name)) {
      console.warn(`Feature "${feature.name}" is already registered`);
      return;
    }

    // Check dependencies
    if (feature.dependencies) {
      for (const dep of feature.dependencies) {
        if (!this.features.has(dep)) {
          throw new Error(
            `Feature "${feature.name}" depends on "${dep}" which is not registered`
          );
        }
      }
    }

    this.features.set(feature.name, feature);
    this.config[feature.name] = feature.enabled ?? true;
  }

  unregister(featureName: string): void {
    // Check if other features depend on this
    for (const [name, feature] of this.features.entries()) {
      if (feature.dependencies?.includes(featureName)) {
        throw new Error(
          `Cannot unregister "${featureName}" because "${name}" depends on it`
        );
      }
    }

    this.features.delete(featureName);
    delete this.config[featureName];
  }

  getFeature(name: string): FeatureModule | undefined {
    return this.features.get(name);
  }

  getAllFeatures(): FeatureModule[] {
    return Array.from(this.features.values());
  }

  getEnabledFeatures(): FeatureModule[] {
    return this.getAllFeatures().filter(
      (feature) => this.config[feature.name] !== false
    );
  }

  isEnabled(featureName: string): boolean {
    return this.config[featureName] ?? false;
  }

  enable(featureName: string): void {
    if (!this.features.has(featureName)) {
      throw new Error(`Feature "${featureName}" is not registered`);
    }
    this.config[featureName] = true;
  }

  disable(featureName: string): void {
    if (!this.features.has(featureName)) {
      throw new Error(`Feature "${featureName}" is not registered`);
    }
    this.config[featureName] = false;
  }
}

export const featureRegistry = new FeatureRegistry();
```

### Step 4: Dynamic Root Reducer

```typescript
// app/rootReducer.ts
import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { featureRegistry } from './featureRegistry';

export function createRootReducer(): Reducer {
  const enabledFeatures = featureRegistry.getEnabledFeatures();
  
  const reducers = enabledFeatures.reduce(
    (acc, feature) => {
      acc[feature.name] = feature.reducer;
      return acc;
    },
    {} as Record<string, Reducer>
  );

  return combineReducers(reducers);
}
```

### Step 5: Store Configuration

```typescript
// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { createRootReducer } from './rootReducer';
import { featureRegistry } from './featureRegistry';

// Import and register features
import authFeature from '../features/auth';
import productsFeature from '../features/products';
import cartFeature from '../features/cart';

featureRegistry.register(authFeature);
featureRegistry.register(productsFeature);
featureRegistry.register(cartFeature);

export const store = configureStore({
  reducer: createRootReducer(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Step 6: Typed Hooks

```typescript
// app/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Feature Module Pattern

### Complete Feature Example

```typescript
// features/products/types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ProductsState {
  items: Product[];
  selectedId: string | null;
  isLoading: boolean;
  error: string | null;
}
```

```typescript
// features/products/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from './types';

const initialState: ProductsState = {
  items: [],
  selectedId: null,
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
      state.isLoading = false;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    selectProduct(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  selectProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
```

```typescript
// features/products/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const selectProductsState = (state: RootState) => state.products;

export const selectAllProducts = createSelector(
  [selectProductsState],
  (products) => products?.items ?? []
);

export const selectSelectedProductId = createSelector(
  [selectProductsState],
  (products) => products?.selectedId ?? null
);

export const selectSelectedProduct = createSelector(
  [selectAllProducts, selectSelectedProductId],
  (products, selectedId) =>
    selectedId ? products.find((p) => p.id === selectedId) ?? null : null
);

export const selectProductsLoading = createSelector(
  [selectProductsState],
  (products) => products?.isLoading ?? false
);
```

```typescript
// features/products/components/ProductList.tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectAllProducts, selectProductsLoading } from '../selectors';
import { selectProduct } from '../slice';

const ProductList: React.FC = () => {
  const products = useAppSelector(selectAllProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <button onClick={() => dispatch(selectProduct(product.id))}>
              {product.name} - ${product.price}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
```

```typescript
// features/products/index.ts
import { FeatureModule } from '../../types/global';
import productsReducer from './slice';
import { ProductsState } from './types';

export * from './types';
export * from './slice';
export * from './selectors';
export { default as ProductList } from './components/ProductList';
export { default as ProductDetail } from './components/ProductDetail';

const productsFeature: FeatureModule<ProductsState> = {
  name: 'products',
  reducer: productsReducer,
  enabled: true,
};

export default productsFeature;
```

## Dynamic Feature Loading

### Runtime Feature Toggle

```typescript
// app/FeatureToggle.tsx
import React from 'react';
import { featureRegistry } from './featureRegistry';

interface FeatureToggleProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const FeatureToggle: React.FC<FeatureToggleProps> = ({
  feature,
  children,
  fallback = null,
}) => {
  const isEnabled = featureRegistry.isEnabled(feature);
  return <>{isEnabled ? children : fallback}</>;
};
```

### Usage Example

```typescript
// App.tsx
import React from 'react';
import { FeatureToggle } from './app/FeatureToggle';
import { ProductList } from './features/products';
import { Cart } from './features/cart';

const App: React.FC = () => {
  return (
    <div>
      <h1>My Store</h1>
      
      <FeatureToggle feature="products">
        <ProductList />
      </FeatureToggle>
      
      <FeatureToggle feature="cart" fallback={<div>Cart disabled</div>}>
        <Cart />
      </FeatureToggle>
    </div>
  );
};

export default App;
```

### Environment-Based Configuration

```typescript
// config/features.ts
import { FeatureConfig } from '../types/global';

const developmentFeatures: FeatureConfig = {
  auth: true,
  products: true,
  cart: true,
  analytics: true,
  experimental: true,
};

const productionFeatures: FeatureConfig = {
  auth: true,
  products: true,
  cart: true,
  analytics: true,
  experimental: false,
};

export const featureConfig =
  process.env.NODE_ENV === 'production'
    ? productionFeatures
    : developmentFeatures;
```

```typescript
// app/store.ts (updated)
import { configureStore } from '@reduxjs/toolkit';
import { createRootReducer } from './rootReducer';
import { featureRegistry } from './featureRegistry';
import { featureConfig } from '../config/features';

import authFeature from '../features/auth';
import productsFeature from '../features/products';
import cartFeature from '../features/cart';

// Register features
featureRegistry.register(authFeature);
featureRegistry.register(productsFeature);
featureRegistry.register(cartFeature);

// Apply configuration
Object.entries(featureConfig).forEach(([name, enabled]) => {
  if (enabled) {
    featureRegistry.enable(name);
  } else {
    featureRegistry.disable(name);
  }
});

export const store = configureStore({
  reducer: createRootReducer(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Type Safety

### Conditional State Types

```typescript
// types/global.ts (extended)
import { AuthState } from '../features/auth/types';
import { ProductsState } from '../features/products/types';
import { CartState } from '../features/cart/types';

export interface BaseRootState {}

export interface RootStateWithAuth extends BaseRootState {
  auth: AuthState;
}

export interface RootStateWithProducts extends BaseRootState {
  products: ProductsState;
}

export interface RootStateWithCart extends BaseRootState {
  cart: CartState;
}

// Helper to safely access feature state
export function selectFeatureState<T>(
  state: any,
  featureName: string
): T | undefined {
  return state[featureName] as T | undefined;
}
```

### Feature-Aware Selectors

```typescript
// features/cart/selectors.ts (with dependency)
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { selectIsAuthenticated } from '../auth/selectors';

const selectCartState = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart?.items ?? []
);

// Selector that depends on another feature
export const selectCanCheckout = createSelector(
  [selectCartItems, selectIsAuthenticated],
  (items, isAuthenticated) => items.length > 0 && isAuthenticated
);
```

## Best Practices

### 1. Feature Independence

✅ **Good**: Features communicate through well-defined selectors

```typescript
// features/cart/slice.ts
import { createSlice } from '@reduxjs/toolkit';
import { selectIsAuthenticated } from '../auth/selectors';

// Use selectors to read from other features
```

❌ **Bad**: Direct state access

```typescript
// Don't access state.auth directly from cart feature
const user = state.auth.user; // Tight coupling
```

### 2. Explicit Dependencies

```typescript
// features/cart/index.ts
const cartFeature: FeatureModule<CartState> = {
  name: 'cart',
  reducer: cartReducer,
  enabled: true,
  dependencies: ['auth', 'products'], // Explicit dependencies
};
```

### 3. Public API Surface

Only export what's needed:

```typescript
// features/products/index.ts
// Export types
export type { Product, ProductsState } from './types';

// Export actions
export { selectProduct } from './slice';

// Export selectors
export { selectAllProducts, selectSelectedProduct } from './selectors';

// Export components
export { default as ProductList } from './components/ProductList';

// Don't export internal utilities
// import { internalHelper } from './utils'; // Keep private
```

### 4. Feature Initialization

```typescript
// features/auth/slice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async () => {
    // Load persisted auth state
    const token = localStorage.getItem('authToken');
    if (token) {
      // Validate and return user
    }
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { /* ... */ },
  extraReducers: (builder) => {
    builder.addCase(initializeAuth.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    });
  },
});
```

### 5. Testing Features in Isolation

```typescript
// features/products/__tests__/slice.test.ts
import { configureStore } from '@reduxjs/toolkit';
import productsReducer, {
  fetchProductsSuccess,
  selectProduct,
} from '../slice';
import { ProductsState } from '../types';

describe('products slice', () => {
  const initialState: ProductsState = {
    items: [],
    selectedId: null,
    isLoading: false,
    error: null,
  };

  it('should handle fetchProductsSuccess', () => {
    const products = [
      { id: '1', name: 'Product 1', price: 10, description: 'Desc 1' },
    ];
    
    const nextState = productsReducer(
      initialState,
      fetchProductsSuccess(products)
    );
    
    expect(nextState.items).toEqual(products);
    expect(nextState.isLoading).toBe(false);
  });

  it('should handle selectProduct', () => {
    const state: ProductsState = {
      ...initialState,
      items: [
        { id: '1', name: 'Product 1', price: 10, description: 'Desc 1' },
      ],
    };
    
    const nextState = productsReducer(state, selectProduct('1'));
    
    expect(nextState.selectedId).toBe('1');
  });
});
```

### 6. Lazy Loading Features

```typescript
// app/lazyFeatures.ts
import { featureRegistry } from './featureRegistry';
import { store } from './store';
import { createRootReducer } from './rootReducer';

export async function loadFeature(featureName: string): Promise<void> {
  if (featureRegistry.getFeature(featureName)) {
    return; // Already loaded
  }

  let feature;
  
  switch (featureName) {
    case 'analytics':
      feature = (await import('../features/analytics')).default;
      break;
    case 'admin':
      feature = (await import('../features/admin')).default;
      break;
    default:
      throw new Error(`Unknown feature: ${featureName}`);
  }

  featureRegistry.register(feature);
  store.replaceReducer(createRootReducer());
}
```

### 7. Feature Flags with Remote Config

```typescript
// services/featureFlags.ts
export async function fetchFeatureFlags(): Promise<Record<string, boolean>> {
  const response = await fetch('/api/feature-flags');
  return response.json();
}

// app/store.ts (updated)
import { fetchFeatureFlags } from '../services/featureFlags';

export async function initializeStore() {
  const flags = await fetchFeatureFlags();
  
  Object.entries(flags).forEach(([name, enabled]) => {
    if (featureRegistry.getFeature(name)) {
      if (enabled) {
        featureRegistry.enable(name);
      } else {
        featureRegistry.disable(name);
      }
    }
  });
  
  return configureStore({
    reducer: createRootReducer(),
  });
}
```

## Summary

This architecture provides:

✅ **Scalability** - Add features without modifying existing code  
✅ **Maintainability** - Clear boundaries and dependencies  
✅ **Flexibility** - Enable/disable features at runtime  
✅ **Reusability** - Share features across applications  
✅ **Type Safety** - Full TypeScript support  
✅ **Testability** - Test features in isolation  

By following these patterns, your React + Redux + TypeScript application will scale from a small project to a large enterprise application while maintaining code quality and developer productivity.
