```markdown
### Factory Functions

In advanced scenarios where you need more control over the rendering performance, `mapDispatchToProps()` can also return a function. In this case, that function will be used as `mapDispatchToProps()` for a particular component instance. This allows you to do per-instance memoization. You can refer to [issue](https://github.com/reduxjs/react-redux/pull/279).

#### Factory Prop Types

```typescript
/**
 * A factory function that returns a function to be used as `mapStateToProps`.
 *
 * @template StateProps
 * @template OwnProps
 * @template State
 * @param {Function} [selector] - A function that takes the `state` and `ownProps` as arguments and returns the props for the component.
 * @returns {Function} A function that takes the `state` and `ownProps` as arguments and returns the props for the component.
 */
export type MapStateToPropsFactory<StateProps, OwnProps, State> = (
  /**
   * A function that takes the `state` and `ownProps` as arguments and returns the props for the component.
   */
  selector?: (state: State, ownProps: OwnProps) => StateProps
) => (state: State, ownProps: OwnProps) => StateProps;

/**
 * A factory function that returns a function to be used as `mapDispatchToProps`.
 *
 * @template DispatchProps
 * @template OwnProps
 * @param {Function} [dispatchProp] - A function that takes the `dispatch` as an argument and returns the props for the component.
 * @returns {Function} A function that takes the `dispatch` as an argument and returns the props for the component.
 */
export type MapDispatchToPropsFactory<DispatchProps, OwnProps> = (
  /**
   * A function that takes the `dispatch` as an argument and returns the props for the component.
   */
  dispatchProp?: (dispatch: Dispatch) => DispatchProps
) => (dispatch: Dispatch) => DispatchProps;

/**
 * A factory function that returns a function to be used as `mergeProps`.
 *
 * @template Props
 * @template StateProps
 * @template DispatchProps
 * @param {Function} [mergeProps] - A function that takes the `stateProps`, `dispatchProps`, and `ownProps` as arguments and returns the props for the component.
 * @returns {Function} A function that takes the `stateProps`, `dispatchProps`, and `ownProps` as arguments and returns the props for the component.
 */
export type MergePropsFactory<Props, StateProps, DispatchProps, OwnProps> = (
  /**
   * A function that takes the `stateProps`, `dispatchProps`, and `ownProps` as arguments and returns the props for the component.
   */
  mergeProps?: (stateProps: StateProps, dispatchProps: DispatchProps, ownProps: OwnProps) => Props
) => (stateProps: StateProps, dispatchProps: DispatchProps, ownProps: OwnProps) => Props;
```