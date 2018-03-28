import * as React from 'react';
import { Subtract } from 'utility-types';

// These props will be subtracted from original component type
interface WrappedComponentProps {
  count: number;
  onIncrement: () => any;
}

export const withState = <P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  // These props will be added to original component type
  interface Props {
    initialCount?: number;
  }
  interface State {
    readonly count: number;
  }

  return class WithState extends React.Component<Subtract<P, WrappedComponentProps> & Props, State> {
    // Enhance component name for debugging and React-Dev-Tools
    static displayName = `withState(${WrappedComponent.name})`;

    readonly state: State = {
      count: Number(this.props.initialCount) || 0,
    };

    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    }

    render() {
      const { ...remainingProps } = this.props;
      const { count } = this.state;

      return (
        <WrappedComponent
          {...remainingProps}
          count={count}
          onIncrement={this.handleIncrement}
        />
      );
    }
  };
};
