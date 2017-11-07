# React

## Stateless Components - SFC
- convenient alias: `React.SFC<Props> === React.StatelessComponent<Props>`

### SFC Counter

#### - basic

::example='../../playground/src/components/sfc-counter.tsx'::

::usage='../../playground/src/components/sfc-counter.usage.tsx'::

---

#### - [spread attributes](https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes)

::example='../../playground/src/components/sfc-spread-attributes.tsx'::

::usage='../../playground/src/components/sfc-spread-attributes.usage.tsx'::

---

## Stateful Components - Class

### Stateful Counter

#### - basic

::example='../../playground/src/components/stateful-counter.tsx'::

::usage='../../playground/src/components/stateful-counter.usage.tsx'::

---

#### - with default props

::example='../../playground/src/components/stateful-counter-with-initial-count.tsx'::

::usage='../../playground/src/components/stateful-counter-with-initial-count.usage.tsx'::

---

## Generic Components
- easily create typed component variations and reuse common logic
- especially useful to create typed list components

### Generic List

#### - basic

::example='../../playground/src/components/generic-list.tsx'::

::usage='../../playground/src/components/generic-list.usage.tsx'::

---

## Connected Components

### Connected Counter

#### - basic

::example='../../playground/src/connected/sfc-counter-connected.tsx'::

::usage='../../playground/src/connected/sfc-counter-connected.usage.tsx'::

---

#### - verbose

::example='../../playground/src/connected/sfc-counter-connected-verbose.tsx'::

::usage='../../playground/src/connected/sfc-counter-connected-verbose.usage.tsx'::

---

#### - with own props

::example='../../playground/src/connected/sfc-counter-connected-extended.tsx'::

::usage='../../playground/src/connected/sfc-counter-connected-extended.usage.tsx'::

---

## Higher-Order Components
- function that takes a component and returns a new component
- a new component will infer Props interface from wrapped Component extended with Props of HOC
- will filter out props specific to HOC, and the rest will be passed through to wrapped component

### Basic HOC Examples

#### - withState
> enhance stateless counter with state

::example='../../playground/src/hoc/with-state.tsx'::

::usage='../../playground/src/hoc/with-state.usage.tsx'::

---

### Advanced HOC Examples

#### - withErrorBoundary
> add error handling with componentDidCatch to view component

::example='../../playground/src/hoc/with-error-boundary.tsx'::

::usage='../../playground/src/hoc/with-error-boundary.usage.tsx'::
