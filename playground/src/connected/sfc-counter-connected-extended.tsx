import Types from 'Types';
import { connect } from 'react-redux';

import { countersActions, countersSelectors } from '../features/counters';
import { SFCCounter } from '../components';

export interface SFCCounterConnectedExtendedProps {
  initialCount: number;
}

const mapStateToProps = (state: Types.RootState, ownProps: SFCCounterConnectedExtendedProps) => ({
  count: countersSelectors.getReduxCounter(state.counters) + ownProps.initialCount,
});

export const SFCCounterConnectedExtended = connect(mapStateToProps, {
  onIncrement: countersActions.increment,
})(SFCCounter);
