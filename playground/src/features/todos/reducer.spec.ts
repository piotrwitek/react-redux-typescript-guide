import {
  todosReducer as reducer,
  todosActions as actions,
} from './';
import { TodosState } from './reducer';

/**
 * FIXTURES
 */
const getInitialState = (initial?: Partial<TodosState>) =>
  reducer(initial as TodosState, {} as any);

/**
 * STORIES
 */
describe('Todos Stories', () => {
  describe('initial state', () => {
    it('should match a snapshot', () => {
      const initialState = getInitialState();
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('adding todos', () => {
    it('should add a new todo as the first element', () => {
      const initialState = getInitialState();
      expect(initialState.todos).toHaveLength(0);
      const state = reducer(initialState, actions.add('new todo'));
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].title).toEqual('new todo');
    });
  });

  describe('toggling completion state', () => {
    it('should mark active todo as complete', () => {
      const activeTodo = { id: '1', completed: false, title: 'active todo' };
      const initialState = getInitialState({ todos: [activeTodo] });
      expect(initialState.todos[0].completed).toBeFalsy();
      const state1 = reducer(initialState, actions.toggle(activeTodo.id));
      expect(state1.todos[0].completed).toBeTruthy();
    });
  });
});
