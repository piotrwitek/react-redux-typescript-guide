import * as React from 'react';

interface NameProviderProps {
  children: (state: NameProviderState) => React.ReactNode;
}

interface NameProviderState {
  name: string;
}

export class NameProvider extends React.Component<NameProviderProps, NameProviderState> {
  state = {
    name: 'Piotr',
  };

  render() {
    return this.props.children(this.state);
  }
}
