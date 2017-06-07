import { combineReducers } from 'redux';

import { reducer as converter, IState as IConverterState } from './todos';
import { IState as IRouteParams } from './route-params';

type IReactRouterState = { routeParams: IRouteParams };
type IHistoryState = { location: Location };

interface IStoreEnhancerState extends IReactRouterState, IHistoryState { }

export interface IRootState extends IStoreEnhancerState {
  converter: IConverterState,
}

export const rootReducer = combineReducers<IRootState>({
  converter,
});
