import * as React from 'react';
import { FCCounter } from '../components';
import { increment } from '../features/counters/actions';
import { useSelector, useDispatch } from '../store/hooks';

const FCCounterConnectedHooksUsage: React.FC = () => {
  const counter = useSelector(state => state.counters.reduxCounter);
  const dispatch = useDispatch();
  return <FCCounter label="Use selector" count={counter} onIncrement={() => dispatch(increment())}/>;
};

export default FCCounterConnectedHooksUsage;
