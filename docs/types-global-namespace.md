## Using the `Types` Global Namespace

In a large-scale React + Redux + TypeScript project, it's often helpful to use the `Types` global namespace to share type definitions across your application.

### ✅ Why Use a Global Namespace?

- Central place to store common types like `User`, `Product`, etc.
- No need to import types in every file.
- Improves consistency and scalability.

### 🔧 Example Setup

1. Create a global declaration file:

```ts
// src/types/global.d.ts
export {};

declare global {
  namespace Types {
    type User = {
      id: string;
      name: string;
      email: string;
    };
  }
}
### 💡 Usage Example

Now you can use `Types` anywhere in your code **without importing**:

```ts
const greet = (user: Types.User) => {
  console.log(`Hello, ${user.name}`);
};

const total = (product: Types.Product) => {
  return product.price * 2;
};

