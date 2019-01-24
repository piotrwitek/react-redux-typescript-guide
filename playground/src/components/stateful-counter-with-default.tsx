import * as React from 'react';

type Props = Readonly<{
  label: string;
  initialCount: number;
}>;

type State = Readonly<{
  count: number;
}>;

export class StatefulCounterWithDefault extends React.Component<Props, State> {
  static defaultProps = {
    initialCount: 0,
  };

  readonly state: State = {
    count: this.props.initialCount,
  };

  componentWillReceiveProps({ initialCount }: Props) {
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
        <span>
          {label}: {count}{' '}
        </span>
        <button type="button" onClick={handleIncrement}>
          {`Increment`}
        </button>
      </div>
    );
  }
}
