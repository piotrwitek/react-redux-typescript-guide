```typescript
import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';

type ConnectedRef<T> = T & {
  [P in keyof ConnectedComponent<T, any>]: ConnectedComponent<T, any>[P];
};

export function createConnectedRef<T>(): React.RefObject<ConnectedRef<T>> {
  return React.createRef();
}
```
```typescript
import { createConnectedRef } from './connected-ref';

class Child extends React.Component {
  foo() {}
}

export default connect()(Child);
```
```typescript
import { createConnectedRef } from './connected-ref';

class Parent extends React.Component {
  private childRef: React.RefObject<ConnectedRef<typeof Child>> = createConnectedRef();

  bar() {
    if (this.childRef.current) {
      this.childRef.current.foo();
    }
  }

  render() {
    return (
      <Child ref={this.childRef} />
    );
  }
}
```