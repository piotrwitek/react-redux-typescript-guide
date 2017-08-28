export type ITodo = {
  id: string,
  title: string,
  completed: boolean,
};

export type ITodosFilter =
  '' | 'completed' | 'active';
