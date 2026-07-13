import * as React from 'react';
import { Reducer } from 'redux';
import { connect } from 'react-redux';

// Generic RemoteData type - models async data as a discriminated union
// making impossible states unrepresentable
export type RemoteData<E, D> =
  | { status: 'INITIAL' }
  | { status: 'LOADING' }
  | { status: 'ERROR'; error: E }
  | { status: 'SUCCESS'; data: D };

// Example domain model
type User = {
  id: number;
  name: string;
};

// Reducer state is just RemoteData - no boolean flags needed
type State = RemoteData<Error, Array<User>>;

// Action union
type Action =
  | { type: 'FETCH_USERS_REQUEST' }
  | { type: 'FETCH_USERS_SUCCESS'; payload: Array<User> }
  | { type: 'FETCH_USERS_FAILURE'; payload: Error };

const initialState: State = { status: 'INITIAL' };

// Reducer - each case maps to exactly one valid state
export const usersReducer: Reducer<State, Action> = (
  state = initialState,
  action
): State => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return { status: 'LOADING' };

    case 'FETCH_USERS_SUCCESS':
      return { status: 'SUCCESS', data: action.payload };

    case 'FETCH_USERS_FAILURE':
      return { status: 'ERROR', error: action.payload };

    default:
      return state;
  }
};

// Component Props
type Props = {
  usersData: RemoteData<Error, Array<User>>;
};

// View component - TypeScript narrows the type in each branch automatically
export const UserList: React.FC<Props> = ({ usersData }) => {
  if (usersData.status === 'INITIAL') {
    return null;
  }

  if (usersData.status === 'LOADING') {
    return <div>Loading...</div>;
  }

  if (usersData.status === 'ERROR') {
    // TS knows: usersData.error: Error
    return <div>An error has occurred: {usersData.error.message}</div>;
  }

  // TS knows: usersData.data: Array<User>
  return (
    <ul>
      {usersData.data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state: State) => ({
  usersData: state,
});

export default connect(mapStateToProps)(UserList);
