# React

## Stateless Components - SFC
- convenient alias: `React.SFC<Props> === React.StatelessComponent<Props>`

### stateless counter example

::example='../../examples/src/components/sfc-counter.tsx'::

::usage='../../examples/src/components/sfc-counter.usage.tsx'::

---

### [spread attributes](https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes) example

::example='../../examples/src/components/sfc-spread-attributes.tsx'::

::usage='../../examples/src/components/sfc-spread-attributes.usage.tsx'::

---

## Stateful Components - Class

### stateful counter example

::example='../../examples/src/components/stateful-counter.tsx'::

::usage='../../examples/src/components/stateful-counter.usage.tsx'::

---

### stateful counter with default props example

::example='../../examples/src/components/stateful-counter-with-initial-count.tsx'::

::usage='../../examples/src/components/stateful-counter-with-initial-count.usage.tsx'::

---

## Generic Components
- easily create typed component variations and reuse common logic
- especially useful to create typed list components

### generic list component example

::example='../../examples/src/components/generic-list.tsx'::

::usage='../../examples/src/components/generic-list.usage.tsx'::

---

## Connected Components

### connected counter example - concise

::example='../../examples/src/connected/sfc-counter-connected.tsx'::

::usage='../../examples/src/connected/sfc-counter-connected.tsx'::

---

### connected counter example - verbose

::example='../../examples/src/connected/sfc-counter-connected-verbose.tsx'::

::usage='../../examples/src/connected/sfc-counter-connected-verbose.usage.tsx'::

---

### connected counter example - with own props

::example='../../examples/src/connected/sfc-counter-connected-extended.tsx'::

::usage='../../examples/src/connected/sfc-counter-connected-extended.usage.tsx'::

---

## Higher-Order Components
- function that takes a component and returns a new component
- a new component will infer Props interface from wrapped Component extended with Props of HOC
- will filter out props specific to HOC, and the rest will be passed through to wrapped component

### basic hoc: enhance stateless counter with state

::example='../../examples/src/hoc/with-state.tsx'::

::usage='../../examples/src/hoc/with-state.usage.tsx'::

---

### advanced hoc: add error handling with componentDidCatch to view component

::example='../../examples/src/hoc/with-error-boundary.tsx'::

::usage='../../examples/src/hoc/with-error-boundary.usage.tsx'::
