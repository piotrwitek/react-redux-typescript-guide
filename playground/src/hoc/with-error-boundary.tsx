import * as React from 'react';
import { Subtract } from 'utility-types';

const MISSING_ERROR = 'Error was swallowed during propagation.';

interface InjectedProps {
  onReset: () => any;
}

export const withErrorBoundary = <WrappedProps extends InjectedProps>(
  WrappedComponent: React.ComponentType<WrappedProps>
) => {
  type HocProps = Subtract<WrappedProps, InjectedProps> & {
    // here you can extend hoc props
  };
  type HocState = {
    readonly error: Error | null | undefined;
  };

  return class WithErrorBoundary extends React.Component<HocProps, HocState> {
    static displayName = `withErrorBoundary(${WrappedComponent.name})`;

    readonly state: HocState = {
      error: undefined,
    };

    componentDidCatch(error: Error | null, info: object) {
      this.setState({ error: error || new Error(MISSING_ERROR) });
      this.logErrorToCloud(error, info);
    }

    logErrorToCloud = (error: Error | null, info: object) => {
      // TODO: send error report to cloud
    };

    handleReset = () => {
      this.setState({ error: undefined });
    };

    render() {
      const { children, ...restProps } = this.props as {
        children: React.ReactNode;
      };
      const { error } = this.state;

      if (error) {
        return (
          <WrappedComponent
            {...restProps}
            onReset={this.handleReset} // injected
          />
        );
      }

      return children;
    }
  };
};
