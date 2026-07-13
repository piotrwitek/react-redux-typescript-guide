# React & Redux in TypeScript - Complete Guide

> This guide is a living compendium documenting the most important patterns and recipes on how to use **React** (and its Ecosystem) in a **functional style** using **TypeScript**. It will help you make your code **completely type-safe** while focusing on **inferring the types from implementation** so there is less noise from excessive type annotations and it's easier to write and maintain correct types in the long run.

> *This guide is a result of the lessons learned from building production applications with React & Redux at scale with TypeScript, and reflects the experiences of many contributors.*

---

## Table of Contents

- [Section 1: React - Type-Definitions Cheatsheet](#section-1-react---type-definitions-cheatsheet)
- [Section 2: React - Typing Patterns](#section-2-react---typing-patterns)
- [Section 3: React - Usage with Redux](#section-3-react---usage-with-redux)

---

## Section 1: React - Type-Definitions Cheatsheet

### `React.FC<Props>` | `React.FunctionComponent<Props>`

Type representing a functional component.

```tsx
const MyComponent: React.FC<Props> = (props) => { ... }
```

### `React.Component<Props, State>`

Type representing a class component.

```tsx
class MyComponent extends React.Component<Props, State> { ... }
```

### `React.ComponentType<Props>`

Type representing union of (React.FC | React.Component) - used in HOC.

```tsx
const withState = <P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P>,
) => { ... }
```

### `React.ComponentProps<typeof MyComponent>`

Gets Props type of a specified component.

```tsx
type MyComponentProps = React.ComponentProps<typeof MyComponent>;
```

### `React.ReactElement` | `JSX.Element`

Type representing a concept of React Element - representation of a native DOM component (e.g. `<div />`), or a user-defined composite component (e.g. `<MyComponent />`).

```tsx
const elementOnly: React.ReactElement = <div /> || <MyComponent />;
```

### `React.ReactNode`

Type representing any possible type of React node. Mostly used as a return type of render methods.

```tsx
const elementOrPrimitive: React.ReactNode = 'Hello!' || 0 || false || null || undefined || <div /> || <MyComponent />;
const Component = ({ children: React.ReactNode }) => ...
```

### `React.CSSProperties`

Type representing style object in JSX - for css-in-js styles.

```tsx
const styles: React.CSSProperties = { flexDirection: 'row', ...
const element = <div style={styles} ...
```

### `React.HTMLProps<HTMLXXXElement>`

Type representing Props of specified HTML Element - for extending HTML Elements.

```tsx
const Input: React.FC<Props & React.HTMLProps<HTMLInputElement>> = props => { ... }
<Input about={...} accept={...} alt={...} ... />
```

### `React.ReactEventHandler<HTMLXXXElement>`

Type representing a generic event handler for HTML Elements.

```tsx
const handleChange: React.ReactEventHandler<HTMLInputElement> = (ev) => { ... }
<input onChange={handleChange} ... />
```

### `React.XXXEvent<HTMLXXXElement>`

Type representing a more specific event handler. Some common event examples: `ChangeEvent, FormEvent, FocusEvent, KeyboardEvent, MouseEvent, DragEvent, PointerEvent, WheelEvent, TouchEvent`.

```tsx
const handleChange = (ev: React.MouseEvent<HTMLButtonElement>) => { ... }
<button onMouseMove={handleChange} ... />
```

---

## Section 2: React - Typing Patterns

### Functional Components

#### - counter example

```tsx
type Props = {
  label: string;
  count: number;
  onIncrement: () => void;
};

const Counter: React.FC<Props> = props => {
  const { label, count, onIncrement } = props;
  return (
    <div>
      <span>{label}</span>
      <span>{count}</span>
      <button type="button" onClick={onIncrement}>
        {`Increment`}
      </button>
    </div>
  );
};
```

---

### Class Components

#### - counter example

```tsx
type Props = {
  label: string;
};

type State = {
  count: number;
};

class Counter extends React.Component<Props, State> {
  readonly state: State = {
    count: 0,
  };

  handleIncrement = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
  };

  render() {
    const { handleIncrement } = this;
    const { label } = this.props;
    const { count } = this.state;

    return (
      <div>
        <span>{label}</span>
        <span>{count}</span>
        <button type="button" onClick={handleIncrement}>
          {`Increment`}
        </button>
      </div>
    );
  }
}
```

---

### Refs

#### - `createRef` - class component example

```tsx
type Props = {
  children: React.ReactNode;
};

class TestComponent extends React.Component<Props> {
  // create a ref using React.createRef and type it for the HTML element you want to target
  private divRef = React.createRef<HTMLDivElement>();

  render() {
    const { children } = this.props;
    return (
      <div ref={this.divRef}>
        {children}
      </div>
    );
  }

  getDiv() {
    // note that ref.current may be null if the referenced element is conditional
    return this.divRef.current;
  }
}
```

#### - `forwardRef` - functional component example

```tsx
type Props = {
  children: React.ReactNode;
  type: 'submit' | 'button';
};

// Use React.forwardRef<RefType, PropsType>() to create a forwardRef component.
// The first generic type is the type of the ref (e.g. the HTML element type).
// The second generic type is the Props type of the component.
export type Ref = HTMLButtonElement;

export const FancyButton = React.forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="FancyButton" type={props.type}>
    {props.children}
  </button>
));

// Usage:
// const ref = React.createRef<HTMLButtonElement>();
// <FancyButton type="button" ref={ref}>Click me!</FancyButton>
```

---

## Section 3: React - Usage with Redux

> For a comprehensive guide on Redux typings visit: https://github.com/piotrwitek/typesafe-actions

### Typing connected components

```tsx
import { connect } from 'react-redux';

type OwnProps = {
  className?: string;
};

type Props = OwnProps & {
  count: number;
  onIncrement: () => void;
};

const Counter: React.FC<Props> = ({ count, onIncrement, className }) => (
  <div className={className}>
    <span>{count}</span>
    <button type="button" onClick={onIncrement}>Increment</button>
  </div>
);

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  count: state.counter,
});

const mapDispatchToProps = {
  onIncrement: () => ({ type: 'INCREMENT' }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```
