import { ITaskList } from '@journey-monorepo/util';
import { FC } from 'react';
import { TaskListItem } from '../ListItem/TaskListItem';

interface TaskListProps {
  list: ITaskList;
}

export const TaskList: FC<TaskListProps> = (props: TaskListProps) => {
  return (
    <div>
      {props.list.items.map((i) => (
        <TaskListItem item={i} key={i.task_id} />
      ))}
    </div>
  );
};
