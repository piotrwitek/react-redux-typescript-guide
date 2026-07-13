# React & Redux in TypeScript - Complete Guide

## Table of Contents

- [React - Type-Definitions Cheatsheet](#react---type-definitions-cheatsheet)
- [React - Typing Patterns](#react---typing-patterns)
- [Redux - Typing Patterns](#redux---typing-patterns)
- [Tools & Libraries](#tools--libraries)
- [FAQ & Troubleshooting](#faq--troubleshooting)

---

## React - Type-Definitions Cheatsheet

### `React.FC<Props>` | `React.FunctionComponent<Props>`

**Class Components**

**Function Components**

---

## Redux - Typing Patterns

### Connect - typing `mapStateToProps` and `mapDispatchToProps`

#### Standard usage

```tsx
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

type StateProps = {
  count: number;
};

type DispatchProps = {
  onIncrement: () => void;
  onDecrement: () => void;
};

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = state => ({
  count: state.counter.count,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
  onIncrement: () => dispatch(incrementCounter()),
  onDecrement: () => dispatch(decrementCounter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

---

### Connect - typing factory functions (per-instance memoization)

In advanced scenarios where you need more control over rendering performance,
`mapStateToProps` and `mapDispatchToProps` can return a **function** instead of
an object. The returned function will be used as the actual `mapStateToProps` /
`mapDispatchToProps` for **that specific component instance**. This enables
per-instance memoization (e.g. with `reselect`'s `createSelector`).

Use `MapStateToPropsFactory` and `MapDispatchToPropsFactory` from
`@types/react-redux` to type these factory functions.

::codeblock='docs/src/redux-connected-components/connected-counter-with-factory-props.tsx'::

[⇧ back to top](#table-of-contents)

---

## Tools & Libraries

---

## FAQ & Troubleshooting
