import * as React from 'react';

type Props = {
  label: string;
  // other props
};

// Use React.forwardRef to wrap the component
// Generic types: <ElementType, PropsType>
const FancyButton = React.forwardRef<HTMLButtonElement, Props>((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.label}
  </button>
));

// Usage example showing how to obtain a typed ref
export default FancyButton;
