# Advanced Types

## Types Global Namespace

In this guide, we've seen how to define and use types in our application. However, as our project grows, it becomes increasingly important to manage these types in a way that's scalable and maintainable. To address this challenge, we've designed a cross-cutting `Types` global project namespace that encapsulates all the types in the application.

### Inversion of Control Principle

Instead of defining all the types in one place, we've leveraged the inversion of control principle. This means that modules (which are owners of that particular type annotations) are responsible for extending the `Types` namespace. This approach has several benefits:

*   **Simplicity to extend**: Adding new types to the project is straightforward, as each module can extend the `Types` namespace without affecting other parts of the application.
*   **Easy maintenance**: When a module is removed, its extension point is also deleted, ensuring that the project remains clean and organized.
*   **Clean imports**: The `Types` namespace is nicely and cleanly imported in type consumers, making it easy to understand the dependencies between modules.

### Example Usage

Here's an example of how to import and use the `Types` namespace in a reducer function:

```typescript
import { Types } from 'Types';

const reducer = (state: Types.RootState, action: Types.RootAction) => {
    // reducer implementation
};
```

Similarly, when using the `mapDispatchToProps` function, you can import the `Types` namespace to ensure that the correct type is used:

```typescript
import { mapDispatchToProps } from './actions';
import { Types } from 'Types';

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) => {
    // mapDispatchToProps implementation
};
```

By following this approach, we've created a maintainable and scalable way to manage types in our application.

### Conclusion

In conclusion, the `Types` global namespace is a powerful tool for managing types in our application. By leveraging the inversion of control principle, we've created a simple, maintainable, and scalable solution that makes it easy to extend and import types across the project.