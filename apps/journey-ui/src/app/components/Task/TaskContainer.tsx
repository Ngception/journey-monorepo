import { FC, useEffect, useRef, useState } from 'react';
import { ITask, ITaskList } from '@journey-monorepo/util';
import { getAllTasksByUserId, TaskContext } from '../../shared';
import { AddTask } from './AddTask/AddTask';
import { TaskList } from './List/TaskList';

import styles from './TaskContainer.module.scss';

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

  const effectCalled = useRef(false);

  useEffect(() => {
    if (effectCalled.current) {
      return;
    } else {
      effectCalled.current = true;
      fetchTasks();
    }
  }, []);

  // TODO: Placeholder to be replaced with logic to fetch user ID.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userId: string = process.env['NX_TEST_USER_UUID']!;

  const taskLists = [toDoTasks, inProgressTasks, doneTasks];

  const taskListClasses = `column ${styles['task-list']}`;
  const taskListHeaderClasses = `${styles['task-list-header']}`;
  const taskListCountClasses = `tag is-primary is-medium ${styles['task-list-count']}`;

  const fetchTasks = async () => {
    try {
      const tasks = await getAllTasksByUserId(userId);

      setToDoTasks(filterTasks('To Do', tasks));
      setInProgressTasks(filterTasks('In Progress', tasks));
      setDoneTasks(filterTasks('Done', tasks));
    } catch (err) {
      return err;
    }
  };

  const filterTasks = (title: string, tasks: ITask[]): ITaskList => {
    return {
      title,
      items: tasks.filter(
        (tasks) => tasks.current_status === title.toLowerCase()
      ),
    };
  };

  return (
    <div className="columns container is-fluid">
      <TaskContext.Provider value={{ fetchTasks }}>
        {taskLists.map((list) => (
          <div className={taskListClasses} key={list.title}>
            <div className={styles['task-list-header']}>
              <h2 className={taskListHeaderClasses}>
                <span className={taskListCountClasses}>
                  {list.items.length}
                </span>
                {list.title}
              </h2>
              <AddTask
                title={list.title}
                userId={userId}
                fetchTasks={fetchTasks}
              />
            </div>
            <TaskList list={list} />
          </div>
        ))}
      </TaskContext.Provider>
    </div>
  );
};
