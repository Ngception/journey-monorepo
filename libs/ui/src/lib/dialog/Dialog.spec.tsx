/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import { DialogContainer, DialogType } from './DialogContainer';

describe('DialogContainer', () => {
  const testProps = {
    type: 'confirmation' as DialogType,
    dialogProps: {},
  };

  it('should render successfully', () => {
    const component: HTMLElement = render(
      <DialogContainer {...testProps}>
        <p>Test</p>
      </DialogContainer>
    ).baseElement;

    expect(component).toBeTruthy();
  });

  it('should render specific dialog by type', () => {
    testProps.type = 'action' as DialogType;

    const renderResult: RenderResult = render(
      <DialogContainer {...testProps}>
        <p>Test</p>
      </DialogContainer>
    );

    expect(renderResult.queryByTestId('action-button')).toBeTruthy();
  });
});
