import Types from 'Types';
import { connect } from 'react-redux';

import { countersActions, countersSelectors } from '../features/counters';
import { FCCounter } from '../components';

type OwnProps = {
  initialCount: number;
};

const mapStateToProps = (state: Types.RootState, ownProps: OwnProps) => ({
  count:
    countersSelectors.getReduxCounter(state.counters) + ownProps.initialCount,
});

export const FCCounterConnectedExtended = connect(
  mapStateToProps,
  {
    onIncrement: countersActions.increment,
  }
)(FCCounter);
