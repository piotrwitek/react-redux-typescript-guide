import { connect } from 'react-redux';

import { IRootState } from '@src/redux';
import { actionCreators } from '@src/redux/counters';
import { SFCCounter } from '../components';

const mapStateToProps = (state: IRootState) => ({
  count: state.counters.sfcCounter,
});

export const SFCCounterConnectedConcise = connect(mapStateToProps, {
  onIncrement: actionCreators.incrementSfc,
})(SFCCounter);
