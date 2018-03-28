# React Types Cheatsheet

#### `React.StatelessComponent<P>` or `React.SFC<P>`
Type representing stateless functional component
```tsx
const MyComponent: React.SFC<MyComponentProps> = ...
```
[⇧ back to top](#table-of-contents)

#### `React.Component<P, S>`
Type representing statefull class component
```tsx
class MyComponent extends React.Component<MyComponentProps, State> { ...
```
[⇧ back to top](#table-of-contents)

#### `React.ComponentType<P>`
Type representing union type of (SFC | Component)
```tsx
const withState = <P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P>,
) => { ...
```
[⇧ back to top](#table-of-contents)

#### `React.ReactElement<P>` or `JSX.Element`
Type representing a concept of React Element - representation of a native DOM component (<div />), or a user-defined composite component (<MyComponent />)
```tsx
const elementOnly: React.ReactElement = <div /> || <MyComponent />;
```
[⇧ back to top](#table-of-contents)

#### `React.ReactNode`
Type representing any possible type of React node (basically ReactElement (including Fragments and Portals) + primitive JS types)
```tsx
const elementOrPrimitive: React.ReactNode = 'string' || 0 || false || null || undefined || <div /> || <MyComponent />;
const Component = ({ children: React.ReactNode }) => ...
```
[⇧ back to top](#table-of-contents)

#### `React.CSSProperties`
Type representing style object in JSX (usefull for css-in-js styles)
```tsx
const styles: React.CSSProperties = { flexDirection: 'row', ...
const element = <div style={styles} ...
```
[⇧ back to top](#table-of-contents)

#### `React.ReactEventHandler<E>`
Type representing React event handler
```tsx
const handleChange: React.ReactEventHandler<HTMLInputElement> = (ev) => { ...
const element = <input onChange={handleChange} ...
```
[⇧ back to top](#table-of-contents)

---

# Component Typing Patterns

## Stateless Components - SFC

#### - stateless counter

::example='../../playground/src/components/sfc-counter.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#sfccounter)

[⇧ back to top](#table-of-contents)

#### - spread attributes [link](https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes)

::example='../../playground/src/components/sfc-spread-attributes.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#sfcspreadattributes)

[⇧ back to top](#table-of-contents)

---

## Stateful Components - Class

#### - stateful counter

::example='../../playground/src/components/stateful-counter.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#statefulcounter)

[⇧ back to top](#table-of-contents)

#### - with default props

::example='../../playground/src/components/stateful-counter-with-default.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#statefulcounterwithdefault)

[⇧ back to top](#table-of-contents)

---

## Generic Components
- easily create typed component variations and reuse common logic
- common use case is a generic list components

#### - generic list

::example='../../playground/src/components/generic-list.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#genericlist)

[⇧ back to top](#table-of-contents)

---

## Render Props
> https://reactjs.org/docs/render-props.html

#### - name provider
> simple component using children as a render prop

::example='../../playground/src/components/name-provider.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#nameprovider)

[⇧ back to top](#table-of-contents)

#### - mouse provider
> `Mouse` component found in [Render Props React Docs](https://reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns)

::example='../../playground/src/components/mouse-provider.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#mouseprovider)

[⇧ back to top](#table-of-contents)

---

## Higher-Order Components
> https://reactjs.org/docs/higher-order-components.html

#### - withState
Adds state to a stateless counter

::example='../../playground/src/hoc/with-state.tsx'::
::usage='../../playground/src/hoc/with-state.usage.tsx'::

[⇧ back to top](#table-of-contents)

#### - withErrorBoundary
Adds error handling using componentDidCatch to any component

::example='../../playground/src/hoc/with-error-boundary.tsx'::
::usage='../../playground/src/hoc/with-error-boundary.usage.tsx'::

[⇧ back to top](#table-of-contents)

---

## Redux Connected Components

### Caveat with `bindActionCreators`
**If you try to use `connect` or `bindActionCreators` explicitly and want to type your component callback props as `() => void` this will raise compiler errors. It happens because `bindActionCreators` typings will not map the return type of action creators to `void`, due to a current TypeScript limitations.**

A decent alternative I can recommend is to use `() => any` type, it will work just fine in all possible scenarios and should not cause any typing problems whatsoever. All the code examples in the Guide with `connect` are also using this pattern.

> If there is any progress or fix in regard to the above caveat I'll update the guide and make an announcement on my twitter/medium (There are a few existing proposals already).

> There is alternative way to retain type soundness but it requires an explicit wrapping with `dispatch` and will be very tedious for the long run. See example below:
```
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onIncrement: () => dispatch(actions.increment()),
});
```

#### - redux connected counter

::example='../../playground/src/connected/sfc-counter-connected.tsx'::
::usage='../../playground/src/connected/sfc-counter-connected.usage.tsx'::

[⇧ back to top](#table-of-contents)

#### - redux connected counter (verbose)

::example='../../playground/src/connected/sfc-counter-connected-verbose.tsx'::
::usage='../../playground/src/connected/sfc-counter-connected-verbose.usage.tsx'::

[⇧ back to top](#table-of-contents)

#### - with own props

::example='../../playground/src/connected/sfc-counter-connected-extended.tsx'::
::usage='../../playground/src/connected/sfc-counter-connected-extended.usage.tsx'::

[⇧ back to top](#table-of-contents)
