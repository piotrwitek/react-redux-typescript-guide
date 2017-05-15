import * as React from 'react';

type Props = {
  className?: string,
  style?: React.CSSProperties,
  initialCount?: number,
  title: string,
};

type State = {
  counter: number,
};

export class ClassComponent extends React.Component<Props, State> {
  // default props using Property Initializers
  static defaultProps: Partial<Props> = {
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
  increaseCounter = () => { this.setState({ counter: this.state.counter + 1 }); };

  render() {
    const { children, title, initialCount, ...restProps } = this.props;

    return (
      <div {...restProps} onClick={this.increaseCounter} >
        <h2>{title}</h2>
        Clicks: {this.state.counter}
        <hr />
        {children}
      </div>
    );
  }
}

export default ClassComponent;
