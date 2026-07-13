import { Dispatch } from 'redux';
import { connect, MapStateToPropsFactory, MapDispatchToPropsFactory } from 'react-redux';
import { createSelector } from 'reselect';

import { RootState } from '../store/types';
import { incrementCounter, decrementCounter } from '../store/counter/actions';
import { Counter } from '../components/counter';

export type StateProps = ReturnType<ReturnType<typeof mapStateToPropsFactory>>;
export type DispatchProps = ReturnType<ReturnType<typeof mapDispatchToPropsFactory>>;
export type Props = StateProps & DispatchProps;

// Example per-instance memoized selector factory using reselect
const makeCounterValueSelector = () =>
  createSelector(
    (state: RootState) => state.counter.count,
    count => count
  );

/**
 * mapStateToPropsFactory returns a new mapStateToProps function per component
 * instance, enabling per-instance memoization via selectors (e.g. reselect).
 */
const mapStateToPropsFactory: MapStateToPropsFactory<StateProps, {}, RootState> = () => {
  const counterValueSelector = makeCounterValueSelector();

  return (state: RootState) => ({
    count: counterValueSelector(state),
  });
};

/**
 * mapDispatchToPropsFactory returns a new mapDispatchToProps function per
 * component instance.
 */
const mapDispatchToPropsFactory: MapDispatchToPropsFactory<DispatchProps, {}> = () => {
  return (dispatch: Dispatch) => ({
    onIncrement: () => dispatch(incrementCounter()),
    onDecrement: () => dispatch(decrementCounter()),
  });
};

export default connect(
  mapStateToPropsFactory,
  mapDispatchToPropsFactory
)(Counter);
