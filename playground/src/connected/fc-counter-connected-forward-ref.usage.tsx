import * as React from 'react';

import {
  FCCounterConnectedForwardRef,
  FCCounterConnectedForwardRefInstance,
} from './fc-counter-connected-forward-ref';

export default () => {
  const counterRef = React.useRef<FCCounterConnectedForwardRefInstance>(null);

  React.useEffect(() => {
    counterRef.current?.focus();
  }, []);

  return (
    <FCCounterConnectedForwardRef
      label="Forward ref connected counter"
      ref={counterRef}
    />
  );
};
