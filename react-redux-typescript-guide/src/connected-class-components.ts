```ts
// @ts-nocheck
import React from 'react';
import { connect } from 'react-redux';
import { ConnectedComponentType } from 'react-redux';

interface ChildProps {}

interface ChildState {}

class Child extends React.Component<ChildProps, ChildState> {
  foo(): void {}
}

const ConnectedChild: ConnectedComponentType<typeof Child, ChildProps> = connect()(Child);

class Parent extends React.Component {
  private childRef: React.RefObject<Child> = React.createRef();

  bar(): void {
    if (this.childRef.current) {
      this.childRef.current.foo(); // This should no longer cause a TypeScript error
    }
  }

  render(): JSX.Element {
    return (
      <Child ref={this.childRef} />
    );
  }
}
```