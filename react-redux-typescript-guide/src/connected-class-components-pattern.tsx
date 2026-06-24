```ts
import { connect, ConnectedComponentType } from 'react-redux';
import { forwardRef } from 'react';

export function connect<TProps, TStateProps = {}, TDispatchProps = {}>(
  mapStateToProps?: (state: any) => TStateProps,
  mapDispatchToProps?: (dispatch: any) => TDispatchProps,
): <P>(WrappedComponent: React.ComponentType<P & TStateProps & TDispatchProps>) => ConnectedComponentType<P & TStateProps & TDispatchProps, any> {
  // ...
}

export function connectClass<TProps, TStateProps = {}, TDispatchProps = {}>(
  mapStateToProps?: (state: any) => TStateProps,
  mapDispatchToProps?: (dispatch: any) => TDispatchProps,
): <P>(WrappedComponent: React.ComponentType<P & TStateProps & TDispatchProps>) => ConnectedComponentType<P & TStateProps & TDispatchProps, any> {
  return connect(mapStateToProps, mapDispatchToProps);
}

// ...

// Example usage:
class Child extends React.Component {
  foo() {}
}

const ConnectedChild = connectClass(null, null)(Child);

class Parent extends React.Component {
  private childRef: React.RefObject<Child> = React.createRef();

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

// ...

// Pattern for using createRef and forwardRef with connected class components
const ForwardedChild = forwardRef((props, ref) => {
  const connectedChild = React.createElement(ConnectedChild, props, null);
  React.forwardRef((childProps, childRef) => {
    connectedChild.ref = childRef;
    return connectedChild;
  })(connectedChild);
});

class Parent extends React.Component {
  private childRef: React.RefObject<ForwardedChild> = React.createRef();

  bar() {
    if (this.childRef.current) {
      this.childRef.current.foo();
    }
  }

  render() {
    return (
      <ForwardedChild ref={this.childRef} />
    );
  }
}
```