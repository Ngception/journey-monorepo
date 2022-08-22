import { ErrorProvider, NotificationProvider } from '@journey-monorepo/ui';
import { createTasks } from '@journey-monorepo/util';
import { render, RenderResult } from '@testing-library/react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { TaskProvider } from '../../../shared';
import { TaskListItem } from './TaskListItem';

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
describe('TaskListItem', () => {
  let component: HTMLElement;

  beforeEach(() => {
    const item = createTasks()[0];
    const renderResult: RenderResult = render(
      <TaskProvider>
        <ErrorProvider>
          <NotificationProvider>
            <Draggable draggableId={'id'} index={1}>
              {() => <TaskListItem item={item} index={1} />}
            </Draggable>
          </NotificationProvider>
        </ErrorProvider>
      </TaskProvider>
    );

    component = renderResult.baseElement;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });
});
