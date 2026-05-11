import Types from 'MyTypes';
import * as React from 'react';
import { connect } from 'react-redux';

import { FCCounter } from '../components';
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

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  typeof dispatchProps;

const connectCounter = connect(
  mapStateToProps,
  dispatchProps
) as unknown as ClassDecorator;

@connectCounter
class FCCounterDecorated extends React.Component<Props> {
  render() {
    return <FCCounter {...this.props} />;
  }
}

// TypeScript class decorators do not change the declared class type, so expose
// the decorated component with its real public props.
export const FCCounterConnectedDecorator = FCCounterDecorated as unknown as React.ComponentType<
  OwnProps
>;
