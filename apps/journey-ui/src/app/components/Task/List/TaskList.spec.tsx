import { createTaskLists } from '@journey-monorepo/util';
import { render, RenderResult } from '@testing-library/react';
import { Droppable } from 'react-beautiful-dnd';
import { TaskList } from './TaskList';

jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {}
    ),
  Draggable: ({ children }) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {}
    ),
  DragDropContext: ({ children }) => children,
}));
describe('TaskList', () => {
  let component: HTMLElement;

  beforeEach(() => {
    const list = createTaskLists()[0];
    const renderResult: RenderResult = render(
      <Droppable droppableId={'id'}>{() => <TaskList list={list} />}</Droppable>
    );

    component = renderResult.baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
