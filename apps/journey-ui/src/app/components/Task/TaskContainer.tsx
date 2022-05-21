import { createTaskLists } from '@journey-monorepo/util';
import { FC, useState } from 'react';
import { TaskList } from './List/TaskList';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TaskContainerProps {}

export const TaskContainer: FC<TaskContainerProps> = (
  props: TaskContainerProps
) => {
  const [taskLists, setTaskLists] = useState(createTaskLists());

  return (
    <div className="columns">
      {taskLists.map((list, idx) => (
        <TaskList list={list} key={list.title} />
      ))}
    </div>
  );
};
