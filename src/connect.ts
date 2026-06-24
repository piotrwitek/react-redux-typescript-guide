import { MapStateToPropsFactory } from 'react-redux';

/**
 * Factory function for mapStateToProps.
 *
 * @template StateProps
 * @template OwnProps
 * @template State
 * @returns {MapStateToProps<StateProps, OwnProps, State>}
 */
export type MapStateToPropsFactory<StateProps, OwnProps, State> = () => (
  state: State,
  ownProps: OwnProps
) => StateProps;

/**
 * Factory function for mapDispatchToProps.
 *
 * @template DispatchProps
 * @template OwnProps
 * @template State
 * @returns {(dispatch: Dispatch, ownProps: OwnProps) => DispatchProps}
 */
export type MapDispatchToPropsFactory<DispatchProps, OwnProps, State> = () => (
  dispatch: Dispatch,
  ownProps: OwnProps
) => DispatchProps;

/**
 * Factory function for extraArgument.
 *
 * @template State
 * @template OwnProps
 * @returns {(state: State, ownProps: OwnProps) => any}
 */
export type ExtraArgumentFactory<State, OwnProps> = () => (
  state: State,
  ownProps: OwnProps
) => any;

/**
 * connect function.
 *
 * @template StateProps
 * @template OwnProps
 * @template State
 * @template DispatchProps
 * @param mapStateToPropsFactory
 * @param mapDispatchToPropsFactory
 * @param extraArgumentFactory
 * @returns {ComponentType<StateProps & DispatchProps>}
 */
export default function connect<
  StateProps,
  OwnProps,
  State,
  DispatchProps,
>(
  mapStateToPropsFactory: MapStateToPropsFactory<StateProps, OwnProps, State>,
  mapDispatchToPropsFactory?: MapDispatchToPropsFactory<DispatchProps, OwnProps, State>,
  extraArgumentFactory?: ExtraArgumentFactory<State, OwnProps>,
): ComponentType<StateProps & DispatchProps> {
  // implementation remains the same
}