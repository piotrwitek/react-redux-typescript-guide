import * as React from 'react';

type Props = {
  label: string;
  count: number;
  onIncrement: () => void;
};

// The correct way to type a component that forwards a ref in TypeScript is to
// pass TWO type parameters to `React.forwardRef`:
//   1. the type of the element/instance the ref points to (`HTMLButtonElement`)
//   2. the component's own props (`Props`)
// NOTE: with modern `@types/react` you must NOT add `ref` to `React.FC<Props>`
// (it is no longer part of `FC`). Use `React.forwardRef` directly instead.
export const ForwardedCounter = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const { label, count, onIncrement } = props;

    return (
      <div>
        <span>
          {label}: {count}
        </span>
        <button type="button" ref={ref} onClick={onIncrement}>
          {`Increment`}
        </button>
      </div>
    );
  }
);
