### bindActionCreators caveat
**If you try to use `connect` or `bindActionCreators` explicitly and type your component callback props as `() => void` this will raise compiler errors because `bindActionCreators` typings will not map your action creator type correctly due to current TypeScript limitations.**

As a decent alternative I'm recommending to use `() => any` type instead, it will work just fine in all scenarios and should not cause any type errors in all possible scenarios.

> All the code examples in the Guide using `connect` are also using this pattern, if there is any progress in TypeScript Language that will fix this I'll update the guide and make a big announcement on my twitter/medium. (There are a few proposals already)

> There is also a way to retain type soundness but it will involve an explicit wrapping with `dispatch` and will be very tedious for the long term, see example:
```
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onIncrement: () => dispatch(actions.increment()),
});
```