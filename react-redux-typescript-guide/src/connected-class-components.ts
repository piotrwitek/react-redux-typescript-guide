```typescript
import React, { forwardRef, RefObject } from 'react';
import { connect } from 'react-redux';

/**
 * A pattern for using `createRef` and `forwardRef` with connected class components.
 * This allows developers to safely access instance properties declared in a class component.
 *
 * @example
 * ```tsx
 * class Child extends React.Component {
 *   foo() {}
 * }
 *
 * const ConnectedChild = connect(null, null, null, { forwardRef: true })(Child);
 *
 * class Parent extends React.Component {
 *   private childRef: RefObject<Child> = React.createRef()
 *
 *   bar() {
 *     if (this.childRef.current) {
 *       this.childRef.current.foo();
 *     }
 *   }
 *
 *   render() {
 *     return (
 *       <ConnectedChild ref={this.childRef} />
 *     );
 *   }
 * }
 * ```
 */

function createConnectedRef<T>(ConnectedComponent: React.ComponentType<T>) {
  return forwardRef((props, ref) => (
    <ConnectedComponent {...props} ref={ref} />
  ));
}

export { createConnectedRef };
```