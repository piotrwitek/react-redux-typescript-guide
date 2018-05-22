export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export enum TodosFilter {
  All = '',
  Completed = 'completed',
  Active = 'active',
}
