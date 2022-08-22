import { FC, KeyboardEvent, RefObject, useRef, useState } from 'react';
import { useDialog, useNotification } from '@journey-monorepo/ui';
import { ITask } from '@journey-monorepo/util';
import { updateTask, useError, useTask } from '../../../../../shared';

interface UpdateTaskActionProps {
  task: ITask;
}

export const UpdateTaskAction: FC<UpdateTaskActionProps> = (
  props: UpdateTaskActionProps
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [taskToUpdate, setTaskToUpdate] = useState<{
    content: string;
    current_status: string;
  }>({
    content: props.task.content,
    current_status: props.task.current_status,
  });
  const updateTaskTrigger: RefObject<HTMLButtonElement> = useRef(null);

  const { state: task } = useTask();
  const handleError = useError();
  const { showSuccessNotification } = useNotification();
  const { state: dialog, clearDialog } = useDialog();

  const saveUpdatedTask = async (event: KeyboardEvent) => {
    event.preventDefault();

    setIsLoading(true);

    const data = {
      ...props.task,
      content: taskToUpdate.content,
      current_status: taskToUpdate.current_status,
      updated_at: new Date(),
    };

    try {
      await updateTask(data);
      await task.fetchTasksHandler();

      clearDialog();

      setIsLoading(false);
      showSuccessNotification('Task has been updated.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError(err);
    }

    setIsLoading(false);
  };

  const closeDialog = () => {
    clearDialog();

    setTaskToUpdate({
      ...taskToUpdate,
      content: props.task.content,
    });
  };

  const dialogProps = {
    title: `Update task`,
    isDialogOpen: dialog.isActive,
    isLoading,
    isActionDisabled: taskToUpdate.content === '' || isLoading,
    trigger: updateTaskTrigger,
    actionButtonLabel: 'Update',
    actionButtonColor: 'primary',
    actionHandler: saveUpdatedTask,
    cancelHandler: closeDialog,
  };

  return (
    <div>
      <fieldset disabled={isLoading}>
        <div className="field">
          <label className="label is-sr-only" htmlFor="task-content">
            Task Content
          </label>
          <textarea
            className="textarea has-fixed-size"
            data-testid="dialog-textarea"
            id="task-content"
            rows={5}
            value={taskToUpdate.content}
            aria-required="true"
            onChange={(event) =>
              setTaskToUpdate({
                ...taskToUpdate,
                content: event.target.value,
              })
            }
          />
        </div>
      </fieldset>
    </div>
  );
};
