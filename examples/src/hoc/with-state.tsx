import * as React from 'react';
import { Omit } from '../types/augmentations.d';

interface RequiredProps {
  count: number,
  onIncrement: () => any,
}

type Props<T extends RequiredProps> = Omit<T, keyof RequiredProps>;

interface State {
  count: number,
}

export function withState<WrappedComponentProps extends RequiredProps>(
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
) {
  const HOC = class extends React.Component<Props<WrappedComponentProps>, State> {

    state: State = {
      count: 0,
    }

    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    };

    render() {
      const { handleIncrement } = this;
      const { count } = this.state;

      return (
        <WrappedComponent
          count={count}
          onIncrement={handleIncrement}
        />
      );
    }
  };

  return HOC;
}
