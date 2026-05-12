import * as React from "react";
import type { ComponentType } from "react";
import {
  withHandlers,
  withProps,
  withState,
  type InferableComponentEnhancerWithProps,
} from "recompose";

type OuterProps = {
  initialCount?: number;
};

type CounterStateProps = {
  count: number;
  setCount: (next: number | ((prev: number) => number)) => void;
};

type CounterHandlers = {
  onIncrement: () => void;
  onDecrement: () => void;
};

type DerivedProps = {
  label: string;
};

type InnerProps = OuterProps & CounterStateProps & CounterHandlers & DerivedProps;

const CounterView: React.FC<InnerProps> = ({ label, onDecrement, onIncrement }) => (
  <div>
    <button type="button" onClick={onDecrement}>
      -
    </button>
    <span style={{ padding: "0 8px" }}>{label}</span>
    <button type="button" onClick={onIncrement}>
      +
    </button>
  </div>
);

const withCounterState = withState<OuterProps, number, "count", "setCount">(
  "count",
  "setCount",
  ({ initialCount = 0 }) => initialCount,
);

const withCounterHandlers = withHandlers<OuterProps & CounterStateProps, CounterHandlers>({
  onIncrement: ({ setCount }) => () => setCount((n) => n + 1),
  onDecrement: ({ setCount }) => () => setCount((n) => n - 1),
});

const withLabel = withProps<DerivedProps, OuterProps & CounterStateProps & CounterHandlers>(
  ({ count }) => ({ label: `Count: ${count}` }),
);

type Enhance = InferableComponentEnhancerWithProps<
  CounterStateProps & CounterHandlers & DerivedProps,
  OuterProps
>;

const enhance: Enhance = (BaseComponent: ComponentType<InnerProps>) =>
  withCounterState(withCounterHandlers(withLabel(BaseComponent)));

export const RecomposeCounterExample = enhance(CounterView);
