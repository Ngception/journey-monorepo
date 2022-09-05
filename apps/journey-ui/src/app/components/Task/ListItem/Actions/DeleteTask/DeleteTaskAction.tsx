import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Dialog, Icon, useNotification } from '@journey-monorepo/ui';
import { ITask } from '@journey-monorepo/util';
import { deleteTaskById, useError, useTask } from '../../../../../shared';

interface DeleteTaskActionProps {
  task: ITask;
  isDialogOpen: boolean;
  dialogToggler: (type: string) => void;
}

export const DeleteTaskAction: FC<DeleteTaskActionProps> = (
  props: DeleteTaskActionProps
) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deleteTaskTrigger = useRef(null);

  const { state: task } = useTask();
  const handleError = useError();
  const { showSuccessNotification } = useNotification();

  useEffect(() => {
    setIsDialogOpen(props.isDialogOpen);
  }, [props.isDialogOpen]);

  const deleteTask = async (event: KeyboardEvent) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await deleteTaskById(props.task.task_id);
      await task.fetchTasksHandler();

      props.dialogToggler('');

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
      <Dialog type="action" dialogProps={dialogProps}>
        <div data-testid="delete-task-action" className="is-flex">
          <span className="has-text-danger mr-2">
            <Icon type="solid" name="triangle-exclamation" />
          </span>
          <p>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>
        </div>
      </Dialog>
    </div>
  );
};
