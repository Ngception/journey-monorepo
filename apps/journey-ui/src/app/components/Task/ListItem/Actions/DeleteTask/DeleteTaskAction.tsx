import { FC, KeyboardEvent, useRef, useState } from 'react';
import { Icon, useDialog, useNotification } from '@journey-monorepo/ui';
import { ITask } from '@journey-monorepo/util';
import { deleteTaskById, useError, useTask } from '../../../../../shared';

import styles from './DeleteTaskAction.module.scss';

interface DeleteTaskActionProps {
  task: ITask;
}

export const DeleteTaskAction: FC<DeleteTaskActionProps> = (
  props: DeleteTaskActionProps
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deleteTaskTrigger = useRef(null);

  const { state: task } = useTask();
  const handleError = useError();
  const { showSuccessNotification } = useNotification();
  const { state: dialog, clearDialog } = useDialog();

  const deleteTask = async (event: KeyboardEvent) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await deleteTaskById(props.task.task_id);
      await task.fetchTasksHandler();

      clearDialog();

      setIsLoading(false);
      showSuccessNotification('Task has been deleted.');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError(err);
    }

    setIsLoading(false);
  };

  const closeDialog = () => {
    clearDialog();
  };

  const dialogProps = {
    title: 'Delete Task',
    trigger: deleteTaskTrigger,
    isDialogOpen: dialog.isActive,
    isLoading,
    actionButtonLabel: 'Delete',
    actionButtonColor: 'danger',
    actionHandler: deleteTask,
    cancelHandler: closeDialog,
  };

  return (
    <div className={styles['delete-warning']}>
      <span className="has-text-danger">
        <Icon type="solid" name="triangle-exclamation" />
      </span>
      <p>
        Are you sure you want to delete this task? This action cannot be undone.
      </p>
    </div>
  );
};
