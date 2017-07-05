import * as React from 'react';

export interface IStatefulCounterProps {
  className?: string,
  style?: React.CSSProperties,
  label: string,
  initialCount?: number,
}

type State = {
  count: number,
};

export class StatefulCounter extends React.Component<IStatefulCounterProps, State> {
  // default props using Property Initializers
  // it's not possible to mark Props optional params as not optional based on defaultProps yet
  // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
  static defaultProps: Partial<IStatefulCounterProps> = {
    className: 'default-class',
  };

  // initial state using Property Initializers
  state: State = {
    count: this.props.initialCount || 0,
  };

  // lifecycle methods should be declared as normal instance methods and it's fine
  componentWillReceiveProps({ initialCount }: IStatefulCounterProps) {
    if (initialCount && initialCount !== this.props.initialCount) {
      this.setState({ count: initialCount });
    }
  }

  // handlers using Class Fields with arrow functions
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    const { children, initialCount, label, ...restProps } = this.props;
    const { count } = this.state;

    return (
      <div {...restProps}>
        {label}: {count}
        <button type="button" onClick={this.handleIncrement}>
          Increment
        </button>
      </div>
    );
  }
}
