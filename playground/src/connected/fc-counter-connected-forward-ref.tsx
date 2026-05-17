import * as React from 'react';
import Types from 'MyTypes';
import { connect, ConnectedProps } from 'react-redux';

import { countersActions, countersSelectors } from '../features/counters';

type OwnProps = {
  label: string;
};

const mapStateToProps = (state: Types.RootState) => ({
  count: countersSelectors.getReduxCounter(state.counters),
});

const dispatchProps = {
  onIncrement: countersActions.increment,
};

const connector = connect(mapStateToProps, dispatchProps, null, {
  forwardRef: true,
});

type ReduxProps = ConnectedProps<typeof connector>;
type Props = OwnProps & ReduxProps;

class FCCounterConnectedForwardRefBase extends React.Component<Props> {
  focus = () => {
    // imperative API exposed via forwarded ref
  };

  render() {
    const { label, count, onIncrement } = this.props;

    return (
      <div>
        <span>
          {label}: {count}
        </span>
        <button type="button" onClick={onIncrement}>
          {`Increment`}
        </button>
      </div>
    );
  }
}

const FCCounterConnected = connector(FCCounterConnectedForwardRefBase);

export type FCCounterConnectedForwardRefInstance =
  FCCounterConnectedForwardRefBase;

export const FCCounterConnectedForwardRef = React.forwardRef<
  FCCounterConnectedForwardRefInstance,
  OwnProps
>((props, ref) => (
  <FCCounterConnected {...props} {...(ref ? { ref } : {})} />
));
