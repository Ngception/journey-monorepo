/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTasks } from '@journey-monorepo/util';
import { TaskProvider } from '../../../shared';
import { TaskSearchBar } from './TaskSearchBar';

describe('TaskSearchBar', () => {
  let component: HTMLElement, query: any, rerender: any;

  const initialState = {
    tasks: createTasks(),
    tasksSearchFilter: '',
    fetchTasksHandler: jest.fn(),
  };

  const dispatchHandlers = {
    setTasksSearchFilter: jest.fn(),
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <TaskProvider
        initialState={initialState}
        dispatchHandlers={dispatchHandlers}
      >
        <TaskSearchBar />
      </TaskProvider>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
    rerender = () =>
      renderResult.rerender(
        <TaskProvider initialState={initialState}>
          <TaskSearchBar />
        </TaskProvider>
      );
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should render reset button', () => {
    initialState.tasksSearchFilter = 'search';

    rerender();

    const resetButton = query('reset-button');
    expect(resetButton).toBeTruthy();
  });

  it('should search', async () => {
    jest.spyOn(dispatchHandlers, 'setTasksSearchFilter');

    const inputField = query('task-search-filter-input');
    const searchButton = query('search-button');

    expect(inputField).toBeTruthy();
    expect(searchButton).toBeTruthy();

    await userEvent.type(inputField, 'search');
    await userEvent.click(searchButton);

    rerender();

    expect(dispatchHandlers.setTasksSearchFilter).toHaveBeenCalled();
  });

  it('should reset search', async () => {
    jest.spyOn(dispatchHandlers, 'setTasksSearchFilter');

    initialState.tasksSearchFilter = 'search';

    rerender();

    const resetButton = query('reset-button');
    expect(resetButton).toBeTruthy();

    await userEvent.click(resetButton);

    rerender();

    const inputField = query('task-search-filter-input');

    expect(inputField.value).toEqual('');
    expect(dispatchHandlers.setTasksSearchFilter).toHaveBeenCalled();
  });
});
