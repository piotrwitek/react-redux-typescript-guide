import { connect } from 'react-redux';

import { RootState } from '@src/redux';
import { actions, CountersSelectors } from '@src/redux/counters';
import { SFCCounter } from '@src/components';

const mapStateToProps = (state: RootState) => ({
  count: CountersSelectors.getReduxCounter(state),
});

export const SFCCounterConnected = connect(mapStateToProps, {
  onIncrement: actions.increment,
})(SFCCounter);
