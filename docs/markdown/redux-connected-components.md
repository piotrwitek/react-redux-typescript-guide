## Connected Component - Dispatched Action Types

When declaring a `connect`ed component's property types, use the `typeof` operator to declare dispatched function types. This ensures the property type exactly matches the action creator's declaration.

### Why use `typeof`?

- **Type Safety**: TypeScript infers the exact function signature from the action creator
- **DRY Principle**: No need to manually duplicate the function signature
- **Automatic Updates**: If you change the action creator signature, TypeScript will catch mismatches automatically

### Example

```tsx
import * as React from 'react';
import { connect } from 'react-redux';
import { createAction } from 'typesafe-actions';

// Define action creators
const actions = {
  ping: createAction('ping/PING', resolve => (arg: number) =>
    resolve({ arg })
  ),
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

### Combining with State Props

```tsx
import * as React from 'react';
import { connect } from 'react-redux';
import { createAction } from 'typesafe-actions';
import { RootState } from 'MyTypes';

const actions = {
  ping: createAction('ping/PING', resolve => (arg: number) =>
    resolve({ arg })
  ),
};

interface StateProps {
  count: number;
}

interface DispatchProps {
  ping: typeof actions.ping;
}

type Props = StateProps & DispatchProps;

const PingTestComponent: React.SFC<Props> = ({ count, ping }) => {
  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={() => ping(123)}>ping</button>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  count: state.ping.count,
});

export const PingTest = connect<StateProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  { ping: actions.ping }
)(PingTestComponent);
```
