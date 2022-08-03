import { ITask } from '@journey-monorepo/util';
import { FC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { DeleteTaskAction } from './Actions/DeleteTask/DeleteTaskAction';
import { TaskListItemActions } from './Actions/TaskListItemActions';
import { UpdateTaskAction } from './Actions/UpdateTask/UpdateTaskAction';

import styles from './TaskListItem.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TaskListItemProps {
  item: ITask;
  index: number;
}

export const TaskListItem: FC<TaskListItemProps> = (
  props: TaskListItemProps
) => {
  const [showDialog, setShowDialog] = useState<string>('');

  const classes = `card ${styles['task-list-item']}`;

  return (
    <>
      <Draggable draggableId={props.item.task_id} index={props.index}>
        {(provided) => (
          <div
            className={classes}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h2>{props.item.content}</h2>
            <TaskListItemActions
              task={props.item}
              dialogToggler={setShowDialog}
              showDialog={showDialog}
            />
          </div>
        )}
      </Draggable>
      {showDialog === 'update' && (
        <UpdateTaskAction
          isDialogOpen={showDialog === 'update'}
          task={props.item}
          dialogToggler={setShowDialog}
        />
      )}
      {showDialog === 'delete' && (
        <DeleteTaskAction
          isDialogOpen={showDialog === 'delete'}
          task={props.item}
          dialogToggler={setShowDialog}
        />
      )}
    </>
  );
};
