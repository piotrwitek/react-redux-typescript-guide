import { returntypeof } from 'react-redux-typescript';

import { actionCreators as converterActionCreators } from '../modules/converter';

// merging actions returned from all action creators
const actions = Object.values({
  ...converterActionCreators,
}).map(returntypeof);

export type RootAction = typeof actions[number];
