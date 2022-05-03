import { store } from '../../store/';
import { countersActions as counter } from '../counters';

// store.dispatch(counter.increment(1)); // Error: Expected 0 arguments, but got 1.
store.dispatch(counter.increment()); // OK

// store.dispatch(counter.add()); // Error: Expected 1 arguments, but got 0.
store.dispatch(counter.add(1)); // OK
