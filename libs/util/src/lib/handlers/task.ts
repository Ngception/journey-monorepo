import { TasksListsFixtures, TasksFixtures } from '../fixtures';

export const createTaskLists = () => {
  return TasksListsFixtures;
};

export const createTasks = () => {
  return TasksFixtures;
};

export const createTask = () => {
  return TasksFixtures[0];
};
