import { createContext, FC, ReactNode, useReducer } from 'react';
import { ITask } from '@journey-monorepo/util';
import {
  InitialTaskStateInterface,
  taskInitialState,
  taskReducer,
  TASK_ACTIONS,
} from '../reducer';

export interface ITaskContext {
  state: InitialTaskStateInterface;
  setTasks: (tasks: ITask[]) => void;
  setTasksSearchFilter: (filter: string) => void;
  setFetchTasksHandler: (handler: () => void) => void;
  clearTasks: () => void;
}

export const TaskContext = createContext<ITaskContext | null>(null);

interface TaskProviderProps {
  initialState?: InitialTaskStateInterface;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatchHandlers?: Record<string, (data?: any) => void>;
  children: ReactNode;
}

export const TaskProvider: FC<TaskProviderProps> = ({
  initialState,
  dispatchHandlers,
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, taskInitialState);

  const value = {
    state: initialState || (state as InitialTaskStateInterface),
    setTasks: (tasks: ITask[]) =>
      dispatch({ type: TASK_ACTIONS.SET_TASKS, payload: tasks }),
    setTasksSearchFilter: (filter: string) =>
      dispatch({
        type: TASK_ACTIONS.SET_TASKS_SEARCH_FILTER,
        payload: filter,
      }),
    setFetchTasksHandler: (handler: () => void) =>
      dispatch({
        type: TASK_ACTIONS.SET_FETCH_TASKS_HANDLER,
        payload: handler,
      }),
    clearTasks: () => dispatch({ type: TASK_ACTIONS.CLEAR_TASKS }),
    ...(dispatchHandlers !== null && dispatchHandlers),
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
