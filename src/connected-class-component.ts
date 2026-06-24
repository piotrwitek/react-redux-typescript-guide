import React from 'react';
import { connect } from 'react-redux';

interface ChildProps {}

class Child extends React.Component<ChildProps> {
  foo() {}
}

const ConnectedChild = connect()(Child);

type ChildRefType = React.ComponentType<ChildProps>;

class Parent extends React.Component {
  private childRef: React.RefObject<ChildRefType> = React.createRef();

  bar() {
    if (this.childRef.current) {
      this.childRef.current.foo();
    }
  }

  render() {
    return (
      <ConnectedChild ref={this.childRef} />
    );
  }
}