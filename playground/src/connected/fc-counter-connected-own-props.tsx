import Types from 'MyTypes';
import { connect } from 'react-redux';

import { countersActions, countersSelectors } from '../features/counters';
import { FCCounter } from '../components';

type OwnProps = {
  initialCount?: number;
};

const mapStateToProps = (state: Types.RootState, ownProps: OwnProps) => ({
  count:
    countersSelectors.getReduxCounter(state.counters) +
    (ownProps.initialCount || 0),
});

const dispatchProps = {
  onIncrement: countersActions.increment,
};

export const FCCounterConnectedOwnProps = connect(
  mapStateToProps,
  dispatchProps
)(FCCounter);
