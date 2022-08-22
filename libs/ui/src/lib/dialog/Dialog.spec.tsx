/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import { DialogProvider } from './context/DialogContext';
import { DialogContainer, DialogType } from './DialogContainer';

describe('DialogContainer', () => {
  it('should render successfully', () => {
    const initialDialogState = {
      type: '',
      isActive: false,
      content: null,
      props: null,
    };

    const component: HTMLElement = render(
      <DialogProvider initialState={initialDialogState}>
        <DialogContainer>
          <p>Test</p>
        </DialogContainer>
      </DialogProvider>
    ).baseElement;

    expect(component).toBeTruthy();
  });

  it('should render specific dialog by type', () => {
    const initialDialogState = {
      type: 'action',
      isActive: true,
      content: <div></div>,
      props: {
        isDialogOpen: true,
        isActionDisabled: false,
      },
    };

    const renderResult: RenderResult = render(
      <DialogProvider initialState={initialDialogState}>
        <DialogContainer>
          <p>Test</p>
        </DialogContainer>
      </DialogProvider>
    );

    expect(renderResult.queryByTestId('action-button')).toBeTruthy();
  });
});
