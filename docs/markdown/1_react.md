# React Types Cheatsheet

#### `React.StatelessComponent<P>` or alias `React.SFC<P>` 
Stateless functional components
```tsx
const MyComponent: React.SFC<MyComponentProps> = ...
```
[⇧ back to top](#table-of-contents)

#### `React.Component<P, S>`
Statefull class component
```tsx
class MyComponent extends React.Component<MyComponentProps, State> { ...
```
[⇧ back to top](#table-of-contents)

#### `React.ComponentType<P>`
Accepts sfc or class components with Generic Props Type
```tsx
const withState = <P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P>,
) => { ...
```
[⇧ back to top](#table-of-contents)

#### `React.ReactNode`
Accepts any react elements (component instances) and also primitive types
```tsx
const elementOrPrimitive: React.ReactNode = '' || 0 || false || null || <div /> || <MyComponent />;
```
[⇧ back to top](#table-of-contents)

#### `JSX.Element`
Similar in usage to ReactNode but limited to accept only react elements (and not primitive types)
```tsx
const elementOnly: JSX.Element =  <div /> || <MyComponent />;
```
[⇧ back to top](#table-of-contents)

#### `React.CSSProperties`
Type-safety for styles using css-in-js 
```tsx
const styles: React.CSSProperties = { flexDirection: 'row', ...
```
[⇧ back to top](#table-of-contents)

#### `React.ReactEventHandler<E>`
Type-safe event handlers for JSX
```tsx
const handleChange: React.ReactEventHandler<HTMLInputElement> = (ev) => { ...
```
[⇧ back to top](#table-of-contents)

---

# Component Typing Patterns

## Stateless Components - SFC

#### - stateless counter

::example='../../playground/src/components/sfc-counter.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/styleguide/#sfccounter)

[⇧ back to top](#table-of-contents)

#### - [spreading attributes](https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes)

::example='../../playground/src/components/sfc-spread-attributes.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/styleguide/#sfcspreadattributes)

[⇧ back to top](#table-of-contents)

---

## Stateful Components - Class

#### - stateful counter

::example='../../playground/src/components/stateful-counter.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/styleguide/#statefulcounter)

[⇧ back to top](#table-of-contents)

#### - with default props

::example='../../playground/src/components/stateful-counter-with-initial-count.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/styleguide/#statefulcounterwithinitialcount)

[⇧ back to top](#table-of-contents)

---

## Generic Components
- easily create typed component variations and reuse common logic
- common use case is a generic list components

#### - generic list

::example='../../playground/src/components/generic-list.tsx'::

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/styleguide/##genericlist)

[⇧ back to top](#table-of-contents)

---

## Higher-Order Components
- function that takes a component and returns a new component
- a new component will infer Props interface from wrapped Component extended with Props of HOC
- will filter out props specific to HOC, and the rest will be passed through to wrapped component

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
