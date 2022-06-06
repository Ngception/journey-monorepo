import { createTask } from '@journey-monorepo/util';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { updateTask } from '../../../../../shared/api/task.handler';
import { UpdateTask } from './UpdateTask';

// Mock utils module to be able mock certain methods
jest.mock('../../../../../shared/api/task.handler', () => {
  const originalModule = jest.requireActual(
    '../../../../../shared/api/task.handler'
  );

  return {
    ...originalModule,
    updateTask: jest.fn(),
  };
});
describe('UpdateTask', () => {
  let component: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any;

  const testProps = {
    dropdownToggler: jest.fn(),
    task: createTask(),
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(<UpdateTask {...testProps} />);

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', async () => {
    const mocked = { updateTask };
    jest.spyOn(mocked, 'updateTask').mockResolvedValue(1);

    await userEvent.click(query('open-dialog-button'));

    const actionButton = query('action-button');
    expect(actionButton).toBeTruthy();

    await userEvent.type(query('dialog-textarea'), 'update');
    await userEvent.click(actionButton);

    expect(updateTask).toHaveBeenCalled();
  });
});
