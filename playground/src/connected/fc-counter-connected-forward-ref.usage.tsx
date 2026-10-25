import * as React from 'react';

import { FCCounterConnectedForwardRef } from '.';

export default function FCCounterConnectedForwardRefUsage() {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  // `label` is an own prop; `count` and `onIncrement` are injected by connect.
  // `ref` is forwarded to the underlying <button> inside ForwardedCounter.
  return (
    <FCCounterConnectedForwardRef
      label={'FCCounterConnectedForwardRef'}
      ref={buttonRef}
    />
  );
}
