import * as React from 'react';

export type ClassComponentProps = {
  className?: string,
  style?: React.CSSProperties,
  label: string,
  initialCount?: number,
};

type State = {
  counter: number,
};

export class ClassComponent extends React.Component<ClassComponentProps, State> {
  // default props using Property Initializers
  static defaultProps: Partial<ClassComponentProps> = {
    className: 'default-class',
  };

  // initial state using Property Initializers
  state: State = {
    counter: this.props.initialCount || 0,
  };

  // lifecycle methods should be declared as normal instance methods and it's fine
  componentDidMount() {
    // tslint:disable-next-line:no-console
    console.log('Mounted!');
  }

  // handlers using Class Fields with arrow functions
  handleIncrement = () => { this.setState({ counter: this.state.counter + 1 }); };

  render() {
    const { children, label, initialCount, ...restProps } = this.props;
    const { counter } = this.state;

    return (
      <div {...restProps} >
        <div>
          {label}: {counter}
          <button type="button" onClick={this.handleIncrement}>
            Increment
          </button>
        </div>
      </div>
    );
  }
}

export default ClassComponent;
