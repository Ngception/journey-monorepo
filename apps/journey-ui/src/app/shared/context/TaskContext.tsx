import { createContext } from 'react';

interface TaskContextType {
  fetchTasks: () => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
