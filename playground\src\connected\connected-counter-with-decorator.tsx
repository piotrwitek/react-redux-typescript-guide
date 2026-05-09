// NOTE: Requires `"experimentalDecorators": true` in tsconfig.json
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../store/types';
import { countersActions } from '../features/counters';

// Props passed by the parent component
interface OwnProps {
  label: string;
}

// Props mapped from Redux state via mapStateToProps
interface StateProps {
  count: number;
}

// Props mapped from Redux dispatch via mapDispatchToProps
interface DispatchProps {
  onIncrement: () => void;
  onDecrement: () => void;
}

// All props combined — used as the component Props type
type Props = OwnProps & StateProps & DispatchProps;

const mapStateToProps = (
  state: RootState,
  _ownProps: OwnProps
): StateProps => ({
  count: state.counters.reduxCounter,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      onIncrement: countersActions.increment,
      onDecrement: countersActions.decrement,
    },
    dispatch
  );

// Using @connect decorator
// Equivalent to:
// export default connect(mapStateToProps, mapDispatchToProps)(ConnectedCounterWithDecorator)
@connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)
class ConnectedCounterWithDecorator extends Component<Props> {
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

export default ConnectedCounterWithDecorator;
