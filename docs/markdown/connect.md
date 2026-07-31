---
id: connect
title: Connect
---

# Connect

## Typing Connected Components

When using `connect` from `react-redux`, you can type your connected components in several ways.

### Using `typeof` for Dispatched Action Types

When declaring props for dispatched actions, you can use the `typeof` operator to automatically infer the correct type from your action creators. This ensures type safety and keeps your component props in sync with your action definitions:

```tsx
import { connect } from 'react-redux';
import { createAction } from 'your-action-library';

const actions = {
  ping: createAction('ping/PING', (arg: number) => ({
    type: 'ping/PING',
    arg,
  })),
  pong: createAction('pong/PONG', (message: string) => ({
    type: 'pong/PONG',
    message,
  })),
};

interface Props {
  ping: typeof actions.ping;
  pong: typeof actions.pong;
}

const PingTestComponent: React.SFC<Props> = ({ ping, pong }) => {
  return (
    <div>
      <button onClick={() => ping(123)}>Ping</button>
      <button onClick={() => pong('hello')}>Pong</button>
    </div>
  );
};

export const PingTest = connect(
  null,
  { ping: actions.ping, pong: actions.pong }
)(PingTestComponent);
```

**Benefits of this approach:**

- **Type inference**: The component automatically knows the exact signature of each action creator
- **Refactoring safety**: If you change an action creator's parameters, TypeScript will flag any mismatches in your component
- **No manual type definitions**: You don't need to manually write out function signatures
- **Single source of truth**: The action creator definition is the only place you define the type

### Alternative: Using `mapDispatchToProps`

You can also use `mapDispatchToProps` with `typeof` for more complex dispatch logic:

```tsx
const mapDispatchToProps = {
  ping: actions.ping,
  pong: actions.pong,
};

type DispatchProps = {
  [K in keyof typeof mapDispatchToProps]: typeof mapDispatchToProps[K];
};

interface OwnProps {
  userId: string;
}

type Props = DispatchProps & OwnProps;

const MyComponent: React.FC<Props> = ({ ping, pong, userId }) => {
  return (
    <div>
      <p>User: {userId}</p>
      <button onClick={() => ping(123)}>Ping</button>
      <button onClick={() => pong('hello')}>Pong</button>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(MyComponent);
```

### With `ConnectedProps` Helper (React-Redux v7.1.2+)

For a more streamlined approach with newer versions of React-Redux:

```tsx
import { connect, ConnectedProps } from 'react-redux';

const mapDispatchToProps = {
  ping: actions.ping,
  pong: actions.pong,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface OwnProps {
  userId: string;
}

type Props = PropsFromRedux & OwnProps;

const MyComponent: React.FC<Props> = ({ ping, pong, userId }) => {
  return (
    <div>
      <p>User: {userId}</p>
      <button onClick={() => ping(123)}>Ping</button>
      <button onClick={() => pong('hello')}>Pong</button>
    </div>
  );
};

export default connector(MyComponent);
```

This pattern works with any action creator library (Redux Toolkit, redux-actions, typesafe-actions, etc.) and ensures your component props stay synchronized with your action definitions.
