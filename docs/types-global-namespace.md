## Types Global Namespace

In this section, we will explore how to design a cross-cutting `Types` global project namespace to be easily reused across the project. This approach leverages the inversion of control principle, allowing modules to extend the `Types` namespace instead of defining all types in one place.

### Benefits

The main benefits of this approach are:

* Simplicity to extend: Modules can easily extend the `Types` namespace without modifying the core types.
* Easy maintenance: When a module is removed, the extension point is also deleted, reducing maintenance overhead.
* Clean imports: The `Types` namespace is nicely and cleanly imported in type consumers.

### Example

```typescript
import Types from 'Types';

// reducer(state: Types.RootState, action: Types.RootAction) => ...
// mapDispatchToProps(dispatch: Dispatch<Types.RootAction>)
// Epic<Types.RootAction, Types.RootState, Types.Services>
```

### Designing the Types Global Namespace

To design the `Types` global namespace, follow these steps:

1. Create a new file `types.ts` in the root of your project.
2. Define the core types in this file.
3. Create a new file `types.d.ts` in each module that needs to extend the `Types` namespace.
4. In each `types.d.ts` file, import the `Types` namespace and extend it with the module's specific types.
5. In your type consumers, import the `Types` namespace and use it to type your code.

### Example Module

```typescript
// types.d.ts
import type { Types } from '../types';

export type ModuleState = Types.RootState & {
  // Module-specific state properties
};

export type ModuleAction = Types.RootAction & {
  // Module-specific action properties
};
```

### Type Consumers

```typescript
// reducer.ts
import type { ModuleState, ModuleAction } from './types';

const reducer = (state: ModuleState, action: ModuleAction) => {
  // reducer implementation
};

// mapDispatchToProps.ts
import type { Dispatch } from 'react-redux';
import type { ModuleAction } from './types';

const mapDispatchToProps = (dispatch: Dispatch<ModuleAction>) => {
  // mapDispatchToProps implementation
};

// epic.ts
import type { Epic } from 'redux-observable';
import type { ModuleAction, ModuleState, Services } from './types';

const epic: Epic<ModuleAction, ModuleState, Services> = {
  // epic implementation
};
