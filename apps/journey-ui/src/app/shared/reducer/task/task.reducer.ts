import { ITask } from '@journey-monorepo/util';

export interface TaskAction {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export interface InitialTaskStateInterface {
  tasks: ITask[];
  tasksSearchFilter: string;
  fetchTasksHandler: () => void;
}

export const TASK_ACTIONS = {
  SET_TASKS: 'set tasks',
  SET_TASKS_SEARCH_FILTER: 'set tasks search filter',
  SET_FETCH_TASKS_HANDLER: 'set fetch tasks handler',
  CLEAR_TASKS: 'clear tasks',
};

export const taskInitialState = {
  tasks: [],
  tasksSearchFilter: '',
  fetchTasksHandler: null,
};

export const taskReducer = (state = taskInitialState, action: TaskAction) => {
  switch (action.type) {
    case TASK_ACTIONS.SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case TASK_ACTIONS.SET_TASKS_SEARCH_FILTER:
      return {
        ...state,
        tasksSearchFilter: action.payload,
      };
    case TASK_ACTIONS.SET_FETCH_TASKS_HANDLER:
      return {
        ...state,
        fetchTasksHandler: action.payload,
      };
    case TASK_ACTIONS.CLEAR_TASKS:
      return {
        ...state,
        tasks: [],
      };
    default:
      return state;
  }
};
