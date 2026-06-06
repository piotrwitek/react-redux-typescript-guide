import Types from 'MyTypes';
import { connect, MapStateToPropsFactory } from 'react-redux';

import { countersActions, countersSelectors } from '../features/counters';
import { FCCounter } from '../components';

type OwnProps = {
  label: string;
  initialCount?: number;
};

type StateProps = {
  count: number;
};

const makeMapStateToProps: MapStateToPropsFactory<
  StateProps,
  OwnProps,
  Types.RootState
> = () => {
  let previousCount: number | undefined;
  let previousInitialCount: number | undefined;
  let previousResult: StateProps | undefined;

  return (state: Types.RootState, ownProps: OwnProps) => {
    const count = countersSelectors.getReduxCounter(state.counters);
    const initialCount = ownProps.initialCount || 0;

    if (
      previousResult &&
      previousCount === count &&
      previousInitialCount === initialCount
    ) {
      return previousResult;
    }

    previousCount = count;
    previousInitialCount = initialCount;
    previousResult = {
      count: count + initialCount,
    };

    return previousResult;
  };
};

const dispatchProps = {
  onIncrement: countersActions.increment,
};

export const FCCounterConnectedFactory = connect(
  makeMapStateToProps,
  dispatchProps
)(FCCounter);
