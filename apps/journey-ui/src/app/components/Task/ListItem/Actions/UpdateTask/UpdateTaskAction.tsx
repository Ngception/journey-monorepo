import { FC, RefObject, useContext, useRef, useState } from 'react';
import { DialogContainer } from '@journey-monorepo/ui';
import { ITask } from '@journey-monorepo/util';
import { TaskContext, updateTask } from '../../../../../shared';

interface UpdateTaskActionProps {
  task: ITask;
  isDialogOpen: boolean;
  dialogToggler: (type: string) => void;
}

export const UpdateTaskAction: FC<UpdateTaskActionProps> = (
  props: UpdateTaskActionProps
) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(props.isDialogOpen);
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
    actionButtonColor: 'primary',
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

      setIsLoading(false);
    } else {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  const closeDialog = () => {
    props.dialogToggler('');
    setIsDialogOpen(false);
    setTaskToUpdate({
      ...taskToUpdate,
      content: props.task.content,
    });
  };

  return (
    <div>
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
    </div>
  );
};
