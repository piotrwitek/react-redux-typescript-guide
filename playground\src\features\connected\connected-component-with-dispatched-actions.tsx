import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { createAction } from 'typesafe-actions';

// Action Creators
const pingActions = {
  ping: createAction('PING')<void>(),
  pong: createAction('PONG')<void>(),
};

// Using typeof to infer the type of dispatched action creators
interface Props {
  ping: typeof pingActions.ping;
  pong: typeof pingActions.pong;
}

const ConnectedCounter: React.FC<Props> = ({ ping, pong }) => {
  return (
    <div>
      <button onClick={() => ping()}>Ping</button>
      <button onClick={() => pong()}>Pong</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      ping: pingActions.ping,
      pong: pingActions.pong,
    },
    dispatch
  );

export const Connected = connect(null, mapDispatchToProps)(ConnectedCounter);
