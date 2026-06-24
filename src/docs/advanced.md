```typescript
### Advanced Connect Scenarios

In advanced scenarios where you need more control over the rendering performance, `mapDispatchToProps()` can also return a function. In this case, that function will be used as `mapDispatchToProps()` for a particular component instance. This allows you to do per-instance memoization. You can refer to [issue](https://github.com/reduxjs/react-redux/pull/279).

#### Factory Functions

When using a factory function, you can return a function that will be used as `mapDispatchToProps()` for a particular component instance.

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

#### Type Definitions

In case you return `any` or other type, you will get an error which can confuse you. When you don't define the return type of this function, it will work, but I rather want to be strict.

```typescript
const mapDispatchToPropsFactory: MapDispatchToPropsFactory<DispatchProps, OwnProps> = () => {
  // Return a function that will be used as mapDispatchToProps()
  return (dispatch, ownProps) => {
    // Use the dispatch function
  }
}

export default connect(mapStateToPropsFactory, mapDispatchToPropsFactory)(MyComponent);
```

#### Example

```typescript
const mapStateToPropsFactory: MapStateToPropsFactory<StateProps, OwnProps, State> = () => {
  // Example selector
  const mySelector = makeMySelector();

  return (state, ownProps) => {
    return mySelector(state, ownProps);
  }
}

const mapDispatchToPropsFactory: MapDispatchToPropsFactory<DispatchProps, OwnProps> = () => {
  // Return a function that will be used as mapDispatchToProps()
  return (dispatch, ownProps) => {
    // Use the dispatch function
  }
}

export default connect(mapStateToPropsFactory, mapDispatchToPropsFactory)(MyComponent);
```

#### Type Definitions

```typescript
type MapStateToPropsFactory<S, P, S> = () => MapStateToProps<S, P, S>;
type MapDispatchToPropsFactory<D, P> = () => MapDispatchToProps<D, P>;
```