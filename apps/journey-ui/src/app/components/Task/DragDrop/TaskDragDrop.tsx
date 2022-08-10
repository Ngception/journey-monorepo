import { useNotification } from '@journey-monorepo/ui';
import { ITask, ITaskStatus } from '@journey-monorepo/util';
import { FC, ReactNode } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { updateTask } from '../../../shared';
import { TaskList } from '../TaskContainer';

interface TaskDragDropProps {
  children: ReactNode;
  allTaskLists: Record<string, TaskList>;
}

export const TaskDragDrop: FC<TaskDragDropProps> = (
  props: TaskDragDropProps
) => {
  const { showErrorNotification } = useNotification();

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
    updateNewTaskList(task, result);
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

    props.allTaskLists[source.droppableId].setter(
      reorder(props.allTaskLists[source.droppableId].list)
    );
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
    const errorMessage = 'Something went wrong. Please try again later.';

    let updatedNewList: ITask[] = [];

    updatedNewList = props.allTaskLists[newListTitle].list;
    task.current_status = newListTitle?.toLowerCase() as ITaskStatus;
    updatedNewList.splice(newListIndex, 0, task as ITask);

    updateTask(task)
      .then((res) => {
        props.allTaskLists[newListTitle].setter(updatedNewList);
      })
      .catch((err) => {
        if (err) {
          showErrorNotification(errorMessage);
        }
      });
  };

  return (
    <DragDropContext onDragEnd={(e) => handleDragEnd(e)}>
      {props.children}
    </DragDropContext>
  );
};
