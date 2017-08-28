import { connect } from 'react-redux';

import { RootState } from '@src/redux';
import { actionCreators } from '@src/redux/counters';
import { SFCCounter } from '@src/components';

export interface SFCCounterConnectedExtended {
  initialCount: number,
}

const mapStateToProps = (state: RootState, ownProps: SFCCounterConnectedExtended) => ({
  count: state.counters.sfcCounter,
});

export const SFCCounterConnectedExtended = connect(mapStateToProps, {
  onIncrement: actionCreators.incrementSfc,
})(SFCCounter);
