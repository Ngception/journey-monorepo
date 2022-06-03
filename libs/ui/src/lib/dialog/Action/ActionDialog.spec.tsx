/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionDialog } from './ActionDialog';

describe('ActionDialog', () => {
  let component: HTMLElement;
  let query: any;

  const testProps = {
    title: 'title',
    isDialogOpen: true,
    actionButtonLabel: 'action',
    actionHandler: jest.fn(),
    cancelHandler: jest.fn(),
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <ActionDialog
        title={testProps.title}
        isDialogOpen={testProps.isDialogOpen}
        actionButtonLabel={testProps.actionButtonLabel}
        actionHandler={testProps.actionHandler}
        cancelHandler={testProps.cancelHandler}
      >
        <p>Test</p>
      </ActionDialog>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render successfully', () => {
    expect(query('close-dialog-button')).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should perform action', async () => {
    const actionButton = query('action-button');

    expect(actionButton).toBeTruthy();

    await userEvent.click(actionButton);

    expect(testProps.actionHandler).toHaveBeenCalled();
  });

  it('should cancel', async () => {
    const cancelButton = query('cancel-button');

    expect(cancelButton).toBeTruthy();

    await userEvent.click(cancelButton);

    expect(testProps.cancelHandler).toHaveBeenCalled();
  });
});
