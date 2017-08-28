import store from '@src/store';
import { actionCreators } from '@src/redux/counters';

store.dispatch(actionCreators.incrementSfc(1)); // Error: Expected 0 arguments, but got 1.
store.dispatch(actionCreators.incrementSfc()); // OK => { type: "INCREMENT_SFC" }
