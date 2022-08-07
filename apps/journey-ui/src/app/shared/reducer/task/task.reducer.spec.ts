import { createTask } from '@journey-monorepo/util';
import { taskReducer, TASK_ACTIONS } from './task.reducer';

describe('TaskReducer', () => {
  const initialState = {
    tasks: [],
    fetchTasksHandler: null,
  };

  it('should return state for `SET_TASKS` type', () => {
    const payload = [createTask()];

    const newState = taskReducer(initialState, {
      type: TASK_ACTIONS.SET_TASKS,
      payload,
    });

    expect(newState).toEqual({
      tasks: payload,
      fetchTasksHandler: null,
    });
  });

  it('should return state for `SET_FETCH_TASKS_HANDLER` type', () => {
    const payload = jest.fn();

    const newState = taskReducer(initialState, {
      type: TASK_ACTIONS.SET_FETCH_TASKS_HANDLER,
      payload,
    });

    expect(newState).toEqual({
      tasks: [],
      fetchTasksHandler: payload,
    });
  });

  it('should clear state for `CLEAR_TASKS` type', () => {
    const newState = taskReducer(initialState, {
      type: TASK_ACTIONS.CLEAR_TASKS,
    });

    expect(newState).toEqual(initialState);
  });

  it('should return state by default', () => {
    const newState = taskReducer(initialState, { type: '' });

    expect(newState).toEqual(initialState);
  });
});
