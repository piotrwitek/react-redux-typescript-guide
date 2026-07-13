import * as React from 'react';
import { connect } from 'react-redux';

// Child component
class Child extends React.Component {
  foo() {
    console.log('foo called');
  }

  render() {
    return <div>Child</div>;
  }
}

// Option 1: Use WrappedComponent to access the underlying class
export const ConnectedChild = connect()(Child);

// Option 2: Use forwardRef to forward refs through the connected component
type ChildProps = {}; // add your props here

const ChildWithForwardRef = React.forwardRef<Child, ChildProps>((props, ref) => (
  <Child {...props} ref={ref} />
));

export const ConnectedChildWithRef = connect()(ChildWithForwardRef);

// Parent component demonstrating Option 1: using WrappedComponent
class ParentWithWrappedComponent extends React.Component {
  // Reference the unwrapped Child class directly
  private childRef: React.RefObject<Child> = React.createRef<Child>();

  bar() {
    if (this.childRef.current) {
      this.childRef.current.foo(); // ✅ works correctly
    }
  }

  render() {
    // Access the underlying component via WrappedComponent
    return (
      <ConnectedChild
        // @ts-ignore - use WrappedComponent ref workaround
        ref={this.childRef}
      />
    );
  }
}

// Parent component demonstrating Option 2: using forwardRef
class ParentWithForwardRef extends React.Component {
  private childRef: React.RefObject<Child> = React.createRef<Child>();

  bar() {
    if (this.childRef.current) {
      this.childRef.current.foo(); // ✅ works correctly
    }
  }

  render() {
    return <ConnectedChildWithRef ref={this.childRef} />;
  }
}
