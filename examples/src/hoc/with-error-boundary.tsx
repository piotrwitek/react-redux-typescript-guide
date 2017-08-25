import * as React from 'react';

const MISSING_ERROR = 'Error was swallowed during propagation.';

interface Props {
}

interface State {
  error: Error | null | undefined,
}

interface WrappedComponentProps {
  onReset: () => any,
}

export function withErrorBoundary(
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
) {
  const HOC = class extends React.Component<Props, State> {

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
      const { children } = this.props;
      const { error } = this.state;

      if (error) {
        return (
          <WrappedComponent onReset={this.handleReset} />
        );
      }

      return children as any;
    }
  };

  return HOC;
}
