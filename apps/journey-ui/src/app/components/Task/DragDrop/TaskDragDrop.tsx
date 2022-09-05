import { FC, ReactNode, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useNotification } from '@journey-monorepo/ui';
import { ITask, ITaskStatus } from '@journey-monorepo/util';
import { updateTasks, useError } from '../../../shared';
import { TaskList } from '../TaskContainer';

import styles from './TaskDragDrop.module.scss';

interface TaskDragDropProps {
  children: ReactNode;
  allTaskLists: Record<string, TaskList>;
}

export const TaskDragDrop: FC<TaskDragDropProps> = (
  props: TaskDragDropProps
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleError = useError();
  const { showSuccessNotification } = useNotification();

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

    setIsLoading(true);

    if (oldListTitle === newListTitle) {
      reorderTasksInPlace(result);
      setIsLoading(false);
      showSuccessNotification('Changes have been successfully saved.');

      return;
    }

    const task = updateOldTaskList(result);

    updateNewTaskList(task, result);
    setIsLoading(false);
    showSuccessNotification('Changes have been successfully saved.');
  };

  const reorderTasksInPlace = (result: DropResult) => {
    const { destination, source } = result;
    const targetIndex = destination?.index as number;

    const reorder = (tasks: ITask[]) => {
      let updatedList = tasks;
      const originalTask = updatedList[source.index];

      updatedList.splice(source.index, 1);
      updatedList.splice(targetIndex, 0, originalTask);

      updatedList = updatedList.map((task, idx) => ({
        ...task,
        position: idx,
      }));

      return updatedList;
    };

    const newList = reorder(props.allTaskLists[source.droppableId].list);

    props.allTaskLists[source.droppableId].setter(newList);

    updateTasks(newList)
      .then()
      .catch((err) => {
        handleError(err);
      });
  };

  const updateOldTaskList = (result: DropResult): ITask => {
    const { source, draggableId } = result;
    const oldListTitle = source.droppableId;
    const taskToBeDroppedId = draggableId;

    let updatedOldList = [];

    updatedOldList = props.allTaskLists[oldListTitle].list.filter(
      (element: ITask) => element.task_id !== taskToBeDroppedId
    );

    const task = props.allTaskLists[oldListTitle].list[source.index];

    props.allTaskLists[oldListTitle].setter(updatedOldList);

    return task;
  };

  const updateNewTaskList = (task: ITask, result: DropResult) => {
    const { destination } = result;
    const newListTitle = destination?.droppableId as string;
    const newListIndex = destination?.index as number;

    let updatedNewList: ITask[] = [];

    updatedNewList = props.allTaskLists[newListTitle].list;
    task.current_status = newListTitle?.toLowerCase() as ITaskStatus;

    updatedNewList.splice(newListIndex, 0, task as ITask);
    updatedNewList = updatedNewList.map((item, idx) => ({
      ...item,
      position: idx,
    }));

    props.allTaskLists[newListTitle].setter(updatedNewList);

    updateTasks(updatedNewList)
      .then()
      .catch((err) => {
        handleError(err);
      });
  };

  return (
    <div className={isLoading ? styles['is-loading'] : styles['not-loading']}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {props.children}
      </DragDropContext>
    </div>
  );
};
