import store from '@src/store';
import { countersActions } from '@src/redux/counters';

// store.dispatch(actionCreators.increment(1)); // Error: Expected 0 arguments, but got 1.
store.dispatch(countersActions.increment()); // OK => { type: "INCREMENT" }
