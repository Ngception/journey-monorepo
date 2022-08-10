import { FC, useEffect, useRef, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ITask, ITaskList } from '@journey-monorepo/util';
import { getAllTasksByUserId, updateTask } from '../../shared';
import { TaskList } from './List/TaskList';

import styles from './TaskContainer.module.scss';
import { useTask, useUser } from '../../shared/hooks';
import { useNotification } from '@journey-monorepo/ui';

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
  const { state: user } = useUser();
  const { showErrorNotification } = useNotification();
  const { state: task, setFetchTasksHandler, setTasks } = useTask();

  const effectCalled = useRef(false);

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
  const taskListClasses = `column ${styles['task-list']}`;

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

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    const invalidDrag =
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index);

    if (invalidDrag) {
      return;
    }

    const oldListTitle: string = source?.droppableId;
    const newListTitle: string = destination?.droppableId;

    if (oldListTitle === newListTitle) {
      reorderTasksInPlace(result);
      return;
    }

    const task = updateOldTaskList(result);
    updateNewTaskList(task as ITask, result);
  };

  const reorderTasksInPlace = (result: DropResult) => {
    const { destination, source } = result;

    const reorder = (tasks: ITask[]) => {
      const updatedList = tasks;
      const task = updatedList[source.index];

      updatedList.splice(source.index, 1);
      updatedList.splice(destination?.index as number, 0, task);

      return updatedList;
    };

    switch (source.droppableId) {
      case 'To Do':
        setToDoTasks({
          title: 'To Do',
          items: reorder(toDoTasks.items),
        });
        break;
      case 'In Progress':
        setInProgressTasks({
          title: 'In Progress',
          items: reorder(inProgressTasks.items),
        });
        break;
      case 'Done':
        setDoneTasks({
          title: 'Done',
          items: reorder(doneTasks.items),
        });
        break;
      default:
        break;
    }
  };

  const updateOldTaskList = (result: DropResult) => {
    const { source, draggableId } = result;
    const oldListTitle = source.droppableId;
    const taskToBeDroppedId = draggableId;

    let task;
    let updatedOldList = [];

    switch (oldListTitle) {
      case 'To Do':
        updatedOldList = toDoTasks.items.filter(
          (element) => element.task_id !== taskToBeDroppedId
        );
        task = toDoTasks.items[source.index];

        setToDoTasks({
          title: 'To Do',
          items: updatedOldList,
        });
        break;
      case 'In Progress':
        updatedOldList = inProgressTasks.items.filter(
          (element) => element.task_id !== taskToBeDroppedId
        );
        task = inProgressTasks.items[source.index];

        setInProgressTasks({
          title: 'In Progress',
          items: updatedOldList,
        });
        break;
      case 'Done':
        updatedOldList = doneTasks.items.filter(
          (element) => element.task_id !== taskToBeDroppedId
        );
        task = doneTasks.items[source.index];

        setDoneTasks({
          title: 'Done',
          items: updatedOldList,
        });
        break;
      default:
        break;
    }

    return task;
  };

  const updateNewTaskList = (task: ITask, result: DropResult) => {
    const { destination } = result;
    const newListTitle = destination?.droppableId;
    const newListIndex = destination?.index;
    const errorMessage = 'Something went wrong. Please try again later.';

    let updatedNewList: ITask[] = [];

    switch (newListTitle) {
      case 'To Do':
        updatedNewList = toDoTasks.items;
        task.current_status = 'to do';
        updatedNewList.splice(newListIndex as number, 0, task as ITask);

        updateTask(task)
          .then((res) => {
            setToDoTasks({
              title: 'To Do',
              items: updatedNewList,
            });
          })
          .catch((err) => {
            if (err) {
              showErrorNotification(errorMessage);
            }
          });
        break;
      case 'In Progress':
        updatedNewList = inProgressTasks.items;
        task.current_status = 'in progress';
        updatedNewList.splice(newListIndex as number, 0, task as ITask);

        updateTask(task)
          .then((res) => {
            setInProgressTasks({
              title: 'In Progress',
              items: updatedNewList,
            });
          })
          .catch((err) => {
            if (err) {
              showErrorNotification(errorMessage);
            }
          });
        break;

      case 'Done':
        updatedNewList = doneTasks.items;
        task.current_status = 'done';
        updatedNewList.splice(newListIndex as number, 0, task as ITask);

        updateTask(task)
          .then((res) => {
            setDoneTasks({
              title: 'In Progress',
              items: updatedNewList,
            });
          })
          .catch((err) => {
            if (err) {
              showErrorNotification(errorMessage);
            }
          });
        break;
    }
  };

  return (
    <DragDropContext onDragEnd={(e) => handleDragEnd(e)}>
      <div className="columns container is-fluid">
        {taskLists.map((list, idx) => (
          <div className={taskListClasses} key={list.title}>
            <TaskList list={list} listSetter={taskListsSetters[idx]} />
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};
