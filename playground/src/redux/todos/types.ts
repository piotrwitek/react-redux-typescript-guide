export const ADD_TODO = '@@todos/ADD_TODO';
export const TOGGLE_TODO = '@@todos/TOGGLE_TODO';
export const CHANGE_FILTER = '@@todos/CHANGE_FILTER';

export type ITodo = {
  id: string;
  title: string;
  completed: boolean;
};

export type ITodosFilter =
  '' | 'completed' | 'active';
