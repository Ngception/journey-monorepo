import { ITask, ITaskList } from '../interfaces';

export const TasksListsFixtures: ITaskList[] = [
  {
    title: 'To Do',
    items: [
      {
        task_id: '123',
        content: 'to do 1',
        current_status: 'to do',
        user_id: 'a1',
        created_at: new Date(),
        updated_at: null,
      },
      {
        task_id: '456',
        content: 'to do 2',
        current_status: 'to do',
        user_id: 'a1',
        created_at: new Date(),
        updated_at: null,
      },
      {
        task_id: '789',
        content: 'to do 3',
        current_status: 'to do',
        user_id: 'a1',
        created_at: new Date(),
        updated_at: null,
      },
    ],
  },
  {
    title: 'In Progress',
    items: [
      {
        task_id: 'abc',
        content: 'in progress 1',
        current_status: 'in progress',
        user_id: 'b2',
        created_at: new Date(),
        updated_at: null,
      },
      {
        task_id: 'def',
        content: 'in progress 2',
        current_status: 'in progress',
        user_id: 'b2',
        created_at: new Date(),
        updated_at: null,
      },
      {
        task_id: 'ghi',
        content: 'in progress 3',
        current_status: 'in progress',
        user_id: 'b2',
        created_at: new Date(),
        updated_at: null,
      },
    ],
  },
  {
    title: 'Done',
    items: [
      {
        task_id: '1a2',
        content: 'done 1',
        current_status: 'done',
        user_id: 'c3',
        created_at: new Date(),
        updated_at: null,
      },
      {
        task_id: '2b3',
        content: 'done 2',
        current_status: 'done',
        user_id: 'c3',
        created_at: new Date(),
        updated_at: null,
      },
      {
        task_id: '3c4',
        content: 'done 3',
        current_status: 'done',
        user_id: 'c3',
        created_at: new Date(),
        updated_at: null,
      },
    ],
  },
];

export const TasksFixtures: ITask[] = [
  {
    task_id: '1a2',
    content: 'to do 0',
    current_status: 'to do',
    user_id: 'a1b2',
    created_at: new Date(),
    updated_at: null,
  },
  {
    task_id: '111',
    content: 'in progress 0',
    current_status: 'in progress',
    user_id: 'aabb',
    created_at: new Date(),
    updated_at: null,
  },
  {
    task_id: 'de2',
    content: 'done 0',
    current_status: 'done',
    user_id: 'zld9',
    created_at: new Date(),
    updated_at: null,
  },
];
