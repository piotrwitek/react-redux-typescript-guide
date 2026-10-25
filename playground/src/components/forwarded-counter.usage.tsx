import * as React from 'react';

import { ForwardedCounter } from '.';

export default function ForwardedCounterUsage() {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // `buttonRef` points to the underlying <button> DOM node
    buttonRef.current?.focus();
  }, []);

  return (
    <ForwardedCounter
      label={'ForwardedCounter'}
      count={count}
      onIncrement={() => setCount(c => c + 1)}
      ref={buttonRef}
    />
  );
}
