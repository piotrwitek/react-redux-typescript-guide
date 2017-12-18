import * as React from 'react';

import { Omit } from '@src/types/react-redux-typescript';

interface HOCProps {
  count: number,
  onIncrement: () => any,
}

interface HOCState {
  count: number,
}

export const withState = <WrappedComponentProps extends HOCProps>(
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
) => {
  return class extends React.Component<Omit<WrappedComponentProps, keyof HOCProps>, HOCState> {
    static displayName = `withState(${WrappedComponent.name})`;

    state: HOCState = {
      count: 0,
    };

    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    };

    render() {
      const { ...remainingProps } = this.props as any;
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
