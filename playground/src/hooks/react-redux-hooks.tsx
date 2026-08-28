import * as React from 'react';
import { FCCounter } from '../components';
import { increment } from '../features/counters/actions';
import { useSelector, useDispatch } from '../store/hooks';
import { getReduxCounter } from '../store/selectors';

const FCCounterConnectedHooksUsage: React.FC = () => {
  const counter = useSelector(getReduxCounter);
  const dispatch = useDispatch();
  return <FCCounter label="Use selector" count={counter} onIncrement={() => dispatch(increment())}/>;
};

export default FCCounterConnectedHooksUsage;
