import { Card } from '@journey-monorepo/ui';
import { ITask } from '@journey-monorepo/util';
import { FC, useState } from 'react';
import { TaskDragDropDraggable } from '../DragDrop/components';
import { DeleteTaskAction } from './Actions/DeleteTask/DeleteTaskAction';
import { TaskListItemActions } from './Actions/TaskListItemActions';
import { UpdateTaskAction } from './Actions/UpdateTask/UpdateTaskAction';

import styles from './TaskListItem.module.scss';

interface TaskListItemProps {
  item: ITask;
  index: number;
}

export const TaskListItem: FC<TaskListItemProps> = (
  props: TaskListItemProps
) => {
  const [showDialog, setShowDialog] = useState<string>('');

  const formatDate = (date: Date = new Date()) => {
    let dateObject = new Date(date);

    const offset = dateObject.getTimezoneOffset();
    dateObject = new Date(dateObject.getTime() - offset * 60 * 1000);
    return dateObject.toISOString().split('T')[0];
  };

  return (
    <>
      <TaskDragDropDraggable
        draggableId={props.item.task_id}
        draggableIndex={props.index}
      >
        <Card>
          <div
            data-testid="task-list-item"
            className={styles['task-list-item']}
          >
            <div>
              <h2>{props.item.content}</h2>
              <p className="tag is-info is-light">
                Created {formatDate(props.item.created_at)}
              </p>
              {props.item.updated_at && (
                <p className="tag is-info is-light">
                  Last updated {formatDate(props.item.updated_at)}
                </p>
              )}
            </div>
            <TaskListItemActions
              task={props.item}
              dialogToggler={setShowDialog}
              showDialog={showDialog}
            />
          </div>
        </Card>
      </TaskDragDropDraggable>
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
