import { RootState } from 'MyTypes';
import React from 'react';
import { connect } from 'react-redux';
import { Diff } from 'utility-types';
import { countersActions, countersSelectors } from '../features/counters';

// These props will be injected into the base component
interface InjectedProps {
  count: number;
  onIncrement: () => void;
}

export const withConnectedCount = <BaseProps extends InjectedProps>(
  BaseComponent: React.ComponentType<BaseProps>
) => {
  type HocProps = Diff<BaseProps, InjectedProps> & {
    // here you can extend hoc with new props
    initialCount?: number;
  };

  const mapStateToProps = (state: RootState) => ({
    count: countersSelectors.getReduxCounter(state.counters),
  });

  const dispatchProps = {
    onIncrement: countersActions.increment,
  };

  class Hoc extends React.Component<InjectedProps> {
    // Enhance component name for debugging and React-Dev-Tools
    static displayName = `withConnectedCount(${BaseComponent.name})`;
    // reference to original wrapped component
    static readonly WrappedComponent = BaseComponent;

    render() {
      const { count, onIncrement, ...restProps } = this.props;

      return (
        <BaseComponent
          count={count} // injected
          onIncrement={onIncrement} // injected
          {...(restProps as BaseProps)}
        />
      );
    }
  }

  const ConnectedHoc = connect<
    ReturnType<typeof mapStateToProps>,
    typeof dispatchProps,
    HocProps,
    RootState
  >(
    mapStateToProps,
    dispatchProps
  )(Hoc);

  return ConnectedHoc;
};
