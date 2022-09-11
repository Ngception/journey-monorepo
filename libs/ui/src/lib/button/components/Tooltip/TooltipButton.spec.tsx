import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TooltipButton } from './TooltipButton';

describe('TooltipButton', () => {
  let component: HTMLElement, query: any;

  const testProps = {
    tooltip: 'message',
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <TooltipButton {...testProps}>
        <div></div>
      </TooltipButton>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should show and hide tooltip on hover', async () => {
    const button = query('button');
    let tooltip = query('tooltip');

    expect(button).toBeTruthy();
    expect(tooltip).toBeNull();

    await userEvent.hover(button);

    tooltip = query('tooltip');

    expect(tooltip).toBeTruthy();

    await userEvent.unhover(button);

    tooltip = query('tooltip');

    expect(tooltip).toBeNull();
  });
});
