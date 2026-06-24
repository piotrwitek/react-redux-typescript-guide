import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { counterSelector } from './counter/selector';
import { userSelector } from './user/selector';

const FeatureModules = () => {
  const counter = useSelector(counterSelector);
  const user = useSelector(userSelector);

  return (
    <div>
      <h2>Feature Modules</h2>
      <p>Counter: {counter}</p>
      <p>User: {user.name}</p>
    </div>
  );
};

export default FeatureModules;