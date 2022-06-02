import { ITask, ITaskList } from '@journey-monorepo/util';
import { FC, useEffect, useState } from 'react';
import { getAllTasksByUserId } from '../../shared';
import { TaskList } from './List/TaskList';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TaskContainerProps {}

export const TaskContainer: FC<TaskContainerProps> = (
  props: TaskContainerProps
) => {
  const [toDoTasks, setToDoTasks] = useState<ITaskList>({
    title: 'To Do',
    items: [],
  });
  const [inProgressTasks, setInProgressTasks] = useState<ITaskList>({
    title: 'In Progress',
    items: [],
  });
  const [doneTasks, setDoneTasks] = useState<ITaskList>({
    title: 'Done',
    items: [],
  });

  // TODO: Placeholder to be replaced with logic to fetch user ID.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userId: string = process.env['NX_TEST_USER_UUID']!;

  const filterTasks = (title: string, tasks: ITask[]): ITaskList => {
    return {
      title,
      items: tasks.filter(
        (tasks) => tasks.current_status === title.toLowerCase()
      ),
    };
  };

  useEffect(() => {
    getAllTasksByUserId(userId)
      .then((tasks) => {
        setToDoTasks(filterTasks('To Do', tasks));
        setInProgressTasks(filterTasks('In Progress', tasks));
        setDoneTasks(filterTasks('Done', tasks));
      })
      .catch((err) => err);
  }, []);

  return (
    <div className="columns">
      <TaskList list={toDoTasks} />
      <TaskList list={inProgressTasks} />
      <TaskList list={doneTasks} />
    </div>
  );
};
