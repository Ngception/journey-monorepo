import { ITaskList } from '@journey-monorepo/util';
import { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TaskListItem } from '../ListItem/TaskListItem';

interface TaskListProps {
  list: ITaskList;
}

export const TaskList: FC<TaskListProps> = (props: TaskListProps) => {
  return (
    <div>
      <Droppable droppableId={props.list.title}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {props.list.items.map((i, idx) => (
              <TaskListItem item={i} key={i.task_id} index={idx} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
