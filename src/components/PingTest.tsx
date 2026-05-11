import React from 'react';
import { connect } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';
import { Button } from 'react-native';

// Define the actions
const actions = {
  ping: createAction<number>('ping/PING', (arg: number) => ({
    payload: { arg },
  })),
};

// Define the props interface using typeof
interface Props {
  ping: typeof actions.ping;
}

// Define the functional component
const PingTestComponent: React.FC<Props> = ({ ping }) => {
  return (
    <Button onPress={() => ping(123)} title="Ping" />
  );
};

// Connect the component to the Redux store
export const PingTest = connect(
  null,
  { ping: actions.ping }
)(PingTestComponent);