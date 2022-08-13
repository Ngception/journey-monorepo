import { ErrorProvider, NotificationProvider } from '@journey-monorepo/ui';
import { createTask } from '@journey-monorepo/util';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { updateTask, useTask, TaskProvider } from '../../../../../shared';
import { UpdateTaskAction } from './UpdateTaskAction';

// Mock utils module to be able mock certain methods
jest.mock('../../../../../shared/handlers/api/task.handler', () => {
  const originalModule = jest.requireActual(
    '../../../../../shared/handlers/api/task.handler'
  );

  return {
    ...originalModule,

    updateTask: jest.fn(),
  };
});
describe('UpdateTaskAction', () => {
  let component: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any;

  const testProps = {
    task: createTask(),
    dialogToggler: jest.fn(),
    isDialogOpen: true,
  };

  const testState = {
    tasks: [],
    tasksSearchFilter: '',
    fetchTasksHandler: jest.fn(),
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <TaskProvider initialState={testState}>
        <NotificationProvider>
          <ErrorProvider>
            <UpdateTaskAction {...testProps} />
          </ErrorProvider>
        </NotificationProvider>
      </TaskProvider>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', async () => {
    const mocked = { updateTask, useTask };
    jest.spyOn(mocked, 'updateTask').mockResolvedValue(1);

    const actionButton = query('action-button');
    expect(actionButton).toBeTruthy();

    await userEvent.type(query('dialog-textarea'), 'update');
    await userEvent.click(actionButton);

    expect(updateTask).toHaveBeenCalled();
  });
});
