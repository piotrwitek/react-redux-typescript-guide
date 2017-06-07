import { Dispatch as ReduxDispatch } from 'redux';

import { IRootState } from '../modules';

export type Dispatch = ReduxDispatch<IRootState>;
