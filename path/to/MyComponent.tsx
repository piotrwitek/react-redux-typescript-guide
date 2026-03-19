import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './store'; // Adjust path as necessary
import { increment, decrement } from './counterSlice'; // Adjust path as necessary

const mapStateToProps = (state: RootState) => ({
    count: state.counter.value,
});

const mapDispatchToProps = {
    increment,
    decrement,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const MyComponent: React.FC<PropsFromRedux> = ({ count, increment, decrement }) => {
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default connector(MyComponent);