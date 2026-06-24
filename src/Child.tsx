import React from 'react';
import { connect } from 'react-redux';

// Define the Child component with its instance method
class Child extends React.Component {
  foo() {
    // implementation of foo
    console.log('foo called');
  }

  render() {
    return <div>Child component</div>;
  }
}

/**
 * Export the connected component with ref forwarding enabled.
 *
 * By passing `{ forwardRef: true }` to `connect`, the ref supplied to the
 * connected component is forwarded to the underlying `Child` instance.
 * This allows parent components to obtain a `RefObject<Child>` and safely
 * call instance methods such as `foo()`.
 */
export default connect(null, null, null, { forwardRef: true })(Child);