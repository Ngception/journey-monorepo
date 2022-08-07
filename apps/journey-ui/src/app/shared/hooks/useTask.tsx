import { useContext } from 'react';
import { ITaskContext, TaskContext } from '../context';

export const useTask = () => {
  return useContext(TaskContext) as ITaskContext;
};
