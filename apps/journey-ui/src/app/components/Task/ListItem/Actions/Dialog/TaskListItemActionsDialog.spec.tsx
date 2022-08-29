/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import { ErrorProvider, NotificationProvider } from '@journey-monorepo/ui';
import { createTask } from '@journey-monorepo/util';
import { TaskProvider } from '../../../../../shared';
import { TaskListItemActionsDialog } from './TaskListItemActionsDialog';

describe('TaskListItemActionsDialog', () => {
  let component: HTMLElement, query: any, rerender: any;

  const testProps = {
    dialogType: '',
    task: createTask(),
    dialogToggler: jest.fn,
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <TaskProvider>
        <NotificationProvider>
          <ErrorProvider>
            <TaskListItemActionsDialog {...testProps} />
          </ErrorProvider>
        </NotificationProvider>
      </TaskProvider>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
    rerender = () =>
      render(
        <TaskProvider>
          <NotificationProvider>
            <ErrorProvider>
              <TaskListItemActionsDialog {...testProps} />
            </ErrorProvider>
          </NotificationProvider>
        </TaskProvider>
      );
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should render clone action dialog', () => {
    testProps.dialogType = 'clone';

    rerender();

    expect(query('clone-task-action')).toBeTruthy();
  });

  it('should render update action dialog', () => {
    testProps.dialogType = 'update';

    rerender();

    expect(query('update-task-action')).toBeTruthy();
  });

  it('should render delete action dialog', () => {
    testProps.dialogType = 'delete';

    rerender();

    expect(query('delete-task-action')).toBeTruthy();
  });
});
