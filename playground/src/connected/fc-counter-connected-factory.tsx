import * as React from 'react';
import { connect, MapStateToPropsFactory } from 'react-redux';

import { increment } from '../features/counters/actions';
import { RootState } from '../store';

type StateProps = {
  count: number;
};

type DispatchProps = {
  onIncrement: () => void;
};

type OwnProps = {
  label: string;
};

type Props = StateProps & DispatchProps & OwnProps;

// Factory form of mapStateToProps enables per-instance memoization
// of expensive selectors (see reduxjs/react-redux#279)
const mapStateToPropsFactory: MapStateToPropsFactory<
  StateProps,
  OwnProps,
  RootState
> = (initialState, ownProps) => {
  // create memoized selector once per component instance
  let lastCount = initialState.counters.reduxCounter;
  let lastResult: StateProps = { count: lastCount };

  return (state, ownProps) => {
    if (state.counters.reduxCounter !== lastCount) {
      lastCount = state.counters.reduxCounter;
      lastResult = { count: lastCount };
    }
    return lastResult;
  };
};

const mapDispatchToProps: DispatchProps = {
  onIncrement: increment,
};

export const FCCounterConnectedFactory: React.FC<Props> = ({
  label,
  count,
  onIncrement,
}) => (
  <div>
    <span>
      {label}: {count}
    </span>
    <button type="button" onClick={onIncrement}>
      {`Increment`}
    </button>
  </div>
);

export default connect(
  mapStateToPropsFactory,
  mapDispatchToProps
)(FCCounterConnectedFactory);
