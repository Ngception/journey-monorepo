import { FC, MouseEvent, RefObject, useContext, useRef, useState } from 'react';
import { DialogContainer } from '@journey-monorepo/ui';
import { ITask } from '@journey-monorepo/util';
import { TaskContext, updateTask } from '../../../../../shared';

interface UpdateTaskActionProps {
  dropdownToggler: (status: boolean) => void;
  task: ITask;
}

export const UpdateTaskAction: FC<UpdateTaskActionProps> = (
  props: UpdateTaskActionProps
) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [taskToUpdate, setTaskToUpdate] = useState<{
    content: string;
    current_status: string;
  }>({
    content: props.task.content,
    current_status: props.task.current_status,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateTaskTrigger: RefObject<any> = useRef(null);
  const ctx = useContext(TaskContext);

  const dialogProps = {
    title: `Update task`,
    isDialogOpen,
    isLoading,
    isActionDisabled: taskToUpdate.content === '' || isLoading,
    trigger: updateTaskTrigger,
    actionButtonLabel: 'Update',
    actionButtonColor: 'is-primary',
    actionHandler: () => saveUpdatedTask(),
    cancelHandler: () => closeDialog(),
  };

  const saveUpdatedTask = async () => {
    setIsLoading(true);

    const data = {
      ...props.task,
      content: taskToUpdate.content,
      current_status: taskToUpdate.current_status,
      updated_at: new Date(),
    };

    const response = await updateTask(data);

    if (response) {
      await ctx?.fetchTasks();

      setIsDialogOpen(false);
      props.dropdownToggler(false);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  const openDialog = (event: MouseEvent) => {
    event.stopPropagation();
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    props.dropdownToggler(false);
    setIsDialogOpen(false);
    setTaskToUpdate({
      ...taskToUpdate,
      content: props.task.content,
    });
  };

  return (
    <>
      <button
        data-testid="open-dialog-button"
        ref={updateTaskTrigger}
        className="dropdown-item button is-black is-inverted"
        type="button"
        onClick={(event) => openDialog(event)}
      >
        Update
      </button>
      {isDialogOpen && (
        <DialogContainer type="action" dialogProps={dialogProps}>
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
        </DialogContainer>
      )}
    </>
  );
};
