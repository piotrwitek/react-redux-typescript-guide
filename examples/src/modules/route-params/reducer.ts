// import { RootActions } from '../../modules';

export type FilterEnum =
  '' | 'completed' | 'active';

// State
export type IState = {
  readonly activeFilter: FilterEnum,
};
