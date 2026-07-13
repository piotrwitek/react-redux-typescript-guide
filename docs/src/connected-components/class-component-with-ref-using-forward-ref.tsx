import * as React from 'react';
import { connect } from 'react-redux';

/**
 * Pattern: Safely access instance properties on a connected class component
 * using React.forwardRef.
 *
 * Problem: When you wrap a class component with connect(), the resulting
 * ConnectedComponent does not expose the underlying class instance methods.
 * Using React.createRef<Child>() on the connected component will cause
 * TypeScript to complain that the method does not exist on the connected type.
 *
 * Solution: Use React.forwardRef to pass the ref through the connected wrapper
 * to the actual class instance, giving you properly typed access to the
 * instance methods.
 */

// --- Child Component ---

type ChildProps = {
  label?: string;
};

class Child extends React.Component<ChildProps> {
  // Public instance method we want to call from the parent
  public foo() {
    console.log('foo called');
  }

  render() {
    return <div>{this.props.label || 'Child'}</div>;
  }
}

// Wrap with forwardRef BEFORE connecting, so the ref is forwarded to the
// underlying Child class instance rather than the connected wrapper.
const ChildWithForwardedRef = React.forwardRef<Child, ChildProps>(
  (props, ref) => <Child {...props} ref={ref} />
);

// Now connect the forwardRef-wrapped component
const ConnectedChild = connect()(ChildWithForwardedRef);

export default ConnectedChild;

// --- Parent Component ---

export class Parent extends React.Component {
  // The ref is typed to Child (the underlying class), not the connected type
  private childRef = React.createRef<Child>();

  handleClick() {
    if (this.childRef.current) {
      // ✅ TypeScript is happy — foo() exists on Child
      this.childRef.current.foo();
    }
  }

  render() {
    return (
      <div>
        {/* The ref is properly forwarded to the Child class instance */}
        <ConnectedChild ref={this.childRef} label="Hello" />
        <button onClick={() => this.handleClick()}>Call foo</button>
      </div>
    );
  }
}
