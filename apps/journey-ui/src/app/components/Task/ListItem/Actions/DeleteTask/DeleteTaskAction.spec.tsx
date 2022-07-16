import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTask } from '@journey-monorepo/util';
import { deleteTaskById } from '../../../../../shared';
import { DeleteTaskAction } from './DeleteTaskAction';

// Mock utils module to be able mock certain methods
jest.mock('../../../../../shared/handlers/api/task.handler', () => {
  const originalModule = jest.requireActual(
    '../../../../../shared/handlers/api/task.handler'
  );

  return {
    ...originalModule,
    deleteTaskById: jest.fn(),
  };
});
describe('DeleteTaskAction', () => {
  let component: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any;

  const testProps = {
    dropdownToggler: jest.fn(),
    task: createTask(),
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <DeleteTaskAction {...testProps} />
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', async () => {
    const mocked = { deleteTaskById };
    jest.spyOn(mocked, 'deleteTaskById').mockResolvedValue(1);

    await userEvent.click(query('open-dialog-button'));

    const actionButton = query('confirm-button');
    expect(actionButton).toBeTruthy();

    await userEvent.type(query('confirm-field'), 'confirm');
    await userEvent.click(actionButton);

    expect(deleteTaskById).toHaveBeenCalled();
  });
});
