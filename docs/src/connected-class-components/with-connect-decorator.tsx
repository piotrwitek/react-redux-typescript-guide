import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../store/types';
import { countersActions } from '../store/counters';

// OwnProps are the props passed directly to the component by its parent
type OwnProps = {
  label: string;
};

// Props mapped from Redux state
type StateProps = ReturnType<typeof mapStateToProps>;

// Props mapped from Redux dispatch
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

// Combined props type for the component
type Props = OwnProps & StateProps & DispatchProps;

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  count: state.counters.reduxCounter,
  label: ownProps.label,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => ({
  onIncrement: () => dispatch(countersActions.increment()),
  onDecrement: () => dispatch(countersActions.decrement()),
});

// Apply @connect decorator - requires "experimentalDecorators: true" in tsconfig.json
@connect(mapStateToProps, mapDispatchToProps)
class CounterWithDecorator extends React.Component<Props> {
  render() {
    const { count, label, onIncrement, onDecrement } = this.props;
    return (
      <div>
        <span>
          {label}: {count}
        </span>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
      </div>
    );
  }
}

export default CounterWithDecorator;
