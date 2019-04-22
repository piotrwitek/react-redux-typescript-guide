import * as React from 'react';
import { Subtract } from 'utility-types';

const MISSING_ERROR = 'Error was swallowed during propagation.';

// These props will be subtracted from base component props
interface InjectedProps {
  onReset: () => void;
}

export const withErrorBoundary = <BaseProps extends InjectedProps>(
  _BaseComponent: React.ComponentType<BaseProps>
) => {
  // fix for TypeScript issues: https://github.com/piotrwitek/react-redux-typescript-guide/issues/111
  const BaseComponent = _BaseComponent as React.ComponentType<InjectedProps>;

  type HocProps = Subtract<BaseProps, InjectedProps> & {
    // here you can extend hoc with new props
  };
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

    handleReset = () => {
      this.setState({ error: undefined });
    };

    render() {
      const { children, ...restProps } = this.props;
      const { error } = this.state;

      if (error) {
        return (
          <BaseComponent
            onReset={this.handleReset} // injected
            {...restProps}
          />
        );
      }

      return children;
    }
  };
};
