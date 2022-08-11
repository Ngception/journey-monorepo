/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, RenderResult } from '@testing-library/react';
import { MessageHeader } from './MessageHeader';

describe('MessageHeader', () => {
  let component: HTMLElement;
  let query: any;
  let rerender: any;

  const testProps = {
    canBeDeleted: true,
  };

  beforeEach(() => {
    const renderResult: RenderResult = render(
      <MessageHeader {...testProps}>
        <div></div>
      </MessageHeader>
    );

    component = renderResult.baseElement;
    query = renderResult.queryByTestId;
    rerender = renderResult.rerender;
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should render delete button', () => {
    expect(query('delete-button')).toBeTruthy();
  });

  it('should not render delete button', () => {
    testProps.canBeDeleted = false;

    rerender(
      <MessageHeader {...testProps}>
        <div></div>
      </MessageHeader>
    );

    expect(query('delete-button')).toBeNull();
  });
});
