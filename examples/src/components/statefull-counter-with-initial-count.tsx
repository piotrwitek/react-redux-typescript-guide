import * as React from 'react';

export interface StatefulCounterWithInitialCountProps {
  label: string,
  initialCount?: number,
}

interface DefaultProps {
  initialCount: number,
}

type PropsWithDefaults = StatefulCounterWithInitialCountProps & DefaultProps;

interface State {
  count: number,
}

export const StatefulCounterWithInitialCount: React.ComponentClass<StatefulCounterWithInitialCountProps> =
  class extends React.Component<PropsWithDefaults, State> {
    // to make defaultProps strictly typed we need to explicitly declare their type
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
    static defaultProps: DefaultProps = {
      initialCount: 0,
    };

    state: State = {
      count: this.props.initialCount,
    };

    componentWillReceiveProps({ initialCount }: PropsWithDefaults) {
      if (initialCount != null && initialCount !== this.props.initialCount) {
        this.setState({ count: initialCount });
      }
    }

    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    };

    render() {
      const { handleIncrement } = this;
      const { label } = this.props;
      const { count } = this.state;

      return (
        <div>
          {label}: {count}
          <button type="button" onClick={handleIncrement}>
            {`Increment`}
          </button>
        </div>
      );
    }
  }
