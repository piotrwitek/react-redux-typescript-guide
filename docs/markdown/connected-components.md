# Connected Components

## Accessing Instance Methods with Refs

When using `connect()` from react-redux, the wrapped component type changes, making it difficult to access instance methods via refs. The solution is to use `forwardRef` with the `wrappedComponentRef` prop (for react-redux v5/v6) or the standard `ref` prop with `forwardRef: true` option (for react-redux v7+).

### Solution for react-redux v7+

```tsx
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

interface ChildProps {
  // component props
}

class Child extends React.Component<ChildProps> {
  foo() {
    console.log('foo called');
  }

  render() {
    return <div>Child Component</div>;
  }
}

const connector = connect(null, null, null, { forwardRef: true });
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Child);

// In parent component
class Parent extends React.Component {
  private childRef: React.RefObject<Child> = React.createRef();

  bar() {
    if (this.childRef.current) {
      this.childRef.current.foo();
    }
  }

  render() {
    return <Child ref={this.childRef} />;
  }
}
```

### Solution for react-redux v5/v6

```tsx
import React from 'react';
import { connect } from 'react-redux';

class Child extends React.Component {
  foo() {
    console.log('foo called');
  }

  render() {
    return <div>Child Component</div>;
  }
}

export default connect()(Child);

// In parent component
class Parent extends React.Component {
  private childRef: React.RefObject<Child> = React.createRef();

  bar() {
    if (this.childRef.current) {
      this.childRef.current.foo();
    }
  }

  render() {
    return <Child wrappedComponentRef={this.childRef} />;
  }
}
```

### Alternative: Export Both Connected and Unconnected Components

For better testability and type safety, you can export both the connected and unconnected versions:

```tsx
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './store';

interface OwnProps {
  id: string;
}

export class Child extends React.Component<OwnProps> {
  foo() {
    console.log('foo called');
  }

  render() {
    return <div>Child Component</div>;
  }
}

const connector = connect(
  (state: RootState) => ({}),
  {}
);

type PropsFromRedux = ConnectedProps<typeof connector>;
export type ChildProps = PropsFromRedux & OwnProps;

export default connector(Child);

// In parent component
import ConnectedChild, { Child } from './Child';

class Parent extends React.Component {
  private childRef: React.RefObject<Child> = React.createRef();

  bar() {
    if (this.childRef.current) {
      this.childRef.current.foo();
    }
  }

  render() {
    return <ConnectedChild ref={this.childRef} id="123" />;
  }
}
```

### Best Practice: Avoid Instance Methods

While the above solutions work, accessing instance methods via refs is generally discouraged in React. Consider these alternatives:

1. **Lift state up**: Move the state and logic to a parent component
2. **Use callbacks**: Pass callback functions as props
3. **Use Redux actions**: Dispatch actions instead of calling methods directly
4. **Use Context API**: Share functionality through context

```tsx
// Preferred approach: Use callbacks
interface ChildProps {
  onAction: () => void;
}

class Child extends React.Component<ChildProps> {
  handleClick = () => {
    this.props.onAction();
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}

class Parent extends React.Component {
  handleChildAction = () => {
    console.log('Child action triggered');
  };

  render() {
    return <Child onAction={this.handleChildAction} />;
  }
}
```
