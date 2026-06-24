import React from 'react';
import { connect } from 'react-redux';
import Child from './Child';

interface ChildProps {}

const mapStateToProps = () => ({});

const ConnectedChild = connect(mapStateToProps)(Child);

const Parent = () => {
  const childRef: React.RefObject<Child> = React.createRef();

  const bar = () => {
    if (childRef.current) {
      // safely access instance properties
      (childRef.current as any).foo();
    }
  };

  return (
    <div>
      <ConnectedChild ref={childRef} />
      <button onClick={bar}>Click me</button>
    </div>
  );
};

export default Parent;