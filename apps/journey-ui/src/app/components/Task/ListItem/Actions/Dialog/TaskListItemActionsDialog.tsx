import { ITask } from '@journey-monorepo/util';
import { FC } from 'react';
import { CloneTaskAction } from '../CloneTask/CloneTaskAction';
import { DeleteTaskAction } from '../DeleteTask/DeleteTaskAction';
import { UpdateTaskAction } from '../UpdateTask/UpdateTaskAction';

interface TaskListItemActionsDialogProps {
  dialogType: string;
  task: ITask;
  dialogToggler: (type: string) => void;
}

export const TaskListItemActionsDialog: FC<TaskListItemActionsDialogProps> = (
  props: TaskListItemActionsDialogProps
) => {
  return (
    <>
      <UpdateTaskAction
        isDialogOpen={props.dialogType === 'update'}
        task={props.task}
        dialogToggler={props.dialogToggler}
      />
      <CloneTaskAction
        isDialogOpen={props.dialogType === 'clone'}
        task={props.task}
        dialogToggler={props.dialogToggler}
      />
      <DeleteTaskAction
        isDialogOpen={props.dialogType === 'delete'}
        task={props.task}
        dialogToggler={props.dialogToggler}
      />
    </>
  );
};
