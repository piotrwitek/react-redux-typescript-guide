import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import { countersActions } from '../features/counters';

// Thunk Action
const incrementWithDelay = () => async (dispatch: Dispatch): Promise<void> => {
  setTimeout(() => dispatch(countersActions.increment()), 1000);
};

const mapStateToProps = (state: Types.RootState) => ({
  count: state.counters.reduxCounter,
});

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) =>
  bindActionCreators(
    {
      onIncrement: incrementWithDelay,
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    label: string;
  };

export const FCCounter: React.FC<Props> = props => {
  const { label, count, onIncrement } = props;

  const handleIncrement = () => {
    // Thunk action is correctly typed as promise
    onIncrement().then(() => {
      // ...
    });
  };

  return (
    <div>
      <span>
        {label}: {count}
      </span>
      <button type="button" onClick={handleIncrement}>
        {`Increment`}
      </button>
    </div>
  );
};

export const FCCounterConnectedBindActionCreators = connect(
  mapStateToProps,
  mapDispatchToProps
)(FCCounter);
