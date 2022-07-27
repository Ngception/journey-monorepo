import { ITask } from '@journey-monorepo/util';
import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskListItemActions } from './Actions/TaskListItemActions';

import styles from './TaskListItem.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TaskListItemProps {
  item: ITask;
  index: number;
}

export const TaskListItem: FC<TaskListItemProps> = (
  props: TaskListItemProps
) => {
  const classes = `card ${styles['task-list-item']}`;

  return (
    <Draggable draggableId={props.item.task_id} index={props.index}>
      {(provided) => (
        <div
          className={classes}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h2>{props.item.content}</h2>
          <TaskListItemActions task={props.item} />
        </div>
      )}
    </Draggable>
  );
};
