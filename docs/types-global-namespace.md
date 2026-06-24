## Types Global Namespace

In this section, we will explore how to design a cross-cutting `Types` global project namespace to be easily reused across the project. This approach leverages the inversion of control principle, allowing modules to extend the `Types` namespace instead of defining all types in one place.

### Benefits

The main benefits of this approach are:

* Simplicity to extend: Modules can easily extend the `Types` namespace without modifying the core types.
* Easy maintenance: When a module is removed, the extension point is also deleted, reducing maintenance overhead.
* Clean imports: The `Types` namespace is nicely and cleanly imported in type consumers.

### Example

```typescript
// reducer(state: Types.RootState, action: Types.RootAction) => ...
// mapDispatchToProps(dispatch: Dispatch<Types.RootAction>)
// Epic<Types.RootAction, Types.RootState, Types.Services>
```

### Designing the Types Global Namespace

To design the `Types` global namespace, follow these steps:

1. Create a new file `types.ts` in the root of your project.
2. Define the core types in this file.
3. Create a new file `types.d.ts` in each module that needs to extend the `Types` namespace.
4. In each `types.d.ts` file, declare or augment the `Types` module/namespace with the module's specific types.
5. In your type consumers, use the global `Types` namespace directly without importing it.

### Example Module

```typescript
// types.d.ts
declare module 'Types' {
  export type ModuleState = {
    // Module-specific state properties
  };

  export type ModuleAction = {
    // Module-specific action properties
  };
}
```

### Type Consumers

```typescript
// reducer.ts
import { RootState, RootAction } from 'Types';

const reducer = (state: RootState, action: RootAction) => {
  // reducer implementation
};

// mapDispatchToProps.ts
import { Dispatch } from 'react-redux';
import { RootAction } from 'Types';

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  // mapDispatchToProps implementation
};

// epic.ts
import { Epic } from 'redux-observable';
import { RootAction, RootState, Services } from 'Types';

const epic: Epic<RootAction, RootState, Services> = {
  // epic implementation
};
```