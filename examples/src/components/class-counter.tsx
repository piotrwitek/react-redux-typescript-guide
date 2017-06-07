import * as React from 'react';

export type ClassCounterProps = {
  className?: string,
  style?: React.CSSProperties,
  label: string,
  initialCount?: number,
};

type State = {
  counter: number,
};

export class ClassCounter extends React.Component<ClassCounterProps, State> {
  // default props using Property Initializers
  static defaultProps: Partial<ClassCounterProps> = {
    className: 'default-class',
  };

  // initial state using Property Initializers
  state: State = {
    counter: this.props.initialCount || 0,
  };

  // lifecycle methods should be declared as normal instance methods and it's fine
  componentWillReceiveProps({ initialCount }: ClassCounterProps) {
    if (initialCount && initialCount !== this.props.initialCount) {
      this.setState({ counter: initialCount });
    }
  }

  // handlers using Class Fields with arrow functions
  handleIncrement = () => { this.setState({ counter: this.state.counter + 1 }); };

  render() {
    const { children, label, initialCount, ...restProps } = this.props;
    const { counter } = this.state;

    return (
      <div {...restProps}>
        {label}: {counter}
        <button type="button" onClick={this.handleIncrement}>
          Increment
        </button>
      </div>
    );
  }
}
