import * as React from 'react';

import { Omit } from '@src/types/react-redux-typescript';

const MISSING_ERROR = 'Error was swallowed during propagation.';

interface HOCProps {
  onReset: () => any,
}

interface HOCState {
  error: Error | null | undefined,
}

export const withErrorBoundary = <WrappedComponentProps extends HOCProps>(
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
) => {
  return class extends React.Component<Omit<WrappedComponentProps, keyof HOCProps>, HOCState> {
    static displayName = `withErrorBoundary(${WrappedComponent.name})`;

    state: HOCState = {
      error: undefined,
    };

    componentDidCatch(error: Error | null, info: object) {
      this.setState({ error: error || new Error(MISSING_ERROR) });
      this.logErrorToCloud(error, info);
    }

    logErrorToCloud = (error: Error | null, info: object) => {
      // TODO: send error report to cloud
    }

    handleReset = () => {
      this.setState({ error: undefined });
    }

    render() {
      const { children, ...remainingProps } = this.props as any;
      const { error } = this.state;

      if (error) {
        return (
          <WrappedComponent
            {...remainingProps}
            onReset={this.handleReset}
          />
        );
      }

      return children;
    }
  };
};
