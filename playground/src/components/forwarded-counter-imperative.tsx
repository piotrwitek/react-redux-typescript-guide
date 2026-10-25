import * as React from 'react';

type Props = {
  label: string;
  count: number;
  onIncrement: () => void;
};

// When you don't want to expose the raw DOM node, define your own imperative
// handle interface and use `useImperativeHandle`. Type the first generic of
// `React.forwardRef` with THAT interface instead of a DOM element.
export interface CounterHandle {
  focus: () => void;
  increment: () => void;
}

export const ForwardedCounterImperative = React.forwardRef<
  CounterHandle,
  Props
>((props, ref) => {
  const { label, count, onIncrement } = props;
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => buttonRef.current?.focus(),
    increment: () => onIncrement(),
  }));

  return (
    <div>
      <span>
        {label}: {count}
      </span>
      <button type="button" ref={buttonRef} onClick={onIncrement}>
        {`Increment`}
      </button>
    </div>
  );
});
