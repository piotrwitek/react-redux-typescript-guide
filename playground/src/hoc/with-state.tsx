import React from 'react';
import { Diff } from 'utility-types';

// These props will be injected into the base component
interface InjectedProps {
  count: number;
  onIncrement: () => void;
}

export const withState = <BaseProps extends InjectedProps>(
  BaseComponent: React.ComponentType<BaseProps>
) => {
  type HocProps = Diff<BaseProps, InjectedProps> & {
    // here you can extend hoc with new props
    initialCount?: number;
  };
  type HocState = {
    readonly count: number;
  };

  return class Hoc extends React.Component<HocProps, HocState> {
    // Enhance component name for debugging and React-Dev-Tools
    static displayName = `withState(${BaseComponent.name})`;
    // reference to original wrapped component
    static readonly WrappedComponent = BaseComponent;

    readonly state: HocState = {
      count: Number(this.props.initialCount) || 0,
    };

    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    };

    render() {
      const { ...restProps } = this.props;
      const { count } = this.state;

      return (
        <BaseComponent
        {...(restProps as BaseProps)}
          count={count} // injected
          onIncrement={this.handleIncrement} // injected
        />
      );
    }
  };
};
