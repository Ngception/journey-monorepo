import { FC, useRef, useState } from 'react';
import { DialogContainer, Icon } from '@journey-monorepo/ui';
import { ITask } from '@journey-monorepo/util';
import { deleteTaskById, useTask } from '../../../../../shared';

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

  const deleteTask = async () => {
    setIsLoading(true);

    try {
      const response = await deleteTaskById(props.task.task_id);

      if (response) {
        await task.fetchTasksHandler();

        props.dialogToggler('');

        setIsDialogOpen(false);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        return;
      }
    } catch (err) {
      setIsLoading(false);
      return err;
    }
  };

  const closeDialog = () => {
    props.dialogToggler('');
    setIsDialogOpen(false);
  };

  const dialogProps = {
    title: 'Delete Task',
    showWarning: true,
    showDanger: true,
    trigger: deleteTaskTrigger,
    isDialogOpen,
    isLoading,
    confirmButtonLabel: 'Delete',
    confirmButtonColor: 'danger',
    confirmHandler: deleteTask,
    cancelHandler: closeDialog,
  };

  return (
    <div>
      {isDialogOpen && (
        <DialogContainer type="confirmation" dialogProps={dialogProps}>
          <div className={styles['delete-warning']}>
            <span>
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
