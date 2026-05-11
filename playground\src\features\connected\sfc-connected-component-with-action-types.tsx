import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { createAction } from 'typesafe-actions';

// Action Creators
export const actions = {
  ping: createAction('PING')<{ id: number }>(),
  pong: createAction('PONG')<{ id: number }>(),
};

// Using `typeof` action creators for Props interface guarantees
// the component props always match the action creator signatures
interface Props {
  ping: typeof actions.ping;
  pong: typeof actions.pong;
}

// Component
const PingPongComponent: React.FC<Props> = ({ ping, pong }) => (
  <div>
    <button onClick={() => ping({ id: 1 })}>Ping</button>
    <button onClick={() => pong({ id: 1 })}>Pong</button>
  </div>
);

// Connect
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(actions, dispatch);

export const PingPongConnected = connect(
  null,
  mapDispatchToProps
)(PingPongComponent);
