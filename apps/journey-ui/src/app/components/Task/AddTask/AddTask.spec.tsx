import { ErrorProvider, NotificationProvider } from '@journey-monorepo/ui';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskProvider, UserProvider } from '../../../shared';
import { addTask } from '../../../shared/handlers/api/task.handler';
import { AddTask } from './AddTask';

// Mock utils module to be able mock certain methods
jest.mock('../../../shared/handlers/api/task.handler', () => {
  const originalModule = jest.requireActual(
    '../../../shared/handlers/api/task.handler'
  );

  return {
    ...originalModule,
    addTask: jest.fn(),
  };
});
describe('AddTask', () => {
  let component: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any;

  const testProps = {
    title: 'test',
    userId: 'uuid',
    fetchTasks: jest.fn(),
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <UserProvider>
        <NotificationProvider>
          <ErrorProvider>
            <TaskProvider>
              <AddTask {...testProps} />
            </TaskProvider>
          </ErrorProvider>
        </NotificationProvider>
      </UserProvider>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', async () => {
    const mocked = { addTask };
    jest.spyOn(mocked, 'addTask').mockResolvedValue('uuid');

    await userEvent.click(query('open-dialog-button'));

    const actionButton = query('action-button');
    expect(actionButton).toBeTruthy();

    await userEvent.type(query('dialog-textarea'), 'add');
    await userEvent.click(actionButton);

    expect(addTask).toHaveBeenCalled();
  });
});
