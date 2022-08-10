import { FC, ReactNode } from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface TaskDragDropDraggableProps {
  children: ReactNode;
  draggableId: string;
  draggableIndex: number;
}

export const TaskDragDropDraggable: FC<TaskDragDropDraggableProps> = (
  props: TaskDragDropDraggableProps
) => {
  return (
    <Draggable draggableId={props.draggableId} index={props.draggableIndex}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {props.children}
        </div>
      )}
    </Draggable>
  );
};
