import * as React from 'react';
import { Diff as Subtract } from 'react-redux-typescript';

const MISSING_ERROR = 'Error was swallowed during propagation.';

interface WrappedComponentProps {
  onReset?: () => any,
}

export const withErrorBoundary = <P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P>,
) => {
  interface Props { }
  interface State {
    error: Error | null | undefined,
  }

  return class WithErrorBoundary extends React.Component<Subtract<P, WrappedComponentProps> & Props, State> {
    static displayName = `withErrorBoundary(${WrappedComponent.name})`;

    state: State = {
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
      const { children, ...remainingProps } = this.props;
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
