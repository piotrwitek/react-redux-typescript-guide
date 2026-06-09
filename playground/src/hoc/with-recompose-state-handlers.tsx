import React from 'react';
import { withStateHandlers } from 'recompose';
import { Diff } from 'utility-types';

// These props will be injected into the base component by Recompose.
interface InjectedProps {
  count: number;
  onIncrement: () => void;
}

interface EnhancerProps {
  initialCount?: number;
}

type State = Readonly<{
  count: number;
}>;

type Updaters = Readonly<{
  onIncrement: () => State;
}>;

const createInitialState = ({ initialCount = 0 }: EnhancerProps): State => ({
  count: initialCount,
});

const stateUpdaters = {
  onIncrement: ({ count }: State) => () => ({ count: count + 1 }),
};

export const withRecomposeStateHandlers = <BaseProps extends InjectedProps>(
  BaseComponent: React.ComponentType<BaseProps>
) =>
  withStateHandlers<
    State,
    Updaters,
    Diff<BaseProps, InjectedProps> & EnhancerProps
  >(
    createInitialState,
    stateUpdaters
  )(
    BaseComponent as React.ComponentType<
      Diff<BaseProps, InjectedProps> & EnhancerProps & State & Updaters
    >
  );
