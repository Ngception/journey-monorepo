import { FC, useRef, useState } from 'react';
import { Button, Icon, useDialog, useNotification } from '@journey-monorepo/ui';
import { addTask, useError, useTask, useUser } from '../../../shared';

interface AddTaskProps {
  title: string;
  fetchTasks: () => void;
}

export const AddTask: FC<AddTaskProps> = (props: AddTaskProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newTask, setNewTask] = useState({ content: '', current_status: '' });
  const addTaskTrigger = useRef(null);

  const { state: user } = useUser();
  const handleError = useError();
  const { state: task } = useTask();
  const { showSuccessNotification } = useNotification();
  const { state: dialog, clearDialog, showActionDialog } = useDialog();

  const closeDialog = () => {
    clearDialog();
    setNewTask({
      content: '',
      current_status: '',
    });
  };

  const saveNewTask = async () => {
    setIsLoading(true);

    const data = {
      content: newTask.content,
      current_status: newTask.current_status.toLowerCase(),
      user_id: user.user_id,
      position: task.tasks.length,
    };

    try {
      await addTask(data);
      await props.fetchTasks();

      clearDialog();
      showSuccessNotification('New task has been added.');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      clearDialog();
      handleError(err);
    }

    setIsLoading(false);
  };

  const openDialog = (title: string) => {
    const content = (
      <fieldset disabled={isLoading}>
        <div className="field">
          <label className="label is-sr-only" htmlFor="new-task-content">
            Task Content
          </label>
          <textarea
            className="textarea has-fixed-size"
            data-testid="dialog-textarea"
            id="new-task-content"
            rows={5}
            placeholder="Type content here."
            aria-required="true"
            aria-invalid={newTask.content === ''}
            onChange={(event) =>
              setNewTask({
                ...newTask,
                content: event.target.value,
              })
            }
          />
        </div>
      </fieldset>
    );

    const dialogProps = {
      title: `Add new ${newTask.current_status} task`,
      isDialogOpen: dialog.isActive,
      isLoading,
      isActionDisabled: newTask.content === '' || isLoading,
      trigger: addTaskTrigger,
      actionButtonLabel: 'Add',
      actionButtonColor: 'primary',
      actionHandler: saveNewTask,
      cancelHandler: closeDialog,
    };

    setNewTask({
      ...newTask,
      current_status: title,
    });

    showActionDialog(content, dialogProps);
  };

  return (
    <div>
      <Button
        testId="open-dialog-button"
        color="primary"
        label={`Add new ${props.title} task`}
        clickHandler={() => openDialog(props.title)}
      >
        <span>
          <Icon type="solid" name="plus" />
        </span>
      </Button>
    </div>
  );
};
