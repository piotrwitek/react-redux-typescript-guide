import { connect } from 'react-redux';

import { RootState } from '@src/redux';
import { countersActions, countersSelectors } from '@src/redux/counters';
import { SFCCounter } from '@src/components';

const mapStateToProps = (state: RootState) => ({
  count: countersSelectors.getReduxCounter(state),
});

export const SFCCounterConnected = connect(mapStateToProps, {
  onIncrement: countersActions.increment,
})(SFCCounter);
