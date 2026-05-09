import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../store/types';
import { countersActions } from '../features/counters';
import { hotelsActions } from '../features/hotels';

// Props that come from the parent component
interface OwnProps {
  label: string;
}

// Props from Redux state (mapStateToProps)
interface StateProps {
  count: number;
}

// Props from Redux dispatch (mapDispatchToProps)
interface DispatchProps {
  onIncrement: () => void;
  onDecrement: () => void;
}

// All component props combined
type Props = OwnProps & StateProps & DispatchProps;

// Map Redux state to component props
const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  count: state.counters.reduxCounter,
});

// Map Redux dispatch to component props
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      onIncrement: countersActions.increment,
      onDecrement: countersActions.decrement,
    },
    dispatch
  );

// Using the @connect decorator syntax
@connect(mapStateToProps, mapDispatchToProps)
class ConnectedCounter extends Component<Props> {
  render() {
    const { label, count, onIncrement, onDecrement } = this.props;
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

export default ConnectedCounter;
