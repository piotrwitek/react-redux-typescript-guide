import * as React from 'react';
import { compose, withHandlers, withProps, withState, withStateHandlers } from 'recompose';

type CounterOuterProps = {
  title: string;
  initialCount?: number;
  step?: number;
};

type CounterStateProps = {
  count: number;
  setCount: (count: number) => void;
};

type CounterHandlers = {
  onIncrement: () => void;
  onReset: () => void;
};

type CounterLabelProps = {
  label: string;
};

type CounterProps = CounterOuterProps & CounterStateProps & CounterHandlers & CounterLabelProps;

const CounterView: React.FC<CounterProps> = ({ count, label, onIncrement, onReset }) => (
  <section>
    <h3>{label}</h3>
    <p>Current count: {count}</p>
    <button type="button" onClick={onIncrement}>
      Increment
    </button>
    <button type="button" onClick={onReset}>
      Reset
    </button>
  </section>
);

const withCounterState = withState<CounterOuterProps, number, 'count', 'setCount'>(
  'count',
  'setCount',
  ({ initialCount = 0 }) => initialCount
);

const withCounterHandlers = withHandlers<CounterOuterProps & CounterStateProps, CounterHandlers>({
  onIncrement:
    ({ count, setCount, step = 1 }) =>
    () => {
      setCount(count + step);
    },
  onReset:
    ({ initialCount = 0, setCount }) =>
    () => {
      setCount(initialCount);
    },
});

const withCounterLabel = withProps<
  CounterLabelProps,
  CounterOuterProps & CounterStateProps & CounterHandlers
>(({ count, title }) => ({
  label: `${title}: ${count}`,
}));

const enhanceCounter = compose<CounterProps, CounterOuterProps>(
  withCounterState,
  withCounterHandlers,
  withCounterLabel
);

export const RecomposeCounter = enhanceCounter(CounterView);

type ToggleOuterProps = {
  label: string;
  initiallyOpen?: boolean;
};

type ToggleState = {
  isOpen: boolean;
};

type ToggleUpdaters = {
  toggle: () => Partial<ToggleState>;
  close: () => Partial<ToggleState>;
};

type ToggleProps = ToggleOuterProps & ToggleState & ToggleUpdaters;

const ToggleView: React.FC<ToggleProps> = ({ close, isOpen, label, toggle }) => (
  <section>
    <button type="button" onClick={toggle}>
      {label}
    </button>
    {isOpen && (
      <button type="button" onClick={close}>
        Close
      </button>
    )}
  </section>
);

const withToggleState = withStateHandlers<ToggleState, ToggleUpdaters, ToggleOuterProps>(
  ({ initiallyOpen = false }) => ({
    isOpen: initiallyOpen,
  }),
  {
    toggle:
      ({ isOpen }) =>
      () => ({
        isOpen: !isOpen,
      }),
    close: () => () => ({
      isOpen: false,
    }),
  }
);

export const RecomposeToggle = withToggleState(ToggleView);
