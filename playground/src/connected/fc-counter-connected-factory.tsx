import Types from 'MyTypes';
import { connect, MapStateToPropsFactory } from 'react-redux';

import { countersActions, countersSelectors } from '../features/counters';
import { FCCounter } from '../components';

type OwnProps = {
  initialCount?: number;
};

type StateProps = {
  count: number;
};

const makeMapStateToProps: MapStateToPropsFactory<
  StateProps,
  OwnProps,
  Types.RootState
> = (_, initialOwnProps) => {
  const offset = initialOwnProps.initialCount || 0;

  return state => ({
    count: countersSelectors.getReduxCounter(state.counters) + offset,
  });
};

const dispatchProps = {
  onIncrement: countersActions.increment,
};

export const FCCounterConnectedFactory = connect(
  makeMapStateToProps,
  dispatchProps
)(FCCounter);