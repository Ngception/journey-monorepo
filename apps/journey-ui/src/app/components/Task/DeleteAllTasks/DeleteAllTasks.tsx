import { Button, Dialog, Icon, useNotification } from '@journey-monorepo/ui';
import { ITask } from '@journey-monorepo/util';
import { FC, FormEvent, useRef, useState } from 'react';
import { deleteAllTasksById, useError } from '../../../shared';

interface DeleteAllTasksProps {
  title: string;
  tasks: ITask[];
  fetchTasks: () => void;
}

export const DeleteAllTasks: FC<DeleteAllTasksProps> = (
  props: DeleteAllTasksProps
) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deleteAllTasksTrigger = useRef<HTMLButtonElement>(null);

  const { showSuccessNotification } = useNotification();
  const handleError = useError();

  const handleConfirm = async (event: FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const tasksIds = props.tasks.map((task) => task.task_id);

      await deleteAllTasksById(tasksIds);
      await props.fetchTasks();

      setIsDialogOpen(false);
      showSuccessNotification(`All ${props.title} tasks have been deleted.`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError(err);
    }

    setIsLoading(false);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const dialogProps = {
    title: `Confirm deleting all ${props.title} tasks`,
    trigger: deleteAllTasksTrigger,
    showDanger: true,
    confirmButtonColor: 'danger',
    confirmHandler: (event: FormEvent) => handleConfirm(event),
    cancelHandler: () => closeDialog(),
    isDialogOpen,
    isLoading,
  };

  return (
    <>
      <Button
        triggerRef={deleteAllTasksTrigger}
        testId="open-delete-all-tasks-dialog-button"
        color="white"
        label={`Delete all ${props.title} tasks`}
        clickHandler={() => setIsDialogOpen(true)}
        isDisabled={!props.tasks.length}
      >
        <Icon type="solid" name="trash-can" />
      </Button>
      <Dialog type="confirmation" dialogProps={dialogProps}>
        <div className="is-flex">
          <span className="mr-2">
            <Icon type="solid" name="triangle-exclamation" />
          </span>
          <p>
            {`You are about to delete all "${props.title}" tasks. This action cannot be undone.`}
          </p>
        </div>
      </Dialog>
    </>
  );
};
