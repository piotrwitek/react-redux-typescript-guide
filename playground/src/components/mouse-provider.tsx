import * as React from 'react';

export interface MouseProviderProps {
  render: (state: MouseProviderState) => React.ReactNode;
}

interface MouseProviderState {
  readonly x: number;
  readonly y: number;
}

export class MouseProvider extends React.Component<MouseProviderProps, MouseProviderState> {
  readonly state: MouseProviderState = { x: 0, y: 0 };

  handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}
