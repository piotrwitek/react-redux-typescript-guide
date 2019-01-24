import Types from 'Types';
import { connect } from 'react-redux';

import { countersActions, countersSelectors } from '../features/counters';
import { FCCounter } from '../components';

const mapStateToProps = (state: Types.RootState) => ({
  count: countersSelectors.getReduxCounter(state.counters),
});

export const FCCounterConnected = connect(
  mapStateToProps,
  {
    onIncrement: countersActions.increment,
  }
)(FCCounter);
