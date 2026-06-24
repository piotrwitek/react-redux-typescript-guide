# Types Global Namespace
=====================================

## Introduction

In this section, we will discuss how to design a cross-cutting `Types` global project namespace to be easily reused across the project. This approach leverages the inversion of control principle, allowing modules to extend the `Types` namespace instead of defining all types in one place.

## Benefits

The main benefits of this approach are:

*   **Simplicity to extend**: Modules can easily extend the `Types` namespace without modifying the core types.
*   **Easy maintenance**: When a module is removed, the extension point is also deleted, reducing maintenance overhead.
*   **Clean imports**: Types are nicely and cleanly imported in type consumers, making it easier to understand the code.

## Designing the Types Global Namespace

To design the `Types` global namespace, follow these steps:

1.  Create a `Types` module that exports an empty namespace.
2.  In each module, import the `Types` namespace and extend it with the module's specific types.
3.  Use the extended `Types` namespace in type consumers.

### Example

```typescript
// Types.ts
export {};

// ModuleA.ts
import { Types } from './Types';

export type ModuleAState = {
    // ...
};

export type ModuleAAction = {
    // ...
};

Types.ModuleA = {
    State: ModuleAState,
    Action: ModuleAAction,
};

// ModuleB.ts
import { Types } from './Types';

export type ModuleBState = {
    // ...
};

export type ModuleBAction = {
    // ...
};

Types.ModuleB = {
    State: ModuleBState,
    Action: ModuleBAction,
};

// TypeConsumer.ts
import { Types } from './Types';

// reducer(state: Types.ModuleA.State, action: Types.ModuleA.Action) => ...
// mapDispatchToProps(dispatch: Dispatch<Types.ModuleA.Action>)
// Epic<Types.ModuleA.Action, Types.ModuleA.State, Types.Services>
```

## Conclusion

The `Types` global namespace is a powerful tool for designing a maintainable and scalable type system in your project. By leveraging the inversion of control principle, you can easily extend and maintain your types without modifying the core types.