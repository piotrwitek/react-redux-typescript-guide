import { ITodoModel } from './models';
import { resolveWithDelay } from './utils';

const pageSize = 10;

// Mock API
// tslint:disable-next-line:no-var-requires
const todosResponse: ITodoModel[] = require('../fixtures/todos.json');
export const Todos = {
  getAll: (pageNumber: number = 0) => resolveWithDelay(todosResponse
    .slice(pageNumber * pageSize, (pageNumber * pageSize) + pageSize - 1)),
  get: (id: string) => resolveWithDelay(todosResponse
    .find(t => t.id === id)),
  create: (payload: ITodoModel) => resolveWithDelay(todosResponse
    .push(payload)),
  update: (payload: ITodoModel) => resolveWithDelay(todosResponse
    .map(t => t.id === payload.id ? payload : t)),
  delete: (id: string) => resolveWithDelay(todosResponse
    .filter(t => t.id !== id)),
};

// Real API
// const URL = '/todos';
// export const Todos = {
//   getAll: (pageNumber?: number) =>
//     requests.get(`${URL}?${rangeQueryString(pageSize, pageNumber)}`),
//   get: (id: string) =>
//     requests.get(`${URL}/${id}`),
//   create: (payload: ITodoModel) =>
//     requests.post(`${URL}`, { payload }),
//   update: (payload: ITodoModel) =>
//     requests.put(`${URL}/${payload.id}`, { todo: removeKeys(payload, ['id']) }),
//   delete: (id: string) =>
//     requests.delete(`${URL}/${id}`),
// };
