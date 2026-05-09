import * as React from 'react';
import FancyButton from './fc-forward-ref';

// React.ElementRef extracts the element type from the component
// This gives us a properly typed ref
const ref = React.createRef<HTMLButtonElement>();

const UsageExample: React.FC = () => (
  <FancyButton label="Click Me" ref={ref} />
);

export default UsageExample;
