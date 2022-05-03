import React from 'react';

export type FancyButtonProps = {
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// using function DevTools will show "ForwardRef(FancyButton)" instead of just "ForwardRef"
export const FancyButton = React.forwardRef<
  HTMLButtonElement,
  FancyButtonProps
>(function FancyButton(props, ref) {
  return (
    <button ref={ref} className="FancyButton" {...props}>
      {props.children}
    </button>
  );
});

