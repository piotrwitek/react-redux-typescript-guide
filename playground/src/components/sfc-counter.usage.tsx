import * as React from 'react';

import { SFCCounter } from '@src/components';

export default class extends React.Component<{}, { count: number }> {
  state = { count: 0 };

  render() {
    return (
      <SFCCounter
        label={'SFCCounter'}
        count={this.state.count}
        onIncrement={() => { this.setState({ count: this.state.count + 1 }); }}
      />
    );
  }
}
