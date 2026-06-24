import * as React from 'react';
import { connect } from 'react-redux';
import { ConnectedComponentClass, ConnectedComponentProps, ConnectedComponentState } from './connected-class-component';

type ConnectedComponentClass<T, P = {}> = React.ComponentClass<T> & {
  new (props: P): ConnectedComponentClass<T, P>;
};

type ConnectedComponent<T, P = {}> = ConnectedComponentClass<T, P> & {
  new (props: P): ConnectedComponentClass<T, P>;
};

function connect<T, P = {}>(
  mapStateToProps: (state: any) => P,
  mapDispatchToProps?: (dispatch: any) => any,
): <T>(WrappedComponent: React.ComponentType<T>) => ConnectedComponent<T, P> {
  return function (WrappedComponent: React.ComponentType<T>) {
    class ConnectedComponentClass extends WrappedComponent {
      static contextType = React.createContext();

      static getDerivedStateFromProps(props: P, state: ConnectedComponentState) {
        return mapStateToProps(props);
      }

      constructor(props: P) {
        super(props);
        this.state = mapStateToProps(props);
      }

      componentDidMount() {
        this.context.dispatch(mapDispatchToProps);
      }

      render() {
        return super.render();
      }
    }

    const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);

    return ConnectedComponent;
  };
}

function createRef<T>(component: React.ComponentType<T>): React.RefObject<T> {
  return React.createRef<T>();
}

function forwardRef<T>(WrappedComponent: React.ComponentType<T>): React.ComponentType<T> {
  return function (props: any) {
    const ref = createRef<T>(WrappedComponent);
    return React.createElement(WrappedComponent, { ...props, ref });
  };
}

export { connect, createRef, forwardRef };