/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorProvider, NotificationProvider } from '@journey-monorepo/ui';
import { createTasks } from '@journey-monorepo/util';
import { deleteAllTasksById } from '../../../shared';
import { DeleteAllTasks } from './DeleteAllTasks';

// Mock utils module to be able mock certain methods
jest.mock('../../../shared/handlers/api/task.handler', () => {
  const originalModule = jest.requireActual(
    '../../../shared/handlers/api/task.handler'
  );

  return {
    ...originalModule,
    deleteAllTasksById: jest.fn(),
  };
});
describe('DeleteAllTasks', () => {
  let component: HTMLElement, query: any;

  const testProps = {
    title: 'test',
    tasks: createTasks(),
    fetchTasks: jest.fn(),
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <NotificationProvider>
        <ErrorProvider>
          <DeleteAllTasks {...testProps} />
        </ErrorProvider>
      </NotificationProvider>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', async () => {
    const mocked = { deleteAllTasksById };
    const tasksIds = testProps.tasks.map((task) => task.task_id);

    jest
      .spyOn(mocked, 'deleteAllTasksById')
      .mockResolvedValue(testProps.tasks.length);

    const openDialogButton = query('open-delete-all-tasks-dialog-button');
    expect(openDialogButton).toBeTruthy();

    await userEvent.click(openDialogButton);

    const confirmField = query('confirm-field');
    const confirmButton = query('confirm-button');

    expect(confirmField).toBeTruthy();
    expect(confirmButton).toBeTruthy();

    await userEvent.type(confirmField, 'confirm');
    await userEvent.click(confirmButton);

    expect(deleteAllTasksById).toHaveBeenCalledWith(tasksIds);
  });
});
