```typescript
import React, { forwardRef, RefObject } from 'react';
import { ConnectedComponentClass } from 'react-redux';

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
 * export default connect()(Child);
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
 *       <Child ref={this.childRef} />
 *     );
 *   }
 * }
 * ```
 */
function createConnectedRef<T>(ConnectedComponent: ConnectedComponentClass<T>) {
  return forwardRef((props, ref) => (
    <ConnectedComponent {...props} ref={ref} />
  ));
}

export { createConnectedRef };
```