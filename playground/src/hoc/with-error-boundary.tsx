import React from 'react';

const MISSING_ERROR = 'Error was swallowed during propagation.';

export const withErrorBoundary = <BaseProps extends {}>(
  BaseComponent: React.ComponentType<BaseProps>
) => {
  type HocProps = React.PropsWithChildren<{
    // here you can extend hoc with new props
  }>;
  type HocState = {
    readonly error: Error | null | undefined;
  };

  return class Hoc extends React.Component<HocProps, HocState> {
    // Enhance component name for debugging and React-Dev-Tools
    static displayName = `withErrorBoundary(${BaseComponent.name})`;
    // reference to original wrapped component
    static readonly WrappedComponent = BaseComponent;

    readonly state: HocState = {
      error: undefined,
    };

    componentDidCatch(error: Error | null, info: object) {
      this.setState({ error: error || new Error(MISSING_ERROR) });
      this.logErrorToCloud(error, info);
    }

    logErrorToCloud = (error: Error | null, info: object) => {
      // TODO: send error report to service provider
    };

    render() {
      const { children, ...restProps } = this.props;
      const { error } = this.state;

      if (error) {
        return <BaseComponent {...(restProps as BaseProps)} />;
      }

      return children;
    }
  };
};
