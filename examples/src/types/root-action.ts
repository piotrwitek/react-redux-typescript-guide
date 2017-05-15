import { returntypeof } from 'react-redux-typescript';
import { Dispatch } from 'redux';

import { actionCreators as converterActionCreators } from '../modules/converter';

const actions = Object.values({
  ...converterActionCreators,
}).map(returntypeof);

export type RootAction = typeof actions[number];

export type Dispatch = Dispatch<RootAction>;
