```markdown
### Factory Types for `connect` Props

In advanced scenarios where you need more control over the rendering performance, `mapDispatchToProps()` can also return a function. In this case, that function will be used as `mapDispatchToProps()` for a particular component instance. This allows you to do per-instance memoization. You can refer to [issue](https://github.com/reduxjs/react-redux/pull/279).

#### Example

```typescript
const mapStateToPropsFactory: MapStateToPropsFactory<StateProps, OwnProps, State> = () => {
  // Example selector
  const mySelector = makeMySelector();

  return (state, ownProps) => {
    return mySelector(state, ownProps);
  }
}

export default connect(mapStateToPropsFactory)(MyComponent);
```

#### Factory Type

```typescript
/**
 * Factory type for `mapStateToProps` function.
 *
 * @template StateProps
 * @template OwnProps
 * @template State
 * @param {() => MapStateToProps<StateProps, OwnProps, State>} factory
 * @returns {MapStateToProps<StateProps, OwnProps, State>}
 */
type MapStateToPropsFactory<StateProps, OwnProps, State> = () => MapStateToProps<StateProps, OwnProps, State>;

/**
 * Factory type for `mapDispatchToProps` function.
 *
 * @template StateProps
 * @template OwnProps
 * @template State
 * @param {() => MapDispatchToProps<StateProps, OwnProps, State>} factory
 * @returns {MapDispatchToProps<StateProps, OwnProps, State>}
 */
type MapDispatchToPropsFactory<StateProps, OwnProps, State> = () => MapDispatchToProps<StateProps, OwnProps, State>;
```

#### Usage

```typescript
const mapStateToPropsFactory: MapStateToPropsFactory<StateProps, OwnProps, State> = () => {
  // Example selector
  const mySelector = makeMySelector();

  return (state, ownProps) => {
    return mySelector(state, ownProps);
  }
}

export default connect(mapStateToPropsFactory)(MyComponent);
```