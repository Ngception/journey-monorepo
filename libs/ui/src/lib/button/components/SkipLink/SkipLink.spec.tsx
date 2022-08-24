import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkipLink } from './SkipLink';

describe('SkipLink', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let component: HTMLElement, query: any;

  const testProps = {
    clickHandler: jest.fn(),
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <SkipLink {...testProps}>Click to skip</SkipLink>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should call click handler when clicked', async () => {
    jest.spyOn(testProps, 'clickHandler');

    const skipLink = query('skip-link');

    expect(skipLink).toBeTruthy();

    await userEvent.click(skipLink);

    expect(testProps.clickHandler).toHaveBeenCalled();
  });
});
