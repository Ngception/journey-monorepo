import { ITask, ITaskList } from '../interfaces';

export const TasksListsFixtures: ITaskList[] = [
  {
    title: 'To Do',
    items: [
      { id: '123', text: 'string', status: 'to do' },
      { id: '456', text: 'string', status: 'to do' },
      { id: '789', text: 'string', status: 'to do' },
    ],
  },
  {
    title: 'In Progress',
    items: [
      { id: 'abc', text: 'string', status: 'in progress' },
      { id: 'def', text: 'string', status: 'in progress' },
      { id: 'ghi', text: 'string', status: 'in progress' },
    ],
  },
  {
    title: 'Done',
    items: [
      { id: '1a2', text: 'string', status: 'done' },
      { id: '3b4', text: 'string', status: 'done' },
      { id: '4c5', text: 'string', status: 'done' },
    ],
  },
];

export const TasksFixtures: ITask[] = [
  { id: '1a2', text: 'string', status: 'to do' },
  { id: '3b4', text: 'string', status: 'in progress' },
  { id: '4c5', text: 'string', status: 'done' },
];
