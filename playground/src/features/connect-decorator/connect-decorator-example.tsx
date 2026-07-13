/**
 * Example: Using the @connect decorator with TypeScript
 *
 * Prerequisites:
 *   - Set "experimentalDecorators": true in tsconfig.json
 *   - Set "emitDecoratorMetadata": true in tsconfig.json (optional but recommended)
 *
 * The key challenge with @connect as a decorator is that TypeScript validates
 * component props at usage sites. When using the decorator pattern, we need to
 * ensure the component's Props type includes both OwnProps and the connected props.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// --- Types ---

type RootState = {
  counter: {
    count: number;
  };
};

// Own props are what the parent component passes directly
type OwnProps = {
  title: string;
};

// Derive state and dispatch prop types from the mapping functions
// This keeps types in sync with the actual implementations
const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  count: state.counter.count,
  title: ownProps.title,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onIncrement: () => dispatch({ type: 'INCREMENT' }),
  onDecrement: () => dispatch({ type: 'DECREMENT' }),
  onReset: () => dispatch({ type: 'RESET' }),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

// Combined component props = own props + state props + dispatch props
type Props = OwnProps & StateProps & DispatchProps;

// --- Component ---

/**
 * Using @connect as a decorator.
 *
 * Note: The decorator is applied to the class, injecting Redux state and
 * dispatch as props. TypeScript sees the component as requiring all Props,
 * but the connected (exported) component only requires OwnProps from the outside.
 */
@connect(mapStateToProps, mapDispatchToProps)
class Counter extends React.Component<Props> {
  render() {
    const { title, count, onIncrement, onDecrement, onReset } = this.props;

    return (
      <div>
        <h2>{title}</h2>
        <p>Count: {count}</p>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
        <button onClick={onReset}>Reset</button>
      </div>
    );
  }
}

// Export the decorated class — TypeScript needs a cast here because the
// @connect decorator transforms the component but the type system doesn't
// automatically reflect that OwnProps is now sufficient for the outer usage.
export default Counter as React.ComponentType<OwnProps>;

// --- Usage example ---
// In a parent component:
//
// import Counter from './connect-decorator-example';
//
// const Parent = () => (
//   <Counter title="My Counter" />  // only OwnProps needed here
// );
