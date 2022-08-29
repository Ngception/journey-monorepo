/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorProvider, NotificationProvider } from '@journey-monorepo/ui';
import { createTask } from '@journey-monorepo/util';
import { addTask, TaskProvider, UserProvider } from '../../../../../shared';
import { CloneTaskAction } from './CloneTaskAction';

// Mock utils module to be able mock certain methods
jest.mock('../../../../../shared/handlers/api/task.handler', () => {
  const originalModule = jest.requireActual(
    '../../../../../shared/handlers/api/task.handler'
  );

  return {
    ...originalModule,
    addTask: jest.fn(),
  };
});
describe('CloneTaskAction', () => {
  let component: HTMLElement, query: any;

  const testProps = {
    isDialogOpen: true,
    task: createTask(),
    dialogToggler: jest.fn,
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <UserProvider>
        <NotificationProvider>
          <ErrorProvider>
            <TaskProvider>
              <CloneTaskAction {...testProps} />
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

    const actionButton = query('action-button');
    expect(actionButton).toBeTruthy();

    await userEvent.click(actionButton);

    expect(addTask).toHaveBeenCalled();
  });
});
