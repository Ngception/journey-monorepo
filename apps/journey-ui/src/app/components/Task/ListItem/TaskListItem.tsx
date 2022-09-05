import { FC, useState } from 'react';
import { Card } from '@journey-monorepo/ui';
import { ITask } from '@journey-monorepo/util';
import { TaskDragDropDraggable } from '../DragDrop/components';
import { TaskListItemActions } from './Actions/TaskListItemActions';
import { TaskListItemActionsDialog } from './Actions/Dialog/TaskListItemActionsDialog';

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
            className="is-flex is-justify-content-space-between is-align-items-flex-start px-4 py-4"
          >
            <div>
              <p className="mr-2 mb-2">{props.item.content}</p>
              <div className={styles['task-list-item-dates']}>
                <p className="tag is-info is-light">
                  Created {formatDate(props.item.created_at)}
                </p>
                {props.item.updated_at && (
                  <p className="tag is-info is-light">
                    Last updated {formatDate(props.item.updated_at)}
                  </p>
                )}
              </div>
            </div>
            <TaskListItemActions
              task={props.item}
              dialogToggler={setShowDialog}
              showDialog={showDialog}
            />
          </div>
        </Card>
      </TaskDragDropDraggable>
      <TaskListItemActionsDialog
        dialogType={showDialog}
        task={props.item}
        dialogToggler={setShowDialog}
      />
    </>
  );
};
