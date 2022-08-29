import { FC, KeyboardEvent, useEffect, useState } from 'react';
import { Dialog, useNotification } from '@journey-monorepo/ui';
import { ITask } from '@journey-monorepo/util';
import { addTask, useError, useTask } from '../../../../../shared';

interface CloneTaskActionProps {
  isDialogOpen: boolean;
  task: ITask;
  dialogToggler: (type: string) => void;
}

export const CloneTaskAction: FC<CloneTaskActionProps> = (
  props: CloneTaskActionProps
) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { state: task } = useTask();
  const handleError = useError();
  const { showSuccessNotification } = useNotification();

  useEffect(() => {
    setIsDialogOpen(props.isDialogOpen);
  }, [props.isDialogOpen]);

  const cloneTask = async (event: KeyboardEvent) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const { content, current_status, user_id } = props.task;

      await addTask({
        content: '[CLONE] ' + content,
        current_status: current_status.toLowerCase(),
        position: task.tasks.length,
        user_id,
      });
      await task.fetchTasksHandler();

      props.dialogToggler('');

      showSuccessNotification('Task has been cloned.');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError(err);
    }

    setIsLoading(false);
  };

  const closeDialog = () => {
    props.dialogToggler('');
  };

  const dialogProps = {
    title: 'Clone task',
    isDialogOpen,
    isLoading,
    isActionDisabled: isLoading,
    actionButtonLabel: 'Clone',
    actionHandler: cloneTask,
    cancelHandler: closeDialog,
  };

  return (
    <div>
      <Dialog type="action" dialogProps={dialogProps}>
        <fieldset data-testid="clone-task-action">
          <div className="field">
            <label className="label is-sr-only" htmlFor="clone-task-content">
              Task content to be cloned
            </label>
            <textarea
              readOnly
              aria-readonly
              className="textarea has-fixed-size"
              data-testid="dialog-textarea"
              id="clone-task-content"
              rows={5}
              value={props.task.content}
            />
          </div>
        </fieldset>
      </Dialog>
    </div>
  );
};
