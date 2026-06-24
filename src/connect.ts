import { MapStateToPropsFactory } from 'react-redux';

/**
 * The type of the props returned by a connect factory function.
 */
export type ConnectFactoryProps<S, P> = MapStateToPropsFactory<S, P> | ((state: S, ownProps: P) => MapStateToProps<S, P>);

/**
 * The type of a connect factory function.
 */
export type ConnectFactory<S, P> = (state: S, ownProps: P) => ConnectFactoryProps<S, P>;

/**
 * The connect function with type definitions for the factory props.
 */
export default function connect<S, P, M, O>(
  mapStateToPropsFactory: ConnectFactory<S, P>,
  mapDispatchToProps?: MapDispatchToProps<M, O> | ((dispatch: Dispatch<M>, ownProps: O) => MapDispatchToProps<M, O>),
  mergeProps?: MergeProps<S, P, M, O>,
  options?: Options,
): Connect<S, P, M, O> {
  // implementation remains the same
}