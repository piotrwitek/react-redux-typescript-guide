import { MapStateToPropsFactory } from 'react-redux';

/**
 * The props returned by a connect factory function.
 *
 * @template StateProps
 * @template OwnProps
 * @template State
 */
export interface ConnectFactoryProps<StateProps, OwnProps, State> {
  /**
   * The mapStateToProps function.
   */
  mapStateToProps: (state: State, ownProps: OwnProps) => StateProps;
  /**
   * The mapDispatchToProps function.
   */
  mapDispatchToProps: (dispatch: any, ownProps: OwnProps) => any;
}

/**
 * The connect factory function.
 *
 * @template StateProps
 * @template OwnProps
 * @template State
 */
export type ConnectFactory<StateProps, OwnProps, State> = (
  mapStateToProps: MapStateToPropsFactory<StateProps, OwnProps, State>
) => (WrappedComponent: React.ComponentType<OwnProps>) => React.ComponentType<StateProps>;

export function connect(mapStateToPropsFactory: ConnectFactoryProps<any, any, any>) {
  // implementation remains the same
}