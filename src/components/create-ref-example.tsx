import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  count: number;
};

class TestComponent extends React.Component<Props, State> {
  private divRef = React.createRef<HTMLDivElement>();

  state: State = {
    count: 0,
  };

  getCounterValue() {
    return this.state.count;
  }

  render() {
    const { children } = this.props;
    return (
      <div ref={this.divRef}>
        {children}
      </div>
    );
  }
}

export default TestComponent;
