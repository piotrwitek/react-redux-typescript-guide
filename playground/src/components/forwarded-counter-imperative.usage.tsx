import * as React from 'react';

import { ForwardedCounterImperative, CounterHandle } from '.';

export default function ForwardedCounterImperativeUsage() {
  const counterRef = React.useRef<CounterHandle>(null);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    counterRef.current?.focus();
  }, []);

  return (
    <>
      <ForwardedCounterImperative
        label={'ForwardedCounterImperative'}
        count={count}
        onIncrement={() => setCount(c => c + 1)}
        ref={counterRef}
      />
      <button type="button" onClick={() => counterRef.current?.increment()}>
        {`Increment from outside`}
      </button>
    </>
  );
}
