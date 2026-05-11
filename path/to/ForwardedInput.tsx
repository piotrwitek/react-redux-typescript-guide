import React, { forwardRef, Ref, InputHTMLAttributes } from 'react';

type ForwardedInputProps = InputHTMLAttributes<HTMLInputElement>;

const ForwardedInput = forwardRef<HTMLInputElement, ForwardedInputProps>(
  (props, ref: Ref<HTMLInputElement>) => {
    return <input ref={ref} {...props} />;
  }
);

export default ForwardedInput;