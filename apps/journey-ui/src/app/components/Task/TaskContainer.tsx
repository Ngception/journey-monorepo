import { FC, useEffect, useRef, useState } from 'react';
import { ITask, ITaskList } from '@journey-monorepo/util';
import { getAllTasksByUserId, useTask, useUser } from '../../shared';
import { TaskDragDrop } from './DragDrop/TaskDragDrop';
import { TaskList } from './List/TaskList';

import styles from './TaskContainer.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TaskContainerProps {}

export interface TaskList {
  setter: (items: ITask[]) => void;
  list: ITask[];
}

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
  const { state: user } = useUser();
  const { state: task, setFetchTasksHandler, setTasks } = useTask();

  useEffect(() => {
    if (effectCalled.current) {
      return;
    } else {
      effectCalled.current = true;
      fetchTasks();
      setFetchTasksHandler(fetchTasks);
    }
  }, []);

  useEffect(() => {
    filterTasksBySearch();
  }, [task.tasksSearchFilter]);

  const taskLists = [toDoTasks, inProgressTasks, doneTasks];
  const taskListsSetters = [setToDoTasks, setInProgressTasks, setDoneTasks];

  const fetchTasks = async () => {
    try {
      const tasks = await getAllTasksByUserId(user.user_id);

      setTasks(tasks);

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

  const filterTasksBySearch = () => {
    const filter = task.tasksSearchFilter.toLowerCase();
    const { tasks } = task;

    if (!filter) {
      if (
        tasks.length ===
        toDoTasks.items.length +
          inProgressTasks.items.length +
          doneTasks.items.length
      ) {
        return;
      }

      setToDoTasks(filterTasks('To Do', tasks));
      setInProgressTasks(filterTasks('In Progress', tasks));
      setDoneTasks(filterTasks('Done', tasks));

      return;
    }

    const filteredTasks = tasks.filter((task) =>
      task.content.toLowerCase().includes(filter)
    );

    setToDoTasks(filterTasks('To Do', filteredTasks));
    setInProgressTasks(filterTasks('In Progress', filteredTasks));
    setDoneTasks(filterTasks('Done', filteredTasks));
  };

  const combineTaskLists = (): Record<string, TaskList> => {
    return {
      'To Do': {
        setter: (items: ITask[]) =>
          setToDoTasks({
            ...toDoTasks,
            items,
          }),
        list: toDoTasks.items,
      },
      'In Progress': {
        setter: (items: ITask[]) =>
          setInProgressTasks({
            ...inProgressTasks,
            items,
          }),
        list: inProgressTasks.items,
      },
      Done: {
        setter: (items: ITask[]) =>
          setDoneTasks({
            ...doneTasks,
            items,
          }),
        list: doneTasks.items,
      },
    };
  };

  return (
    <TaskDragDrop allTaskLists={combineTaskLists()}>
      <div className="columns container is-fluid">
        {taskLists.map((list, idx) => (
          <div className={`column ${styles['task-list']}`} key={list.title}>
            <TaskList list={list} listSetter={taskListsSetters[idx]} />
          </div>
        ))}
      </div>
    </TaskDragDrop>
  );
};
