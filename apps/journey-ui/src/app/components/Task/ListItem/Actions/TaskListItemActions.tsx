import { FC } from 'react';
import { Dropdown } from '@journey-monorepo/ui';
import { ITask } from '@journey-monorepo/util';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TaskListItemActionsProps {
  task: ITask;
  dialogToggler: (type: string) => void;
  showDialog: string;
}

export const TaskListItemActions: FC<TaskListItemActionsProps> = (
  props: TaskListItemActionsProps
) => {
  const items = [
    {
      label: 'Update',
      clickHandler: () => props.dialogToggler('update'),
    },
    {
      label: 'Delete',
      clickHandler: () => props.dialogToggler('delete'),
    },
  ];

  return (
    <div data-testid="task-list-item-actions">
      <Dropdown
        label={'Task actions'}
        icon={'ellipsis-vertical'}
        items={items}
        triggerColor={'white'}
      />
    </div>
  );
};
