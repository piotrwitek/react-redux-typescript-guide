import * as React from 'react';

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export const FCSpreadAttributes: React.FC<Props> = props => {
  const { children, ...restProps } = props;

  return <div {...restProps}>{children}</div>;
};
