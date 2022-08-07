/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotificationProvider } from '@journey-monorepo/ui';
import { render, RenderResult } from '@testing-library/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { TaskProvider, UserProvider } from '../../shared';
import { TaskContainer } from './TaskContainer';

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
describe('TaskContainer', () => {
  let component: HTMLElement;
  let query: any;

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <UserProvider>
        <NotificationProvider>
          <TaskProvider>
            <DragDropContext onDragEnd={() => jest.fn()}>
              <TaskContainer />
            </DragDropContext>
          </TaskProvider>
        </NotificationProvider>
      </UserProvider>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByText;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 default columns for To Do, In Progress, and Done', () => {
    const columns = ['To Do', 'In Progress', 'Done'];

    columns.forEach((column) => expect(query(column)).toBeTruthy());
  });
});
