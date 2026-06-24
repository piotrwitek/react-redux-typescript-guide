import {
  MapStateToProps,
  MapDispatchToProps,
  MergeProps,
  OwnProps,
  Dispatch,
  Action,
  AnyAction,
} from 'react-redux';

/**
 * Factory type for `mapStateToProps`.
 *
 * Allows you to create a selector (or any other per‑instance logic) once per component
 * instance and then return a `mapStateToProps` function that uses that selector.
 *
 * @example
 * const mapStateToPropsFactory: MapStateToPropsFactory<StateProps, OwnProps, State> = () => {
 *   const selector = makeMySelector();
 *   return (state, ownProps) => selector(state, ownProps);
 * };
 *
 * export default connect(mapStateToPropsFactory)(MyComponent);
 */
export type MapStateToPropsFactory<
  TStateProps = {},
  TOwnProps = {},
  State = any
> = () => MapStateToProps<TStateProps, TOwnProps, State>;

/**
 * Factory type for `mapDispatchToProps`.
 *
 * Similar to `MapStateToPropsFactory`, this lets you create per‑instance dispatch
 * helpers (e.g., memoized action creators) and return a `mapDispatchToProps` function.
 *
 * @example
 * const mapDispatchToPropsFactory: MapDispatchToPropsFactory<DispatchProps, OwnProps> = () => {
 *   const boundAction = (dispatch: Dispatch) => (payload) => dispatch(myAction(payload));
 *   return (dispatch) => ({
 *     boundAction: boundAction(dispatch),
 *   });
 * };
 *
 * export default connect(null, mapDispatchToPropsFactory)(MyComponent);
 */
export type MapDispatchToPropsFactory<
  TDispatchProps = {},
  TOwnProps = {}
> = () => MapDispatchToProps<TDispatchProps, TOwnProps>;

/**
 * Factory type for `mergeProps`.
 *
 * Enables per‑instance merging logic, such as custom memoization of the final props
 * passed to the wrapped component.
 *
 * @example
 * const mergePropsFactory: MergePropsFactory<StateProps, DispatchProps, OwnProps, MergedProps> = () => {
 *   const memoizedMerge = memoize((stateProps, dispatchProps, ownProps) => ({
 *     ...stateProps,
 *     ...dispatchProps,
 *     ...ownProps,
 *   }));
 *   return memoizedMerge;
 * };
 *
 * export default connect(mapStateToProps, mapDispatchToProps, mergePropsFactory)(MyComponent);
 */
export type MergePropsFactory<
  TStateProps = {},
  TDispatchProps = {},
  TOwnProps = {},
  TMergedProps = {}
> = () => MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>;

/**
 * Convenience type that combines all three factory types for a full `connect` call.
 *
 * Useful when you need factories for state, dispatch, and merge props simultaneously.
 */
export type ConnectFactories<
  TStateProps = {},
  TDispatchProps = {},
  TOwnProps = {},
  TMergedProps = {},
  State = any
> = {
  mapStateToPropsFactory?: MapStateToPropsFactory<TStateProps, TOwnProps, State>;
  mapDispatchToPropsFactory?: MapDispatchToPropsFactory<TDispatchProps, TOwnProps>;
  mergePropsFactory?: MergePropsFactory<TStateProps, TDispatchProps, TOwnProps, TMergedProps>;
};