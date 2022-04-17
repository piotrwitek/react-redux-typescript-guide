import { StateObservable, ActionsObservable } from 'redux-observable';
import { RootState, RootAction } from 'MyTypes';
import { Subject } from 'rxjs';

import { add } from './actions';
import { logAddAction } from './epics';

// Simple typesafe mock of all the services, you dont't need to mock anything else
// It is decoupled and reusable for all your tests, just put it in a separate file
const services = {
  logger: {
    log: jest.fn(),
  },
  localStorage: {
    loadState: jest.fn(),
    saveState: jest.fn(),
  },
};

describe('Todos Epics', () => {
  let state$: StateObservable<RootState>;

  beforeEach(() => {
    state$ = new StateObservable<RootState>(
      new Subject<RootState>(),
      undefined as any
    );
  });

  describe('logging todos actions', () => {
    beforeEach(() => {
      services.logger.log.mockClear();
    });

    it('should call the logger service when adding a new todo', done => {
      const addTodoAction = add('new todo');
      const action$ = ActionsObservable.of(addTodoAction);

      logAddAction(action$, state$, services)
        .toPromise()
        .then((outputAction: RootAction) => {
          expect(services.logger.log).toHaveBeenCalledTimes(1);
          expect(services.logger.log).toHaveBeenCalledWith(
            'action type must be equal: todos/ADD === todos/ADD'
          );
          // expect output undefined because we're using "ignoreElements" in epic
          expect(outputAction).toEqual(undefined);
          done();
        });
    });
  });
});
