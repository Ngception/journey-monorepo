/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  let component: HTMLElement, query: any;

  const testProps = {
    shouldSubmit: false,
    clickHandler: jest.fn(),
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <Button {...testProps}>
        <span>Click</span>
      </Button>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render button', () => {
    expect(component).toBeTruthy();
  });

  it('should call click handler when clicked', async () => {
    jest.spyOn(testProps, 'clickHandler');

    const button = query('button');

    expect(button).toBeTruthy();

    await userEvent.click(button);

    expect(testProps.clickHandler).toHaveBeenCalled();
  });
});
