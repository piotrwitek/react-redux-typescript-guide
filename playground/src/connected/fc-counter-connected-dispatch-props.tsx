import Types from 'MyTypes';
import { connect } from 'react-redux';
import * as React from 'react';

import { countersActions } from '../features/counters';

type OwnProps = {
  label: string;
};

type StateProps = {
  count: number;
};

const dispatchProps = {
  onIncrement: countersActions.increment,
  onAdd: countersActions.add,
};

type DispatchProps = typeof dispatchProps;

type Props = OwnProps & StateProps & DispatchProps;

const FCCounterWithTypedDispatch: React.FC<Props> = props => {
  const { label, count, onAdd, onIncrement } = props;

  const handleIncrement = () => {
    onIncrement();
  };

  const handleAdd = () => {
    onAdd(5);
  };

  return (
    <div>
      <span>
        {label}: {count}
      </span>
      <button type="button" onClick={handleIncrement}>
        {`Increment`}
      </button>
      <button type="button" onClick={handleAdd}>
        {`Add 5`}
      </button>
    </div>
  );
};

const mapStateToProps = (state: Types.RootState): StateProps => ({
  count: state.counters.reduxCounter,
});

export const FCCounterConnectedDispatchProps = connect(
  mapStateToProps,
  dispatchProps
)(FCCounterWithTypedDispatch);
