import { connect } from 'react-redux';

import { RootState } from '@src/redux';
import { actionCreators } from '@src/redux/counters';
import { SFCCounter } from '@src/components';

const mapStateToProps = (state: RootState) => ({
  count: state.counters.sfcCounter,
});

export const SFCCounterConnected = connect(mapStateToProps, {
  onIncrement: actionCreators.incrementSfc,
})(SFCCounter);
