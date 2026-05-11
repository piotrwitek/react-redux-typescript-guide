import * as React from 'react';
import Types from 'MyTypes';
import { connect } from 'react-redux';

import { countersSelectors } from '../features/counters';

type OwnProps = {
  label: string;
};

type StateProps = {
  count: number;
};

type Props = OwnProps & StateProps;

export class ClassCounterWithHandle extends React.Component<Props> {
  private readonly root = React.createRef<HTMLDivElement>();

  focus = () => {
    this.root.current?.focus();
  };

  render() {
    const { count, label } = this.props;

    return (
      <div ref={this.root} tabIndex={-1}>
        {label}: {count}
      </div>
    );
  }
}

const mapStateToProps = (state: Types.RootState): StateProps => ({
  count: countersSelectors.getReduxCounter(state.counters),
});

type ConnectedCounterProps = OwnProps &
  React.RefAttributes<ClassCounterWithHandle>;

export const ClassCounterWithHandleConnected = connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(ClassCounterWithHandle) as React.ComponentType<ConnectedCounterProps>;

export class ClassCounterWithHandleParent extends React.Component {
  private readonly counterRef = React.createRef<ClassCounterWithHandle>();

  handleFocus = () => {
    this.counterRef.current?.focus();
  };

  render() {
    return (
      <div>
        <ClassCounterWithHandleConnected
          ref={this.counterRef}
          label="Connected class counter"
        />
        <button type="button" onClick={this.handleFocus}>
          Focus counter
        </button>
      </div>
    );
  }
}
