import React from 'react';
import { connect } from 'react-redux';

/**
 * SOLUTION: How to safely access instance properties on a connected component via createRef
 *
 * The key insight: export the inner class separately so you can type
 * React.createRef<ChildComponent>() against the *unwrapped* class.
 * The connected component forwards refs to the wrapped instance automatically
 * (React-Redux v6+ with forwardRef option, or simply relying on the fact that
 * class component refs resolve to the inner instance).
 *
 * For React-Redux, use the `{ forwardRef: true }` connect option (v7+) to
 * ensure the ref is forwarded through the HOC to the underlying class instance.
 */

// ─── Child ────────────────────────────────────────────────────────────────────

type ChildProps = {
  dispatch?: React.Dispatch<any>;
  greeting?: string;
};

// Export the bare class so parents can use it as the ref type
export class ChildComponent extends React.Component<ChildProps> {
  foo() {
    console.log('ChildComponent.foo() called');
  }

  render() {
    return <div>Child: {this.props.greeting}</div>;
  }
}

// Use { forwardRef: true } so that React.createRef on the connected component
// resolves to the ChildComponent instance instead of the HOC wrapper.
export const Child = connect(
  null,
  null,
  null,
  { forwardRef: true } // <-- this is the critical option
)(ChildComponent);

// ─── Parent ───────────────────────────────────────────────────────────────────

export class Parent extends React.Component {
  /**
   * Type the ref as React.RefObject<ChildComponent> (the *unwrapped* class).
   * Because we passed { forwardRef: true } to connect(), the ref will
   * correctly resolve to the ChildComponent instance at runtime.
   */
  private childRef: React.RefObject<ChildComponent> = React.createRef<ChildComponent>();

  bar() {
    if (this.childRef.current) {
      // ✅ No TypeScript error – .foo() is correctly typed
      this.childRef.current.foo();
    }
  }

  render() {
    return (
      <div>
        {/* Pass the ref to the *connected* Child component */}
        <Child ref={this.childRef} />
        <button onClick={() => this.bar()}>Call foo</button>
      </div>
    );
  }
}

export default Parent;
