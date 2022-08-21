import { FC, ReactNode } from 'react';
import { Droppable } from 'react-beautiful-dnd';

interface TaskDragDropDroppableProps {
  children: ReactNode;
  droppableId: string;
}

export const TaskDragDropDroppable: FC<TaskDragDropDroppableProps> = (
  props: TaskDragDropDroppableProps
) => {
  return (
    <Droppable droppableId={props.droppableId}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {props.children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
