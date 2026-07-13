import * as React from 'react';

type Props = {
  children: React.ReactNode;
  type: 'submit' | 'button';
};

export type Ref = HTMLButtonElement;

export const FancyButton = React.forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="FancyButton" type={props.type}>
    {props.children}
  </button>
));
