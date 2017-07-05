import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { IRootState, Dispatch } from '@src/redux';
import { actionCreators } from '@src/redux/counters';
import { SFCCounter } from '../components';

const mapStateToProps = (state: IRootState) => ({
  count: state.counters.sfcCounter,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onIncrement: actionCreators.incrementSfc,
}, dispatch);

export const SFCCounterConnected =
  connect(mapStateToProps, mapDispatchToProps)(SFCCounter);
