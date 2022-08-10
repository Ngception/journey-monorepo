/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTaskLists } from '@journey-monorepo/util';
import { render, RenderResult } from '@testing-library/react';
import { Droppable } from 'react-beautiful-dnd';
import { TaskProvider, UserProvider } from '../../../shared';
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
  let query: any;
  let queryAll: any;

  beforeEach(() => {
    const list = createTaskLists()[0];
    const renderResult: RenderResult = render(
      <TaskProvider>
        <UserProvider>
          <Droppable droppableId={'id'}>
            {() => <TaskList list={list} listSetter={jest.fn()} />}
          </Droppable>
        </UserProvider>
      </TaskProvider>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
    queryAll = renderResult.queryAllByTestId;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should render add task dialog button', () => {
    expect(query('open-dialog-button')).toBeTruthy();
  });

  it('should render sort dropdown', () => {
    expect(query('sort-dropdown')).toBeTruthy();
  });

  it('should render list items', () => {
    expect(queryAll('task-list-item').length).toBeGreaterThan(0);
  });
});
