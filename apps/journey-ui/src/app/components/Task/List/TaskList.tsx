import { ITaskList } from '@journey-monorepo/util';
import { FC } from 'react';
import { TaskListItem } from '../ListItem/TaskListItem';

import styles from './TaskList.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TaskListProps {
  list: ITaskList;
}

export const TaskList: FC<TaskListProps> = (props: TaskListProps) => {
  return (
    <div className="column is-one-third">
      <div className={styles['task-list']}>
        <h1>
          <span>{props.list.items.length}</span> {props.list.title}
        </h1>
        {props.list.items.map((i) => (
          <TaskListItem item={i} key={i.task_id} />
        ))}
      </div>
    </div>
  );
};
