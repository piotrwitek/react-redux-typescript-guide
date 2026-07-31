# React & Redux in TypeScript - Complete Guide

> **"This guide will teach you how to use React (and its Ecosystem) in a functional style with TypeScript."**

## What is this guide?

This is a **practical reference guide** that shows you how to use TypeScript with React and Redux through real-world code examples. It's not a boilerplate or starter template—it's a collection of patterns, type definitions, and best practices you can copy into your own projects.

### Who is this for?

- **React developers** learning TypeScript
- **TypeScript developers** learning React
- **Teams** wanting consistent patterns for React + TypeScript projects
- **Beginners** who want to understand how to properly type React components, Redux stores, and async actions

### What you'll learn

- How to type React components (functional and class-based)
- How to type Redux stores, actions, and reducers
- How to type React hooks (`useState`, `useEffect`, `useContext`, etc.)
- How to type async operations and side effects
- How to type HOCs (Higher-Order Components) and render props
- How to type forms, events, and refs
- Common TypeScript patterns that make React code safer and more maintainable

### How to use this guide

1. **Browse by topic** - Use the table of contents to jump to the pattern you need
2. **Copy examples** - Each section has copy-paste-ready code snippets
3. **Understand the types** - We explain what each TypeScript type does and why it's useful
4. **Try the playground** - Run `npm install && npm start` in the `playground` folder to see live examples

> 💡 **Note for beginners**: Types like `React.FC`, `React.ComponentProps`, and `Dispatch` come from the `@types/react` and `@types/react-redux` packages—they're not custom to this guide. We show you how to use the official types that TypeScript provides for React.

---

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---

## Goals

- **Complete type safety** - Catch errors at compile time, not runtime
- **Functional programming style** - Leverage TypeScript's type inference with modern React patterns (hooks, functional components)
- **Practical examples** - Real-world patterns you can use immediately
- **Standard types** - Use official types from `@types/react` and `@types/react-redux` (no custom magic)
- **Minimal boilerplate** - Write less code while getting more type safety

---

## Complementary Projects

This guide focuses on **type patterns**. For complete project setups, see:

- [react-redux-typescript-jslib-starter](https://github.com/piotrwitek/react-redux-typescript-jslib-starter) - Ready-to-use starter with build config, testing, and CI
- [typesafe-actions](https://github.com/piotrwitek/typesafe-actions) - Type-safe Redux action creators and reducers
- [utility-types](https://github.com/piotrwitek/utility-types) - Reusable TypeScript utility types

---

## Understanding the Playground

The `playground` folder contains a working React app that demonstrates all the patterns in this guide.

**To run it:**

```bash
cd playground
npm install
npm start
```

The playground uses [react-styleguidist](https://react-styleguidist.js.org/) to generate interactive documentation. It automatically finds all components in the `src/components` folder and displays them with their props, usage examples, and live previews.

**How it works:**

- Styleguidist scans `src/components/**/*.tsx` for components
- It reads JSDoc comments and TypeScript types to generate documentation
- `*.md` files next to components become usage examples
- The rendered page shows ALL components, not just what's in `App.tsx`

So if you see more components in the browser than in the code, that's why—styleguidist is showing you the entire component library, not just a single app entry point.

---

## React Types Cheatsheet

Before diving into the guide, here's a quick reference of the most common React types you'll see:

### From `@types/react`:

- **`React.FC<Props>`** - Type for functional components (includes `children` by default in older versions)
- **`React.ComponentProps<typeof Component>`** - Extract props type from a component
- **`React.ReactNode`** - Anything React can render (elements, strings, numbers, arrays, fragments, etc.)
- **`React.ReactElement`** - A React element created with JSX or `createElement`
- **`React.CSSProperties`** - Type for inline styles
- **`React.HTMLAttributes<HTMLDivElement>`** - HTML attributes for a specific element
- **`React.ChangeEvent<HTMLInputElement>`** - Type for input change events
- **`React.FormEvent<HTMLFormElement>`** - Type for form submit events
- **`React.MouseEvent<HTMLButtonElement>`** - Type for click events
- **`React.useRef<HTMLDivElement>(null)`** - Type for refs to DOM elements
- **`React.useState<string>('')`** - Type for state (usually inferred automatically)

### From `@types/react-redux`:

- **`useSelector<RootState, ReturnType>`** - Type-safe Redux state selector
- **`useDispatch<AppDispatch>()`** - Type-safe Redux dispatch
- **`connect<StateProps, DispatchProps, OwnProps>()`** - Type-safe Redux connect HOC

These are **standard types** provided by the TypeScript definitions for React and Redux. This guide shows you how to use them effectively.

---

## Installation

Types for React and Redux are installed separately from the libraries themselves:

```bash
npm install --save react react-dom redux react-redux
npm install --save-dev @types/react @types/react-dom @types/react-redux
```

For hooks support, use React 16.8+ and @types/react 16.8+.

---

## React - Type Definitions Cheatsheet

### Function Components

**Basic functional component:**

```tsx
import React from 'react';

type Props = {
  name: string;
  age: number;
};

// Modern approach (React 18+)
const MyComponent = ({ name, age }: Props) => {
  return <div>{name} is {age} years old</div>;
};

// With React.FC (includes children automatically in older versions)
const MyComponent: React.FC<Props> = ({ name, age }) => {
  return <div>{name} is {age} years old</div>;
};
```

**Why this matters:** TypeScript will now catch typos in prop names, wrong prop types, and missing required props at compile time instead of runtime.

---

### Hooks

**useState with explicit type:**

```tsx
const [count, setCount] = React.useState<number>(0);
const [user, setUser] = React.useState<User | null>(null);
```

**useRef for DOM elements:**

```tsx
const inputRef = React.useRef<HTMLInputElement>(null);

// Later:
inputRef.current?.focus();
```

**useReducer with typed actions:**

```tsx
type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
  }
};

const [state, dispatch] = React.useReducer(reducer, { count: 0 });
```

---

### Events

**Typing event handlers:**

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log('clicked');
};
```

---

## Redux - Type Definitions Cheatsheet

**Typed Redux store:**

```tsx
import { createStore } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

// 1. Define your state shape
type RootState = {
  counter: number;
  user: User | null;
};

// 2. Define your actions
type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_USER'; payload: User };

// 3. Create typed reducer
const rootReducer = (state: RootState, action: Action): RootState => {
  // ... reducer logic
};

// 4. Create store
const store = createStore(rootReducer);
type AppDispatch = typeof store.dispatch;

// 5. Use in components
const MyComponent = () => {
  const count = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch<AppDispatch>();
  
  return <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>;
};
```

---

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

---

## License

MIT License

---

## Acknowledgements

Maintained by [Piotr Witek](https://github.com/piotrwitek). Special thanks to all contributors who have helped improve this guide.
