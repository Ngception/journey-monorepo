import { ITask } from '@journey-monorepo/util';
import { FC } from 'react';

import styles from './TaskListItem.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TaskListItemProps {
  item: ITask;
}

export const TaskListItem: FC<TaskListItemProps> = (
  props: TaskListItemProps
) => {
  const classes = `card ${styles['task-list-item']}`;

  return (
    <div className={classes}>
      <h2>{props.item.text}</h2>
    </div>
  );
};
