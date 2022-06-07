import { FC, MouseEvent, useContext, useRef, useState } from 'react';
import { DialogContainer, Icon } from '@journey-monorepo/ui';
import { ITask } from '@journey-monorepo/util';
import { deleteTaskById, TaskContext } from '../../../../../shared';

import styles from './DeleteTaskAction.module.scss';

interface DeleteTaskActionProps {
  dropdownToggler: (status: boolean) => void;
  task: ITask;
}

export const DeleteTaskAction: FC<DeleteTaskActionProps> = (
  props: DeleteTaskActionProps
) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ctx = useContext(TaskContext);
  const deleteTaskTrigger = useRef(null);

  const deleteTask = async () => {
    setIsLoading(true);

    try {
      const response = await deleteTaskById(props.task.task_id);

      if (response) {
        await ctx?.fetchTasks();

        setIsDialogOpen(false);
        props.dropdownToggler(false);
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

  const openDialog = (event: MouseEvent) => {
    event.stopPropagation();
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    props.dropdownToggler(false);
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
    confirmButtonColor: 'is-danger',
    confirmHandler: deleteTask,
    cancelHandler: closeDialog,
  };

  return (
    <>
      <button
        data-testid="open-dialog-button"
        ref={deleteTaskTrigger}
        className="dropdown-item button is-black is-inverted"
        type="button"
        onClick={(event) => openDialog(event)}
      >
        Delete
      </button>
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
    </>
  );
};
