/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialog } from './ConfirmationDialog';

describe('ConfirmationDialog', () => {
  let component: HTMLElement;
  let query: any;

  const testProps = {
    title: 'title',
    isDialogOpen: true,
    confirmHandler: jest.fn(),
    cancelHandler: jest.fn(),
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <ConfirmationDialog {...testProps}>
        <p>Test</p>
      </ConfirmationDialog>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render successfully', () => {
    expect(query('close-dialog-button')).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should confirm', async () => {
    const confirmButton = query('confirm-button');
    const confirmField = query('confirm-field');

    expect(confirmButton).toBeTruthy();

    await userEvent.type(confirmField, 'confirm');
    await userEvent.click(confirmButton);

    expect(testProps.confirmHandler).toHaveBeenCalled();
  });

  it('should cancel', async () => {
    const cancelButton = query('cancel-button');

    expect(cancelButton).toBeTruthy();

    await userEvent.click(cancelButton);

    expect(testProps.cancelHandler).toHaveBeenCalled();
  });
});
