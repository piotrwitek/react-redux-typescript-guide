import { MapStateToPropsFactory } from 'react-redux';

/**
 * Props returned by a connect factory function.
 *
 * @template StateProps
 * @template OwnProps
 * @template State
 */
export type ConnectFactoryProps<StateProps, OwnProps, State> =
  | ((state: State, ownProps: OwnProps) => StateProps)
  | ((state: State, ownProps: OwnProps) => void)
  | ((state: State, ownProps: OwnProps) => PromiseLike<StateProps>)
  | ((state: State, ownProps: OwnProps) => PromiseLike<void>)
  | ((state: State, ownProps: OwnProps) => void | StateProps | PromiseLike<void> | PromiseLike<StateProps>);

/**
 * A factory function that returns a mapStateToProps function.
 *
 * @template StateProps
 * @template OwnProps
 * @template State
 */
export type ConnectFactory<StateProps, OwnProps, State> = (
  props: ConnectFactoryProps<StateProps, OwnProps, State>
) => (dispatch: any, ownProps: OwnProps) => StateProps;

/**
 * Connects a component to the Redux store.
 *
 * @template StateProps
 * @template OwnProps
 * @template State
 */
export function connect<StateProps, OwnProps, State>(
  mapStateToPropsFactory: ConnectFactory<StateProps, OwnProps, State>
): (WrappedComponent: React.ComponentType<OwnProps>) => React.ComponentType<StateProps>;