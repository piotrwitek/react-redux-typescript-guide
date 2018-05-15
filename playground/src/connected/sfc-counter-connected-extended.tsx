import { connect } from 'react-redux';

import { RootState } from '@src/redux';
import { countersActions, countersSelectors } from '@src/redux/counters';
import { SFCCounter } from '@src/components';

export interface SFCCounterConnectedExtendedProps {
  initialCount: number;
}

const mapStateToProps = (state: RootState, ownProps: SFCCounterConnectedExtendedProps) => ({
  count: countersSelectors.getReduxCounter(state) + ownProps.initialCount,
});

export const SFCCounterConnectedExtended = connect(mapStateToProps, {
  onIncrement: countersActions.increment,
})(SFCCounter);
