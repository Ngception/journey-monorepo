/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import { Dialog, DialogType } from './Dialog';

describe('Dialog', () => {
  const testProps = {
    type: 'confirmation' as DialogType,
    dialogProps: {
      isDialogOpen: true,
    },
  };

  it('should render successfully', () => {
    const component: HTMLElement = render(
      <Dialog {...testProps}>
        <p>Test</p>
      </Dialog>
    ).baseElement;

    expect(component).toBeTruthy();
  });

  it('should render specific dialog by type', () => {
    testProps.type = 'action' as DialogType;

    const renderResult: RenderResult = render(
      <Dialog {...testProps}>
        <p>Test</p>
      </Dialog>
    );

    expect(renderResult.queryByTestId('action-button')).toBeTruthy();
  });
});
