# Using @connect Decorator with React Redux TypeScript

This guide demonstrates how to use the `@connect` decorator syntax with React, Redux, and TypeScript for class components.

## Prerequisites

Enable experimental decorators in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Basic Example

```typescript
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// State type
interface RootState {
  counter: number;
  user: { name: string };
}

// Action creators
const increment = () => ({ type: 'INCREMENT' as const });
const decrement = () => ({ type: 'DECREMENT' as const });

// Props from state
interface StateProps {
  counter: number;
  userName: string;
}

// Props from dispatch
interface DispatchProps {
  increment: () => void;
  decrement: () => void;
}

// Own props (passed from parent)
interface OwnProps {
  title: string;
}

// Combined props
type Props = StateProps & DispatchProps & OwnProps;

const mapStateToProps = (state: RootState): StateProps => ({
  counter: state.counter,
  userName: state.user.name,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
});

@connect(mapStateToProps, mapDispatchToProps)
export class Counter extends React.Component<Props> {
  render() {
    const { counter, userName, title, increment, decrement } = this.props;
    
    return (
      <div>
        <h1>{title}</h1>
        <p>User: {userName}</p>
        <p>Count: {counter}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    );
  }
}
```

## Using ConnectedProps Helper

For better type inference with TypeScript 3.0+:

```typescript
import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';

interface RootState {
  counter: number;
}

const mapStateToProps = (state: RootState) => ({
  counter: state.counter,
});

const mapDispatchToProps = {
  increment: () => ({ type: 'INCREMENT' as const }),
  decrement: () => ({ type: 'DECREMENT' as const }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface OwnProps {
  title: string;
}

type Props = PropsFromRedux & OwnProps;

@connect(mapStateToProps, mapDispatchToProps)
export class Counter extends React.Component<Props> {
  render() {
    const { counter, title, increment, decrement } = this.props;
    
    return (
      <div>
        <h1>{title}</h1>
        <p>Count: {counter}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    );
  }
}
```

## With Typed Dispatch and Actions

```typescript
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from './store';
import * as actions from './actions';

type Actions = ReturnType<typeof actions[keyof typeof actions]>;

interface StateProps {
  items: string[];
}

interface DispatchProps {
  addItem: (item: string) => void;
  removeItem: (id: string) => void;
}

interface OwnProps {
  category: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  items: state.items.filter(item => item.category === ownProps.category),
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => ({
  addItem: (item: string) => dispatch(actions.addItem(item)),
  removeItem: (id: string) => dispatch(actions.removeItem(id)),
});

@connect(mapStateToProps, mapDispatchToProps)
export class ItemList extends React.Component<Props> {
  handleAdd = () => {
    this.props.addItem('New Item');
  };

  render() {
    const { items, category, removeItem } = this.props;
    
    return (
      <div>
        <h2>{category}</h2>
        <button onClick={this.handleAdd}>Add Item</button>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
```

## Decorator with Options

```typescript
import * as React from 'react';
import { connect, Options } from 'react-redux';

interface RootState {
  data: any[];
}

interface Props {
  data: any[];
}

const mapStateToProps = (state: RootState) => ({
  data: state.data,
});

const options: Options = {
  pure: true,
  areStatePropsEqual: (next, prev) => next.data.length === prev.data.length,
};

@connect(mapStateToProps, null, null, options)
export class DataList extends React.Component<Props> {
  render() {
    return (
      <ul>
        {this.props.data.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
}
```

## Notes

- The `@connect` decorator is syntactic sugar for wrapping the class with the HOC
- Decorators are a Stage 2 proposal and require `experimentalDecorators` in tsconfig
- For functional components, use hooks (`useSelector`, `useDispatch`) instead
- The decorator approach works best with class components
- Type inference works better when using `ConnectedProps` helper type
