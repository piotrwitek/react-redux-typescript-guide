import * as React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../store/root-reducer';
import { countersActions } from '../features/counters';
import { getCounter } from '../features/counters/selectors';
import FCCounter from '../components/fc-counter';

// mapStateToProps using a selector to derive counter value from global state
// The selector handles the adaptation from RootState to the value the component needs
const mapStateToProps = (state: RootState) => ({
  count: getCounter(state),
});

const mapDispatchToProps = {
  onIncrement: countersActions.increment,
  onDecrement: countersActions.decrement,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FCCounter);
