import { FC, KeyboardEvent, useRef, useState } from 'react';
import { DialogContainer, Icon, useNotification } from '@journey-monorepo/ui';
import { ITask } from '@journey-monorepo/util';
import { deleteTaskById, useError, useTask } from '../../../../../shared';

import styles from './DeleteTaskAction.module.scss';

interface DeleteTaskActionProps {
  task: ITask;
  isDialogOpen: boolean;
  dialogToggler: (type: string) => void;
}

export const DeleteTaskAction: FC<DeleteTaskActionProps> = (
  props: DeleteTaskActionProps
) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(props.isDialogOpen);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deleteTaskTrigger = useRef(null);

  const { state: task } = useTask();
  const handleError = useError();
  const { showSuccessNotification } = useNotification();

  const deleteTask = async (event: KeyboardEvent) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await deleteTaskById(props.task.task_id);
      await task.fetchTasksHandler();

      props.dialogToggler('');

      setIsDialogOpen(false);
      setIsLoading(false);
      showSuccessNotification('Task has been deleted.');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError(err);
    }

    setIsLoading(false);
  };

  const closeDialog = () => {
    props.dialogToggler('');
    setIsDialogOpen(false);
  };

  const dialogProps = {
    title: 'Delete Task',
    trigger: deleteTaskTrigger,
    isDialogOpen,
    isLoading,
    actionButtonLabel: 'Delete',
    actionButtonColor: 'danger',
    actionHandler: deleteTask,
    cancelHandler: closeDialog,
  };

  return (
    <div>
      {isDialogOpen && (
        <DialogContainer type="action" dialogProps={dialogProps}>
          <div className={styles['delete-warning']}>
            <span className="has-text-danger">
              <Icon type="solid" name="triangle-exclamation" />
            </span>
            <p>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
          </div>
        </DialogContainer>
      )}
    </div>
  );
};
