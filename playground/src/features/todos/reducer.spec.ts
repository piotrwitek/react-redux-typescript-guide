import { todosReducer as reducer, todosActions as actions } from './';

/**
 * FIXTURES
 */
const activeTodo = { id: '1', completed: false, title: 'active todo' };
const completedTodo = { id: '2', completed: true, title: 'completed todo' };

const initialState = reducer(undefined, {} as any);

/**
 * STORIES
 */
describe('Todos Stories', () => {
  describe('initial state', () => {
    it('should match a snapshot', () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('adding todos', () => {
    it('should add a new todo as the first element', () => {
      const action = actions.add('new todo');
      const state = reducer(initialState, action);
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].id).toEqual(action.payload.id);
    });
  });

  describe('toggling completion state', () => {
    it('should mark active todo as complete', () => {
      const action = actions.toggle(activeTodo.id);
      const state0 = { ...initialState, todos: [activeTodo] };
      expect(state0.todos[0].completed).toBeFalsy();
      const state1 = reducer(state0, action);
      expect(state1.todos[0].completed).toBeTruthy();
    });
  });
});
