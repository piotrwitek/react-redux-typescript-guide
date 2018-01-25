import { todosReducer, TodosState, TodosAction } from './reducer';
import { addTodo, changeFilter, toggleTodo } from './actions';

/**
 * FIXTURES
 */
const activeTodo = { id: '1', completed: false, title: 'active todo' };
const completedTodo = { id: '2', completed: true, title: 'completed todo' };

const initialState = todosReducer(undefined, {});

/**
 * SCENARIOS
 */
describe('Todos Logic', () => {

  describe('initial state', () => {
    it('should match a snapshot', () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('adding todos', () => {
    it('should add a new todo as the first active element', () => {
      const action = addTodo('new todo');
      const state = todosReducer(initialState, action);
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].id).toEqual(action.payload.id);
    });
  });

  describe('toggling completion state', () => {
    it('should mark as complete todo with id "1"', () => {
      const action = toggleTodo(activeTodo.id);
      const state0 = { ...initialState, todos: [activeTodo] };
      expect(state0.todos[0].completed).toBeFalsy();
      const state1 = todosReducer(state0, action);
      expect(state1.todos[0].completed).toBeTruthy();
    });
  });

});
