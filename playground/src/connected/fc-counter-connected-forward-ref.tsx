import Types from 'MyTypes';
import { connect } from 'react-redux';

import { countersActions, countersSelectors } from '../features/counters';
import { ForwardedCounter } from '../components';

const mapStateToProps = (state: Types.RootState) => ({
  count: countersSelectors.getReduxCounter(state.counters),
});

const dispatchProps = {
  onIncrement: countersActions.increment,
};

// `connect` accepts a `forwardRef: true` option so the `ref` you pass on the
// rendered component is forwarded all the way down to the wrapped component.
// Here the wrapped `ForwardedCounter` forwards its ref to a <button>, so the
// connected component's `ref` is typed as `HTMLButtonElement`.
export const FCCounterConnectedForwardRef = connect(
  mapStateToProps,
  dispatchProps,
  null,
  { forwardRef: true }
)(ForwardedCounter);
