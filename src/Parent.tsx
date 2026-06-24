import React from 'react';
import { connect } from 'react-redux';
import Child from './Child';

class Child extends React.Component {
  foo() {}
}

const ConnectedChild = connect()(Child);

class Parent extends React.Component {
  private childRef: React.RefObject<Child> = React.createRef();

  bar() {
    if (this.childRef.current) {
      // cast the current property to the original component type
      (this.childRef.current as Child).foo();
    }
  }

  render() {
    return (
      <Child ref={this.childRef} />
    );
  }
}

export default Parent;