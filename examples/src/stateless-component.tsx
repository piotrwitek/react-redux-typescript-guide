import * as React from 'react';

type Props = {
  className?: string,
  style?: React.CSSProperties,
};

const MyComponent: React.StatelessComponent<Props> = (props) => {
  const { children, ...restProps } = props;
  return (
    <div {...restProps} >
      {children}
    </div>
  );
};

export default MyComponent;
