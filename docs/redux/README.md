# Redux

## Table of Contents
- [Store Types](#store-types)
- [Action Creators](#action-creators)
- [Reducers](#reducers)
- [Connected Components](#connected-components)

---

## Store Types

```tsx
import { StateType, ActionType } from 'typesafe-actions';

declare module 'MyTypes' {
  export type Store = StateType<typeof import('./store').default>;
  export type RootAction = ActionType<typeof import('./root-action').default>;
  export type RootState = StateType<ReturnType<typeof import('./root-reducer').default>>;
}
```

---

## Action Creators

```tsx
import { action, createAction } from 'typesafe-actions';

export const ping = createAction('ping/PING', resolve => (arg: number) =>
  resolve({ arg })
);

export const pong = createAction('pong/PONG', resolve => (arg: string) =>
  resolve({ arg })
);
```

---

## Connected Components

### Using `typeof` for Dispatched Action Types

When declaring a `connect`ed component's property types, use the `typeof` operator to declare dispatched function types so that the property type matches the action creator's declaration exactly.

This approach provides better type safety because TypeScript will infer the exact function signature from the action creator.

```tsx
import { connect } from 'react-redux';
import { ping } from './actions';

// Declare the actions object that will be used in mapDispatchToProps
const actions = {
  ping,
};

// Use typeof to infer the exact type from the action creator
interface Props {
  ping: typeof actions.ping;
}

const PingTestComponent: React.SFC<Props> = ({ ping }) => {
  return (
    <button onClick={() => ping(123)}>ping</button>
  );
};

export const PingTest = connect(
  null,
  { ping: actions.ping }
)(PingTestComponent);
```

> Tip: Using `typeof actions.ping` instead of manually typing the function signature ensures the prop type always stays in sync with your action creator's signature. If you change the action creator, TypeScript will automatically catch any mismatches.

---
